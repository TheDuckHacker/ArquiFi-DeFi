;; Contrato de Gobierno DAO - Sistema de votaciones con quema de AP

(impl-trait .gobierno-trait.gobierno-trait)

(define-constant ERR_NOT_AUTHORIZED (err u100))
(define-constant ERR_PROPOSAL_NOT_FOUND (err u101))
(define-constant ERR_VOTING_CLOSED (err u102))
(define-constant ERR_ALREADY_VOTED (err u103))
(define-constant ERR_INSUFFICIENT_AP (err u104))
(define-constant ERR_INVALID_VOTE (err u105))

;; Estados de propuesta
(define-constant PROPOSAL_ACTIVE u0)
(define-constant PROPOSAL_PASSED u1)
(define-constant PROPOSAL_REJECTED u2)
(define-constant PROPOSAL_EXECUTED u3)

;; Tipos de voto
(define-constant VOTE_YES u1)
(define-constant VOTE_NO u0)
(define-constant VOTE_ABSTAIN u2)

;; Estructura de propuesta
(define-data-var last-proposal-id uint u0)

(define-map proposals
  uint
  (tuple
    (title (string-utf8 200))
    (description (string-utf8 1000))
    (creator principal)
    (created-at uint)
    (voting-end uint)
    (status uint)
    (yes-votes uint)
    (no-votes uint)
    (abstain-votes uint)
    (total-ap-burned uint)
    (executed bool)
  )
)

;; Estructura de voto
(define-map votes
  (tuple (proposal-id uint) (voter principal))
  (tuple
    (vote uint)
    (ap-burned uint)
    (voted-at uint)
  )
)

;; Eventos
(define-data-event proposal-created
  (proposal-id uint)
  (title (string-utf8 200))
  (creator principal)
  (voting-end uint)
)

(define-data-event vote-cast
  (proposal-id uint)
  (voter principal)
  (vote uint)
  (ap-burned uint)
)

(define-data-event proposal-executed
  (proposal-id uint)
  (result uint)
)

;; Función para crear propuesta
(define-public (create-proposal
  (title (string-utf8 200))
  (description (string-utf8 1000))
  (voting-duration uint)
)
  (begin
    (asserts! (is-eq tx-sender tx-sender) ERR_NOT_AUTHORIZED)
    (asserts! (> voting-duration u0) ERR_INVALID_AMOUNT)
    (var-set last-proposal-id (+ (var-get last-proposal-id) u1))
    (let ((proposal-id (var-get last-proposal-id))
          (voting-end (+ block-height voting-duration)))
      (map-set proposals proposal-id (tuple
        (title title)
        (description description)
        (creator tx-sender)
        (created-at block-height)
        (voting-end voting-end)
        (status PROPOSAL_ACTIVE)
        (yes-votes u0)
        (no-votes u0)
        (abstain-votes u0)
        (total-ap-burned u0)
        (executed false)
      ))
      (ok (emit proposal-created proposal-id title tx-sender voting-end))
    )
  )
)

;; Función para obtener propuesta
(define-read-only (get-proposal (proposal-id uint))
  (map-get? proposals proposal-id)
)

;; Función para obtener propuestas activas
(define-read-only (get-active-proposals)
  (map-get? proposals u0) ;; Placeholder - en implementación real se iteraría
)

;; Función para votar en propuesta
(define-public (vote (proposal-id uint) (vote-option uint) (ap-amount uint))
  (begin
    (asserts! (is-eq tx-sender tx-sender) ERR_NOT_AUTHORIZED)
    (asserts! (or (is-eq vote-option VOTE_YES) (is-eq vote-option VOTE_NO) (is-eq vote-option VOTE_ABSTAIN)) ERR_INVALID_VOTE)
    (asserts! (> ap-amount u0) ERR_INVALID_AMOUNT)
    
    (match (map-get? proposals proposal-id)
      proposal-data
      (begin
        (asserts! (is-eq (get status proposal-data) PROPOSAL_ACTIVE) ERR_VOTING_CLOSED)
        (asserts! (< block-height (get voting-end proposal-data)) ERR_VOTING_CLOSED)
        (asserts! (is-none (map-get? votes (tuple proposal-id tx-sender))) ERR_ALREADY_VOTED)
        
        ;; Verificar balance de AP del usuario
        (let ((user-ap (get-ap-balance tx-sender)))
          (asserts! (>= user-ap ap-amount) ERR_INSUFFICIENT_AP)
        )
        
        ;; Quemar AP del usuario
        (try! (contract-call? .arquipuntos burn-ap tx-sender ap-amount (some "Vote in DAO proposal")))
        
        ;; Registrar voto
        (map-set votes (tuple proposal-id tx-sender) (tuple
          (vote vote-option)
          (ap-burned ap-amount)
          (voted-at block-height)
        ))
        
        ;; Actualizar conteo de votos
        (let ((yes-votes (get yes-votes proposal-data))
              (no-votes (get no-votes proposal-data))
              (abstain-votes (get abstain-votes proposal-data))
              (total-ap (get total-ap-burned proposal-data)))
          (map-set proposals proposal-id (tuple
            (title (get title proposal-data))
            (description (get description proposal-data))
            (creator (get creator proposal-data))
            (created-at (get created-at proposal-data))
            (voting-end (get voting-end proposal-data))
            (status (get status proposal-data))
            (yes-votes (if (is-eq vote-option VOTE_YES) (+ yes-votes u1) yes-votes))
            (no-votes (if (is-eq vote-option VOTE_NO) (+ no-votes u1) no-votes))
            (abstain-votes (if (is-eq vote-option VOTE_ABSTAIN) (+ abstain-votes u1) abstain-votes))
            (total-ap-burned (+ total-ap ap-amount))
            (executed (get executed proposal-data))
          ))
        )
        
        (ok (emit vote-cast proposal-id tx-sender vote-option ap-amount))
      )
      (err ERR_PROPOSAL_NOT_FOUND)
    )
  )
)

