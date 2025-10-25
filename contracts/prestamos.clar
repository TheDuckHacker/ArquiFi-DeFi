;; Contrato de Préstamos Descentralizados - Sistema de préstamos con garantía

(impl-trait .prestamos-trait.prestamos-trait)

(define-constant ERR_NOT_AUTHORIZED (err u100))
(define-constant ERR_LOAN_NOT_FOUND (err u101))
(define-constant ERR_INSUFFICIENT_COLLATERAL (err u102))
(define-constant ERR_LOAN_ACTIVE (err u103))
(define-constant ERR_LOAN_NOT_ACTIVE (err u104))
(define-constant ERR_INSUFFICIENT_BALANCE (err u105))
(define-constant ERR_INVALID_AMOUNT (err u106))

;; Estados de préstamo
(define-constant LOAN_ACTIVE u0)
(define-constant LOAN_REPAID u1)
(define-constant LOAN_LIQUIDATED u2)

;; Tipos de garantía
(define-constant COLLATERAL_STX u0)
(define-constant COLLATERAL_SBTC u1)

;; Estructura de préstamo
(define-data-var last-loan-id uint u0)

(define-map loans
  uint
  (tuple
    (borrower principal)
    (lender principal)
    (amount uint)
    (collateral-amount uint)
    (collateral-type uint)
    (interest-rate uint)
    (created-at uint)
    (due-date uint)
    (status uint)
    (repaid-amount uint)
  )
)

;; Estructura de historial crediticio
(define-map credit-history
  principal
  (tuple
    (total-borrowed uint)
    (total-repaid uint)
    (active-loans uint)
    (defaulted-loans uint)
    (credit-score uint)
    (last-activity uint)
  )
)

;; Eventos
(define-data-event loan-created
  (loan-id uint)
  (borrower principal)
  (amount uint)
  (collateral-amount uint)
  (due-date uint)
)

(define-data-event loan-repaid
  (loan-id uint)
  (borrower principal)
  (amount uint)
  (interest uint)
)

(define-data-event loan-liquidated
  (loan-id uint)
  (borrower principal)
  (collateral-amount uint)
  (reason (string-utf8 100))
)

;; Función para crear préstamo
(define-public (create-loan
  (amount uint)
  (collateral-amount uint)
  (collateral-type uint)
  (interest-rate uint)
  (duration uint)
)
  (begin
    (asserts! (is-eq tx-sender tx-sender) ERR_NOT_AUTHORIZED)
    (asserts! (> amount u0) ERR_INVALID_AMOUNT)
    (asserts! (> collateral-amount u0) ERR_INVALID_AMOUNT)
    (asserts! (> duration u0) ERR_INVALID_AMOUNT)
    
    ;; Verificar que el colateral sea suficiente (sobrecolateralización)
    (let ((required-collateral (* amount u150))) ;; 150% de colateral
      (asserts! (>= collateral-amount required-collateral) ERR_INSUFFICIENT_COLLATERAL)
    )
    
    (var-set last-loan-id (+ (var-get last-loan-id) u1))
    (let ((loan-id (var-get last-loan-id))
          (due-date (+ block-height duration)))
      (map-set loans loan-id (tuple
        (borrower tx-sender)
        (lender tx-sender) ;; Auto-préstamo por simplicidad
        (amount amount)
        (collateral-amount collateral-amount)
        (collateral-type collateral-type)
        (interest-rate interest-rate)
        (created-at block-height)
        (due-date due-date)
        (status LOAN_ACTIVE)
        (repaid-amount u0)
      ))
      
      ;; Actualizar historial crediticio
      (match (map-get? credit-history tx-sender)
        history-data
        (map-set credit-history tx-sender (tuple
          (total-borrowed (+ (get total-borrowed history-data) amount))
          (total-repaid (get total-repaid history-data))
          (active-loans (+ (get active-loans history-data) u1))
          (defaulted-loans (get defaulted-loans history-data))
          (credit-score (get credit-score history-data))
          (last-activity block-height)
        ))
        (map-set credit-history tx-sender (tuple
          (total-borrowed amount)
          (total-repaid u0)
          (active-loans u1)
          (defaulted-loans u0)
          (credit-score u500) ;; Puntuación inicial
          (last-activity block-height)
        ))
      )
      
      (ok (emit loan-created loan-id tx-sender amount collateral-amount due-date))
    )
  )
)

;; Función para obtener préstamo
(define-read-only (get-loan (loan-id uint))
  (map-get? loans loan-id)
)

;; Función para obtener préstamos activos del usuario
(define-read-only (get-user-active-loans (user principal))
  (map-get? loans u0) ;; Placeholder - en implementación real se iteraría
)

