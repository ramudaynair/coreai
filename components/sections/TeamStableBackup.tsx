"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { TeamMember } from "@/types";

interface TeamProps {
  data?: TeamMember[];
}

type OrbitMember = TeamMember & {
  accent: string;
  glow: string;
  ring: string;
};

const rolePalette: Record<string, { accent: string; glow: string; ring: string }> = {
  Founder: { accent: "#A855F7", glow: "rgba(168,85,247,0.6)", ring: "rgba(168,85,247,0.42)" },
  Lead: { accent: "#7C3AED", glow: "rgba(124,58,237,0.45)", ring: "rgba(124,58,237,0.34)" },
  "Technical Lead": { accent: "#06B6D4", glow: "rgba(6,182,212,0.42)", ring: "rgba(6,182,212,0.33)" },
  "Creative Lead": { accent: "#EC4899", glow: "rgba(236,72,153,0.42)", ring: "rgba(236,72,153,0.33)" },
  "Design Lead": { accent: "#F59E0B", glow: "rgba(245,158,11,0.42)", ring: "rgba(245,158,11,0.33)" },
  "Outreach Lead": { accent: "#22C55E", glow: "rgba(34,197,94,0.42)", ring: "rgba(34,197,94,0.33)" },
  "Media Lead": { accent: "#F43F5E", glow: "rgba(244,63,94,0.42)", ring: "rgba(244,63,94,0.33)" },
  "Research Lead": { accent: "#3B82F6", glow: "rgba(59,130,246,0.42)", ring: "rgba(59,130,246,0.33)" },
  "Co-Lead": { accent: "#14B8A6", glow: "rgba(20,184,166,0.42)", ring: "rgba(20,184,166,0.33)" },
};

const fallbackRole = { accent: "#8B5CF6", glow: "rgba(139,92,246,0.42)", ring: "rgba(139,92,246,0.33)" };

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function Avatar({ member, featured = false }: { member: OrbitMember; featured?: boolean }) {
  const src = member.imageSrc ?? member.img;
  const initials = getInitials(member.name);

  if (src) {
    return (
      <Image
        src={src.startsWith("/") ? src : `/${src}`}
        alt={member.name}
        fill
        sizes={featured ? "(max-width: 1024px) 260px, 300px" : "(max-width: 1024px) 72px, 88px"}
        className="object-cover"
      />
    );
  }

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background: `radial-gradient(circle at 22% 18%, rgba(255,255,255,0.32), transparent 42%), radial-gradient(circle at 76% 16%, ${member.ring}, transparent 34%), linear-gradient(145deg, #0d0618 12%, ${member.accent} 65%, #170a24 100%)`,
      }}
      aria-hidden="true"
    >
      <span className={featured ? "text-5xl font-semibold tracking-tight text-white" : "text-lg font-semibold tracking-tight text-white"}>
        {initials}
      </span>
    </div>
  );
}

function OrbitPortrait({
  member,
  active,
  dimmed,
  onHover,
  onLeave,
}: {
  member: OrbitMember;
  active: boolean;
  dimmed: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.05 }}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      className="group relative w-[6.25rem] text-center"
      style={{
        opacity: dimmed ? 0.34 : 0.78,
        filter: dimmed ? "grayscale(1)" : "grayscale(0.22)",
      }}
      aria-label={`${member.name} - ${member.job}`}
    >
      <div
        className="relative mx-auto h-[4.8rem] w-[4.8rem] overflow-hidden rounded-full border"
        style={{ borderColor: active ? member.ring : "rgba(255,255,255,0.12)", boxShadow: active ? `0 0 26px ${member.glow}` : "none" }}
      >
        <Avatar member={member} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
      </div>
      <p className="mt-2 truncate text-[11px] font-medium text-white/88">{member.name}</p>
      <p className="truncate text-[10px] tracking-[0.08em]" style={{ color: member.accent }}>
        {member.job}
      </p>
    </motion.article>
  );
}

