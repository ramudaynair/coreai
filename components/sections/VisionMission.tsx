"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";

const focusAreas = [
  { num: "01", word: "RESEARCH", title: "Innovative Ideas", desc: "Advancing knowledge through student-driven projects that challenge conventional thinking." },
  { num: "02", word: "LEARN", title: "Diverse Voices", desc: "Hands-on learning experiences delivering perspectives from leaders across technology and science." },
  { num: "03", word: "CONNECT", title: "Future Forward", desc: "Building connections across disciplines to build solutions shaping the world of tomorrow." },
  { num: "04", word: "BUILD", title: "Global Impact", desc: "A community passionate about driving meaningful, lasting, positive change through real-world applications." },
];

function EditorialCard({ num, word, title, desc }: { num: string, word: string, title: string, desc: string }) {
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
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        position: "relative",
        height: "320px",
        background: "#080808",
        border: `1px solid ${isHovered ? "rgba(139, 92, 246, 0.5)" : "rgba(255, 255, 255, 0.08)"}`,
        borderRadius: "16px",
        padding: "48px 40px",
        overflow: "hidden",
        cursor: "default",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.4s ease",
      }}
    >
      {/* 1. Cursor-following radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(124, 58, 237, 0.15), transparent 70%)`,
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

        {/* Top Right Decorative Icon (Subtle Diamond/Cross) */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isHovered ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transition: "stroke 0.3s ease" }}
        >
          <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
        </svg>
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

export default function VisionMission() {
  return (
    <section style={{ padding: "180px 0", background: "#050505", position: "relative" }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 32px" }}>
        
        {/* Intro */}
        <div style={{ marginBottom: "120px" }}>
          <div style={{ 
            fontFamily: "'SF Mono', 'Fira Code', monospace",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            color: "#5C46B6", 
            marginBottom: "24px",
            textTransform: "uppercase" 
          }}>
            ABOUT CORE AI
          </div>
          
          <h2 style={{
            fontFamily: "var(--font-heading), Space Grotesk, sans-serif",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            color: "#fff",
            marginBottom: "24px",
          }}>
            The Paradox <br />
            <span style={{ color: "rgba(255,255,255,0.4)", fontStyle: "italic", fontWeight: 400 }}>of Innovation</span>
          </h2>

          <p style={{
            fontSize: "16px",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.8,
            maxWidth: "600px",
          }}>
            Core AI is an independently organized student initiative that connects thinkers, innovators, and changemakers — a platform where ideas extend beyond the classroom and spark conversations that reshape technology and communities.
          </p>
        </div>

        {/* Vision & Mission Editorial Panels */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "32px",
          marginBottom: "120px",
        }}>
          {/* Vision Panel */}
          <div style={{
            background: "rgba(10, 10, 10, 0.4)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "16px",
            padding: "64px 48px",
            position: "relative",
            overflow: "hidden",
            minHeight: "380px",
            display: "flex",
            flexDirection: "column"
          }}>
            <div style={{
              fontFamily: "'SF Mono', 'Fira Code', monospace",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "#EF4444", // Using a stronger accent color for the subheader (Editorial red)
              marginBottom: "32px",
              textTransform: "uppercase",
            }}>
              OUR VISION
            </div>

            <h3 style={{
              fontFamily: "var(--font-heading), Space Grotesk, sans-serif",
              fontSize: "32px",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#fff",
              letterSpacing: "-0.02em",
              marginBottom: "24px",
              maxWidth: "90%",
            }}>
              Establishing Kerala as a leading hub for student-driven AI innovation.
            </h3>

            <p style={{
              marginTop: "auto",
              fontFamily: "var(--font-sans), Inter, sans-serif",
              fontSize: "15px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.45)",
            }}>
              We believe every curious mind should have access to world-class resources, mentorship, and collaborative opportunities in artificial intelligence, shaping the future of technology responsibly.
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

          {/* Mission Panel */}
          <div style={{
            background: "rgba(10, 10, 10, 0.4)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "16px",
            padding: "64px 48px",
            position: "relative",
            overflow: "hidden",
            minHeight: "380px",
            display: "flex",
            flexDirection: "column"
          }}>
            <div style={{
              fontFamily: "'SF Mono', 'Fira Code', monospace",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "#EF4444", 
              marginBottom: "32px",
              textTransform: "uppercase",
            }}>
              OUR MISSION
            </div>

            <h3 style={{
              fontFamily: "var(--font-heading), Space Grotesk, sans-serif",
              fontSize: "32px",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#fff",
              letterSpacing: "-0.02em",
              marginBottom: "24px",
              maxWidth: "90%",
            }}>
              Bridging the gap between academic theory and real-world applications.
            </h3>

            <p style={{
              marginTop: "auto",
              fontFamily: "var(--font-sans), Inter, sans-serif",
              fontSize: "15px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.45)",
            }}>
              By building an inclusive community around workshops, collaborative projects, and peer learning, we empower students to become tomorrow's AI leaders who build with purpose.
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

        {/* Focus Areas Label */}
        <div style={{
          fontFamily: "'SF Mono', 'Fira Code', monospace",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.12em",
          color: "rgba(255,255,255,0.3)",
          marginBottom: "40px",
          textTransform: "uppercase",
        }}>
          Core Focus Areas
        </div>

        {/* Editorial 4-Card Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "24px",
        }}>
          {focusAreas.map((area) => (
            <EditorialCard 
              key={area.num} 
              num={area.num} 
              word={area.word} 
              title={area.title} 
              desc={area.desc} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
