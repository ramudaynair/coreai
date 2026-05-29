"use client";

import { CSSProperties, MouseEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { section: "about", label: "About" },
  { section: "services", label: "Vision" },
  { section: "gallery", label: "Gallery" },
  { section: "team", label: "Team" },
  { section: "contact", label: "Contact" },
] as const;

type SectionId = (typeof navItems)[number]["section"];

const isSectionId = (value: string): value is SectionId =>
  navItems.some((item) => item.section === value);

const NAVBAR_HEIGHT = 72;

export default function Navigation() {
  const [active, setActive] = useState<SectionId | "">("");
  const pathname = usePathname();
  const router = useRouter();
  const lastActiveRef = useRef<SectionId | "">("");
  const scrollLockUntilRef = useRef(0);
  const pendingSectionRef = useRef<SectionId | "">("");

  const goHome = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollLockUntilRef.current = Date.now() + 1200;
    lastActiveRef.current = "";
    setActive("");
    window.history.replaceState({}, "", "/");
    window.__lenis?.scrollTo(0, { duration: 1.2 });
  };

  const goToSection = (section: SectionId, event: MouseEvent<HTMLAnchorElement>) => {
    // If not on home page, navigate to home first
    if (pathname !== "/") {
      event.preventDefault();
      pendingSectionRef.current = section;
      router.push(`/#${section}`);
      return;
    }

    // On home page - prevent default and scroll smoothly
    event.preventDefault();
    scrollLockUntilRef.current = Date.now() + 1200;

    const targetEl = document.getElementById(section);
    if (targetEl) {
      lastActiveRef.current = section;
      setActive(section);
      window.history.replaceState({}, "", `/${section}`);
      const targetTop = targetEl.offsetTop;
      window.__lenis?.scrollTo(targetTop, { duration: 1.2 });
    }
  };

  useEffect(() => {
    // Handle pending section scroll after navigation from other pages
    if (pathname === "/" && pendingSectionRef.current) {
      const section = pendingSectionRef.current;
      pendingSectionRef.current = "";

      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        const targetEl = document.getElementById(section);
        if (targetEl) {
          lastActiveRef.current = section;
          setActive(section);
          window.history.replaceState({}, "", `/${section}`);
          const targetTop = targetEl.offsetTop;
          window.__lenis?.scrollTo(targetTop, { duration: 1.2 });
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  useEffect(() => {
    const ids = navItems.map((item) => item.section);
    let frameId = 0;

    const updateActive = () => {
      if (Date.now() < scrollLockUntilRef.current) return;

      const markerY = Math.min(window.innerHeight - 1, Math.max(NAVBAR_HEIGHT + 24, window.innerHeight * 0.45));
      const elementAtMarker = document.elementFromPoint(window.innerWidth * 0.5, markerY);
      let nextSection: SectionId | "" = "";

      let current: Element | null = elementAtMarker;
      while (current) {
        const id = (current as HTMLElement).id;
        if (isSectionId(id)) {
          nextSection = id;
          break;
        }
        current = current.parentElement;
      }

      if (!nextSection) {
        let closest = "";
        let closestDist = Number.POSITIVE_INFINITY;
        for (const id of ids) {
          const el = document.getElementById(id);
          if (!el) continue;
          const dist = Math.abs(el.getBoundingClientRect().top - markerY);
          if (dist < closestDist) {
            closest = id;
            closestDist = dist;
          }
        }
        nextSection = closest as SectionId | "";
      }

      // If near top of page, show home URL
      if (window.scrollY < (document.getElementById("about")?.offsetTop ?? Infinity) - NAVBAR_HEIGHT - 100) {
        if (lastActiveRef.current !== "") {
          lastActiveRef.current = "";
          setActive("");
          if (pathname !== "/") {
            window.history.replaceState({}, "", "/");
          }
        }
        return;
      }

      if (nextSection && nextSection !== lastActiveRef.current) {
        lastActiveRef.current = nextSection;
        setActive(nextSection);
        if (window.location.pathname !== `/${nextSection}`) {
          window.history.replaceState({}, "", `/${nextSection}`);
        }
      }
    };

    frameId = requestAnimationFrame(() => {
      updateActive();
      frameId = requestAnimationFrame(function tick() {
        updateActive();
        frameId = requestAnimationFrame(tick);
      });
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [pathname]);

const linkStyle = (section: SectionId): CSSProperties => ({
  padding: "10px 16px",
  fontSize: "11px",
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  borderRadius: 0,
  borderLeft: "1px solid rgba(255,255,255,0.08)",
  background: active === section ? "rgba(92,70,182,0.18)" : "rgba(255,255,255,0.02)",
  color: active === section ? "#f0e9ff" : "rgba(255,255,255,0.68)",
  boxShadow: active === section ? "inset 0 0 0 1px rgba(123,97,245,0.2)" : "none",
  transition: "color 0.15s ease, background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease",
  whiteSpace: "nowrap",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

const hoverLink = (e: React.MouseEvent<HTMLAnchorElement>, hovered: boolean) => {
  const el = e.currentTarget as HTMLElement;
  if (hovered) {
    el.style.color = "#f3ecff";
    el.style.background = "rgba(92,70,182,0.22)";
    el.style.borderColor = "rgba(123,97,245,0.32)";
    el.style.boxShadow = "inset 0 0 0 1px rgba(123,97,245,0.22)";
  } else if (el.getAttribute("data-active") === "true") {
    el.style.color = "#f0e9ff";
    el.style.background = "rgba(92,70,182,0.18)";
    el.style.borderColor = "rgba(123,97,245,0.2)";
    el.style.boxShadow = "inset 0 0 0 1px rgba(123,97,245,0.2)";
  } else {
    el.style.color = "rgba(255,255,255,0.72)";
    el.style.background = "rgba(255,255,255,0.02)";
    el.style.borderColor = "rgba(255,255,255,0.08)";
    el.style.boxShadow = "none";
  }
};

return (
  <motion.nav
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6, delay: 0.1 }}
    style={{
      position: "fixed",
      top: 0,
      width: "100%",
      zIndex: 100,
      transition: "background 0.35s ease, border-color 0.35s ease",
      background: "transparent",
      backdropFilter: "none",
      borderBottom: "1px solid rgba(255,255,255,0.04)",
    }}
  >
    <div
      style={{
        maxWidth: "1160px",
        margin: "0 auto",
        padding: "0 32px",
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        alignItems: "center",
        gap: "16px",
        height: "72px",
      }}
    >
      <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }} onClick={goHome}>
        <Image
          src="/img/core.ai light.png"
          alt="Core AI"
          width={132}
          height={42}
          style={{ height: 38, width: "auto", objectFit: "contain" }}
          priority
        />
      </Link>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            padding: 0,
            borderRadius: 4,
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
            overflowX: "auto",
            maxWidth: "100%",
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.section}
              href={`/${item.section}`}
              scroll={false}
              data-active={active === item.section}
              style={{ ...linkStyle(item.section), textDecoration: "none" }}
              onClick={(e) => goToSection(item.section, e)}
              onMouseEnter={(e) => hoverLink(e, true)}
              onMouseLeave={(e) => hoverLink(e, false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <Link
          href="/studentproject"
          style={{
            padding: "10px 16px",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            background: "transparent",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "rgba(92,70,182,0.22)",
            borderRadius: "2px",
            borderLeftWidth: "3px",
            borderLeftColor: "#5C46B6",
            whiteSpace: "nowrap",
            transition: "color 0.15s ease, transform 0.15s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.color = "#fff";
            el.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.color = "rgba(255,255,255,0.5)";
            el.style.transform = "translateY(0)";
          }}
        >
          Projects
        </Link>
      </div>
    </div>
  </motion.nav>
);
}
