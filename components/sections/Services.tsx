"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceData } from "@/types";
import { motion } from "framer-motion";
import AmbientAtmosphere from "@/components/AmbientAtmosphere";

gsap.registerPlugin(ScrollTrigger);

interface ServicesProps { data?: ServiceData[]; }

const focusAreas = [
  { num: "01", word: "RESEARCH", title: "Innovative Ideas", desc: "Advancing knowledge through student-driven projects that challenge conventional thinking.", glyph: "✦" },
  { num: "02", word: "LEARN", title: "Hands-on Learning", desc: "Practical workshops and courses that build deep technical skills.", glyph: "◇" },
  { num: "03", word: "CONNECT", title: "Collaborative Network", desc: "A supportive community connecting students, mentors, and industry partners.", glyph: "⬡" },
  { num: "04", word: "BUILD", title: "Real Projects", desc: "Project-driven learning that delivers tangible outcomes and portfolio work.", glyph: "◈" },
];

function EditorialCard({ num, word, title, desc, glyph }: { num: string, word: string, title: string, desc: string, glyph: string }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        y: isHovered ? -2 : 0,
        backgroundColor: isHovered ? "#111111" : "#0D0D0D",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="vm-small-block"
      style={{
        position: "relative",
        height: "320px",
        background: "#0D0D0D",
        border: `1px solid ${isHovered ? "rgba(139,92,246,0.48)" : "rgba(139,92,246,0.22)"}`,
        borderRadius: "16px",
        padding: "48px 40px",
        overflow: "hidden",
        cursor: "default",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        boxShadow: isHovered 
          ? "0 12px 24px rgba(0, 0, 0, 0.3), 0 0 22px rgba(139,92,246,0.14)" 
          : "0 0 18px rgba(139,92,246,0.05)",
        opacity: 0,
      }}
    >
      {/* Cursor-following radial spotlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(124, 58, 237, 0.18), transparent 60%)`,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Absolute Watermark Word */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "-5%",
          fontSize: "120px",
          fontWeight: 800,
          fontFamily: "var(--font-heading), sans-serif",
          color: "#fff",
          opacity: 0.02,
          pointerEvents: "none",
          zIndex: 0,
          letterSpacing: "-0.04em",
          userSelect: "none",
        }}
      >
        {word}
      </div>

      <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Top Left Number */}
          <span style={{
            fontFamily: "'SF Mono', 'Fira Code', monospace",
            fontSize: "11px",
            color: isHovered ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)",
            letterSpacing: "0.1em",
            transition: "color 0.3s ease",
          }}>
            {num}
          </span>
          {/* Accent Line under number */}
          <div style={{
            marginTop: "16px",
            width: "25%",
            minWidth: "32px",
            height: "1px",
            background: isHovered ? "rgba(139, 92, 246, 0.8)" : "rgba(92, 70, 182, 0.5)",
            transition: "background 0.3s ease",
          }} />
        </div>

        {/* Top Right Glyph */}
        <div style={{ 
          fontSize: "14px",
          color: isHovered ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.12)",
          transition: "color 0.3s ease",
        }}>
          {glyph}
        </div>
      </div>

      {/* Main Content locked to bottom */}
      <div style={{ marginTop: "auto", position: "relative", zIndex: 1 }}>
        <motion.h3
          animate={{
            color: isHovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.85)",
          }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: "var(--font-heading), Space Grotesk, sans-serif",
            fontSize: "26px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: "16px",
            lineHeight: 1.2,
          }}
        >
          {title}
        </motion.h3>
        <p style={{
          fontFamily: "var(--font-sans), Inter, sans-serif",
          fontSize: "14px",
          lineHeight: 1.6,
          color: "rgba(255,255,255,0.4)",
          fontWeight: 400,
        }}>
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function Services({ data }: ServicesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visionHovered, setVisionHovered] = useState(false);
  const [missionHovered, setMissionHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".vm-intro",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
      gsap.fromTo(
        ".vm-large-block",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".vm-large-blocks", start: "top 75%" },
        }
      );
      gsap.fromTo(
        ".vm-small-block",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ".vm-small-blocks", start: "top 75%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        padding: "180px 0 160px",
        background: "#050505",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <AmbientAtmosphere variant="default" />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "rgba(255,255,255,0.05)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding: "0 32px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* TOP INTRO AREA */}
        <div className="vm-intro" style={{ 
          opacity: 0, 
          marginBottom: "120px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
        }}>
          {/* Left Column */}
          <div>
            <div className="eyebrow" style={{ color: "#5C46B6", display: "inline-flex", alignItems: "center", gap: "10px" }}>
              <span style={{ width: "1px", height: "16px", background: "#5C46B6", display: "inline-block", borderRadius: 0 }} />
              Our Purpose
            </div>

            <h2
              style={{
                fontFamily: "var(--font-heading), Space Grotesk, sans-serif",
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                color: "#fff",
              }}
            >
              Vision &<br />
              <span style={{ color: "#5C46B6" }}>Mission</span>
            </h2>
          </div>

          {/* Right Column */}
          <p
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.3)",
              maxWidth: "280px",
              lineHeight: 1.65,
              fontFamily: "var(--font-sans), Inter, sans-serif",
            }}
          >
            Our vision is to lead in AI innovation, and our mission is to empower individuals and organizations with transformative AI solutions for growth and collaboration.
          </p>
        </div>

        {/* TWO LARGE HIGHLIGHT BLOCKS */}
        <div
          className="vm-large-blocks"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: "32px",
            marginBottom: "120px",
          }}
        >
          {/* OUR VISION */}
          <motion.div
            className="vm-large-block vision-card"
            onMouseEnter={() => setVisionHovered(true)}
            onMouseLeave={() => setVisionHovered(false)}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              opacity: 0,
              background: "linear-gradient(180deg, #111111 0%, #0D0D0D 100%)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px",
              padding: "64px 48px",
              position: "relative",
              overflow: "hidden",
              minHeight: "380px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 12px 28px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.03)",
            }}
          >
            {/* Bottom-left corner glow on hover */}
            <div
              className="vision-corner-glow"
              style={{
                position: "absolute",
                bottom: "-100px",
                left: "-100px",
                width: "350px",
                height: "350px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0.08) 25%, rgba(139,92,246,0.03) 50%, transparent 70%)",
                filter: "blur(60px)",
                opacity: visionHovered ? 1 : 0,
                transition: "opacity 0.4s ease",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />

            {/* Extremely subtle watermark */}
            <div 
              className="vision-watermark"
              style={{
                position: "absolute",
                bottom: "-5%",
                right: "-5%",
                fontSize: "140px",
                fontWeight: 800,
                fontFamily: "var(--font-heading), sans-serif",
                color: "#fff",
                opacity: visionHovered ? 0.03 : 0.015,
                pointerEvents: "none",
                letterSpacing: "-0.04em",
                zIndex: 1,
                transition: "opacity 0.4s ease",
            }}>
              VISION
            </div>

            <div
              style={{
                color: "#5C46B6",
                marginBottom: "32px",
                position: "relative",
                zIndex: 2,
              }}
              className="eyebrow"
            >
              Our Vision
            </div>

            <h3
              style={{
                fontFamily: "var(--font-heading), Space Grotesk, sans-serif",
                fontSize: "32px",
                fontWeight: 700,
                lineHeight: 1.15,
                color: "#fff",
                letterSpacing: "-0.02em",
                marginBottom: "20px",
                maxWidth: "90%",
                position: "relative",
                zIndex: 2,
              }}
            >
              Shaping Kerala's AI Future
            </h3>

            <div style={{ 
              height: "2px", 
              width: "70px", 
              background: "#5C46B6",
              boxShadow: "0 0 12px rgba(92, 70, 182, 0.6)",
              marginBottom: "24px",
              position: "relative",
              zIndex: 2,
            }} />

            <p
              style={{
                marginTop: "auto",
                fontFamily: "var(--font-sans), Inter, sans-serif",
                fontSize: "15px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.75)",
                position: "relative",
                zIndex: 2,
              }}
            >
              To establish Kerala as a hub for student-driven AI innovation, where curious minds gain access to world-class resources, mentorship, and opportunities to build the future.
            </p>
          </motion.div>

          {/* OUR MISSION */}
          <motion.div
            className="vm-large-block mission-card"
            onMouseEnter={() => setMissionHovered(true)}
            onMouseLeave={() => setMissionHovered(false)}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              opacity: 0,
              background: "linear-gradient(180deg, #111111 0%, #0D0D0D 100%)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px",
              padding: "64px 48px",
              position: "relative",
              overflow: "hidden",
              minHeight: "380px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 12px 28px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.03)",
            }}
          >
            {/* Bottom-left corner glow on hover */}
            <div
              className="mission-corner-glow"
              style={{
                position: "absolute",
                bottom: "-100px",
                left: "-100px",
                width: "350px",
                height: "350px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0.08) 25%, rgba(139,92,246,0.03) 50%, transparent 70%)",
                filter: "blur(60px)",
                opacity: missionHovered ? 1 : 0,
                transition: "opacity 0.4s ease",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />

            {/* Extremely subtle watermark */}
            <div 
              className="mission-watermark"
              style={{
                position: "absolute",
                bottom: "-5%",
                right: "-5%",
                fontSize: "140px",
                fontWeight: 800,
                fontFamily: "var(--font-heading), sans-serif",
                color: "#fff",
                opacity: missionHovered ? 0.03 : 0.015,
                pointerEvents: "none",
                letterSpacing: "-0.04em",
                zIndex: 1,
                transition: "opacity 0.4s ease",
            }}>
              MISSION
            </div>

            <div
              style={{
                color: "#5C46B6",
                marginBottom: "32px",
                position: "relative",
                zIndex: 2,
              }}
              className="eyebrow"
            >
              Our Mission
            </div>

            <h3
              style={{
                fontFamily: "var(--font-heading), Space Grotesk, sans-serif",
                fontSize: "32px",
                fontWeight: 700,
                lineHeight: 1.15,
                color: "#fff",
                letterSpacing: "-0.02em",
                marginBottom: "20px",
                maxWidth: "90%",
                position: "relative",
                zIndex: 2,
              }}
            >
             Empowering Through AI
            </h3>

            <div style={{ 
              height: "2px", 
              width: "70px", 
              background: "#5C46B6",
              boxShadow: "0 0 12px rgba(92, 70, 182, 0.6)",
              marginBottom: "24px",
              position: "relative",
              zIndex: 2,
            }} />

            <p
              style={{
                marginTop: "auto",
                fontFamily: "var(--font-sans), Inter, sans-serif",
                fontSize: "15px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.75)",
                position: "relative",
                zIndex: 2,
              }}
            >
              We build an inclusive community that bridges academic learning and real-world applications through workshops, projects, mentorship, and collaboration.
            </p>
          </motion.div>
        </div>

        {/* Focus Areas Header */}
        <div style={{ 
          marginBottom: "48px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
        }}>
          <div>
            <div className="eyebrow" style={{ 
              color: "#5C46B6", 
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
            }}>
              <span style={{ width: "1px", height: "16px", background: "#5C46B6", display: "inline-block", borderRadius: 0 }} />
              Our Focus
            </div>
            
            <h3 style={{
              fontFamily: "var(--font-heading), Space Grotesk, sans-serif",
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#fff",
            }}>
              Ideas Into <span style={{ color: "#5C46B6" }}>Action</span>
            </h3>
          </div>
          
          <p style={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.3)",
            maxWidth: "280px",
            lineHeight: 1.65,
            fontFamily: "var(--font-sans), Inter, sans-serif",
          }}>
            Research, education, collaboration, and real-world projects — the pillars that turn curiosity into innovation.
          </p>
        </div>

        {/* FOUR SMALLER INTERACTIVE BLOCKS */}
        <div
          className="vm-small-blocks"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "24px",
          }}
        >
          {focusAreas.map((area) => (
            <EditorialCard 
              key={area.num} 
              num={area.num} 
              word={area.word} 
              title={area.title} 
              desc={area.desc} 
              glyph={area.glyph}
            />
          ))}
        </div>

        <style jsx>{`
          .vision-card:hover,
          .mission-card:hover {
            border-color: rgba(139,92,246,0.8) !important;
            box-shadow: 0 0 40px rgba(139,92,246,0.15) !important;
            transition: border-color 0.4s ease, box-shadow 0.4s ease;
          }

          .vision-card:hover .vision-corner-glow,
          .mission-card:hover .mission-corner-glow {
            opacity: 1;
          }

          .vision-card:hover .vision-watermark,
          .mission-card:hover .mission-watermark {
            opacity: 0.03;
          }

          @media (max-width: 1024px) {
            .vm-small-blocks {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
          }

          @media (max-width: 640px) {
            .vm-small-blocks {
              grid-template-columns: minmax(0, 1fr) !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
