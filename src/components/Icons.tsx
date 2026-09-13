import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* Marca: xícara de espresso coroada — Império + café */
export function LogoMark(props: P) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...stroke} strokeWidth={2} {...props}>
      <path d="M9 10l2.2-4 2.3 2.6L16 5l2.5 3.6L20.8 6 23 10" className="text-brass" stroke="currentColor" />
      <path d="M8 14h14v4.5A5.5 5.5 0 0 1 16.5 24h-3A5.5 5.5 0 0 1 8 18.5Z" />
      <path d="M22 15h1.5a2.5 2.5 0 0 1 0 5H21.6" />
      <path d="M6.5 27.5h17" />
    </svg>
  );
}

export function IconStar(props: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M12 2.6l2.8 5.9 6.4.8-4.7 4.4 1.2 6.3L12 17l-5.7 3 1.2-6.3-4.7-4.4 6.4-.8Z" />
    </svg>
  );
}

/* Fileira de estrelas com preenchimento parcial (ex.: 4,6) */
export function StarRow({
  value,
  size = 17,
  baseClass = "text-espresso/20",
  fillClass = "text-brass",
  label,
}: {
  value: number;
  size?: number;
  baseClass?: string;
  fillClass?: string;
  label?: string;
}) {
  const pct = Math.max(0, Math.min(5, value)) * 20;
  return (
    <span
      className="relative inline-flex"
      role="img"
      aria-label={label ?? `Nota ${String(value).replace(".", ",")} de 5`}
    >
      <span className={`flex gap-[3px] ${baseClass}`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <IconStar key={i} style={{ width: size, height: size }} />
        ))}
      </span>
      <span
        className={`absolute inset-0 overflow-hidden ${fillClass}`}
        style={{ width: `${pct}%` }}
        aria-hidden="true"
      >
        <span className="flex gap-[3px]" style={{ width: `${size * 5 + 3 * 4}px` }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <IconStar key={i} style={{ width: size, height: size, flex: "none" }} />
          ))}
        </span>
      </span>
    </span>
  );
}

export function IconInstagram(props: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="16.9" cy="7.1" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconPin(props: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...props}>
      <path d="M12 21.2s-6.5-5.4-6.5-10.1a6.5 6.5 0 0 1 13 0c0 4.7-6.5 10.1-6.5 10.1Z" />
      <circle cx="12" cy="10.8" r="2.3" />
    </svg>
  );
}

export function IconClock(props: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3.2 2" />
    </svg>
  );
}

export function IconCardNfc(props: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...props}>
      <rect x="2.5" y="6" width="14" height="12" rx="2" />
      <path d="M2.5 10h14" />
      <path d="M5.5 14.5h4" />
      <path d="M19 9.5a5 5 0 0 1 0 5" />
      <path d="M21.5 7.5a8.4 8.4 0 0 1 0 9" />
    </svg>
  );
}

export function IconCup(props: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...props}>
      <path d="M4 10h12v4.5A4.5 4.5 0 0 1 11.5 19h-3A4.5 4.5 0 0 1 4 14.5Z" />
      <path d="M16 11h1.6a2.7 2.7 0 0 1 0 5.4h-2" />
      <path d="M3 21.5h14" />
      <path d="M7.5 7c0-1.1.9-1.3.9-2.4M11.5 7c0-1.1.9-1.3.9-2.4" />
    </svg>
  );
}

export function IconPastry(props: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...props}>
      <path d="M5 15a7 7 0 0 1 14 0" />
      <path d="M3.5 15h17" />
      <path d="M5.5 18.5h13" />
      <path d="M9.5 4.5c0-1 .9-1.1.9-2M13.6 4.5c0-1 .9-1.1.9-2" />
    </svg>
  );
}

export function IconSofa(props: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...props}>
      <path d="M6 11V8.5A2.5 2.5 0 0 1 8.5 6h7A2.5 2.5 0 0 1 18 8.5V11" />
      <path d="M3 14a2 2 0 0 1 4 0v1h10v-1a2 2 0 0 1 4 0v3.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5Z" />
      <path d="M6 19v1.8M18 19v1.8" />
    </svg>
  );
}

