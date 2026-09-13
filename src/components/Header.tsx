import { useEffect, useState } from "react";
import { INSTAGRAM_URL, NAV_LINKS, useOpenStatus } from "../lib/site";
import { IconInstagram, LogoMark } from "./Icons";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { open, label } = useOpenStatus();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? "bg-roast/95 shadow-[0_10px_30px_-12px_rgba(32,18,9,0.6)] border-b border-brass/20"
          : "bg-gradient-to-b from-roast/80 to-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8 md:h-[76px]">
        {/* Logo */}
        <a href="#topo" className="group flex items-center gap-3" aria-label="Império Cafeteria — voltar ao topo">
          <LogoMark className="h-9 w-9 text-parchment transition-transform duration-500 group-hover:-rotate-6" />
          <span className="leading-none">
            <span className="font-display block text-[1.35rem] font-semibold tracking-tight text-cream">
              Império
            </span>
            <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.28em] text-parchment/55">
              Cafeteria · Salgaderia
            </span>
          </span>
        </a>

        {/* Navegação desktop */}
        <nav aria-label="Navegação principal" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-[12px] font-semibold uppercase tracking-[0.18em] text-parchment/75 transition-colors hover:text-cream"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Status ao vivo */}
          <p
            className="hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-parchment/70 xl:flex"
            aria-live="off"
          >
            <span className={`live-dot h-2 w-2 rounded-full ${open ? "bg-brass" : "bg-parchment/40"}`} />
            {open ? "Aberto agora" : "Abrimos às 07:00"}
          </p>

          {/* Instagram — única cor forte */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-brass px-4 py-2 text-sm font-bold text-espresso transition-all duration-300 hover:-translate-y-0.5 hover:bg-brass-soft active:translate-y-0 sm:flex"
          >
            <IconInstagram className="h-4 w-4" />
            Instagram
          </a>

          {/* Botão do menu mobile */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-parchment/25 text-parchment transition-colors hover:border-brass hover:text-brass lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7.5h16M4 12h16M9 16.5h11" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Painel mobile */}
      <div
        id="menu-mobile"
        className={`overflow-hidden border-t border-parchment/10 bg-roast transition-[max-height,opacity] duration-500 lg:hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav aria-label="Navegação móvel" className="flex flex-col px-5 py-4 sm:px-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-parchment/10 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-parchment/85 transition-colors hover:text-brass"
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center justify-between gap-4 py-4">
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-parchment/60">
              <span className={`live-dot h-2 w-2 rounded-full ${open ? "bg-brass" : "bg-parchment/40"}`} />
              {label}
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 rounded-full bg-brass px-4 py-2 text-sm font-bold text-espresso"
            >
              <IconInstagram className="h-4 w-4" />
              Instagram
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
