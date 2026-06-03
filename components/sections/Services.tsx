"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceData } from "@/types";
import { motion } from "framer-motion";
import AmbientAtmosphere from "@/components/AmbientAtmosphere";

gsap.registerPlugin(ScrollTrigger);

interface ServicesProps { data?: ServiceData[]; }

type IconProps = { size?: number; strokeWidth?: number };

const ResearchIcon = ({ size = 20, strokeWidth = 1.5 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="6" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const EducationIcon = ({ size = 20, strokeWidth = 1.5 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

const CommunityIcon = ({ size = 20, strokeWidth = 1.5 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ProjectsIcon = ({ size = 20, strokeWidth = 1.5 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
);

const focusAreas = [
  { num: "01", word: "RESEARCH", title: "Innovative Ideas", desc: "Advancing knowledge through student-driven projects that challenge conventional thinking.", icon: ResearchIcon },
  { num: "02", word: "EDUCATION", title: "Hands-on Learning", desc: "Practical workshops and courses that build deep technical skills.", icon: EducationIcon },
  { num: "03", word: "COMMUNITY", title: "Collaborative Network", desc: "A supportive community connecting students, mentors, and industry partners.", icon: CommunityIcon },
  { num: "04", word: "PROJECTS", title: "Real Projects", desc: "Project-driven learning that delivers tangible outcomes and portfolio work.", icon: ProjectsIcon },
];

function EditorialCard({ num, word, title, desc, icon: Icon }: { num: string, word: string, title: string, desc: string, icon?: (props: IconProps) => React.ReactNode }) {
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
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="vm-small-block"
      style={{
        position: "relative",
        height: "320px",
        background: "#0D0D0D",
        border: `1px solid ${isHovered ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "16px",
        padding: "48px 40px",
        overflow: "hidden",
        cursor: "default",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        boxShadow: isHovered ? "0 12px 24px rgba(0, 0, 0, 0.3)" : "none",
        opacity: 0,
      }}
    >
      {/* 1. Cursor-following radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(124, 58, 237, 0.12), transparent 60%)`,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* 2. Absolute Watermark Word */}
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

        {/* Top Right Icon (area-specific) */}
        <div style={{ transition: "color 0.3s ease", color: isHovered ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.18)" }}>
          {Icon ? <Icon size={18} strokeWidth={1.6} /> : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isHovered ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.3s ease" }}>
              <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
            </svg>
          )}
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
        <div className="vm-intro" style={{ opacity: 0, marginBottom: "120px" }}>
          <div
            className="eyebrow"
            style={{
              fontFamily: "'SF Mono', 'Fira Code', monospace",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "rgba(139, 92, 246, 0.9)",
              marginBottom: "24px",
              textTransform: "uppercase"
            }}
          >
            Our Purpose
          </div>

          <h2
            style={{
              fontFamily: "var(--font-heading), Space Grotesk, sans-serif",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              color: "#fff",
              marginBottom: "12px",
            }}
          >
            Vision & Mission
          </h2>

          <p style={{
            margin: 0,
            fontFamily: "var(--font-heading), Space Grotesk, sans-serif",
            fontSize: "20px",
            color: "rgba(255,255,255,0.85)",
            marginBottom: "24px",
            lineHeight: 1.2,
          }}>
            Building Kerala's Student-Led AI Ecosystem
          </p>

          <p
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.8,
              maxWidth: "600px",
            }}
          >
            We are building a collaborative AI community where research,
            learning, innovation, and practical building come together — a platform where ideas extend beyond the classroom and spark conversations that reshape technology.
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
          <div
            className="vm-large-block"
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
              transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            <div
              style={{
                fontFamily: "'SF Mono', 'Fira Code', monospace",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                color: "rgba(139, 92, 246, 0.9)",
                marginBottom: "32px",
                textTransform: "uppercase",
              }}
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
              }}
            >
              Kerala's Leading Student AI Hub
            </h3>

            <div style={{ 
              height: "2px", 
              width: "70px", 
              background: "#5C46B6",
              boxShadow: "0 0 12px rgba(92, 70, 182, 0.6)",
              marginBottom: "24px" 
            }} />

            <p
              style={{
                marginTop: "auto",
                fontFamily: "var(--font-sans), Inter, sans-serif",
                fontSize: "15px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.75)",
              }}
            >
              To establish Kerala as a hub for student-driven AI innovation, where every curious mind has access to world-class resources, mentorship, and collaborative opportunities in artificial intelligence—shaping the future of technology responsibly.
            </p>
            
            {/* Extremely subtle watermark */}
            <div style={{
                position: "absolute",
                bottom: "-5%",
                right: "-5%",
                fontSize: "140px",
                fontWeight: 800,
                fontFamily: "var(--font-heading), sans-serif",
                color: "#fff",
                opacity: 0.015,
                pointerEvents: "none",
                letterSpacing: "-0.04em",
                zIndex: 0
            }}>
              VISION
            </div>
          </div>

          {/* OUR MISSION */}
          <div
            className="vm-large-block"
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
              transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            <div
              style={{
                fontFamily: "'SF Mono', 'Fira Code', monospace",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                color: "rgba(139, 92, 246, 0.9)",
                marginBottom: "32px",
                textTransform: "uppercase",
              }}
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
              }}
            >
              Learn. Build. Share.
            </h3>

            <div style={{ 
              height: "2px", 
              width: "70px", 
              background: "#5C46B6",
              boxShadow: "0 0 12px rgba(92, 70, 182, 0.6)",
              marginBottom: "24px" 
            }} />

            <p
              style={{
                marginTop: "auto",
                fontFamily: "var(--font-sans), Inter, sans-serif",
                fontSize: "15px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.75)",
              }}
            >
              We build an inclusive community that bridges the gap between academic theory and real-world AI applications. Through workshops, collaborative projects, and peer learning, we empower students to become tomorrow's AI leaders who build with purpose.
            </p>
            
            {/* Extremely subtle watermark */}
            <div style={{
                position: "absolute",
                bottom: "-5%",
                right: "-5%",
                fontSize: "140px",
                fontWeight: 800,
                fontFamily: "var(--font-heading), sans-serif",
                color: "#fff",
                opacity: 0.015,
                pointerEvents: "none",
                letterSpacing: "-0.04em",
                zIndex: 0
            }}>
              MISSION
            </div>
          </div>
        </div>

        {/* Focus Areas Header */}
        <div style={{ marginBottom: "48px" }}>
          <div style={{
            fontFamily: "'SF Mono', 'Fira Code', monospace",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            color: "rgba(139, 92, 246, 0.9)",
            marginBottom: "16px",
            textTransform: "uppercase",
          }}>
            Core Focus Areas
          </div>
          
          <h3 style={{
            fontFamily: "var(--font-heading), Space Grotesk, sans-serif",
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            color: "#fff",
            marginBottom: "12px",
          }}>
            Building Through Four Pillars
          </h3>
          
          <p style={{
            fontSize: "15px",
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.7,
            maxWidth: "560px",
          }}>
            Each focus area represents a commitment to excellence, collaboration, and real-world impact in AI.
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
              icon={area.icon}
            />
          ))}
        </div>

        <style jsx>{`
          .vm-large-block:hover {
            transform: translateY(-4px);
            border-color: rgba(255, 255, 255, 0.16);
            box-shadow: 0 16px 32px rgba(0, 0, 0, 0.42), 0 0 0 1px rgba(139, 92, 246, 0.08), 0 10px 24px rgba(139, 92, 246, 0.08);
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
