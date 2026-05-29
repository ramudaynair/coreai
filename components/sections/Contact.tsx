"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContactData } from "@/types";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import type { ReactElement } from "react";

gsap.registerPlugin(ScrollTrigger);

interface ContactProps { data?: ContactData; }

export default function Contact({ data }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const errorTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ct-left > *",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" } }
      );
      gsap.fromTo(".ct-right",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };
  }, []);

  if (!data) return null;

  const scheduleStatusReset = () => {
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }
    errorTimeoutRef.current = setTimeout(() => {
      setStatus("idle");
      setErrorMessage("");
      errorTimeoutRef.current = null;
    }, 4000);
  };

  const setErrorWithReset = (message: string) => {
    setStatus("error");
    setErrorMessage(message);
    scheduleStatusReset();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (!name || !email || !message) {
      setErrorWithReset("Please fill in name, email, and message.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorWithReset("Please enter a valid email address.");
      return;
    }

    if (!accessKey) {
      setErrorWithReset("Missing form configuration. Please try again later.");
      console.error("NEXT_PUBLIC_WEB3FORMS_KEY is not configured.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_key: accessKey, name, email, message }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        setStatus("success");
        setErrorMessage("");
        setFormData({ name: "", email: "", message: "" });
        scheduleStatusReset();
      } else {
        const bodyText = await res.text();
        console.error("Web3Forms submission failed:", res.status, bodyText);
        setErrorWithReset(`Submission failed (${res.status}). Please try again.`);
      }
    } catch (error) {
      clearTimeout(timeoutId);
      console.error("Contact form submission error:", error);
      setErrorWithReset(error instanceof DOMException && error.name === "AbortError"
        ? "Request timed out. Please try again."
        : "Something went wrong. Try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const inputStyle = (name: string): React.CSSProperties => ({
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focused === name ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)"}`,
    padding: "12px 0",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s ease",
    fontFamily: "var(--font-sans), Inter, sans-serif",
    fontWeight: 400,
  });

  return (
    <section id="contact" ref={sectionRef} style={{ padding: "128px 0 0", background: "#080808", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "rgba(255,255,255,0.05)" }} />

      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 32px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "96px",
          alignItems: "start",
        }} className="ct-grid">

          {/* Left — info */}
          <div className="ct-left" style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            <div className="eyebrow" style={{ color: "#5C46B6", opacity: 0, display: "inline-flex", alignItems: "center", gap: "10px" }}>
              <span style={{ width: "1px", height: "16px", background: "#5C46B6", display: "inline-block", borderRadius: 0 }} />
              Get In Touch
            </div>

            <h2 style={{
              opacity: 0,
              fontFamily: "var(--font-heading), Space Grotesk, sans-serif",
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#fff",
              marginBottom: "28px",
            }}>
              Let&apos;s build<br />
              <span style={{ color: "rgba(255,255,255,0.28)" }}>something together</span>
            </h2>

            <p style={{
              opacity: 0,
              fontSize: "15px",
              color: "rgba(255,255,255,0.38)",
              lineHeight: 1.75,
              fontFamily: "var(--font-sans), Inter, sans-serif",
              marginBottom: "56px",
            }}>
              Have a question or want to collaborate? We&apos;d love to hear from you.
            </p>

            {/* Contact details */}
            <div style={{ opacity: 0, display: "flex", flexDirection: "column", gap: "0" }}>
              {[
                { label: "Address", value: data.address },
                { label: "Phone",   value: data.phone },
                { label: "Email",   value: data.email },
              ].map(({ label, value }) => (
                <div key={label} style={{
                  display: "flex",
                  gap: "24px",
                  padding: "16px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}>
                  <span style={{
                    fontFamily: "var(--font-sans), Inter, sans-serif",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.2)",
                    minWidth: "64px",
                    paddingTop: "1px",
                  }}>
                    {label}
                  </span>
                  <span style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.55)",
                    fontFamily: "var(--font-sans), Inter, sans-serif",
                    lineHeight: 1.5,
                  }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Social */}
            <div style={{ opacity: 0, marginTop: "32px", display: "flex", gap: "16px" }}>
              {[
                data.instagram
                  ? {
                      href: `https://instagram.com/${data.instagram}`,
                      label: "Instagram",
                      svg: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
                    }
                  : null,
                data.twitter
                  ? {
                      href: "https://www.linkedin.com/company/core-ai-toch/",
                      label: "LinkedIn",
                      svg: <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.026-3.036-1.849-3.036-1.849 0-2.132 1.444-2.132 2.939v5.666H9.358V9h3.414v1.561h.049c.476-.9 1.637-1.849 3.369-1.849 3.601 0 4.266 2.37 4.266 5.455v6.285zM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126zM7.114 20.452H3.56V9h3.554v11.452z"/></svg>,
                    }
                  : null,
              ].filter((item): item is { href: string; label: string; svg: ReactElement } => Boolean(item)).map(({ href, label, svg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "rgba(183,160,255,0.9)",
                    fontSize: "12px",
                    fontFamily: "var(--font-sans), Inter, sans-serif",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    transition: "color 0.2s ease, text-shadow 0.2s ease, transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "#f7f2ff";
                    el.style.textShadow = "0 0 14px rgba(124,92,255,0.8), 0 0 24px rgba(124,92,255,0.45)";
                    el.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "rgba(183,160,255,0.9)";
                    el.style.textShadow = "none";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  {svg}
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="ct-right" style={{ opacity: 0, paddingTop: "8px" }}>
            <form onSubmit={handleSubmit} suppressHydrationWarning style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="ct-form-row">
                {[
                  { name: "name",  type: "text",  placeholder: "Name" },
                  { name: "email", type: "email", placeholder: "Email" },
                ].map(({ name, type, placeholder }) => (
                  <div key={name}>
                    <input
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      value={formData[name as keyof typeof formData]}
                      onChange={handleChange}
                      onFocus={() => setFocused(name)}
                      onBlur={() => setFocused(null)}
                      required
                      spellCheck={true}
                      autoComplete={name === "name" ? "name" : "email"}
                      suppressHydrationWarning
                      style={inputStyle(name)}
                    />
                  </div>
                ))}
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  required
                  rows={6}
                  spellCheck={false}
                  autoComplete="off"
                  data-gramm="false"
                  data-enable-grammarly="false"
                  suppressHydrationWarning
                  style={{ ...inputStyle("message"), resize: "none" }}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  suppressHydrationWarning
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 24px",
                    background: status === "loading" ? "rgba(92,70,182,0.4)" : "#5C46B6",
                    color: "#fff",
                    border: "none",
                    borderLeft: status === "loading" ? "3px solid rgba(167,139,250,0.3)" : "3px solid #a78bfa",
                    borderRadius: "2px",
                    fontFamily: "'SF Mono', 'Fira Code', monospace",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase" as const,
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                    transition: "background 0.15s ease, transform 0.15s ease",
                  }}
                >
                  <Send size={13} />
                  {status === "loading" ? "Sending..." : "Send Message"}
                </motion.button>

                {status === "success" && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.4)",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    Message sent — we&apos;ll be in touch.
                  </motion.span>
                )}
                {status === "error" && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ fontSize: "13px", color: "#f87171", fontFamily: "var(--font-sans)" }}
                  >
                    {errorMessage || "Something went wrong. Try again."}
                  </motion.span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: "128px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "28px 32px",
        maxWidth: "1160px",
        margin: "128px auto 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "12px",
      }}>
        <p style={{
          color: "rgba(255,255,255,0.18)",
          fontSize: "12px",
          fontFamily: "var(--font-sans), Inter, sans-serif",
          letterSpacing: "0.02em",
        }}>
          © {new Date().getFullYear()} Core AI Toc H Institute of Science and Technology
        </p>
        <p style={{
          color: "rgba(255,255,255,0.12)",
          fontSize: "12px",
          fontFamily: "var(--font-sans), Inter, sans-serif",
        }}>
          All rights reserved
        </p>
      </div>

      <style>{`
        .ct-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 768px) {
          .ct-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
          .ct-form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
