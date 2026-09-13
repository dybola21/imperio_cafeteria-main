import { RATING, REVIEW_COUNT, TESTIMONIALS, type Testimonial } from "../lib/site";
import { LineReveal, Reveal } from "./Reveal";
import { IconGoogle, StarRow } from "./Icons";

function TestimonialCard({ t, hidden = false }: { t: Testimonial; hidden?: boolean }) {
  return (
    <article
      aria-hidden={hidden || undefined}
      className="flex w-[300px] flex-none flex-col rounded-lg bg-cream p-7 shadow-card ring-1 ring-roast/10 transition-transform duration-500 hover:-translate-y-1.5 sm:w-[380px]"
    >
      <StarRow value={5} size={16} baseClass="text-espresso/15" fillClass="text-brass" label="5 de 5 estrelas" />
      <blockquote className="mt-5 flex-1">
        <p className="text-[15px] leading-relaxed text-cocoa-deep">“{t.text}”</p>
      </blockquote>
      <footer className="mt-6 flex items-center gap-3.5 border-t border-espresso/10 pt-5">
        <span
          className="font-display flex h-11 w-11 flex-none items-center justify-center rounded-full bg-espresso text-sm font-semibold text-brass-soft"
          aria-hidden="true"
        >
          {t.initials}
        </span>
        <div className="min-w-0">
          <p className="font-display truncate text-[15px] font-semibold text-espresso">{t.name}</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-cocoa">
            <IconGoogle className="h-3.5 w-3.5 flex-none" />
            Avaliação no Google
          </p>
        </div>
      </footer>
    </article>
  );
}

function CardGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex flex-none items-stretch gap-6 pr-6" aria-hidden={hidden || undefined}>
      {TESTIMONIALS.map((t) => (
        <TestimonialCard key={t.name} t={t} hidden={hidden} />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section
      id="depoimentos"
      aria-labelledby="depoimentos-titulo"
      className="relative overflow-hidden bg-espresso py-24 lg:py-32"
    >
      {/* brilho quente sutil ao fundo */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[80rem] -translate-x-1/2 rounded-full bg-brass/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-brass">
              <span className="h-px w-8 bg-brass" aria-hidden="true" />
              Depoimentos
            </p>
            <h2
              id="depoimentos-titulo"
              className="font-display mt-5 text-4xl font-medium leading-[1.05] tracking-[-0.02em] text-cream sm:text-5xl lg:text-[3.4rem]"
            >
              <LineReveal>Quem senta,</LineReveal>
              <LineReveal delay={120}>
                <em className="font-light italic text-brass-soft">volta.</em>
              </LineReveal>
            </h2>
          </div>

          <Reveal delay={200} className="lg:pb-1">
            <div className="flex items-center gap-5">
              <p className="font-display text-6xl font-medium leading-none text-cream lg:text-7xl">
                4,6
              </p>
              <div>
                <StarRow value={RATING} size={19} baseClass="text-parchment/20" label="Nota 4,6 de 5" />
                <p className="mt-2 flex items-center gap-1.5 text-sm text-parchment/70">
                  <IconGoogle className="h-4 w-4" />
                  {REVIEW_COUNT} avaliações no Google
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Marquee lento de depoimentos */}
      <Reveal delay={150}>
        <div className="ticker relative mt-16" style={{ ["--ticker-duration" as string]: "62s" }}>
          <div className="ticker-track items-stretch">
            <CardGroup />
            <CardGroup hidden />
          </div>
          {/* máscaras laterais */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-espresso to-transparent sm:w-32" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-espresso to-transparent sm:w-32" aria-hidden="true" />
        </div>
      </Reveal>

      <p className="mt-8 text-center text-[13px] text-parchment/45">
        Passe o mouse para pausar e ler com calma.
      </p>
    </section>
  );
}
