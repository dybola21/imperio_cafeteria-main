import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { CAFEZINHO_WEBHOOK_URL, INSTAGRAM_URL } from "../lib/site";
import { IconCafezinho, IconSend } from "./Icons";

type Msg = {
  id: number;
  role: "user" | "agent";
  text: string;
  time: string;
};

const SESSION_KEY = "imperio-cafezinho-session";
const SESSION_TTL = 24 * 60 * 60 * 1000; // 24 horas

function nowTime() {
  return new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

/** ID único de sessão, persistido no LocalStorage com expiração de 24 horas. */
function getSessionId(): string {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { id?: string; expiresAt?: number };
      if (parsed?.id && typeof parsed.expiresAt === "number" && parsed.expiresAt > Date.now()) {
        return parsed.id;
      }
    }
  } catch {
    /* armazenamento indisponível ou corrompido — gera um novo */
  }

  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `cz-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;

  try {
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ id, expiresAt: Date.now() + SESSION_TTL }),
    );
  } catch {
    /* segue a conversa mesmo sem persistir */
  }
  return id;
}

/** A resposta do agente chega no campo `output`. */
function extractOutput(data: unknown): string {
  if (typeof data === "string") return data;
  if (Array.isArray(data)) {
    for (const item of data) {
      if (item && typeof item === "object" && typeof (item as { output?: unknown }).output === "string") {
        return (item as { output: string }).output;
      }
    }
  }
  if (data && typeof data === "object") {
    const out = (data as { output?: unknown }).output;
    if (typeof out === "string") return out;
  }
  return "Recebi sua mensagem, mas a resposta não chegou inteirinha. Pode repetir?";
}

const BACKEND_ERROR_MARKERS = [
  "bad request",
  "is not supported",
  "request id:",
  "please check your parameters",
  "invalid api key",
  "unauthorized",
  "rate limit",
  "quota",
  "internal server error",
  "upstream error",
  "timed out",
  "502 bad gateway",
  "503 service",
];

const MAINTENANCE_MSG =
  "O Cafezinho está passando por uma manutenção rápida na cozinha. Tenta de novo em alguns instantes — ou chama a gente pelo Instagram para garantir o pedido.";

/** Detecta quando o webhook devolveu um erro técnico do backend (ex.: modelo/endpoint inválido). */
function looksLikeBackendError(text: string): boolean {
  const lower = text.toLowerCase();
  return BACKEND_ERROR_MARKERS.some((marker) => lower.includes(marker));
}

/**
 * Normaliza escapes Markdown gerados indevidamente no pipeline (n8n/agente),
 * como `\*\*16h11\*\*` → `**16h11**`. Desfaz SOMENTE os escapes de marcadores
 * de formatação (`\*`, `\_`, backtick) — nunca altera conteúdo legítimo.
 */
function normalizeEscapedMarkdown(text: string): string {
  return text.replace(/\\([*_`])/g, "$1");
}

/**
 * Componentes do renderer — mantêm a tipografia e as cores dos balões,
 * apenas dão semântica/estilo aos elementos Markdown.
 */
const markdownComponents: Components = {
  strong: ({ children }) => <strong className="font-semibold text-inherit">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="break-words font-semibold text-brass underline decoration-brass/50 underline-offset-2 transition-colors hover:text-brass-soft"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => <ul className="list-disc space-y-1 pl-5">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal space-y-1 pl-5">{children}</ol>,
  blockquote: ({ children }) => <blockquote className="border-l-2 border-brass pl-3">{children}</blockquote>,
  code: ({ children }) => (
    <code className="rounded bg-espresso/10 px-1 py-0.5 text-[0.92em]">{children}</code>
  ),
  h1: ({ children }) => <strong className="block font-semibold">{children}</strong>,
  h2: ({ children }) => <strong className="block font-semibold">{children}</strong>,
  h3: ({ children }) => <strong className="block font-semibold">{children}</strong>,
  h4: ({ children }) => <strong className="block font-semibold">{children}</strong>,
  h5: ({ children }) => <strong className="block font-semibold">{children}</strong>,
  h6: ({ children }) => <strong className="block font-semibold">{children}</strong>,
};

/** Renderiza Markdown apenas nas mensagens do AGENTE (com quebras de linha GFM). */
function AgentText({ text }: { text: string }) {
  return (
    <div className="agent-md [&>*+*]:mt-2">
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} components={markdownComponents}>
        {normalizeEscapedMarkdown(text)}
      </ReactMarkdown>
    </div>
  );
}

function Bubble({ m }: { m: Msg }) {
  const isUser = m.role === "user";
  return (
    <div className={`msg-in flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[85%] ${isUser ? "text-right" : "text-left"}`}>
        <div
          className={`inline-block rounded-lg px-4 py-3 text-left text-[14px] leading-relaxed shadow-card ${
            isUser
              ? "whitespace-pre-wrap rounded-br-sm bg-espresso text-parchment"
              : "rounded-bl-sm bg-cream text-cocoa-deep ring-1 ring-roast/10"
          }`}
        >
          {m.role === "agent" ? <AgentText text={m.text} /> : m.text}
        </div>
        <span className="mt-1 block px-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-cocoa/70">
          {isUser ? "Você" : "Cafezinho"} · {m.time}
        </span>
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="msg-in flex justify-start" aria-hidden="true">
      <p className="flex items-center gap-1.5 rounded-lg rounded-bl-sm bg-cream px-4 py-3.5 shadow-card ring-1 ring-roast/10">
        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-brass" />
        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-brass" />
        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-brass" />
      </p>
    </div>
  );
}

