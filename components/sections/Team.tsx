"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TeamMember } from "@/types";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface TeamProps { data?: TeamMember[]; }

export default function Team({ data }: TeamProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".tm-header",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
      gsap.fromTo(".tm-member",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out",
          scrollTrigger: { trigger: ".tm-grid", start: "top 78%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (!data) return null;

  return (
    <section id="team" ref={sectionRef} style={{ padding: "128px 0", background: "#080808", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "rgba(255,255,255,0.05)" }} />

      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div className="tm-header" style={{
          opacity: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "64px",
          alignItems: "end",
          marginBottom: "72px",
        }} id="tm-header-grid">
          <div>
            <div className="eyebrow" style={{ color: "#5C46B6", display: "inline-flex", alignItems: "center", gap: "10px" }}>
              <span style={{ width: "1px", height: "16px", background: "#5C46B6", display: "inline-block", borderRadius: 0 }} />
              The People
            </div>
            <h2 style={{
              fontFamily: "var(--font-heading), Space Grotesk, sans-serif",
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#fff",
            }}>
              Meet the<br />
              <span style={{ color: "rgba(255,255,255,0.28)" }}>Team</span>
            </h2>
          </div>
          <p style={{
            fontSize: "15px",
            color: "rgba(255,255,255,0.35)",
            lineHeight: 1.75,
            fontFamily: "var(--font-sans), Inter, sans-serif",
            paddingBottom: "4px",
          }}>
            The passionate individuals driving innovation and AI education at Core AI Toc H.
          </p>
        </div>

        {/* Team grid */}
        <div className="tm-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "2px",
        }}>
          {data.map((member, index) => (
            <div
              key={index}
              className="tm-member"
              style={{
                opacity: 0,
                position: "relative",
                background: "#0d0d0d",
                borderRadius: "6px",
                overflow: "hidden",
                cursor: "default",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#111";
                const img = e.currentTarget.querySelector("img") as HTMLElement;
                if (img) gsap.to(img, { scale: 1.04, duration: 0.5, ease: "power2.out" });
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#0d0d0d";
                const img = e.currentTarget.querySelector("img") as HTMLElement;
                if (img) gsap.to(img, { scale: 1, duration: 0.5, ease: "power2.out" });
              }}
            >
              {/* Photo */}
              <div style={{ position: "relative", height: "260px", overflow: "hidden" }}>
                <Image
                  src={`/${member.img}`}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  height: "60%",
                  background: "linear-gradient(to top, #0d0d0d, transparent)",
                }} />
              </div>

              {/* Info */}
              <div style={{ padding: "14px 16px 18px" }}>
                <p style={{
                  fontFamily: "var(--font-heading), Space Grotesk, sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#fff",
                  letterSpacing: "-0.01em",
                  marginBottom: "4px",
                }}>
                  {member.name}
                </p>
                <p style={{
                  fontFamily: "var(--font-sans), Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.3)",
                  letterSpacing: "0.04em",
                }}>
                  {member.job}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        #tm-header-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 768px) {
          #tm-header-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </section>
  );
}
