;; Contrato de Misiones - Sistema de misiones con recompensas AP y RP

(impl-trait .misiones-trait.misiones-trait)

(define-constant ERR_NOT_AUTHORIZED (err u100))
(define-constant ERR_MISSION_NOT_FOUND (err u101))
(define-constant ERR_MISSION_ALREADY_COMPLETED (err u102))
(define-constant ERR_INSUFFICIENT_LEVEL (err u103))
(define-constant ERR_INSUFFICIENT_AP (err u104))

;; Tipos de misiones
(define-constant MISSION_FREE u0)
(define-constant MISSION_PAID u1)
(define-constant MISSION_PREMIUM u2)

;; Estructura de misión
(define-data-var last-mission-id uint u0)

(define-map missions
  uint
  (tuple
    (title (string-utf8 100))
    (description (string-utf8 500))
    (reward-ap uint)
    (reward-rp uint)
    (type uint)
    (required-level uint)
    (required-ap uint)
    (is-active bool)
    (creator principal)
    (created-at uint)
  )
)

;; Estructura de progreso del usuario
(define-map user-progress
  (tuple (user principal) (mission-id uint))
  (tuple
    (completed bool)
    (completed-at uint)
    (ap-earned uint)
    (rp-earned uint)
  )
)

;; Eventos
(define-data-event mission-created
  (mission-id uint)
  (title (string-utf8 100))
  (creator principal)
)

(define-data-event mission-completed
  (user principal)
  (mission-id uint)
  (ap-earned uint)
  (rp-earned uint)
)

;; Función para crear misión
(define-public (create-mission
  (title (string-utf8 100))
  (description (string-utf8 500))
  (reward-ap uint)
  (reward-rp uint)
  (type uint)
  (required-level uint)
  (required-ap uint)
)
  (begin
    (asserts! (is-eq tx-sender tx-sender) ERR_NOT_AUTHORIZED)
    (asserts! (> reward-ap u0) ERR_INVALID_AMOUNT)
    (var-set last-mission-id (+ (var-get last-mission-id) u1))
    (let ((mission-id (var-get last-mission-id)))
      (map-set missions mission-id (tuple
        (title title)
        (description description)
        (reward-ap reward-ap)
        (reward-rp reward-rp)
        (type type)
        (required-level required-level)
        (required-ap required-ap)
        (is-active true)
        (creator tx-sender)
        (created-at block-height)
      ))
      (ok (emit mission-created mission-id title tx-sender))
    )
  )
)

;; Función para obtener misión
(define-read-only (get-mission (mission-id uint))
  (map-get? missions mission-id)
)

;; Función para obtener misiones activas
(define-read-only (get-active-missions)
  (map-get? missions u0) ;; Placeholder - en implementación real se iteraría
)

;; Función para verificar si el usuario puede acceder a la misión
(define-read-only (can-access-mission (user principal) (mission-id uint))
  (match (map-get? missions mission-id)
    mission-data
    (begin
      (let ((user-level (get-user-level user))
            (user-ap (get-ap-balance user))
            (mission-level (get required-level mission-data))
            (mission-ap (get required-ap mission-data))
            (mission-type (get type mission-data)))
        (and
          (>= user-level mission-level)
          (>= user-ap mission-ap)
          (get is-active mission-data)
        )
      )
    )
    false
  )
)

;; Función para completar misión
(define-public (complete-mission (mission-id uint))
  (begin
    (asserts! (is-eq tx-sender tx-sender) ERR_NOT_AUTHORIZED)
    (match (map-get? missions mission-id)
      mission-data
      (begin
        (asserts! (get is-active mission-data) ERR_MISSION_NOT_FOUND)
        (asserts! (not (get completed (unwrap! (map-get? user-progress (tuple tx-sender mission-id)) false))) ERR_MISSION_ALREADY_COMPLETED)
        
        ;; Verificar requisitos
        (let ((user-level (get-user-level tx-sender))
              (user-ap (get-ap-balance tx-sender))
              (mission-level (get required-level mission-data))
              (mission-ap (get required-ap mission-data)))
          (asserts! (>= user-level mission-level) ERR_INSUFFICIENT_LEVEL)
          (asserts! (>= user-ap mission-ap) ERR_INSUFFICIENT_AP)
        )
        
        ;; Marcar como completada
        (map-set user-progress (tuple tx-sender mission-id) (tuple
          (completed true)
          (completed-at block-height)
          (ap-earned (get reward-ap mission-data))
          (rp-earned (get reward-rp mission-data))
        ))
        
        ;; Emitir eventos de recompensa
        (ok (emit mission-completed tx-sender mission-id (get reward-ap mission-data) (get reward-rp mission-data)))
      )
      (err ERR_MISSION_NOT_FOUND)
    )
  )
)

;; Función para obtener progreso del usuario en una misión
(define-read-only (get-user-progress (user principal) (mission-id uint))
  (map-get? user-progress (tuple user mission-id))
)

;; Función para obtener misiones completadas por usuario
(define-read-only (get-user-completed-missions (user principal))
  (map-get? user-progress (tuple user u0)) ;; Placeholder - en implementación real se iteraría
)

;; Función para obtener misiones disponibles para el usuario
(define-read-only (get-available-missions (user principal))
  (map-get? missions u0) ;; Placeholder - en implementación real se filtrarían
)

;; Función para desactivar misión (solo el creador)
(define-public (deactivate-mission (mission-id uint))
  (begin
    (asserts! (is-eq tx-sender tx-sender) ERR_NOT_AUTHORIZED)
    (match (map-get? missions mission-id)
      mission-data
      (begin
        (asserts! (is-eq tx-sender (get creator mission-data)) ERR_NOT_AUTHORIZED)
        (map-set missions mission-id (tuple
          (title (get title mission-data))
          (description (get description mission-data))
          (reward-ap (get reward-ap mission-data))
          (reward-rp (get reward-rp mission-data))
          (type (get type mission-data))
          (required-level (get required-level mission-data))
          (required-ap (get required-ap mission-data))
          (is-active false)
          (creator (get creator mission-data))
          (created-at (get created-at mission-data))
        ))
        (ok true)
      )
      (err ERR_MISSION_NOT_FOUND)
    )
  )
)
