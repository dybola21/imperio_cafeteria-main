import { IMAGES, SERVICES, useOpenStatus } from "../lib/site";
import { LineReveal, Reveal } from "./Reveal";
import { IconBag, IconClock, IconCloche, IconDiamond, IconShield, IconSpeed } from "./Icons";

const SERVICE_ICONS = {
  cloche: IconCloche,
  bag: IconBag,
  speed: IconSpeed,
  shield: IconShield,
} as const;

export function About() {
  const { label } = useOpenStatus();

  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="bg-cream">
      <div className="grid lg:grid-cols-2">
        {/* Foto sangrando até a borda esquerda, ocupando toda a altura */}
        <div className="relative min-h-[420px] sm:min-h-[520px] lg:min-h-[720px]">
          <Reveal from="left" className="absolute inset-0 h-full w-full">
            <img
              src={IMAGES.sobre.src}
              alt={IMAGES.sobre.alt}
              loading="lazy"
              className="h-full w-full bg-mocha object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-roast/70 to-transparent" aria-hidden="true" />
            <p className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full bg-roast/85 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-parchment">
              <IconDiamond className="h-1.5 w-1.5 text-brass" />
              Parque Veneza · Belford Roxo
            </p>
          </Reveal>
        </div>

        {/* Texto */}
        <div className="flex items-center px-5 py-20 sm:px-8 lg:py-28 lg:pl-16 lg:pr-8 xl:pl-24 xl:pr-16">
          <div className="max-w-xl">
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-brass">
              <span className="h-px w-8 bg-brass" aria-hidden="true" />
              Sobre
            </p>

            <h2
              id="sobre-titulo"
              className="font-display mt-5 text-4xl font-medium leading-[1.05] tracking-[-0.02em] text-espresso sm:text-5xl lg:text-[3.4rem]"
            >
              <LineReveal>Uma casa com nome</LineReveal>
              <LineReveal delay={120}>de império e coração</LineReveal>
              <LineReveal delay={240}>
                <em className="font-light italic text-brass">de bairro.</em>
              </LineReveal>
            </h2>

            <Reveal delay={150}>
              <p className="mt-8 text-[15px] leading-relaxed text-cocoa sm:text-base">
                A Império nasceu para ser aquele lugar que não fecha a porta na sua cara:
                abre às sete da manhã com pão de queijo quentinho e só apaga as luzes às
                onze da noite — <strong className="font-semibold text-espresso">todos os dias da semana</strong>,
                sem feriado, sem segunda-feira de folga.
              </p>
              <p className="mt-5 text-[15px] leading-relaxed text-cocoa sm:text-base">
                No balcão, o espresso sai na hora e o salgado chega crocante. Nas mesas,
                tem família comemorando, amigo colocando o papo em dia e gente trabalhando
                de notebook com o cappuccino do lado. É cafeteria, é salgaderia e é um
                pouco a sala de estar de Belford Roxo.
              </p>
            </Reveal>

            {/* Faixa do horário — a tese, de novo */}
            <Reveal delay={200}>
              <div className="mt-10 flex flex-wrap items-center justify-between gap-3 rounded-md bg-espresso px-5 py-4 text-parchment shadow-card">
                <p className="flex items-center gap-3 text-sm font-semibold sm:text-[15px]">
                  <IconClock className="h-5 w-5 text-brass" />
                  Segunda a domingo · 07:00 às 23:00
                </p>
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-parchment/70">
                  <span className="live-dot h-2 w-2 rounded-full bg-brass" aria-hidden="true" />
                  {label}
                </p>
              </div>
            </Reveal>

            {/* Como pedir */}
            <div className="mt-10">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.24em] text-cocoa">
                Como pedir
              </h3>
              <ul className="mt-3 divide-y divide-espresso/10">
                {SERVICES.map((service, i) => {
                  const Icon = SERVICE_ICONS[service.icon];
                  return (
                    <li key={service.title}>
                      <Reveal delay={i * 90}>
                        <div className="group flex items-start gap-5 py-5">
                          <Icon className="mt-0.5 h-7 w-7 flex-none text-brass transition-transform duration-300 group-hover:-translate-y-0.5" />
                          <div>
                            <p className="font-display text-lg font-semibold text-espresso">
                              {service.title}
                            </p>
                            <p className="mt-1 text-[14px] leading-relaxed text-cocoa">{service.desc}</p>
                          </div>
                        </div>
                      </Reveal>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
