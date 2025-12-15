import { ReactNode, useMemo } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { ChevronDown } from '../icons/ChevronDown.tsx'
import { cn } from '../../lib'

export type DropdownSelectOption<T extends string | number> = {
  value: T
  label: ReactNode
  subLabel?: ReactNode
  leading?: ReactNode
  disabled?: boolean
}

type Props<T extends string | number> = {
  value: T
  options: DropdownSelectOption<T>[]
  onChange: (value: T) => void
  triggerClassName?: string
  contentClassName?: string
  itemClassName?: string
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  ariaLabel?: string
  renderTrailing?: ReactNode
  disabled?: boolean
}

export const DropdownSelect = <T extends string | number>({
  value,
  options,
  onChange,
  triggerClassName,
  contentClassName,
  itemClassName,
  align = 'start',
  sideOffset = 8,
  ariaLabel,
  renderTrailing,
  disabled = false,
}: Props<T>) => {
  const selected = useMemo(() => options.find(o => o.value === value), [options, value])

  const triggerBase = cn(
    'bg-[rgba(0,0,0,0.2)] border border-black h-[3rem] rounded-[0.75rem] w-full px-[1rem] py-[0.75rem]',
    'flex items-center justify-between hover:bg-[rgba(0,0,0,0.6)] transition-colors',
    'disabled:opacity-50 disabled:pointer-events-none'
  )

  const contentBase = cn(
    'w-[var(--radix-dropdown-menu-trigger-width)]',
    'outline-none shadow-none p-0',
    'rounded-[0.75rem] overflow-hidden',
    'border border-[#1f1f1f]'
  )

  const itemBase = cn(
    'bg-[rgba(0,0,0,0.2)]',
    'h-[3rem] pl-[1rem] pr-[0.75rem] py-[0.75rem]',
    'flex items-center justify-between',
    'cursor-pointer select-none outline-none',
    'data-[highlighted]:bg-[rgba(255,255,255,0.06)]',
    'data-[disabled]:opacity-50 data-[disabled]:pointer-events-none'
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={ariaLabel}
          disabled={disabled}
          className={cn(triggerBase, triggerClassName)}
        >
          <span className="flex gap-[0.5rem] items-center min-w-0">
            {selected?.leading ? <span className="shrink-0">{selected.leading}</span> : null}

            <span className="font-medium leading-[1.25rem] text-[1rem] text-white truncate">
              {selected?.label ?? ''}
            </span>

            {selected?.subLabel ? (
              <span className="font-normal leading-[1.25rem] text-[1rem] text-[rgba(255,255,255,0.5)] truncate">
                {selected.subLabel}
              </span>
            ) : null}
          </span>

          <span className="shrink-0 size-[1.5rem] flex items-center justify-center">
            {renderTrailing ?? <ChevronDown />}
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        sideOffset={sideOffset}
        align={align}
        className={cn(contentBase, contentClassName)}
      >
        <div className="flex flex-col">
          {options.map((option, idx) => {
            const isLast = idx === options.length - 1

            return (
              <DropdownMenuItem
                key={String(option.value)}
                disabled={disabled || option.disabled}
                onSelect={() => {
                  if (disabled) return
                  onChange(option.value)
                }}
                className={cn(itemBase, !isLast && 'border-b border-[#1f1f1f]', itemClassName)}
              >
                <span className="flex gap-[0.5rem] items-center min-w-0">
                  {option.leading ? <span className="shrink-0">{option.leading}</span> : null}

                  <span className="font-medium leading-[1.25rem] text-[1rem] text-white truncate">
                    {option.label}
                  </span>

                  {option.subLabel ? (
                    <span className="font-normal leading-[1.25rem] text-[1rem] text-[rgba(255,255,255,0.5)] truncate">
                      {option.subLabel}
                    </span>
                  ) : null}
                </span>
              </DropdownMenuItem>
            )
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
