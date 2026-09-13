import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Direção da revelação */
  from?: "up" | "left" | "right";
  /** Atraso em ms */
  delay?: number;
  style?: CSSProperties;
};

/**
 * Revela o conteúdo quando entra na viewport.
 * Com `prefers-reduced-motion`, o CSS força exibição imediata.
 */
export function Reveal({ children, className = "", from = "up", delay = 0, style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const dirClass = from === "left" ? "from-left" : from === "right" ? "from-right" : "";

  return (
    <div
      ref={ref}
      className={`reveal ${dirClass} ${className}`}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
    >
      {children}
    </div>
  );
}

/** Título com máscara de linha — o texto sobe de dentro do próprio recorte. */
export function LineReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className={`line-mask ${className}`}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      <span style={{ transitionDelay: delay ? `${delay}ms` : undefined }}>{children}</span>
    </span>
  );
}
