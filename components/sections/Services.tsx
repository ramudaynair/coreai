"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceData } from "@/types";
import { Search, Laptop, GraduationCap, Users, Globe, ListChecks } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ServicesProps { data?: ServiceData[]; }

const iconMap: { [key: string]: React.ElementType } = {
  "fa fa-search":         Search,
  "fa fa-laptop":         Laptop,
  "fa fa-graduation-cap": GraduationCap,
  "fa fa-users":          Users,
  "fa fa-globe":          Globe,
  "fa fa-tasks":          ListChecks,
};

export default function Services({ data }: ServicesProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".svc-header",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
      gsap.fromTo(".svc-row",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out",
          scrollTrigger: { trigger: ".svc-list", start: "top 78%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (!data) return null;

  return (
    <section id="services" ref={sectionRef} style={{ padding: "128px 0", background: "#080808", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "rgba(255,255,255,0.05)" }} />

      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 32px" }}>

        {/* Header — two column */}
        <div className="svc-header" style={{
          opacity: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "64px",
          alignItems: "end",
          marginBottom: "80px",
        }} id="svc-header-grid">
          <div>
            <div className="eyebrow" style={{ color: "#5C46B6", display: "inline-flex", alignItems: "center", gap: "10px" }}>
              <span style={{ width: "1px", height: "16px", background: "#5C46B6", display: "inline-block", borderRadius: 0 }} />
              What We Do
            </div>
            <h2 style={{
              fontFamily: "var(--font-heading), Space Grotesk, sans-serif",
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#fff",
            }}>
              Vision &amp;<br />
              <span style={{ color: "rgba(255,255,255,0.28)" }}>Mission</span>
            </h2>
          </div>
          <p style={{
            fontSize: "15px",
            color: "rgba(255,255,255,0.38)",
            lineHeight: 1.75,
            fontFamily: "var(--font-sans), Inter, sans-serif",
            paddingBottom: "4px",
          }}>
            Empowering the next generation of AI innovators through education, collaboration, and real-world impact.
          </p>
        </div>

        {/* Service list */}
        <div className="svc-list" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          {data.map((service, index) => {
            const Icon = iconMap[service.icon] || Search;
            return (
              <div
                key={index}
                className="svc-row"
                style={{
                  opacity: 0,
                  display: "grid",
                  gridTemplateColumns: "48px 1fr 2fr 40px",
                  gap: "32px",
                  alignItems: "center",
                  padding: "28px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  transition: "background 0.15s ease",
                  cursor: "default",
                  borderRadius: "4px",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {/* Index */}
                <span style={{
                  fontFamily: "var(--font-sans), Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  color: "rgba(255,255,255,0.15)",
                }}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Name */}
                <h3 style={{
                  fontFamily: "var(--font-heading), Space Grotesk, sans-serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#fff",
                  letterSpacing: "-0.01em",
                }}>
                  {service.name}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: "13.5px",
                  color: "rgba(255,255,255,0.35)",
                  lineHeight: 1.65,
                  fontFamily: "var(--font-sans), Inter, sans-serif",
                }}>
                  {service.text}
                </p>

                {/* Icon */}
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: "rgba(123,94,167,0.1)",
                  border: "1px solid rgba(123,94,167,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Icon size={16} color="rgba(155,127,212,0.8)" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        #svc-header-grid { grid-template-columns: 1fr 1fr; }
        .svc-row { grid-template-columns: 48px 1fr 2fr 40px; }
        @media (max-width: 768px) {
          #svc-header-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .svc-row { grid-template-columns: 32px 1fr !important; }
          .svc-row > p { display: none; }
          .svc-row > div:last-child { display: none; }
        }
      `}</style>
    </section>
  );
}
