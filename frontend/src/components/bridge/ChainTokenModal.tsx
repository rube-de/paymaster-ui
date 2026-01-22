import { useState, useMemo, useCallback, useEffect, useId } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { cn } from '../../lib/utils'
import type { ChainOption } from './ChainSelector'
import { getTokenKey, type TokenOption } from './TokenSelector'

interface ChainTokenModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Available chains */
  chains: ChainOption[]
  /** All tokens across all chains. Will be filtered by selected chain. */
  tokens: TokenOption[]
  /** Currently selected chain ID */
  selectedChainId: number
  /** Currently selected token key (chainId:address format) */
  selectedTokenKey: string | null
  /** Called when user confirms selection */
  onSelect: (chainId: number, token: TokenOption) => void
  /** Optional: disable interaction */
  disabled?: boolean
}

/**
 * Two-column modal for combined chain and token selection.
 * Follows Across Protocol pattern: chain selection filters available tokens.
 *
 * Chain→Token cascade logic:
 * - When chain changes, check if current token exists on new chain
 * - If yes: preserve token selection
 * - If no: auto-select first token on new chain
 */
export function ChainTokenModal({
  open,
  onOpenChange,
  chains,
  tokens,
  selectedChainId,
  selectedTokenKey,
  onSelect,
  disabled = false,
}: ChainTokenModalProps) {
  const searchId = useId()

  // Local state for in-modal selection (not committed until confirm)
  const [localChainId, setLocalChainId] = useState(selectedChainId)
  const [localTokenKey, setLocalTokenKey] = useState(selectedTokenKey)
  const [searchQuery, setSearchQuery] = useState('')

  // Reset local state when modal opens
  useEffect(() => {
    if (open) {
      setLocalChainId(selectedChainId)
      setLocalTokenKey(selectedTokenKey)
      setSearchQuery('')
    }
  }, [open, selectedChainId, selectedTokenKey])

  // Filter tokens for selected chain
  const tokensForChain = useMemo(() => tokens.filter(t => t.chainId === localChainId), [tokens, localChainId])

  // Filter by search query
  const filteredTokens = useMemo(() => {
    if (!searchQuery.trim()) return tokensForChain
    const query = searchQuery.toLowerCase()
    return tokensForChain.filter(
      t => t.symbol.toLowerCase().includes(query) || t.name.toLowerCase().includes(query)
    )
  }, [tokensForChain, searchQuery])

  // Filter chains by search query
  const filteredChains = useMemo(() => {
    if (!searchQuery.trim()) return chains
    const query = searchQuery.toLowerCase()
    return chains.filter(c => c.name.toLowerCase().includes(query))
  }, [chains, searchQuery])

  // Get currently selected token object
  const selectedToken = useMemo(
    () => tokens.find(t => getTokenKey(t) === localTokenKey),
    [tokens, localTokenKey]
  )

  // Handle chain selection with cascade logic
  const handleChainSelect = useCallback(
    (chainId: number) => {
      setLocalChainId(chainId)

      // Check if current token exists on new chain
      const tokensOnNewChain = tokens.filter(t => t.chainId === chainId)
      const currentTokenOnNewChain = tokensOnNewChain.find(t => t.symbol === selectedToken?.symbol)

      if (currentTokenOnNewChain) {
        // Preserve token selection
        setLocalTokenKey(getTokenKey(currentTokenOnNewChain))
      } else if (tokensOnNewChain.length > 0) {
        // Reset to first token on new chain
        setLocalTokenKey(getTokenKey(tokensOnNewChain[0]))
      }
    },
    [tokens, selectedToken?.symbol]
  )

  // Auto-confirm on token click for faster UX (no separate confirm step)
  const handleTokenClick = useCallback(
    (token: TokenOption) => {
      onSelect(localChainId, token)
      onOpenChange(false)
    },
    [localChainId, onSelect, onOpenChange]
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'bg-neutral-900/95 backdrop-blur-xl',
          'border border-white/10',
          'rounded-2xl p-0 gap-0',
          'max-w-md w-full',
          'max-h-[80vh] overflow-hidden'
        )}
      >
        <DialogHeader className="px-4 pt-4 pb-3 border-b border-white/5">
          <DialogTitle className="text-lg font-semibold text-white">Select Token</DialogTitle>
        </DialogHeader>

        {/* Search */}
        <div className="px-4 py-3 border-b border-white/5">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              id={searchId}
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search chains or tokens..."
              aria-label="Search chains or tokens"
              disabled={disabled}
              className={cn(
                'w-full bg-black/30 border border-white/10',
                'rounded-lg pl-10 pr-4 py-2.5',
                'text-sm text-white placeholder:text-white/40',
                'focus:outline-none focus:border-white/20',
                'transition-colors'
              )}
            />
          </div>
        </div>

        {/* Two-column layout (stacked on mobile) */}
        <div className="flex flex-col sm:flex-row min-h-[300px] max-h-[50vh]">
          {/* Chains column */}
          <div className="w-full sm:w-1/3 border-b sm:border-b-0 sm:border-r border-white/5 overflow-y-auto max-h-[150px] sm:max-h-none">
            <div className="p-2">
              <span className="px-2 py-1 text-xs font-medium text-white/40 uppercase tracking-wider">
                Chain
              </span>
            </div>
            <ul className="space-y-0.5 px-2 pb-2 list-none">
              {filteredChains.map(chain => (
                <li key={chain.id}>
                  <button
                    type="button"
                    onClick={() => handleChainSelect(chain.id)}
                    disabled={disabled}
                    aria-pressed={localChainId === chain.id}
                    className={cn(
                      'w-full flex items-center gap-2 px-2 py-2 rounded-lg',
                      'text-left transition-colors',
                      'hover:bg-white/[0.06]',
                      'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/30',
                      'disabled:opacity-50 disabled:pointer-events-none',
                      localChainId === chain.id && 'bg-white/[0.08]'
                    )}
                  >
                    {chain.icon && <span className="shrink-0">{chain.icon}</span>}
                    <span
                      className={cn(
                        'text-sm font-medium truncate',
                        localChainId === chain.id ? 'text-white' : 'text-white/70'
                      )}
                    >
                      {chain.name}
                    </span>
                  </button>
                </li>
              ))}
              {filteredChains.length === 0 && (
                <li className="px-2 py-4 text-sm text-white/40 text-center">No chains found</li>
              )}
            </ul>
          </div>

          {/* Tokens column */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-2">
              <span className="px-2 py-1 text-xs font-medium text-white/40 uppercase tracking-wider">
                Token
              </span>
            </div>
            <ul className="space-y-0.5 px-2 pb-2 list-none">
              {filteredTokens.map(token => {
                const key = getTokenKey(token)
                const isSelected = key === localTokenKey

                return (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => handleTokenClick(token)}
                      disabled={disabled}
                      aria-pressed={isSelected}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg',
                        'text-left transition-colors',
                        'hover:bg-white/[0.06]',
                        'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/30',
                        'disabled:opacity-50 disabled:pointer-events-none',
                        isSelected && 'bg-white/[0.08]'
                      )}
                    >
                      {token.icon && <span className="shrink-0">{token.icon}</span>}
                      <div className="flex-1 min-w-0">
                        <span
                          className={cn(
                            'block text-sm font-medium truncate',
                            isSelected ? 'text-white' : 'text-white/80'
                          )}
                        >
                          {token.symbol}
                        </span>
                        {token.name !== token.symbol && (
                          <span className="block text-xs text-white/40 truncate">{token.name}</span>
                        )}
                      </div>
                      {token.balance && (
                        <span className="text-xs text-white/50 shrink-0">{token.balance}</span>
                      )}
                      {isSelected && <CheckIcon className="shrink-0 text-white/70" />}
                    </button>
                  </li>
                )
              })}
              {filteredTokens.length === 0 && (
                <li className="px-2 py-4 text-sm text-white/40 text-center">No tokens found</li>
              )}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3 8L6.5 11.5L13 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