export function Cafezinho() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { id: 0, role: "agent", text: "Olá, como posso te ajudar?", time: nowTime() },
  ]);

  const sessionIdRef = useRef<string>("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextIdRef = useRef(1);
  const reducedRef = useRef(false);

  /* Sessão única por visitante (expira em 24h) */
  useEffect(() => {
    sessionIdRef.current = getSessionId();
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  /* Sempre que chega mensagem nova (ou o indicador de digitação), desce até ela */
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: reducedRef.current ? "auto" : "smooth" });
  }, [messages, pending, open]);

  /* Ao abrir: foco no campo + tecla Esc fecha */
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 260);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const send = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const text = input.trim();
      if (!text || pending) return;

      setMessages((m) => [...m, { id: nextIdRef.current++, role: "user", text, time: nowTime() }]);
      setInput("");
      setPending(true); // trava o campo até a resposta chegar

      let reply = "";
      try {
        const res = await fetch(CAFEZINHO_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([{ text, session_id: sessionIdRef.current }]),
        });

        if (res.ok) {
          reply = extractOutput(await res.json().catch(() => null));
        } else {
          // O webhook pode devolver o erro técnico no próprio corpo da resposta
          const errorBody = await res.text().catch(() => "");
          console.warn(`[Cafezinho] webhook respondeu HTTP ${res.status}:`, errorBody);
          reply = looksLikeBackendError(errorBody)
            ? MAINTENANCE_MSG
            : "Ops, perdi a conexão com a máquina de café… Pode mandar de novo?";
        }

        if (looksLikeBackendError(reply)) {
          console.warn("[Cafezinho] resposta do agente parece um erro de backend:", reply);
          reply = MAINTENANCE_MSG;
        }
      } catch {
        reply = "Ops, perdi a conexão com a máquina de café… Pode mandar de novo?";
      }

      setMessages((m) => [...m, { id: nextIdRef.current++, role: "agent", text: reply, time: nowTime() }]);
      setPending(false);
      window.setTimeout(() => inputRef.current?.focus(), 60);
    },
    [input, pending],
  );

  return (
    <>
      {/* Painel da conversa */}
      <div
        id="cafezinho-panel"
        role="dialog"
        aria-label="Cafezinho, agente de IA da Império Café"
        className={`fixed bottom-[6.5rem] right-4 z-[70] flex w-[calc(100vw-2rem)] max-w-[380px] origin-bottom-right flex-col overflow-hidden rounded-lg bg-parchment shadow-deep ring-1 ring-roast/15 transition-all duration-300 ease-out sm:right-6 ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0"
        }`}
        style={{ height: "min(540px, calc(100dvh - 8.5rem))" }}
      >
        {/* Cabeçalho */}
        <div className="flex flex-none items-center gap-3 bg-espresso px-5 py-4">
          <span className="relative flex h-11 w-11 flex-none items-center justify-center rounded-full bg-brass text-espresso ring-2 ring-brass/30">
            <IconCafezinho className="h-7 w-7" />
            <span className="live-dot absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-espresso bg-brass" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-lg font-semibold leading-tight text-cream">Cafezinho</p>
            <p className="mt-0.5 truncate text-[11px] font-medium text-parchment/60">
              Agente de IA · Império Café — online
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fechar conversa"
            className="flex h-9 w-9 flex-none items-center justify-center rounded-full text-parchment/70 transition-colors hover:bg-parchment/10 hover:text-cream"
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Mensagens */}
        <div ref={bodyRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-5" aria-live="polite">
          {messages.map((m) => (
            <Bubble key={m.id} m={m} />
          ))}
          {pending && <TypingBubble />}
        </div>

        {/* Campo de mensagem */}
        <form onSubmit={send} className="flex-none border-t border-roast/10 bg-cream p-3">
          <div className="flex items-center gap-2">
            <label htmlFor="cafezinho-input" className="sr-only">
              Mensagem para o Cafezinho
            </label>
            <input
              id="cafezinho-input"
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={pending ? "Cafezinho está respondendo…" : "Escreva sua mensagem…"}
              disabled={pending}
              autoComplete="off"
              className="h-11 min-w-0 flex-1 rounded-full border border-espresso/15 bg-parchment px-4 text-sm text-cocoa-deep placeholder:text-cocoa/60 transition-colors focus:border-brass disabled:cursor-not-allowed disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={pending || !input.trim()}
              aria-label="Enviar mensagem"
              className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-brass text-espresso transition-all duration-300 hover:-translate-y-0.5 hover:bg-brass-soft disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
            >
              <IconSend className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-2 px-1 text-center text-[11px] leading-snug text-cocoa/70">
            O Cafezinho pode se enganar — confirme pedidos pelo{" "}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brass underline decoration-brass/40 underline-offset-2 transition-colors hover:text-brass-soft"
            >
              Instagram
            </a>
            .
          </p>
        </form>
      </div>

      {/* Botão flutuante */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="cafezinho-panel"
        aria-label={open ? "Fechar conversa com o Cafezinho" : "Conversar com o Cafezinho, agente de IA da Império Café"}
        className="group fixed bottom-5 right-4 z-[70] flex h-16 w-16 items-center justify-center rounded-full bg-brass text-espresso shadow-deep transition-all duration-300 hover:-translate-y-1 hover:bg-brass-soft active:translate-y-0 sm:bottom-6 sm:right-6"
      >
        {!open && <span className="pulse-ring absolute inset-0 rounded-full bg-brass/50" aria-hidden="true" />}
        <span className="relative flex items-center justify-center">
          {open ? (
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <IconCafezinho className="h-10 w-10" />
          )}
        </span>
        {!open && (
          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-espresso px-4 py-2 text-xs font-semibold text-parchment opacity-0 shadow-card transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 md:block">
            Fale com o Cafezinho
          </span>
        )}
      </button>
    </>
  );
}
