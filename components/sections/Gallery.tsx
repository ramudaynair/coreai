"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GalleryData } from "@/types";
import Image from "next/image";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface GalleryProps { data?: GalleryData[]; }

export default function Gallery({ data }: GalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<{ src: string; title: string } | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".gal-item",
        { opacity: 0 },
        { opacity: 1, duration: 0.5, stagger: 0.04, ease: "power1.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  if (!data) return null;

  return (
    <section id="gallery" ref={sectionRef} style={{ padding: "128px 0", background: "#080808", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "rgba(255,255,255,0.05)" }} />

      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "48px",
          flexWrap: "wrap",
          gap: "16px",
        }}>
          <div>
            <div className="eyebrow" style={{ color: "#5C46B6", display: "inline-flex", alignItems: "center", gap: "10px" }}>
              <span style={{ width: "1px", height: "16px", background: "#5C46B6", display: "inline-block", borderRadius: 0 }} />
              Our Events
            </div>
            <h2 style={{
              fontFamily: "var(--font-heading), Space Grotesk, sans-serif",
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#fff",
            }}>
              Workshop<br />
              <span style={{ color: "rgba(255,255,255,0.28)" }}>Gallery</span>
            </h2>
          </div>
          <p style={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.3)",
            maxWidth: "280px",
            lineHeight: 1.65,
            fontFamily: "var(--font-sans), Inter, sans-serif",
          }}>
            A glimpse into our workshops, sessions, and community events.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridAutoRows: "200px",
          gridAutoFlow: "dense",
          gap: "6px",
        }} className="gal-grid">
          {data.map((item, index) => {
            const syncedSmallTitles = new Set(["Intro To Computer Science", "Git Basics", "Offline Session", "Web Scrapping"]);
            const isSyncedSmall = syncedSmallTitles.has(item.title);
            const isWide = !isSyncedSmall && index % 7 === 0;
            const isTall = !isSyncedSmall && index % 5 === 2;
            return (
              <div
                key={index}
                className="gal-item"
                onClick={() => setSelected({ src: item.largeImage, title: item.title })}
                style={{
                  opacity: 0,
                  position: "relative",
                  borderRadius: "6px",
                  overflow: "hidden",
                  cursor: "pointer",
                  background: "#0d0d0d",
                  gridColumn: isWide ? "span 2" : "span 1",
                  gridRow: isTall ? "span 2" : "span 1",
                }}
                onMouseEnter={(e) => {
                  const img = e.currentTarget.querySelector("img") as HTMLElement;
                  const label = e.currentTarget.querySelector(".gal-label") as HTMLElement;
                  if (img) gsap.to(img, { scale: 1.04, duration: 0.5, ease: "power2.out" });
                  if (label) gsap.to(label, { opacity: 1, y: 0, duration: 0.25 });
                }}
                onMouseLeave={(e) => {
                  const img = e.currentTarget.querySelector("img") as HTMLElement;
                  const label = e.currentTarget.querySelector(".gal-label") as HTMLElement;
                  if (img) gsap.to(img, { scale: 1, duration: 0.5, ease: "power2.out" });
                  if (label) gsap.to(label, { opacity: 0, y: 6, duration: 0.2 });
                }}
              >
                <Image
                  src={`/${item.smallImage}`}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                />
                {/* Bottom fade */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(8,8,8,0.7) 0%, transparent 50%)",
                  pointerEvents: "none",
                }} />
                {/* Title label */}
                <div className="gal-label" style={{
                  position: "absolute",
                  bottom: "12px",
                  left: "12px",
                  right: "12px",
                  opacity: 0,
                  transform: "translateY(6px)",
                }}>
                  <p style={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "12px",
                    fontWeight: 500,
                    fontFamily: "var(--font-sans), Inter, sans-serif",
                    lineHeight: 1.4,
                  }}>
                    {item.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setSelected(null)}
            style={{
              position: "fixed", inset: 0, zIndex: 200,
              background: "rgba(4,4,4,0.97)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px 24px",
            }}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: "960px",
                width: "100%",
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div style={{ position: "relative", width: "100%", paddingBottom: "62%" }}>
                <Image
                  src={`/${selected.src}`}
                  alt={selected.title}
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="100vw"
                />
              </div>
              <div style={{
                padding: "14px 18px",
                background: "#0d0d0d",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
                <p style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "13px",
                  fontFamily: "var(--font-sans), Inter, sans-serif",
                }}>
                  {selected.title}
                </p>
                <span style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.2)",
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}>
                  Core AI
                </span>
              </div>
            </motion.div>

            <button
              onClick={() => setSelected(null)}
              style={{
                position: "fixed", top: "20px", right: "20px",
                width: "36px", height: "36px", borderRadius: "6px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.6)", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
                (e.currentTarget as HTMLElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)";
              }}
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 640px) {
          .gal-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
