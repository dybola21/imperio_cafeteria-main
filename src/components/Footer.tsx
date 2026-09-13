import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  ADDRESS_ZIP,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  NAV_LINKS,
  RATING,
  useOpenStatus,
} from "../lib/site";
import { IconArrowUpRight, IconInstagram, LogoMark, StarRow } from "./Icons";

export function Footer() {
  const { label } = useOpenStatus();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-roast text-parchment">
      {/* Chamada final */}
      <div className="border-b border-parchment/10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:py-20">
          <p className="font-display max-w-xl text-3xl font-medium leading-[1.12] tracking-[-0.015em] text-cream sm:text-4xl lg:text-[2.9rem]">
            A porta está aberta.
            <br />
            <em className="font-light italic text-brass-soft">Todo dia, das 07 às 23.</em>
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-none items-center gap-3 rounded-full bg-brass px-8 py-4 text-base font-bold text-espresso transition-all duration-300 hover:-translate-y-0.5 hover:bg-brass-soft active:translate-y-0"
          >
            <IconInstagram className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-6" />
            Pedir pelo Instagram
          </a>
        </div>
      </div>

      {/* Colunas */}
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        {/* Marca */}
        <div>
          <a href="#topo" className="flex items-center gap-3">
            <LogoMark className="h-10 w-10 text-parchment" />
            <span className="leading-none">
              <span className="font-display block text-2xl font-semibold tracking-tight text-cream">Império</span>
              <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.28em] text-parchment/50">
                Cafeteria · Salgaderia
              </span>
            </span>
          </a>
          <p className="mt-5 max-w-[30ch] text-sm leading-relaxed text-parchment/60">
            Cafeteria e salgaderia em Belford Roxo — aberta todos os dias para o café da
            manhã, o lanche da tarde e a noite que se estende.
          </p>
          <p className="mt-5 flex items-center gap-2.5 text-sm text-parchment/70">
            <StarRow value={RATING} size={14} baseClass="text-parchment/20" label="Nota 4,6 de 5" />
            4,6 no Google
          </p>
        </div>

        {/* Navegação */}
        <nav aria-label="Navegação do rodapé">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.24em] text-brass">Navegação</h3>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group inline-flex items-center gap-2 text-[15px] text-parchment/75 transition-colors hover:text-brass"
                >
                  <span className="h-px w-0 bg-brass transition-all duration-300 group-hover:w-4" aria-hidden="true" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Horários */}
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.24em] text-brass">Horários</h3>
          <ul className="mt-5 space-y-3 text-[15px] text-parchment/75">
            <li className="flex justify-between gap-4">
              <span>Segunda a sexta</span>
              <span className="font-semibold text-parchment">07:00–23:00</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Sábado</span>
              <span className="font-semibold text-parchment">07:00–23:00</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Domingo</span>
              <span className="font-semibold text-parchment">07:00–23:00</span>
            </li>
          </ul>
          <p className="mt-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-parchment/55">
            <span className="live-dot h-2 w-2 rounded-full bg-brass" aria-hidden="true" />
            {label}
          </p>
        </div>

        {/* Localização + Instagram */}
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.24em] text-brass">Onde estamos</h3>
          <address className="mt-5 text-[15px] not-italic leading-relaxed text-parchment/75">
            {ADDRESS_LINE_1}
            <br />
            {ADDRESS_LINE_2}
            <br />
            {ADDRESS_ZIP}
          </address>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-brass transition-colors hover:text-brass-soft"
          >
            <IconInstagram className="h-4 w-4" />
            {INSTAGRAM_HANDLE}
            <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Barra final */}
      <div className="border-t border-parchment/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-6 text-[13px] text-parchment/45 sm:flex-row sm:px-8">
          <p>
            © {year} Império Cafeteria · Belford Roxo — RJ. Todos os direitos reservados.
          </p>
          <p className="flex items-center gap-2">
            Aberto todos os dias, das 07:00 às 23:00
            <a
              href="#topo"
              className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-parchment/20 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-parchment/70 transition-colors hover:border-brass hover:text-brass"
            >
              Voltar ao topo
              <IconArrowUpRight className="h-3 w-3 -rotate-45" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
