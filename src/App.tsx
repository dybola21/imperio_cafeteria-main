import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Ticker } from "./components/Ticker";
import { Highlights } from "./components/Highlights";
import { About } from "./components/About";
import { Testimonials } from "./components/Testimonials";
import { Location } from "./components/Location";
import { Footer } from "./components/Footer";
import { Cafezinho } from "./components/Cafezinho";
import { TICKER_HERO, TICKER_SERVICES } from "./lib/site";

export default function App() {
  return (
    <div className="relative">
      {/* Link de acessibilidade */}
      <a
        href="#destaques"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brass focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-espresso"
      >
        Pular para o conteúdo
      </a>

      {/* Textura de papel sobre toda a página */}
      <div className="paper-noise pointer-events-none fixed inset-0 z-[80] opacity-[0.05]" aria-hidden="true" />

      <Header />

      <main>
        <Hero />
        <Ticker items={TICKER_HERO} tone="brass" duration={38} />
        <Highlights />
        <About />
        <Ticker items={TICKER_SERVICES} tone="dark" reverse duration={44} />
        <Testimonials />
        <Location />
      </main>

      <Footer />

      {/* Cafezinho — Agente de IA da Império Café */}
      <Cafezinho />
    </div>
  );
}
