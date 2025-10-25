;; Contrato de Arquipuntos (AP) - Sistema de puntos internos
;; Se ganan por actividades, se queman al usar

(impl-trait .arquipuntos-trait.arquipuntos-trait)

(define-constant ERR_NOT_AUTHORIZED (err u100))
(define-constant ERR_INSUFFICIENT_BALANCE (err u101))
(define-constant ERR_INVALID_AMOUNT (err u102))
(define-constant ERR_USER_NOT_FOUND (err u103))

;; Estructura de usuario
(define-data-var last-user-id uint u0)

(define-map users
  principal
  (tuple
    (id uint)
    (balance uint)
    (total-earned uint)
    (total-burned uint)
  )
)

;; Eventos
(define-data-event earn-ap
  (user principal)
  (amount uint)
  (reason (optional (string-utf8 100)))
)

(define-data-event burn-ap
  (user principal)
  (amount uint)
  (reason (optional (string-utf8 100)))
)

(define-data-event transfer-ap
  (from principal)
  (to principal)
  (amount uint)
)

;; Función para obtener balance de AP
(define-read-only (get-balance (user principal))
  (default-to u0 (get balance (map-get? users user)))
)

;; Función para obtener estadísticas del usuario
(define-read-only (get-user-stats (user principal))
  (match (map-get? users user)
    user-data user-data
    (ok (tuple (id u0) (balance u0) (total-earned u0) (total-burned u0)))
  )
)

;; Función interna para crear usuario si no existe
(define-private (ensure-user (user principal))
  (match (map-get? users user)
    existing-user (ok existing-user)
    (begin
      (var-set last-user-id (+ (var-get last-user-id) u1))
      (map-set users user (tuple
        (id (var-get last-user-id))
        (balance u0)
        (total-earned u0)
        (total-burned u0)
      ))
      (ok (map-get users user))
    )
  )
)

;; Función para ganar AP (solo el contrato puede llamar)
(define-public (earn-ap (user principal) (amount uint) (reason (optional (string-utf8 100))))
  (begin
    (asserts! (is-eq tx-sender (as-contract tx-sender)) ERR_NOT_AUTHORIZED)
    (asserts! (> amount u0) ERR_INVALID_AMOUNT)
    (try! (ensure-user user))
    (let ((current-balance (get balance (unwrap! (map-get? users user) u0))))
      (map-set users user (tuple
        (id (get id (unwrap! (map-get? users user) (tuple (id u0) (balance u0) (total-earned u0) (total-burned u0)))))
        (balance (+ current-balance amount))
        (total-earned (+ (get total-earned (unwrap! (map-get? users user) (tuple (id u0) (balance u0) (total-earned u0) (total-burned u0)))) amount))
        (total-burned (get total-burned (unwrap! (map-get? users user) (tuple (id u0) (balance u0) (total-earned u0) (total-burned u0)))))
      ))
      (ok (emit earn-ap user amount reason))
    )
  )
)

;; Función para quemar AP
(define-public (burn-ap (user principal) (amount uint) (reason (optional (string-utf8 100))))
  (begin
    (asserts! (is-eq tx-sender user) ERR_NOT_AUTHORIZED)
    (asserts! (> amount u0) ERR_INVALID_AMOUNT)
    (let ((current-balance (get balance (unwrap! (map-get? users user) u0))))
      (asserts! (>= current-balance amount) ERR_INSUFFICIENT_BALANCE)
      (map-set users user (tuple
        (id (get id (unwrap! (map-get? users user) (tuple (id u0) (balance u0) (total-earned u0) (total-burned u0)))))
        (balance (- current-balance amount))
        (total-earned (get total-earned (unwrap! (map-get? users user) (tuple (id u0) (balance u0) (total-earned u0) (total-burned u0))))))
        (total-burned (+ (get total-burned (unwrap! (map-get? users user) (tuple (id u0) (balance u0) (total-earned u0) (total-burned u0))))) amount))
      ))
      (ok (emit burn-ap user amount reason))
    )
  )
)

;; Función para transferir AP entre usuarios
(define-public (transfer-ap (to principal) (amount uint))
  (begin
    (asserts! (is-eq tx-sender tx-sender) ERR_NOT_AUTHORIZED)
    (asserts! (> amount u0) ERR_INVALID_AMOUNT)
    (let ((sender-balance (get balance (unwrap! (map-get? users tx-sender) u0))))
      (asserts! (>= sender-balance amount) ERR_INSUFFICIENT_BALANCE)
      (try! (ensure-user to))
      (let ((receiver-balance (get balance (unwrap! (map-get? users to) u0))))
        (map-set users tx-sender (tuple
          (id (get id (unwrap! (map-get? users tx-sender) (tuple (id u0) (balance u0) (total-earned u0) (total-burned u0)))))
          (balance (- sender-balance amount))
          (total-earned (get total-earned (unwrap! (map-get? users tx-sender) (tuple (id u0) (balance u0) (total-earned u0) (total-burned u0))))))
          (total-burned (get total-burned (unwrap! (map-get? users tx-sender) (tuple (id u0) (balance u0) (total-earned u0) (total-burned u0))))))
        ))
        (map-set users to (tuple
          (id (get id (unwrap! (map-get? users to) (tuple (id u0) (balance u0) (total-earned u0) (total-burned u0)))))
          (balance (+ receiver-balance amount))
          (total-earned (get total-earned (unwrap! (map-get? users to) (tuple (id u0) (balance u0) (total-earned u0) (total-burned u0)))))
          (total-burned (get total-burned (unwrap! (map-get? users to) (tuple (id u0) (balance u0) (total-earned u0) (total-burned u0)))))
        ))
        (ok (emit transfer-ap tx-sender to amount))
      )
    )
  )
)
