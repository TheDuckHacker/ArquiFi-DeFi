;; Contrato de Reputación (RP) - Sistema de reputación acumulativa
;; Se gana por actividades, NO se quema, mejora el perfil

(impl-trait .reputacion-trait.reputacion-trait)

(define-constant ERR_NOT_AUTHORIZED (err u100))
(define-constant ERR_INVALID_AMOUNT (err u101))
(define-constant ERR_USER_NOT_FOUND (err u102))

;; Niveles de reputación
(define-constant NOVATO u0)
(define-constant EXPLORADOR u200)
(define-constant ARQUITECTO u500)
(define-constant VISIONARIO u1000)

;; Estructura de usuario con reputación
(define-data-var last-user-id uint u0)

(define-map users
  principal
  (tuple
    (id uint)
    (reputation-points uint)
    (level uint)
    (badges (list 10 (string-utf8 50)))
    (total-earned uint)
    (last-activity uint)
  )
)

;; Eventos
(define-data-event earn-reputation
  (user principal)
  (amount uint)
  (reason (optional (string-utf8 100)))
  (new-level uint)
)

(define-data-event level-up
  (user principal)
  (old-level uint)
  (new-level uint)
)

(define-data-event earn-badge
  (user principal)
  (badge-name (string-utf8 50))
)

;; Función para determinar nivel según reputación
(define-read-only (get-level (reputation uint))
  (if (>= reputation VISIONARIO)
    VISIONARIO
    (if (>= reputation ARQUITECTO)
      ARQUITECTO
      (if (>= reputation EXPLORADOR)
        EXPLORADOR
        NOVATO
      )
    )
  )
)

;; Función para obtener nombre del nivel
(define-read-only (get-level-name (level uint))
  (if (is-eq level VISIONARIO)
    (ok "Visionario")
    (if (is-eq level ARQUITECTO)
      (ok "Arquitecto")
      (if (is-eq level EXPLORADOR)
        (ok "Explorador")
        (ok "Novato")
      )
    )
  )
)

;; Función para obtener reputación del usuario
(define-read-only (get-reputation (user principal))
  (default-to u0 (get reputation-points (map-get? users user)))
)

;; Función para obtener nivel del usuario
(define-read-only (get-user-level (user principal))
  (default-to NOVATO (get level (map-get? users user)))
)

;; Función para obtener badges del usuario
(define-read-only (get-user-badges (user principal))
  (default-to (list) (get badges (map-get? users user)))
)

;; Función interna para crear usuario si no existe
(define-private (ensure-user (user principal))
  (match (map-get? users user)
    existing-user (ok existing-user)
    (begin
      (var-set last-user-id (+ (var-get last-user-id) u1))
      (map-set users user (tuple
        (id (var-get last-user-id))
        (reputation-points u0)
        (level NOVATO)
        (badges (list))
        (total-earned u0)
        (last-activity u0)
      ))
      (ok (map-get users user))
    )
  )
)

;; Función para ganar reputación
(define-public (earn-reputation (user principal) (amount uint) (reason (optional (string-utf8 100))))
  (begin
    (asserts! (is-eq tx-sender (as-contract tx-sender)) ERR_NOT_AUTHORIZED)
    (asserts! (> amount u0) ERR_INVALID_AMOUNT)
    (try! (ensure-user user))
    (let ((current-reputation (get reputation-points (unwrap! (map-get? users user) u0))))
      (let ((new-reputation (+ current-reputation amount)))
        (let ((new-level (get-level new-reputation)))
          (map-set users user (tuple
            (id (get id (unwrap! (map-get? users user) (tuple (id u0) (reputation-points u0) (level u0) (badges (list)) (total-earned u0) (last-activity u0)))))
            (reputation-points new-reputation)
            (level new-level)
            (badges (get badges (unwrap! (map-get? users user) (tuple (id u0) (reputation-points u0) (level u0) (badges (list)) (total-earned u0) (last-activity u0))))))
            (total-earned (+ (get total-earned (unwrap! (map-get? users user) (tuple (id u0) (reputation-points u0) (level u0) (badges (list)) (total-earned u0) (last-activity u0))))) amount))
            (last-activity block-height)
          ))
          (if (not (is-eq new-level (get level (unwrap! (map-get? users user) (tuple (id u0) (reputation-points u0) (level u0) (badges (list)) (total-earned u0) (last-activity u0))))))
            (ok (emit level-up user (get level (unwrap! (map-get? users user) (tuple (id u0) (reputation-points u0) (level u0) (badges (list)) (total-earned u0) (last-activity u0))))) new-level))
            (ok true)
          )
          (ok (emit earn-reputation user amount reason new-level))
        )
      )
    )
  )
)

;; Función para otorgar badge
(define-public (earn-badge (user principal) (badge-name (string-utf8 50)))
  (begin
    (asserts! (is-eq tx-sender (as-contract tx-sender)) ERR_NOT_AUTHORIZED)
    (try! (ensure-user user))
    (let ((current-badges (get badges (unwrap! (map-get? users user) (list)))))
      (if (not (is-eq (index-of? current-badges badge-name) (some u0)))
        (begin
          (map-set users user (tuple
            (id (get id (unwrap! (map-get? users user) (tuple (id u0) (reputation-points u0) (level u0) (badges (list)) (total-earned u0) (last-activity u0)))))
            (reputation-points (get reputation-points (unwrap! (map-get? users user) (tuple (id u0) (reputation-points u0) (level u0) (badges (list)) (total-earned u0) (last-activity u0))))))
            (level (get level (unwrap! (map-get? users user) (tuple (id u0) (reputation-points u0) (level u0) (badges (list)) (total-earned u0) (last-activity u0))))))
            (badges (unwrap! (as-max-len? (append current-badges badge-name) u10) current-badges))
            (total-earned (get total-earned (unwrap! (map-get? users user) (tuple (id u0) (reputation-points u0) (level u0) (badges (list)) (total-earned u0) (last-activity u0))))))
            (last-activity (get last-activity (unwrap! (map-get? users user) (tuple (id u0) (reputation-points u0) (level u0) (badges (list)) (total-earned u0) (last-activity u0)))))
          ))
          (ok (emit earn-badge user badge-name))
        )
        (ok true)
      )
    )
  )
)

;; Función para obtener estadísticas completas del usuario
(define-read-only (get-user-stats (user principal))
  (match (map-get? users user)
    user-data user-data
    (ok (tuple
      (id u0)
      (reputation-points u0)
      (level NOVATO)
      (badges (list))
      (total-earned u0)
      (last-activity u0)
    ))
  )
)