function CoreDiamond({
  member,
  dimmed,
  onHover,
  onLeave,
}: {
  member: OrbitMember;
  dimmed: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      className="relative"
      style={{ opacity: dimmed ? 0.42 : 1 }}
      aria-label={`${member.name} - ${member.job}`}
    >
      <div className="pointer-events-none absolute -inset-24 rounded-full bg-violet-500/36 blur-[95px]" />
      <div className="relative h-[22.5rem] w-[22.5rem] rotate-45 overflow-hidden rounded-[2.7rem] border border-violet-300/40 bg-[#090612] shadow-[0_0_95px_rgba(139,92,246,0.5)]">
        <div className="absolute inset-[10px] overflow-hidden rounded-[2rem] border border-white/12 bg-[#0d0818]">
          <div className="absolute inset-0 -rotate-45 scale-[1.12]">
            <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-b from-white/8 to-black/55">
              <div className="relative h-full w-full">
                <Avatar member={member} featured />
                <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/20 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-12">
                <p className="text-xl font-semibold text-white">{member.name}</p>
                <p className="text-xs tracking-[0.1em]" style={{ color: member.accent }}>
                  {member.job}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Team({ data }: TeamProps) {
  const [activeName, setActiveName] = useState<string | null>(null);

  const { featured, orbitMembers, roleCount } = useMemo(() => {
    const roster = (data ?? []).map((member) => {
      const palette = rolePalette[member.job] ?? fallbackRole;
      return { ...member, ...palette } satisfies OrbitMember;
    });

    const core = roster.find((m) => m.job === "Founder") ?? roster[0];
    const orbit = roster.filter((m) => m.name !== core?.name);
    const uniqueRoles = new Set(roster.map((m) => m.job)).size;

    return { featured: core, orbitMembers: orbit, roleCount: uniqueRoles };
  }, [data]);

  if (!featured) return null;

  const orbitAngles = orbitMembers.map((_, index) => (360 / Math.max(orbitMembers.length, 1)) * index - 90);

  return (
    <section id="team" className="relative overflow-hidden bg-[#05020a] pb-20 pt-40 sm:pt-44 lg:pt-48">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-24 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-violet-600/22 blur-[125px]" />
        <div className="absolute left-[14%] top-80 h-72 w-72 rounded-full bg-violet-500/7 blur-[120px]" />
        <div className="absolute right-[14%] top-80 h-72 w-72 rounded-full bg-fuchsia-500/7 blur-[120px]" />
      </div>

      <div className="relative mx-auto hidden max-w-[1400px] grid-cols-[260px_1fr_260px] items-start gap-8 px-8 xl:grid">
        <motion.aside
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="pt-24"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-violet-300/80">Core AI Collective</p>
          <h2 className="text-4xl font-semibold tracking-tight text-white">One Core. Shared Orbit.</h2>
          <p className="mt-4 text-sm leading-relaxed text-violet-100/65">
            A cinematic map of leadership and contribution, centered on a single AI-first identity.
          </p>
        </motion.aside>

        <div className="relative h-[56rem]">
          <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
            <ellipse cx="50%" cy="49%" rx="39%" ry="27%" fill="none" stroke="rgba(167,139,250,0.2)" strokeWidth="1.15" />
            <ellipse cx="50%" cy="49%" rx="31.5%" ry="22%" fill="none" stroke="rgba(167,139,250,0.14)" strokeWidth="1" />
            <ellipse cx="50%" cy="49%" rx="24%" ry="17%" fill="none" stroke="rgba(167,139,250,0.1)" strokeWidth="0.9" />
          </svg>

          <div className="absolute left-1/2 top-[12rem] -translate-x-1/2">
            <CoreDiamond
              member={featured}
              dimmed={Boolean(activeName && activeName !== featured.name)}
              onHover={() => setActiveName(featured.name)}
              onLeave={() => setActiveName(null)}
            />
          </div>

          {orbitMembers.map((member, index) => {
            const angle = orbitAngles[index] ?? 0;
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * 315;
            const y = Math.sin(rad) * 230;

            return (
              <div
                key={member.name}
                className="absolute left-1/2 top-[23.25rem]"
                style={{ transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))` }}
              >
                <OrbitPortrait
                  member={member}
                  active={!activeName || activeName === member.name}
                  dimmed={Boolean(activeName && activeName !== member.name)}
                  onHover={() => setActiveName(member.name)}
                  onLeave={() => setActiveName(null)}
                />
              </div>
            );
          })}
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="pt-24"
        >
          <div className="rounded-2xl border border-violet-300/20 bg-white/[0.03] p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-violet-300/80">Insight</p>
            <p className="mt-4 text-base leading-relaxed text-white/90">
              &ldquo;The strength of Core AI is not one voice, but one direction. Every orbiting role compounds the core mission.&rdquo;
            </p>
            <p className="mt-4 text-xs tracking-[0.12em] text-violet-100/60">CORE AI TOC H</p>
          </div>
        </motion.aside>
      </div>

      <div className="relative mx-auto mt-10 hidden max-w-[1400px] grid-cols-4 gap-4 px-8 xl:grid">
        <div className="rounded-xl border border-violet-300/15 bg-white/[0.02] p-4">
          <p className="text-2xl font-semibold text-white">{(data ?? []).length}</p>
          <p className="text-xs uppercase tracking-[0.12em] text-violet-200/70">Total Team</p>
        </div>
        <div className="rounded-xl border border-violet-300/15 bg-white/[0.02] p-4">
          <p className="text-2xl font-semibold text-white">{roleCount}</p>
          <p className="text-xs uppercase tracking-[0.12em] text-violet-200/70">Role Domains</p>
        </div>
        <div className="rounded-xl border border-violet-300/15 bg-white/[0.02] p-4">
          <p className="text-2xl font-semibold text-white">1</p>
          <p className="text-xs uppercase tracking-[0.12em] text-violet-200/70">Core Founder</p>
        </div>
        <div className="rounded-xl border border-violet-300/15 bg-white/[0.02] p-4">
          <p className="text-2xl font-semibold text-white">{Math.max((data ?? []).length - 1, 0)}</p>
          <p className="text-xs uppercase tracking-[0.12em] text-violet-200/70">Orbit Members</p>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 xl:hidden">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-10 text-center"
        >
          <p className="mb-2 text-xs uppercase tracking-[0.24em] text-violet-300/80">Core AI Collective</p>
          <h2 className="text-3xl font-semibold text-white">One Core. Shared Orbit.</h2>
        </motion.div>

        <div className="mb-6 flex justify-center">
          <CoreDiamond
            member={featured}
            dimmed={Boolean(activeName && activeName !== featured.name)}
            onHover={() => setActiveName(featured.name)}
            onLeave={() => setActiveName(null)}
          />
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
          {orbitMembers.map((member) => (
            <div key={member.name} className="flex justify-center">
              <OrbitPortrait
                member={member}
                active={!activeName || activeName === member.name}
                dimmed={Boolean(activeName && activeName !== member.name)}
                onHover={() => setActiveName(member.name)}
                onLeave={() => setActiveName(null)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

