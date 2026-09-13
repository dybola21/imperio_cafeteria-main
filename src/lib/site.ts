import { useEffect, useState } from "react";

export const INSTAGRAM_URL = "https://instagram.com/imperio_salgaderiaecafeteria";
export const INSTAGRAM_HANDLE = "@imperio_salgaderiaecafeteria";

export const ADDRESS_LINE_1 = "Av. Joaquim da Costa Lima, 10101 — Loja 3";
export const ADDRESS_LINE_2 = "Parque Veneza, Belford Roxo — RJ";
export const ADDRESS_ZIP = "CEP 26172-255";

export const RATING = 4.6;
export const REVIEW_COUNT = 81;

export const OPEN_HOUR = 7; // 07:00
export const CLOSE_HOUR = 23; // 23:00

/* Webhook do Cafezinho — Agente de IA da Império Café */
export const CAFEZINHO_WEBHOOK_URL =
  "https://man.noticiasnatela.blog/webhook/8aecbedc-aaa4-49f9-b206-6b335ce6fae1";

export const MAP_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  "Av. Joaquim da Costa Lima, 10101 - Loja 3 - Parque Veneza, Belford Roxo - RJ, 26172-255",
)}`;

export const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  "Av. Joaquim da Costa Lima, 10101 - Loja 3 - Parque Veneza, Belford Roxo - RJ, 26172-255",
)}&output=embed&hl=pt-BR`;

export const IMAGES = {
  hero: {
    src: "https://image.qwenlm.ai/generated-images/9235067e-3936-40c3-bb33-a86bfa87e1d0/_result.png",
    alt: "Xícaras de café servidas no balcão de madeira da Império Cafeteria",
  },
  cafes: {
    src: "https://image.qwenlm.ai/generated-images/6d3b7d94-436d-4ee0-95f4-74549339b362/_result.png",
    alt: "Espresso, cappuccino, chá gelado e coquetel servidos no balcão",
  },
  salgados: {
    src: "https://image.qwenlm.ai/generated-images/612f36f8-59d4-43d7-8e7b-ef4eaaa61bd7/_result.png",
    alt: "Coxinhas, empadas, pão de queijo e fatia de torta sobre tábua de madeira",
  },
  espaco: {
    src: "https://image.qwenlm.ai/generated-images/78ed6f8a-f7bc-42cd-8b95-5bff09a9c87c/_result.png",
    alt: "Cliente trabalhando no notebook em uma mesa, com família ao fundo",
  },
  sobre: {
    src: "https://image.qwenlm.ai/generated-images/16fc9f2c-d94e-4c4f-9af5-d40c63072d4d/_result.png",
    alt: "Salão da Império Cafeteria ao entardecer, com mesas ocupadas e luz quente",
  },
};

export const NAV_LINKS = [
  { label: "Destaques", href: "#destaques" },
  { label: "Sobre", href: "#sobre" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Onde estamos", href: "#onde-estamos" },
];

export const TICKER_HERO = [
  "Aberto todos os dias",
  "07:00 — 23:00",
  "Espresso na hora",
  "Salgados fresquinhos",
  "Belford Roxo · RJ",
];

export const TICKER_SERVICES = [
  "Consumo no local",
  "Retirada no balcão",
  "Delivery",
  "Entrega sem contato",
  "Segunda a domingo · 07:00–23:00",
];

export type Testimonial = {
  name: string;
  text: string;
  initials: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Luana Silva",
    initials: "LS",
    text: "Cafeteria acolhedora, o ambiente é muito agradável, ótimo para ir com a família ou para tomar um café com calma. Os salgados são deliciosos e o atendimento é impecável.",
  },
  {
    name: "Carlos Eduardo",
    initials: "CE",
    text: "Excelente opção na região! Os cafés especiais e as opções de sobremesa são nota 10. O espaço é muito limpo e bem decorado. Recomendo muito o cappuccino e a fatia de torta.",
  },
  {
    name: "Mariana Costa",
    initials: "MC",
    text: "Comida maravilhosa e de muita qualidade. Atendimento super atencioso e rápido. Um excelente lugar para tomar um café da manhã ou fazer um lanche no fim da tarde.",
  },
  {
    name: "Felipe Andrade",
    initials: "FA",
    text: "Local top! Ótimo para trabalhar um pouco no notebook enquanto toma um bom café. Bastante variedade no cardápio de salgados e doces.",
  },
  {
    name: "Beatriz Ramos",
    initials: "BR",
    text: "Lugar perfeito para reunir os amigos. Os preços são honestos pela qualidade entregue, e o ambiente é climatizado e super confortável.",
  },
];

