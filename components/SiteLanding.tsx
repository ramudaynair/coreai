"use client";

import Navigation from "@/components/sections/Navigation";
import Header from "@/components/sections/Header";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Gallery from "@/components/sections/Gallery";
import Team from "@/components/sections/Team";
import Contact from "@/components/sections/Contact";
import SmoothScroll from "@/components/SmoothScroll";
import data from "@/data/data.json";
import { LandingPageData } from "@/types";
import { Suspense, useEffect } from "react";

const landingData = data as LandingPageData;

type SectionId = "about" | "services" | "gallery" | "team" | "contact";

export default function SiteLanding({ section }: { section?: SectionId } = {}) {
  useEffect(() => {
    if (!section) return;

    let intervalId: ReturnType<typeof setInterval> | undefined;
    let rafId: number | undefined;
    let attempts = 0;

    const tryScroll = () => {
      const lenis = typeof window !== "undefined" ? window.__lenis : undefined;
      if (lenis) {
        lenis.scrollTo(`#${section}`);
        clearInterval(intervalId);
      } else {
        attempts++;
        if (attempts >= 20) {
          document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
          clearInterval(intervalId);
        }
      }
    };

    rafId = window.requestAnimationFrame(() => {
      const lenis = typeof window !== "undefined" ? window.__lenis : undefined;
      if (lenis) {
        lenis.scrollTo(`#${section}`);
      } else {
        intervalId = setInterval(tryScroll, 50);
      }
    });

    return () => {
      if (rafId !== undefined) {
        window.cancelAnimationFrame(rafId);
      }
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [section]);

  return (
    <SmoothScroll>
      <main style={{ minHeight: "100vh" }}>
        <Suspense fallback={null}>
          <Navigation />
        </Suspense>
        <Header data={landingData.Header} />
        <About data={landingData.About} />
        <Services data={landingData.Services} />
        <Gallery data={landingData.Gallery} />
        <Team data={landingData.Team} />
        <Contact data={landingData.Contact} />
      </main>
    </SmoothScroll>
  );
}