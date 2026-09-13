import { HIGHLIGHTS, type Highlight } from "../lib/site";
import { LineReveal, Reveal } from "./Reveal";
import { IconCup, IconDiamond, IconPastry, IconSofa } from "./Icons";

const ICONS = {
  cup: IconCup,
  pastry: IconPastry,
  sofa: IconSofa,
} as const;

function HighlightRow({ item, index }: { item: Highlight; index: number }) {
  const Icon = ICONS[item.icon];
  const imageLeft = item.imageSide === "left";

  return (
    <article
      className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-14 ${
        index > 0 ? "mt-20 lg:mt-28" : ""
      }`}
    >
      {/* Foto */}
      <Reveal
        from={imageLeft ? "left" : "right"}
        className={`lg:col-span-7 ${imageLeft ? "" : "lg:order-2"}`}
      >
        <figure className="group relative overflow-hidden rounded-lg shadow-deep ring-1 ring-espresso/10">
          <div className="aspect-[4/5] max-h-[620px] w-full overflow-hidden bg-mocha sm:aspect-[5/5] lg:aspect-[6/5.4]">
            <img
              src={item.img.src}
              alt={item.img.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.045]"
            />
          </div>
          <figcaption className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-cream/95 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-espresso shadow-card">
            <IconDiamond className="h-1.5 w-1.5 text-brass" />
            {item.cornerTag}
          </figcaption>
        </figure>
      </Reveal>

      {/* Texto */}
      <Reveal
        from={imageLeft ? "right" : "left"}
        delay={120}
        className={`lg:col-span-5 ${imageLeft ? "" : "lg:order-1"}`}
      >
        <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-brass">
          <span className="h-px w-8 bg-brass" aria-hidden="true" />
          {item.label}
        </p>
        <h3 className="font-display mt-5 text-3xl font-medium leading-[1.08] tracking-[-0.015em] text-espresso sm:text-4xl lg:text-[2.75rem]">
          {item.title}
        </h3>
        <p className="mt-6 text-[15px] leading-relaxed text-cocoa sm:text-base">{item.text}</p>

        <ul className="mt-7 flex flex-wrap gap-2" aria-label={`Itens de ${item.label}`}>
          {item.chips.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-espresso/15 bg-cream/70 px-3.5 py-1.5 text-[13px] font-semibold text-cocoa-deep transition-colors duration-300 hover:border-brass hover:text-brass"
            >
              {chip}
            </li>
          ))}
        </ul>
      </Reveal>
    </article>
  );
}

export function Highlights() {
  return (
    <section id="destaques" className="bg-parchment py-24 lg:py-32" aria-labelledby="destaques-titulo">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Cabeçalho da seção */}
        <div className="mb-16 flex flex-col gap-6 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-brass">
              <span className="h-px w-8 bg-brass" aria-hidden="true" />
              Destaques da casa
            </p>
            <h2
              id="destaques-titulo"
              className="font-display mt-5 text-4xl font-medium leading-[1.05] tracking-[-0.02em] text-espresso sm:text-5xl lg:text-[3.4rem]"
            >
              <LineReveal>O que sai do balcão</LineReveal>
              <LineReveal delay={120}>
                <em className="font-light italic text-brass">todos os dias.</em>
              </LineReveal>
            </h2>
          </div>
          <Reveal delay={200} className="lg:pb-2">
            <p className="max-w-[26ch] border-l-2 border-brass pl-5 text-[15px] leading-relaxed text-cocoa">
              Três motivos para entrar — e um monte de razões para ficar até fechar.
            </p>
          </Reveal>
        </div>

        {HIGHLIGHTS.map((item, i) => (
          <HighlightRow key={item.label} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