export type Highlight = {
  id: string;
  label: string;
  title: string;
  text: string;
  img: { src: string; alt: string };
  chips: string[];
  cornerTag: string;
  icon: "cup" | "pastry" | "sofa";
  imageSide: "left" | "right";
};

export const HIGHLIGHTS: Highlight[] = [
  {
    id: "cafes",
    label: "Cafés & bebidas",
    title: "Do espresso ao brinde da noite",
    text: "Cafés de alta qualidade tirados na hora, chás, coquetéis e bebidas alcoólicas para quando o fim de tarde pede um gole a mais.",
    img: IMAGES.cafes,
    chips: ["Espresso", "Cappuccino", "Coado na hora", "Chás", "Coquetéis", "Bebidas geladas"],
    cornerTag: "Bar & balcão",
    icon: "cup",
    imageSide: "left",
  },
  {
    id: "salgados",
    label: "Salgados & doces",
    title: "Salgaderia de mão cheia",
    text: "Salgados crocantes saindo ao longo do dia, sobremesas, café da manhã reforçado, lanches e porções para dividir — ou não.",
    img: IMAGES.salgados,
    chips: ["Salgados", "Sobremesas", "Café da manhã", "Lanches", "Porções"],
    cornerTag: "Fornada do dia",
    icon: "pastry",
    imageSide: "right",
  },
  {
    id: "espaco",
    label: "Espaço para você ficar",
    title: "Chegou? Pode ficar",
    text: "Ambiente climatizado, bom para grupos e para a família — com cadeiras altas e menu infantil para os pequenos. Wi‑Fi e tomadas para quem vem de notebook; casa acessível para todos.",
    img: IMAGES.espaco,
    chips: ["Climatizado", "Grupos", "Família", "Menu infantil", "Trabalho remoto", "Acessível"],
    cornerTag: "Climatizado · Wi‑Fi",
    icon: "sofa",
    imageSide: "left",
  },
];

export const SERVICES = [
  {
    icon: "cloche" as const,
    title: "Consumo no local",
    desc: "Mesas confortáveis, ambiente climatizado e o pedido chegando quentinho na mesa.",
  },
  {
    icon: "bag" as const,
    title: "Retirada no balcão",
    desc: "Peça pelo Instagram e passe aqui: é chegar, pegar e seguir o dia.",
  },
  {
    icon: "speed" as const,
    title: "Delivery",
    desc: "O café e o salgado vão até você, em Belford Roxo e região.",
  },
  {
    icon: "shield" as const,
    title: "Entrega sem contato",
    desc: "Prefere assim? A gente deixa na porta, com todo o cuidado.",
  },
];

/** Aberto todos os dias, das 07:00 às 23:00 — sem exceção. */
export function useOpenStatus(): { open: boolean; label: string } {
  const [status, setStatus] = useState<{ open: boolean; label: string }>(() => compute());

  function compute() {
    const now = new Date();
    const minutes = now.getHours() * 60 + now.getMinutes();
    const open = minutes >= OPEN_HOUR * 60 && minutes < CLOSE_HOUR * 60;
    return {
      open,
      label: open ? "Aberto agora · fecha às 23:00" : "Fechado no momento · abre às 07:00",
    };
  }

  useEffect(() => {
    const id = window.setInterval(() => setStatus(compute()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return status;
}
