"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { TeamMember } from "@/types";

interface TeamProps {
  data?: TeamMember[];
}

type OrbitMember = TeamMember & {
  accent: string;
  ring: string;
};

const rolePalette: Record<string, { accent: string; ring: string }> = {
  Founder:         { accent: "#A78BFA", ring: "rgba(167,139,250,0.55)" },
  Lead:            { accent: "#818CF8", ring: "rgba(129,140,248,0.45)" },
  "Technical Lead":{ accent: "#22D3EE", ring: "rgba(34,211,238,0.45)" },
  "Creative Lead": { accent: "#F472B6", ring: "rgba(244,114,182,0.45)" },
  "Design Lead":   { accent: "#FBBF24", ring: "rgba(251,191,36,0.45)"  },
  "Outreach Lead": { accent: "#34D399", ring: "rgba(52,211,153,0.45)"  },
  "Media Lead":    { accent: "#FB7185", ring: "rgba(251,113,133,0.45)" },
  "Research Lead": { accent: "#60A5FA", ring: "rgba(96,165,250,0.45)"  },
  "Co-Lead":       { accent: "#2DD4BF", ring: "rgba(45,212,191,0.45)"  },
};
const fallback = { accent: "#C4B5FD", ring: "rgba(196,181,253,0.45)" };

function getInitials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("");
}

function MemberAvatar({
  member,
  size,
}: {
  member: OrbitMember;
  size: number;
}) {
  const src = member.imageSrc ?? member.img;
  if (src) {
    return (
      <Image
        src={src.startsWith("/") ? src : `/${src}`}
        alt={member.name}
        fill
        sizes={`${size}px`}
        className="object-cover"
      />
    );
  }
  return (
    <div
      className="absolute inset-0 flex items-center justify-center select-none"
      style={{
        background: `linear-gradient(135deg, #1a0a2e 0%, ${member.accent}55 100%)`,
      }}
    >
      <span
        className="font-semibold text-white"
        style={{ fontSize: size * 0.32 }}
      >
        {getInitials(member.name)}
      </span>
    </div>
  );
}

interface OrbitNodeProps {
  member: OrbitMember;
  angle: number;
  radius: number;
  nodeSize: number;
  isFounder?: boolean;
  isActive: boolean;
  isPaused: boolean;
  animDuration: number;
  onActivate: () => void;
  onDeactivate: () => void;
}

function OrbitNode({
  member,
  angle,
  radius,
  nodeSize,
  isFounder = false,
  isActive,
  isPaused,
  animDuration,
  onActivate,
  onDeactivate,
}: OrbitNodeProps) {
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;

  return (
    <div
      className="absolute"
      style={{
        left: "50%",
        top: "50%",
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isActive ? 20 : 10,
        animationPlayState: isPaused ? "paused" : "running",
      }}
    >
      <button
        className="relative flex flex-col items-center gap-1 focus:outline-none group"
        style={{ width: nodeSize + 48 }}
        onMouseEnter={onActivate}
        onMouseLeave={onDeactivate}
        onFocus={onActivate}
        onBlur={onDeactivate}
        onTouchStart={onActivate}
        onTouchEnd={onDeactivate}
        aria-label={`${member.name}, ${member.job}`}
      >
        <div
          className="relative overflow-hidden rounded-full transition-all duration-300"
          style={{
            width: nodeSize,
            height: nodeSize,
            border: `2px solid ${isActive ? member.accent : "rgba(255,255,255,0.15)"}`,
            boxShadow: isActive ? `0 0 18px ${member.ring}, 0 0 36px ${member.ring}` : "none",
            transform: isActive ? "scale(1.12)" : "scale(1)",
          }}
        >
          <MemberAvatar member={member} size={nodeSize} />
        </div>

        <div
          className="text-center transition-all duration-200 max-w-full px-1"
          style={{ opacity: isActive ? 1 : 0.65 }}
        >
          <p
            className="font-medium text-white leading-tight truncate"
            style={{ fontSize: isFounder ? 11 : 10, maxWidth: nodeSize + 40 }}
          >
            {member.name}
          </p>
          <p
            className="truncate leading-tight"
            style={{
              fontSize: isFounder ? 10 : 9,
              color: member.accent,
              maxWidth: nodeSize + 40,
            }}
          >
            {member.job}
          </p>
        </div>
      </button>
    </div>
  );
}

