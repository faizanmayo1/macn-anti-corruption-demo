import { cn } from '@/utils/cn'

/** MACN OS mark — a four-point "lodestar" navigation star (the guiding star clean shipping
 *  steers by; ties to the Lodestar AI) inside a bearing ring, teal-green on deep maritime ink. */
export function Wordmark({ size = 'md', tone = 'dark' }: { size?: 'sm' | 'md' | 'lg'; tone?: 'dark' | 'light' }) {
  const dim = size === 'lg' ? 'h-9 w-9' : size === 'sm' ? 'h-7 w-7' : 'h-8 w-8'
  const title = size === 'lg' ? 'text-[17px]' : 'text-[15px]'
  return (
    <div className="flex items-center gap-2.5">
      <span className={cn('grid shrink-0 place-items-center rounded-[10px] shadow-card-sm', dim, tone === 'dark' ? 'bg-steel' : 'bg-white ring-1 ring-hairline')}>
        <svg viewBox="0 0 32 32" className="h-[66%] w-[66%]" fill="none" aria-hidden>
          <circle cx="16" cy="16" r="12.5" stroke="#0FB5A6" strokeWidth="1.3" opacity="0.35" />
          {/* bearing ticks */}
          <g stroke="#34D6C6" strokeWidth="1.2" opacity="0.7">
            <line x1="16" y1="2.5" x2="16" y2="5" />
            <line x1="16" y1="27" x2="16" y2="29.5" />
            <line x1="2.5" y1="16" x2="5" y2="16" />
            <line x1="27" y1="16" x2="29.5" y2="16" />
          </g>
          {/* four-point lodestar */}
          <path d="M16 6 L18 14 L26 16 L18 18 L16 26 L14 18 L6 16 L14 14 Z" fill="#0FB5A6" />
          <circle cx="16" cy="16" r="2.1" fill="#0E2E38" />
        </svg>
      </span>
      <div className="leading-none">
        <p className={cn('font-display font-bold tracking-tight-bank', title, tone === 'dark' ? 'text-ink' : 'text-white')}>
          MACN&nbsp;OS
        </p>
        <p className={cn('mt-0.5 font-mono text-[8.5px] font-medium uppercase tracking-[0.18em]', tone === 'dark' ? 'text-ink-faint' : 'text-steel-300')}>Anti-Corruption Intelligence</p>
      </div>
    </div>
  )
}
