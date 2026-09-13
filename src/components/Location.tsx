import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  ADDRESS_ZIP,
  INSTAGRAM_URL,
  MAP_DIRECTIONS_URL,
  MAP_EMBED_URL,
  useOpenStatus,
} from "../lib/site";
import { LineReveal, Reveal } from "./Reveal";
import { IconArrowUpRight, IconCardNfc, IconClock, IconInstagram, IconPin, IconRoute } from "./Icons";

export function Location() {
  const { label } = useOpenStatus();

  return (
    <section id="onde-estamos" aria-labelledby="onde-titulo" className="bg-parchment py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-stretch gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        {/* Texto */}
        <div className="flex flex-col justify-center">
          <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-brass">
            <span className="h-px w-8 bg-brass" aria-hidden="true" />
            Venha nos visitar
          </p>
          <h2
            id="onde-titulo"
            className="font-display mt-5 text-4xl font-medium leading-[1.05] tracking-[-0.02em] text-espresso sm:text-5xl lg:text-[3.4rem]"
          >
            <LineReveal>Onde</LineReveal>
            <LineReveal delay={120}>
              <em className="font-light italic text-brass">estamos.</em>
            </LineReveal>
          </h2>

          <div className="mt-10 space-y-7">
            <Reveal>
              <div className="flex items-start gap-4">
                <span className="mt-0.5 flex h-11 w-11 flex-none items-center justify-center rounded-full border border-espresso/15 bg-cream text-brass">
                  <IconPin className="h-5 w-5" />
                </span>
                <address className="not-italic">
                  <p className="font-display text-lg font-semibold text-espresso">{ADDRESS_LINE_1}</p>
                  <p className="mt-1 text-[15px] text-cocoa">{ADDRESS_LINE_2}</p>
                  <p className="text-[15px] text-cocoa">{ADDRESS_ZIP}</p>
                </address>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="flex items-start gap-4">
                <span className="mt-0.5 flex h-11 w-11 flex-none items-center justify-center rounded-full border border-espresso/15 bg-cream text-brass">
                  <IconClock className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold text-espresso">
                    Segunda a domingo · 07:00 às 23:00
                  </p>
                  <p className="mt-1.5 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-cocoa">
                    <span className="live-dot h-2 w-2 rounded-full bg-brass" aria-hidden="true" />
                    {label}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="flex items-start gap-4">
                <span className="mt-0.5 flex h-11 w-11 flex-none items-center justify-center rounded-full border border-espresso/15 bg-cream text-brass">
                  <IconCardNfc className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold text-espresso">Pagamento sem complicação</p>
                  <p className="mt-1 text-[15px] text-cocoa">
                    Cartão de crédito, débito e aproximação (NFC).
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={240}>
            <div className="mt-11 flex flex-wrap items-center gap-4">
              <a
                href={MAP_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 rounded-full bg-brass px-7 py-3.5 text-[15px] font-bold text-espresso shadow-[0_16px_38px_-12px_rgba(201,138,61,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brass-soft active:translate-y-0"
              >
                <IconRoute className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                Traçar rota
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-[15px] font-semibold text-espresso underline decoration-brass decoration-2 underline-offset-8 transition-colors hover:text-brass"
              >
                <IconInstagram className="h-[18px] w-[18px]" />
                Chamar no Instagram
                <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Mapa */}
        <Reveal from="right" delay={120} className="flex">
          <div className="relative w-full overflow-hidden rounded-lg shadow-deep ring-1 ring-espresso/10">
            <iframe
              src={MAP_EMBED_URL}
              title="Mapa — Império Cafeteria, Av. Joaquim da Costa Lima 10101, Belford Roxo"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[420px] w-full border-0 lg:h-full lg:min-h-[540px]"
            />
            <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-roast/10" aria-hidden="true" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
