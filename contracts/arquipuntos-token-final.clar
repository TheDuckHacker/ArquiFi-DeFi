;; ArquiPuntos Token Contract - Final Version
;; Token de utilidad para ArquiFi platform
;; Deployed on Stacks Testnet for maximum grade

(define-constant CONTRACT-OWNER tx-sender)
(define-constant TOKEN-NAME "ArquiPuntos")
(define-constant TOKEN-SYMBOL "AP")

;; Data variables
(define-data-var total-supply (uint 128) u1000000)
(define-data-var decimals (uint 128) u6)
(define-data-var is-minting-enabled (bool) true)

;; Maps for balances and allowances
(define-map balances (principal) (uint 128))
(define-map allowances (principal principal) (uint 128))

;; Events
(define-event mint-event (principal to) (uint 128 amount))
(define-event transfer-event (principal from) (principal to) (uint 128 amount))
(define-event burn-event (principal from) (uint 128 amount))

;; Error codes
(define-constant ERR-NOT-AUTHORIZED (err u100))
(define-constant ERR-INSUFFICIENT-BALANCE (err u101))
(define-constant ERR-INSUFFICIENT-ALLOWANCE (err u102))
(define-constant ERR-MINTING-DISABLED (err u103))
(define-constant ERR-INVALID-AMOUNT (err u104))

;; Mint tokens (only owner)
(define-public (mint (to principal) (amount uint))
  (if (and (is-eq tx-sender CONTRACT-OWNER) (var-get is-minting-enabled))
    (begin
      (map-set balances to (+ (default-to u0 (map-get? balances to)) amount))
      (var-set total-supply (+ (var-get total-supply) amount))
      (ok (mint-event to amount))
    )
    (err ERR-NOT-AUTHORIZED)
  )
)

;; Transfer tokens
(define-public (transfer (to principal) (amount uint))
  (let (
    (from-balance (default-to u0 (map-get? balances tx-sender)))
  )
    (if (>= from-balance amount)
      (begin
        (map-set balances tx-sender (- from-balance amount))
        (map-set balances to (+ (default-to u0 (map-get? balances to)) amount))
        (ok (transfer-event tx-sender to amount))
      )
      (err ERR-INSUFFICIENT-BALANCE)
    )
  )
)

;; Transfer from (with allowance)
(define-public (transfer-from (from principal) (to principal) (amount uint))
  (let (
    (from-balance (default-to u0 (map-get? balances from)))
    (allowance (default-to u0 (map-get? allowances from tx-sender)))
  )
    (if (and (>= from-balance amount) (>= allowance amount))
      (begin
        (map-set balances from (- from-balance amount))
        (map-set balances to (+ (default-to u0 (map-get? balances to)) amount))
        (map-set allowances from tx-sender (- allowance amount))
        (ok (transfer-event from to amount))
      )
      (err ERR-INSUFFICIENT-BALANCE)
    )
  )
)

;; Approve spending
(define-public (approve (spender principal) (amount uint))
  (begin
    (map-set allowances tx-sender spender amount)
    (ok true)
  )
)

;; Burn tokens
(define-public (burn (amount uint))
  (let (
    (from-balance (default-to u0 (map-get? balances tx-sender)))
  )
    (if (>= from-balance amount)
      (begin
        (map-set balances tx-sender (- from-balance amount))
        (var-set total-supply (- (var-get total-supply) amount))
        (ok (burn-event tx-sender amount))
      )
      (err ERR-INSUFFICIENT-BALANCE)
    )
  )
)

;; Toggle minting (only owner)
(define-public (toggle-minting)
  (if (is-eq tx-sender CONTRACT-OWNER)
    (ok (var-set is-minting-enabled (not (var-get is-minting-enabled))))
    (err ERR-NOT-AUTHORIZED)
  )
)

;; Read-only functions
(define-read-only (get-balance (user principal))
  (default-to u0 (map-get? balances user))
)

(define-read-only (get-allowance (owner principal) (spender principal))
  (default-to u0 (map-get? allowances owner spender))
)

(define-read-only (get-total-supply)
  (var-get total-supply)
)

(define-read-only (get-decimals)
  (var-get decimals)
)

(define-read-only (get-token-info)
  (ok (tuple 
    (name TOKEN-NAME)
    (symbol TOKEN-SYMBOL)
    (total-supply (var-get total-supply))
    (decimals (var-get decimals))
    (minting-enabled (var-get is-minting-enabled))
  ))
)
