"use client";

import { MouseEvent, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HeaderData } from "@/types";
import AmbientAtmosphere from "@/components/AmbientAtmosphere";

interface HeaderProps { data?: HeaderData; }

/* Exact logo purple */
const PURPLE = "#5C46B6";
const PURPLE_DIM = "rgba(92,70,182,0.15)";
const PURPLE_BORDER = "rgba(92,70,182,0.35)";

export default function Header({ data }: HeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo(".h-eyebrow",  { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
        .fromTo(".h-coreai",   { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.2")
        .fromTo(".h-sub",      { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.35")
        .fromTo(".h-actions",  { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
        .fromTo(".h-meta",     { opacity: 0 },         { opacity: 1, duration: 0.6 }, "-=0.2");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  if (!data) return null;

  return (
    <section
      id="header"
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
        background: "#080808",
        padding: "0 0 80px",
      }}
    >
      {/* Ambient atmosphere */}
      <AmbientAtmosphere variant="hero" />

      {/* Background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/img/background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.34,
          zIndex: 0,
        }}
      />

      {/* Single ambient glow — top right, logo purple */}
      <div
        className="ambient"
        style={{
          top: "-8%",
          right: "-4%",
          width: "560px",
          height: "560px",
          background: `radial-gradient(circle, rgba(92,70,182,0.1) 0%, transparent 65%)`,
        }}
      />

      {/* Rule below nav */}
      <div style={{
        position: "absolute",
        top: "64px",
        left: 0,
        right: 0,
        height: "1px",
        background: "rgba(255,255,255,0.04)",
      }} />

      {/* Content */}
      <div style={{
        maxWidth: "1160px",
        margin: "0 auto",
        padding: "0 32px",
        width: "100%",
        paddingTop: "160px",
        position: "relative",
        zIndex: 1,
      }}>

        {/* Eyebrow — logo purple */}
        <div className="h-eyebrow" style={{ opacity: 0, marginBottom: "36px", display: "inline-flex", alignItems: "center", gap: "10px" }}>
          <span style={{ width: "1px", height: "16px", background: PURPLE, display: "inline-block", borderRadius: 0 }} />
          <span style={{
            fontFamily: "var(--font-sans), Inter, sans-serif",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: PURPLE,
          }}>
            AI Community · Toc H Institute of Science &amp; Technology
          </span>
        </div>

        {/* Title block */}
        <div style={{ marginBottom: "44px" }}>
          <h1
            className="h-coreai"
            style={{
              opacity: 0,
              fontFamily: "var(--font-heading), Space Grotesk, sans-serif",
              fontSize: "clamp(3rem, 8.5vw, 7rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              color: "#fff",
              display: "block",
            }}
          >
            Welcome To{" "}
            <span style={{ color: PURPLE, position: "relative" }}>
              Core AI
              {/* Glow behind Core AI */}
              <span style={{
                position: "absolute",
                inset: "-20px -30px",
                background: "radial-gradient(ellipse, rgba(92,70,182,0.4) 0%, transparent 70%)",
                filter: "blur(40px)",
                zIndex: -1,
              }} />
            </span>
            <br />
            Toc H
          </h1>
        </div>

        {/* Bottom row — subtitle + CTA */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "40px",
            alignItems: "flex-end",
          }}
          className="h-bottom-row"
        >
          <p
            className="h-sub"
            style={{
              opacity: 0,
              fontSize: "clamp(0.875rem, 1.4vw, 1rem)",
              color: "rgba(255,255,255,0.35)",
              lineHeight: 1.75,
              maxWidth: "460px",
              fontFamily: "var(--font-sans), Inter, sans-serif",
              fontWeight: 400,
            }}
          >
            {data.paragraph}
          </p>

          <div className="h-actions" style={{ opacity: 0, display: "flex", gap: "12px", flexShrink: 0 }}>
            {/* Primary — sharp technical */}
            <Link
              href="#about"
              scroll={false}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 24px",
                background: "#5C46B6",
                color: "#fff",
                fontFamily: "'SF Mono', 'Fira Code', monospace",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                borderRadius: "2px",
                border: "none",
                borderLeft: "3px solid #a78bfa",
                cursor: "pointer",
                transition: "background 0.15s ease, transform 0.15s ease",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#6B52CC";
                el.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#5C46B6";
                el.style.transform = "translateY(0)";
              }}
            >
              <span style={{ opacity: 0.5, fontSize: "10px" }}>▶</span>
              explore
            </Link>

            {/* Ghost — terminal outline */}
            <Link
              href="#contact"
              scroll={false}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 24px",
                background: "transparent",
                color: "rgba(255,255,255,0.5)",
                fontFamily: "'SF Mono', 'Fira Code', monospace",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                borderRadius: "2px",
                border: "1px solid rgba(255,255,255,0.12)",
                cursor: "pointer",
                transition: "border-color 0.15s ease, color 0.15s ease",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(92,70,182,0.6)";
                el.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.12)";
                el.style.color = "rgba(255,255,255,0.5)";
              }}
            >
              <span style={{ opacity: 0.4, fontSize: "10px" }}>_</span>
              contact
            </Link>
          </div>
        </div>

        {/* Meta strip */}
        <div
          className="h-meta"
          style={{
            opacity: 0,
            marginTop: "72px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
          {[
            { value: "10+",    label: "Workshops" },
            { value: "2024",   label: "Founded" },
            { value: "Toc H",  label: "Institute" },
            { value: "Kerala", label: "India" },
          ].map(({ value, label }) => (
            <div key={label}>
              <div style={{
                fontFamily: "var(--font-heading), Space Grotesk, sans-serif",
                fontSize: "1.0625rem",
                fontWeight: 600,
                color: "#fff",
                letterSpacing: "-0.02em",
              }}>
                {value}
              </div>
              <div style={{
                fontFamily: "var(--font-sans), Inter, sans-serif",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.22)",
                marginTop: "3px",
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .h-bottom-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
