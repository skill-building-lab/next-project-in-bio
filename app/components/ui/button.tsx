import { ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/app/lib/utils'

export function Button({
  children,
  variant = 'primary',
  ...props
}: {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        'p-3',
        'text-white',
        'rounded-xl',
        'font-bold',
        'whitespace-nowrap',
        'hover:opacity-95',
        'disabled:opacity-70',
        'cursor-pointer',
        variant === 'primary' && 'bg-accent-purple',
        variant === 'secondary' && 'bg-background-tertiary',
        variant === 'ghost' && 'border-border-primary',
        props.className,
      )}
    >
      {children}
    </button>
  )
}
