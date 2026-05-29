"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AboutData } from "@/types";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface AboutProps { data?: AboutData; }

export default function About({ data }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ab-img",
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
      gsap.fromTo(".ab-content > *",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (!data) return null;

  const allItems = [...data.Why, ...data.Why2];

  return (
    <section id="about" ref={sectionRef} style={{ padding: "128px 0", background: "#080808", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "rgba(255,255,255,0.05)" }} />

      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 32px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "96px",
          alignItems: "start",
        }} className="ab-grid">

          {/* Image column */}
          <div className="ab-img" style={{ opacity: 0, position: "sticky", top: "100px" }}>
            <div style={{
              position: "relative",
              borderRadius: "8px",
              overflow: "hidden",
              background: "#0d0d0d",
            }}>
              <Image
                src="/img/coreai.png"
                alt="Core AI community"
                width={560}
                height={420}
                priority
                loading="eager"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              {/* Subtle bottom fade */}
              <div style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                height: "40%",
                background: "linear-gradient(to top, rgba(8,8,8,0.5), transparent)",
                pointerEvents: "none",
              }} />
            </div>

            {/* Caption below image */}
            <div style={{
              marginTop: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <span style={{
                fontFamily: "var(--font-sans), Inter, sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.2)",
              }}>
                Core AI Toc H
              </span>
              <span style={{
                fontFamily: "var(--font-sans), Inter, sans-serif",
                fontSize: "11px",
                color: "rgba(255,255,255,0.2)",
              }}>
                18+ workshops conducted
              </span>
            </div>
          </div>

          {/* Content column */}
          <div className="ab-content" style={{ display: "flex", flexDirection: "column", gap: "0", paddingTop: "8px" }}>
            <div className="eyebrow" style={{ color: "#5C46B6", display: "inline-flex", alignItems: "center", gap: "10px" }}>
              <span style={{ width: "1px", height: "16px", background: "#5C46B6", display: "inline-block", borderRadius: 0 }} />
              Who We Are
            </div>

            <h2 style={{
              fontFamily: "var(--font-heading), Space Grotesk, sans-serif",
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#fff",
              marginBottom: "28px",
            }}>
              Building Kerala&apos;s<br />
              <span style={{ color: "rgba(255,255,255,0.28)" }}>AI Future</span>
            </h2>

            <p style={{
              fontSize: "15px",
              color: "rgba(255,255,255,0.42)",
              lineHeight: 1.8,
              marginBottom: "48px",
              fontFamily: "var(--font-sans), Inter, sans-serif",
            }}>
              {data.paragraph}
            </p>

            {/* Aims — clean list */}
            <div style={{
              borderTop: "1px solid rgba(255,255,255,0.05)",
              paddingTop: "32px",
            }}>
              <p style={{
                fontFamily: "var(--font-sans), Inter, sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.2)",
                marginBottom: "20px",
              }}>
                Core Aims
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {allItems.map((item, i) => (
                  <div key={i} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "13px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-sans), Inter, sans-serif",
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.18)",
                      fontWeight: 500,
                      minWidth: "24px",
                    }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.6)",
                      fontFamily: "var(--font-sans), Inter, sans-serif",
                      fontWeight: 400,
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ab-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .ab-img { position: static !important; }
        }
      `}</style>
    </section>
  );
}