;; Función para cerrar propuesta y determinar resultado
(define-public (close-proposal (proposal-id uint))
  (begin
    (asserts! (is-eq tx-sender tx-sender) ERR_NOT_AUTHORIZED)
    (match (map-get? proposals proposal-id)
      proposal-data
      (begin
        (asserts! (is-eq (get status proposal-data) PROPOSAL_ACTIVE) ERR_VOTING_CLOSED)
        (asserts! (>= block-height (get voting-end proposal-data)) ERR_VOTING_CLOSED)
        
        (let ((yes-votes (get yes-votes proposal-data))
              (no-votes (get no-votes proposal-data))
              (result (if (> yes-votes no-votes) PROPOSAL_PASSED PROPOSAL_REJECTED)))
          (map-set proposals proposal-id (tuple
            (title (get title proposal-data))
            (description (get description proposal-data))
            (creator (get creator proposal-data))
            (created-at (get created-at proposal-data))
            (voting-end (get voting-end proposal-data))
            (status result)
            (yes-votes yes-votes)
            (no-votes no-votes)
            (abstain-votes (get abstain-votes proposal-data))
            (total-ap-burned (get total-ap-burned proposal-data))
            (executed false)
          ))
          (ok (emit proposal-executed proposal-id result))
        )
      )
      (err ERR_PROPOSAL_NOT_FOUND)
    )
  )
)

;; Función para ejecutar propuesta aprobada
(define-public (execute-proposal (proposal-id uint))
  (begin
    (asserts! (is-eq tx-sender tx-sender) ERR_NOT_AUTHORIZED)
    (match (map-get? proposals proposal-id)
      proposal-data
      (begin
        (asserts! (is-eq (get status proposal-data) PROPOSAL_PASSED) ERR_VOTING_CLOSED)
        (asserts! (not (get executed proposal-data)) ERR_VOTING_CLOSED)
        
        ;; Marcar como ejecutada
        (map-set proposals proposal-id (tuple
          (title (get title proposal-data))
          (description (get description proposal-data))
          (creator (get creator proposal-data))
          (created-at (get created-at proposal-data))
          (voting-end (get voting-end proposal-data))
          (status (get status proposal-data))
          (yes-votes (get yes-votes proposal-data))
          (no-votes (get no-votes proposal-data))
          (abstain-votes (get abstain-votes proposal-data))
          (total-ap-burned (get total-ap-burned proposal-data))
          (executed true)
        ))
        
        (ok (emit proposal-executed proposal-id PROPOSAL_PASSED))
      )
      (err ERR_PROPOSAL_NOT_FOUND)
    )
  )
)

;; Función para obtener voto del usuario en una propuesta
(define-read-only (get-user-vote (proposal-id uint) (voter principal))
  (map-get? votes (tuple proposal-id voter))
)

;; Función para obtener estadísticas de propuesta
(define-read-only (get-proposal-stats (proposal-id uint))
  (match (map-get? proposals proposal-id)
    proposal-data
    (ok (tuple
      (yes-votes (get yes-votes proposal-data))
      (no-votes (get no-votes proposal-data))
      (abstain-votes (get abstain-votes proposal-data))
      (total-ap-burned (get total-ap-burned proposal-data))
      (status (get status proposal-data))
    ))
    (ok (tuple
      (yes-votes u0)
      (no-votes u0)
      (abstain-votes u0)
      (total-ap-burned u0)
      (status u0)
    ))
  )
)
