"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease, delay },
  } as const;
}

// ─── Chapter 1 — Our Story ───────────────────────────────
function ChapterStory() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "80px",
        alignItems: "center",
        padding: "160px 0",
      }}
    >
      {/* Left — content */}
      <div>
        <motion.div
          {...reveal(0)}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          style={{
            fontFamily: "'SF Mono','Fira Code',monospace",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.16em",
            textTransform: "uppercase" as const,
            color: "#7C5CFF",
            marginBottom: "32px",
          }}
        >
          WHO WE ARE
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-heading),Space Grotesk,sans-serif",
            fontSize: "clamp(2.8rem,5.5vw,4.5rem)",
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            color: "#fff",
            marginBottom: "32px",
          }}
        >
          Building Kerala's
          <br />
          <span style={{ color: "#7C5CFF" }}>
            Student-Led
            <br />
            AI Future
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease, delay: 0.2 }}
          style={{
            fontFamily: "var(--font-sans),Inter,sans-serif",
            fontSize: "16px",
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.45)",
            maxWidth: "480px",
          }}
        >
          Core AI is a student-driven community where curiosity becomes
          innovation. We bring together learners, builders, researchers, and
          future innovators to explore artificial intelligence through
          collaboration, hands-on projects, and real-world experiences.
        </motion.p>
      </div>

      {/* Right — cinematic image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, ease }}
        style={{ position: "relative" }}
      >
        <div
          style={{
            position: "absolute",
            inset: "-24px",
            background:
              "radial-gradient(ellipse at 50% 50%,rgba(124,92,255,0.18) 0%,transparent 70%)",
            borderRadius: "48px",
            pointerEvents: "none",
            filter: "blur(20px)",
          }}
        />
        <Image
          src="/img/about.jpg"
          alt="Core AI Community"
          width={720}
          height={900}
          style={{
            width: "100%",
            height: "70vh",
            objectFit: "cover",
            borderRadius: "32px",
            display: "block",
            position: "relative",
          }}
        />
      </motion.div>
    </div>
  );
}

// ─── Chapter 2 — Our Journey ─────────────────────────────
const milestones = [
  { year: "2024", label: "Launch", desc: "Core AI Toc H founded as a student-led AI community." },
  { year: "2025", label: "Community Growth", desc: "Expanded across disciplines and welcomed a growing network of members." },
  { year: "2026", label: "Workshops & Research", desc: "Conducted workshops, collaborative projects, and research initiatives." },
  { year: "Future", label: "AI Innovation Hub", desc: "Building Kerala's strongest student-driven AI ecosystem." },
];

function TimelineCard({
  item,
  index,
}: {
  item: (typeof milestones)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 48px 1fr",
        alignItems: "start",
      }}
    >
      {/* Card — alternates column */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease, delay: index * 0.08 }}
        whileHover={{ y: -4, borderColor: "rgba(124,92,255,0.55)" }}
        style={{
          gridColumn: isLeft ? "1" : "3",
          gridRow: "1",
          padding: "32px",
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(124,92,255,0.18)",
          borderRadius: "16px",
          position: "relative",
          overflow: "hidden",
          cursor: "default",
          transition: "border-color 0.3s ease",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "80px",
            height: "80px",
            background:
              "radial-gradient(circle at 0 0,rgba(124,92,255,0.1),transparent 70%)",
            borderRadius: "16px 0 0 0",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            fontFamily: "'SF Mono','Fira Code',monospace",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            color: "#7C5CFF",
            marginBottom: "10px",
          }}
        >
          {item.year}
        </div>
        <h4
          style={{
            fontFamily: "var(--font-heading),Space Grotesk,sans-serif",
            fontSize: "18px",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.02em",
            marginBottom: "10px",
          }}
        >
          {item.label}
        </h4>
        <p
          style={{
            fontFamily: "var(--font-sans),Inter,sans-serif",
            fontSize: "14px",
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.7,
          }}
        >
          {item.desc}
        </p>
      </motion.div>

      {/* Centre spine node */}
      <div
        style={{
          gridColumn: "2",
          gridRow: "1",
          display: "flex",
          justifyContent: "center",
          paddingTop: "36px",
        }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.08 + 0.2 }}
          style={{
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            background: "#7C5CFF",
            boxShadow: "0 0 18px rgba(124,92,255,0.7)",
            flexShrink: 0,
          }}
        />
      </div>

      {/* Empty opposite column */}
      <div style={{ gridColumn: isLeft ? "3" : "1", gridRow: "1" }} />
    </div>
  );
}

function ChapterJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);

  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-10%" });

  return (
    <div style={{ padding: "80px 0 160px" }}>
      <div ref={titleRef} style={{ textAlign: "center", marginBottom: "96px" }}>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease }}
          style={{
            fontFamily: "var(--font-heading),Space Grotesk,sans-serif",
            fontSize: "clamp(2rem,4vw,3rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            color: "#fff",
            marginBottom: "16px",
          }}
        >
          Our Journey
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-sans),Inter,sans-serif",
            fontSize: "15px",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          From a small student initiative to a growing AI ecosystem.
        </motion.p>
      </div>

      <div
        ref={containerRef}
        style={{ position: "relative", maxWidth: "900px", margin: "0 auto" }}
      >
        {/* Static background line */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: 0,
            bottom: 0,
            width: "1px",
            background: "rgba(124,92,255,0.1)",
          }}
        />
        {/* Scroll-driven glowing line */}
        <motion.div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: 0,
            width: "1px",
            height: lineHeight,
            background: "linear-gradient(to bottom,#7C5CFF,rgba(124,92,255,0.15))",
            boxShadow: "0 0 8px rgba(124,92,255,0.4)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
          {milestones.map((item, i) => (
            <TimelineCard key={item.year} item={item} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Chapter 3 — Our Belief ──────────────────────────────
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const dots = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      o: Math.random() * 0.2 + 0.05,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((d) => {
        d.x += d.dx;
        d.y += d.dy;
        if (d.x < 0 || d.x > canvas.width) d.dx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.dy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124,92,255,${d.o})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

function ChapterBelief() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        padding: "160px 0 200px",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Particles />
      <div style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease }}
          style={{
            fontFamily: "'SF Mono','Fira Code',monospace",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.16em",
            textTransform: "uppercase" as const,
            color: "#7C5CFF",
            marginBottom: "56px",
          }}
        >
          OUR BELIEF
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-heading),Space Grotesk,sans-serif",
            fontSize: "clamp(2.8rem,6.5vw,5.5rem)",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.04em",
            color: "#fff",
          }}
        >
          We believe AI education
          <br />
          should be{" "}
          <span style={{ color: "#7C5CFF" }}>accessible</span>,
          <br />
          <span style={{ color: "#7C5CFF" }}>collaborative</span>,
          <br />
          and <span style={{ color: "#7C5CFF" }}>practical</span>.
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease, delay: 0.25 }}
          style={{
            fontFamily: "var(--font-sans),Inter,sans-serif",
            fontSize: "16px",
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.35)",
            maxWidth: "540px",
            margin: "56px auto 0",
          }}
        >
          Core AI exists to help students learn, build, share knowledge, and
          create meaningful impact through artificial intelligence.
        </motion.p>
      </div>
    </div>
  );
}

// ─── Chapter divider ─────────────────────────────────────
function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", opacity: 0.12 }}>
      <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.2)" }} />
      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#7C5CFF" }} />
      <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.2)" }} />
    </div>
  );
}

// ─── Root export ─────────────────────────────────────────
export default function About() {
  return (
    <section id="about" style={{ background: "#080808", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
        <ChapterStory />
        <Divider />
        <ChapterJourney />
        <Divider />
        <ChapterBelief />
      </div>
    </section>
  );
}