export function IconCloche(props: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...props}>
      <path d="M4 17a8 8 0 0 1 16 0" />
      <path d="M2.5 17h19" />
      <path d="M12 9V7.8" />
      <circle cx="12" cy="6.4" r="1.1" />
      <path d="M6.5 20.5h11" />
    </svg>
  );
}

export function IconBag(props: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...props}>
      <path d="M6 8h12l-1 12.4a1.6 1.6 0 0 1-1.6 1.5H8.6A1.6 1.6 0 0 1 7 20.4Z" />
      <path d="M9 10.5V6.5a3 3 0 0 1 6 0v4" />
    </svg>
  );
}

export function IconSpeed(props: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...props}>
      <rect x="9" y="4.5" width="12" height="11" rx="1.5" />
      <path d="M9 8.5h12" />
      <path d="M2.5 8h3.5M2.5 12h3.5" />
      <circle cx="12.5" cy="19" r="1.8" />
      <circle cx="18.5" cy="19" r="1.8" />
      <path d="M14.3 19h2.4" />
    </svg>
  );
}

export function IconShield(props: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...props}>
      <path d="M12 3l7 2.5v5.3c0 4.6-3 8-7 9.7-4-1.7-7-5.1-7-9.7V5.5Z" />
      <path d="M9 11.6l2.1 2.1 4-4.6" />
    </svg>
  );
}

export function IconRoute(props: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...props}>
      <path d="M12 3.2 19 20l-7-3.8L5 20Z" />
    </svg>
  );
}

export function IconArrowRight(props: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...props}>
      <path d="M4 12h15" />
      <path d="M13.5 6l6 6-6 6" />
    </svg>
  );
}

export function IconArrowUpRight(props: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...props}>
      <path d="M6.5 17.5 17.5 6.5" />
      <path d="M9 6.5h8.5V15" />
    </svg>
  );
}

/* Mascote do agente de IA — xícara com carinha e vapor */
export function IconCafezinho(props: P) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...stroke} strokeWidth={1.9} {...props}>
      <path className="steam-line" d="M12.5 6.8c0-1.2 1-1.4 1-2.6" />
      <path className="steam-line" d="M17 6.8c0-1.2 1-1.4 1-2.6" />
      <path d="M8 11h15v5.5a6.5 6.5 0 0 1-6.5 6.5h-2A6.5 6.5 0 0 1 8 16.5Z" />
      <path d="M23 12.5h1.5a2.8 2.8 0 0 1 0 5.6h-2.2" />
      <circle cx="13" cy="15.4" r="0.95" fill="currentColor" stroke="none" />
      <circle cx="18" cy="15.4" r="0.95" fill="currentColor" stroke="none" />
      <path d="M13.6 18.1c.7 1 3.1 1 3.8 0" />
      <path d="M6.5 26.5h18" />
    </svg>
  );
}

export function IconSend(props: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...props}>
      <path d="M20.5 3.5 3.5 10.6l6.7 2.7 2.7 7.2Z" />
      <path d="M20.5 3.5 10.2 13.3" />
    </svg>
  );
}

export function IconArrowDown(props: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...props}>
      <path d="M12 4.5v14" />
      <path d="M6.5 13l5.5 5.5L17.5 13" />
    </svg>
  );
}

/* Diamante separador dos letreiros */
export function IconDiamond(props: P) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M6 0l1.8 4.2L12 6 7.8 7.8 6 12 4.2 7.8 0 6l4.2-1.8Z" />
    </svg>
  );
}

/* "G" oficial simplificado do Google */
export function IconGoogle(props: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.9-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.9z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.2v3.1A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.2a12 12 0 0 0 0 10.8l4.1-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.7c1.8 0 3.4.6 4.6 1.8L20.1 3A12 12 0 0 0 1.2 6.6l4.1 3.1c.9-2.9 3.6-5 6.7-5z"
      />
    </svg>
  );
}
