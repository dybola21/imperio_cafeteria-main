import { IMAGES, INSTAGRAM_URL, RATING, REVIEW_COUNT, useOpenStatus } from "../lib/site";
import { IconArrowDown, IconCup, IconInstagram, StarRow } from "./Icons";

/** Selo circular giratório — a assinatura "aberto todos os dias". */
function RotatingSeal() {
  return (
    <div className="pointer-events-none absolute bottom-10 right-10 z-10 hidden h-36 w-36 lg:block" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="spin-slow h-full w-full">
        <defs>
          <path id="seal-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" fill="none" />
        </defs>
        <text className="fill-parchment/85" style={{ fontSize: "8px", letterSpacing: "1.9px", fontFamily: "Work Sans, sans-serif", fontWeight: 600 }}>
          <textPath href="#seal-circle">ABERTO TODOS OS DIAS • 07:00 ÀS 23:00 •&#160;</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">
        <IconCup className="h-8 w-8 text-brass" />
      </span>
    </div>
  );
}

export function Hero() {
  const { label } = useOpenStatus();

  return (
    <section id="topo" className="relative flex min-h-[100svh] items-center overflow-hidden bg-roast">
      {/* Foto full-bleed com foco à direita */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={IMAGES.hero.src}
          alt=""
          className="kenburns h-full w-full object-cover object-[70%_center]"
        />
        {/* Degradê escuro → transparente, da esquerda para a direita */}
        <div className="absolute inset-0 bg-gradient-to-r from-roast via-roast/85 via-55% to-roast/10" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-roast/90 to-transparent" />
      </div>

      <RotatingSeal />

      {/* Conteúdo à esquerda */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-32 pt-32 sm:px-8 md:pb-36">
        <div className="max-w-2xl">
          <p className="reveal is-in flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-bold uppercase tracking-[0.24em] text-brass sm:text-xs">
            <span className="live-dot inline-block h-2 w-2 rounded-full bg-brass" aria-hidden="true" />
            Aberto todos os dias · 07:00–23:00
            <span className="hidden text-parchment/60 normal-case tracking-normal font-medium sm:inline">
              — {label.toLowerCase()}
            </span>
          </p>

          <h1 className="font-display mt-6 text-[clamp(2.7rem,7vw,5.4rem)] font-medium leading-[1.01] tracking-[-0.02em] text-cream">
            Café, salgado e
            <br />
            um lugar{" "}
            <em className="font-light italic text-brass-soft">para ficar.</em>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-parchment/80 sm:text-lg">
            Cafeteria e salgaderia em Belford Roxo. A porta abre às sete da manhã, o
            espresso sai na hora e o balcão só fecha às onze da noite — de segunda a
            segunda, sem exceção.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 rounded-full bg-brass px-7 py-3.5 text-[15px] font-bold text-espresso shadow-[0_16px_38px_-10px_rgba(201,138,61,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brass-soft active:translate-y-0"
            >
              <IconInstagram className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-6" />
              Pedir pelo Instagram
            </a>
            <a
              href="#destaques"
              className="group flex items-center gap-2 rounded-full border border-parchment/30 px-6 py-3.5 text-[15px] font-semibold text-parchment transition-all duration-300 hover:border-brass hover:text-brass"
            >
              Conhecer a casa
              <IconArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
            </a>
          </div>

          {/* Nota do Google */}
          <p className="mt-9 flex flex-wrap items-center gap-3 text-sm text-parchment/75">
            <StarRow value={RATING} size={17} baseClass="text-parchment/25" label="Nota 4,6 de 5" />
            <span>
              <strong className="font-display text-lg font-semibold text-cream">4,6</strong>
              {" · "}
              {REVIEW_COUNT} avaliações no Google
            </span>
          </p>
        </div>
      </div>

      {/* Indicador de rolagem */}
      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex" aria-hidden="true">
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-parchment/50">role</span>
        <span className="scrollcue-line block h-10 w-px bg-parchment/20">
          <span className="scrollcue-inner block h-full w-px bg-brass" />
        </span>
      </div>
    </section>
  );
}