export default function Team({ data }: TeamProps) {
  const [activeNames, setActiveNames] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState(560);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      setContainerSize(Math.min(w, 680));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const members = useMemo<OrbitMember[]>(() =>
    (data ?? []).map((m) => {
      const p = rolePalette[m.job] ?? fallback;
      return { ...m, ...p };
    }),
  [data]);

  const founder = useMemo(() => members.find((m) => m.job === "Founder") ?? members[0], [members]);
  const orbiters = useMemo(() => members.filter((m) => m.name !== founder?.name), [members, founder]);

  if (!founder) return null;

  const scale = containerSize / 560;
  const outerR = 200 * scale;
  const innerR = 128 * scale;
  const logoSize = 88 * scale;
  const founderSize = Math.round(62 * scale);
  const orbitSize = Math.round(48 * scale);
  const orbitHeight = outerR * 2 + 140 * scale;

  const founderAngle = -90;

  const activateName = (name: string) => setActiveNames((s) => new Set(s).add(name));
  const deactivateName = (name: string) =>
    setActiveNames((s) => { const n = new Set(s); n.delete(name); return n; });

  return (
    <section
      id="team"
      className="relative overflow-hidden bg-[#05020d] py-20 sm:py-28"
      aria-label="Team section"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-700/20 blur-[120px]" />
        <div className="absolute left-[20%] top-[60%] h-48 w-48 rounded-full bg-fuchsia-600/10 blur-[90px]" />
        <div className="absolute right-[20%] top-[30%] h-48 w-48 rounded-full bg-indigo-600/10 blur-[90px]" />
      </div>

      {/* Header */}
      <div className="relative text-center mb-10 px-6">
        <p className="text-xs uppercase tracking-[0.28em] text-violet-400/80 mb-2">Our Collective</p>
        <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
          One Core. Shared Orbit.
        </h2>
        <p className="mt-3 text-sm text-violet-200/50 max-w-sm mx-auto leading-relaxed">
          A unified identity powered by every role in its orbit.
        </p>
      </div>

      {/* Orbital canvas */}
      <div ref={containerRef} className="relative mx-auto px-4" style={{ maxWidth: 720 }}>
        <div
          className="relative mx-auto select-none"
          style={{ width: "100%", height: orbitHeight }}
        >
          {/* Orbit ring SVGs */}
          <svg
            className="pointer-events-none absolute inset-0 w-full h-full"
            viewBox={`0 0 ${containerSize} ${orbitHeight}`}
            aria-hidden
          >
            <ellipse
              cx={containerSize / 2}
              cy={orbitHeight / 2}
              rx={outerR}
              ry={outerR * 0.38}
              fill="none"
              stroke="rgba(167,139,250,0.18)"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
            <ellipse
              cx={containerSize / 2}
              cy={orbitHeight / 2}
              rx={innerR}
              ry={innerR * 0.38}
              fill="none"
              stroke="rgba(167,139,250,0.12)"
              strokeWidth="1"
              strokeDasharray="3 5"
            />
          </svg>

          {/* Central logo */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: logoSize,
              height: logoSize,
              zIndex: 30,
            }}
          >
            <div
              className="relative flex items-center justify-center rounded-full"
              style={{
                width: logoSize,
                height: logoSize,
                background: "radial-gradient(circle at 38% 34%, #2e1065 0%, #0d0118 70%)",
                border: "1.5px solid rgba(167,139,250,0.35)",
                boxShadow: "0 0 32px rgba(139,92,246,0.35), 0 0 64px rgba(139,92,246,0.15)",
              }}
            >
              {/* Pulse ring */}
              <div
                className="absolute inset-0 rounded-full border border-violet-400/30 animate-ping"
                style={{ animationDuration: "2.8s" }}
              />
              <span
                className="font-bold text-white tracking-tight text-center leading-none z-10"
                style={{ fontSize: logoSize * 0.165 }}
              >
                CORE
                <br />
                <span style={{ color: "#A78BFA", fontSize: logoSize * 0.13 }}>AI</span>
              </span>
            </div>
          </div>

          {/* Founder on inner orbit */}
          <OrbitNode
            key={founder.name}
            member={founder}
            angle={founderAngle}
            radius={innerR}
            nodeSize={founderSize}
            isFounder
            isActive={activeNames.has(founder.name)}
            isPaused={activeNames.has(founder.name)}
            animDuration={18}
            onActivate={() => activateName(founder.name)}
            onDeactivate={() => deactivateName(founder.name)}
          />

          {/* Orbit members on outer ring */}
          {orbiters.map((member, i) => {
            const angle = (360 / Math.max(orbiters.length, 1)) * i - 90;
            return (
              <OrbitNode
                key={member.name}
                member={member}
                angle={angle}
                radius={outerR}
                nodeSize={orbitSize}
                isActive={activeNames.has(member.name)}
                isPaused={activeNames.has(member.name)}
                animDuration={28 + i * 3}
                onActivate={() => activateName(member.name)}
                onDeactivate={() => deactivateName(member.name)}
              />
            );
          })}
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative mx-auto mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 px-6 max-w-2xl">
        {[
          { value: members.length, label: "Total Members" },
          { value: new Set(members.map((m) => m.job)).size, label: "Role Domains" },
          { value: 1, label: "Core Founder" },
          { value: Math.max(members.length - 1, 0), label: "Orbit Members" },
        ].map(({ value, label }) => (
          <div
            key={label}
            className="rounded-xl border border-violet-300/12 bg-white/[0.03] px-4 py-4 text-center"
          >
            <p className="text-2xl font-semibold text-white">{value}</p>
            <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-violet-200/55">{label}</p>
          </div>
        ))}
      </div>

      {/* Mobile card grid fallback */}
      <div className="relative mx-auto mt-10 px-6 max-w-xl sm:hidden">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-violet-400/60 mb-5">Full Team</p>
        <div className="grid grid-cols-3 gap-5">
          {members.map((m) => (
            <button
              key={m.name}
              className="flex flex-col items-center gap-1.5 group focus:outline-none"
              aria-label={`${m.name}, ${m.job}`}
            >
              <div
                className="relative overflow-hidden rounded-full transition-transform duration-200 group-active:scale-95"
                style={{
                  width: 56,
                  height: 56,
                  border: `2px solid ${m.accent}55`,
                }}
              >
                <MemberAvatar member={m} size={56} />
              </div>
              <p className="text-[10px] font-medium text-white/80 text-center leading-tight truncate w-full">{m.name}</p>
              <p className="text-[9px] text-center leading-tight truncate w-full" style={{ color: m.accent }}>{m.job}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
