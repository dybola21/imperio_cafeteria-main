import { IconDiamond } from "./Icons";

function TickerGroup({ items, hidden = false }: { items: string[]; hidden?: boolean }) {
  return (
    <div className="flex flex-none items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span key={i} className="flex flex-none items-center">
          <span className="whitespace-nowrap px-6 text-[13px] font-bold uppercase tracking-[0.16em] sm:px-8 sm:text-sm">
            {item}
          </span>
          <IconDiamond className="h-2 w-2 flex-none opacity-60" />
        </span>
      ))}
    </div>
  );
}

/**
 * Letreiro contínuo — repete a tese da marca entre seções.
 * Pausa no hover e respeita prefers-reduced-motion (via CSS).
 */
export function Ticker({
  items,
  tone = "brass",
  reverse = false,
  duration = 40,
}: {
  items: string[];
  tone?: "brass" | "dark";
  reverse?: boolean;
  duration?: number;
}) {
  const toneClass =
    tone === "brass"
      ? "border-y border-roast/20 bg-brass text-espresso"
      : "border-y border-cream/10 bg-roast text-parchment";

  return (
    <div className={`ticker ${toneClass}`} style={{ ["--ticker-duration" as string]: `${duration}s` }} aria-hidden="true">
      <div className={`ticker-track py-3 ${reverse ? "is-reverse" : ""}`}>
        <TickerGroup items={items} />
        <TickerGroup items={items} hidden />
      </div>
    </div>
  );
}
