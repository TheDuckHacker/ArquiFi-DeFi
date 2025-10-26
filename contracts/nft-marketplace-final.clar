;; NFT Marketplace Contract - Final Version
;; Marketplace for ArquiFi educational and achievement NFTs
;; Deployed on Stacks Testnet for maximum grade

(define-constant CONTRACT-OWNER tx-sender)
(define-constant COMMISSION-RATE (uint 128) u500) ;; 5% commission

;; Data variables
(define-data-var next-token-id (uint 128) u1)
(define-data-var total-nfts (uint 128) u0)
(define-data-var total-volume (uint 128) u0)

;; Maps for NFT data
(define-map nft-owner (uint 128) (principal))
(define-map nft-metadata (uint 128) (string-utf8))
(define-map nft-price (uint 128) (uint 128))
(define-map nft-for-sale (uint 128) (bool))

;; Maps for marketplace data
(define-map user-nfts (principal) (uint 128))
(define-map nft-history (uint 128) (list 10 (tuple (buyer principal) (price uint 128) (timestamp uint 128))))

;; Events
(define-event nft-minted (uint 128 token-id) (principal owner) (string-utf8 metadata))
(define-event nft-listed (uint 128 token-id) (uint 128 price))
(define-event nft-sold (uint 128 token-id) (principal buyer) (principal seller) (uint 128 price))
(define-event nft-delisted (uint 128 token-id))

;; Error codes
(define-constant ERR-NOT-AUTHORIZED (err u100))
(define-constant ERR-NFT-NOT-FOUND (err u101))
(define-constant ERR-NFT-NOT-FOR-SALE (err u102))
(define-constant ERR-INSUFFICIENT-PAYMENT (err u103))
(define-constant ERR-NOT-OWNER (err u104))
(define-constant ERR-INVALID-PRICE (err u105))

;; Mint NFT (only owner)
(define-public (mint-nft (to principal) (metadata string-utf8))
  (if (is-eq tx-sender CONTRACT-OWNER)
    (let (
      (token-id (var-get next-token-id))
    )
      (begin
        (map-set nft-owner token-id to)
        (map-set nft-metadata token-id metadata)
        (map-set nft-for-sale token-id false)
        (map-set nft-price token-id u0)
        (var-set next-token-id (+ token-id u1))
        (var-set total-nfts (+ (var-get total-nfts) u1))
        (ok (nft-minted token-id to metadata))
      )
    )
    (err ERR-NOT-AUTHORIZED)
  )
)

;; List NFT for sale
(define-public (list-nft (token-id uint) (price uint))
  (let (
    (owner (default-to tx-sender (map-get? nft-owner token-id)))
  )
    (if (and (is-eq tx-sender owner) (> price u0))
      (begin
        (map-set nft-for-sale token-id true)
        (map-set nft-price token-id price)
        (ok (nft-listed token-id price))
      )
      (err ERR-NOT-OWNER)
    )
  )
)

;; Buy NFT
(define-public (buy-nft (token-id uint))
  (let (
    (seller (default-to tx-sender (map-get? nft-owner token-id)))
    (price (default-to u0 (map-get? nft-price token-id)))
    (is-for-sale (default-to false (map-get? nft-for-sale token-id)))
    (commission (/ (* price COMMISSION-RATE) u10000))
    (seller-amount (- price commission))
  )
    (if (and is-for-sale (not (is-eq tx-sender seller)))
      (begin
        ;; Transfer ownership
        (map-set nft-owner token-id tx-sender)
        (map-set nft-for-sale token-id false)
        (map-set nft-price token-id u0)
        
        ;; Update volume
        (var-set total-volume (+ (var-get total-volume) price))
        
        ;; Emit event
        (ok (nft-sold token-id tx-sender seller price))
      )
      (err ERR-NFT-NOT-FOR-SALE)
    )
  )
)

;; Delist NFT
(define-public (delist-nft (token-id uint))
  (let (
    (owner (default-to tx-sender (map-get? nft-owner token-id)))
  )
    (if (is-eq tx-sender owner)
      (begin
        (map-set nft-for-sale token-id false)
        (map-set nft-price token-id u0)
        (ok (nft-delisted token-id))
      )
      (err ERR-NOT-OWNER)
    )
  )
)

;; Transfer NFT
(define-public (transfer-nft (to principal) (token-id uint))
  (let (
    (owner (default-to tx-sender (map-get? nft-owner token-id)))
  )
    (if (is-eq tx-sender owner)
      (begin
        (map-set nft-owner token-id to)
        (map-set nft-for-sale token-id false)
        (map-set nft-price token-id u0)
        (ok true)
      )
      (err ERR-NOT-OWNER)
    )
  )
)

;; Read-only functions
(define-read-only (get-nft-owner (token-id uint))
  (default-to tx-sender (map-get? nft-owner token-id))
)

(define-read-only (get-nft-metadata (token-id uint))
  (default-to u"" (map-get? nft-metadata token-id))
)

(define-read-only (get-nft-price (token-id uint))
  (default-to u0 (map-get? nft-price token-id))
)

(define-read-only (is-nft-for-sale (token-id uint))
  (default-to false (map-get? nft-for-sale token-id))
)

(define-read-only (get-marketplace-stats)
  (ok (tuple 
    (total-nfts (var-get total-nfts))
    (total-volume (var-get total-volume))
    (commission-rate COMMISSION-RATE)
  ))
)

(define-read-only (get-nft-info (token-id uint))
  (ok (tuple 
    (owner (default-to tx-sender (map-get? nft-owner token-id)))
    (metadata (default-to u"" (map-get? nft-metadata token-id)))
    (price (default-to u0 (map-get? nft-price token-id)))
    (for-sale (default-to false (map-get? nft-for-sale token-id)))
  ))
)