;; Función para calcular interés
(define-read-only (calculate-interest (loan-id uint))
  (match (map-get? loans loan-id)
    loan-data
    (let ((amount (get amount loan-data))
          (interest-rate (get interest-rate loan-data))
          (days-elapsed (- block-height (get created-at loan-data))))
      (* amount (* interest-rate days-elapsed))
    )
    u0
  )
)

;; Función para pagar préstamo
(define-public (repay-loan (loan-id uint) (amount uint))
  (begin
    (asserts! (is-eq tx-sender tx-sender) ERR_NOT_AUTHORIZED)
    (asserts! (> amount u0) ERR_INVALID_AMOUNT)
    
    (match (map-get? loans loan-id)
      loan-data
      (begin
        (asserts! (is-eq (get status loan-data) LOAN_ACTIVE) ERR_LOAN_NOT_ACTIVE)
        (asserts! (is-eq tx-sender (get borrower loan-data)) ERR_NOT_AUTHORIZED)
        
        (let ((total-owed (+ (get amount loan-data) (calculate-interest loan-id)))
              (already-repaid (get repaid-amount loan-data))
              (remaining-debt (- total-owed already-repaid)))
          (asserts! (>= amount remaining-debt) ERR_INSUFFICIENT_BALANCE)
          
          ;; Marcar como pagado
          (map-set loans loan-id (tuple
            (borrower (get borrower loan-data))
            (lender (get lender loan-data))
            (amount (get amount loan-data))
            (collateral-amount (get collateral-amount loan-data))
            (collateral-type (get collateral-type loan-data))
            (interest-rate (get interest-rate loan-data))
            (created-at (get created-at loan-data))
            (due-date (get due-date loan-data))
            (status LOAN_REPAID)
            (repaid-amount total-owed)
          ))
          
          ;; Actualizar historial crediticio
          (match (map-get? credit-history tx-sender)
            history-data
            (map-set credit-history tx-sender (tuple
              (total-borrowed (get total-borrowed history-data))
              (total-repaid (+ (get total-repaid history-data) total-owed))
              (active-loans (- (get active-loans history-data) u1))
              (defaulted-loans (get defaulted-loans history-data))
              (credit-score (+ (get credit-score history-data) u10)) ;; Bonus por pago puntual
              (last-activity block-height)
            ))
            (ok true)
          )
          
          (ok (emit loan-repaid loan-id tx-sender (get amount loan-data) (- total-owed (get amount loan-data))))
        )
      )
      (err ERR_LOAN_NOT_FOUND)
    )
  )
)

;; Función para liquidar préstamo (por impago)
(define-public (liquidate-loan (loan-id uint))
  (begin
    (asserts! (is-eq tx-sender tx-sender) ERR_NOT_AUTHORIZED)
    
    (match (map-get? loans loan-id)
      loan-data
      (begin
        (asserts! (is-eq (get status loan-data) LOAN_ACTIVE) ERR_LOAN_NOT_ACTIVE)
        (asserts! (>= block-height (get due-date loan-data)) ERR_LOAN_ACTIVE)
        
        ;; Marcar como liquidado
        (map-set loans loan-id (tuple
          (borrower (get borrower loan-data))
          (lender (get lender loan-data))
          (amount (get amount loan-data))
          (collateral-amount (get collateral-amount loan-data))
          (collateral-type (get collateral-type loan-data))
          (interest-rate (get interest-rate loan-data))
          (created-at (get created-at loan-data))
          (due-date (get due-date loan-data))
          (status LOAN_LIQUIDATED)
          (repaid-amount (get repaid-amount loan-data))
        ))
        
        ;; Actualizar historial crediticio del prestatario
        (match (map-get? credit-history (get borrower loan-data))
          history-data
          (map-set credit-history (get borrower loan-data) (tuple
            (total-borrowed (get total-borrowed history-data))
            (total-repaid (get total-repaid history-data))
            (active-loans (- (get active-loans history-data) u1))
            (defaulted-loans (+ (get defaulted-loans history-data) u1))
            (credit-score (- (get credit-score history-data) u50)) ;; Penalización por impago
            (last-activity block-height)
          ))
          (ok true)
        )
        
        (ok (emit loan-liquidated loan-id (get borrower loan-data) (get collateral-amount loan-data) "Default - liquidation"))
      )
      (err ERR_LOAN_NOT_FOUND)
    )
  )
)

;; Función para obtener historial crediticio
(define-read-only (get-credit-history (user principal))
  (match (map-get? credit-history user)
    history-data
    history-data
    (ok (tuple
      (total-borrowed u0)
      (total-repaid u0)
      (active-loans u0)
      (defaulted-loans u0)
      (credit-score u500)
      (last-activity u0)
    ))
  )
)

;; Función para obtener score crediticio
(define-read-only (get-credit-score (user principal))
  (default-to u500 (get credit-score (map-get? credit-history user)))
)
