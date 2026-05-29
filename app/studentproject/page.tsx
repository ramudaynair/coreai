"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Users, ArrowLeft } from "lucide-react";
import { useState } from "react";
import Navigation from "@/components/sections/Navigation";
import SmoothScroll from "@/components/SmoothScroll";
import { Suspense } from "react";

interface Project {
  project_name: string;
  members: string[];
  description: string;
  link: string;
  image: string;
  tags?: string[];
}

const projects: Project[] = [
  {
    project_name: "KERALA GOC",
    members: ["Eldhose Saju"],
    tags: ["Python", "Streamlit", "GeoPandas", "Maps"],
    description: "Kerala: God's Own Country is an interactive web application developed using Python and Streamlit. It features interactive maps to explore major tourist destinations in Kerala and a responsive UI for both desktop and mobile devices.",
    link: "https://github.com/Eldhose-saju/KERALA_GOC",
    image: "/img/studentprojects/Eldhose_Saju.png",
  },
  {
    project_name: "Lifestyle Hub",
    members: ["Gayathri J S"],
    tags: ["Streamlit", "Python", "Habit Tracker"],
    description: "A comprehensive personal lifestyle management web application built with Streamlit. Features a home dashboard, calendar, habit tracker with visual progress, and a finance tracker to monitor expenses.",
    link: "https://github.com/Gayathriijs/Streamlit",
    image: "/img/studentprojects/Gayathri.png",
  },
  {
    project_name: "Real-time Stock Monitor",
    members: ["Aakash Rajeev"],
    tags: ["Streamlit", "Gemini AI", "Plotly", "Alpha Vantage"],
    description: "Real-Time Stock Market Monitoring using Streamlit, Alpha Vantage API, Gemini AI Integration, and Plotly visualizations.",
    link: "https://github.com/aakshpy/Real-time-Stock-Market-Monitoring",
    image: "/img/studentprojects/Aakash.png",
  },
  {
    project_name: "Churn Prediction (SVM)",
    members: ["Kiran Sreekanth"],
    tags: ["SVM", "scikit-learn", "Python"],
    description: "A Support Vector Machine Model to find and detect the number of churned members using classical ML techniques.",
    link: "https://github.com/kiransreekanth/SVM-model.git",
    image: "/img/studentprojects/kiran_sreekanth.jpg",
  },
  {
    project_name: "Churn Predictor",
    members: ["Deva Nanda Nair"],
    tags: ["pandas", "scikit-learn", "matplotlib"],
    description: "Predict customer churn using the Telco Customer Churn dataset and Python ML tools including pandas, scikit-learn, and matplotlib.",
    link: "https://github.com/devananda6200/churn-predictor",
    image: "/img/studentprojects/devananda.jpg",
  },
  {
    project_name: "CA House Price Prediction",
    members: ["Festin Biju"],
    tags: ["Regression", "scikit-learn", "Google Colab"],
    description: "Machine learning regression model to predict house prices using the California housing dataset. Built in Google Colab.",
    link: "https://github.com/FestinBiju/AI-ML-house-price-prediction",
    image: "/img/studentprojects/festin_biju.jpg",
  },
  {
    project_name: "House Price Prediction",
    members: ["Leela Bobby"],
    tags: ["Linear Regression", "Python"],
    description: "Simple house price prediction model using linear regression on standard housing datasets.",
    link: "https://github.com/githubleelabobby/House-Price-Prediction-ML-Project",
    image: "/img/studentprojects/leela.jpg",
  },
  {
    project_name: "Mandhi Finder",
    members: ["Fidhaan Ameer", "Irene Isaan", "Elson Biju"],
    tags: ["Web App", "Python", "Search"],
    description: "Find info about different types of mandhi and where to get them — a fun community-driven discovery app.",
    link: "https://github.com/Eldhose177/mandhi_finder.git",
    image: "/img/studentprojects/fein.jpg",
  },
];

export default function StudentProjects() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <SmoothScroll>
      <Suspense fallback={null}>
        <Navigation />
      </Suspense>
      <main style={{ minHeight: "100vh", background: "#080808" }}>

        {/* Header */}
        <div style={{
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          padding: "120px 32px 64px",
          maxWidth: "1160px",
          margin: "0 auto",
        }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "rgba(255,255,255,0.28)",
              fontSize: "12px",
              fontFamily: "var(--font-sans), Inter, sans-serif",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: "48px",
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.28)"; }}
          >
            <ArrowLeft size={13} />
            Back
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="eyebrow" style={{ color: "#5C46B6", display: "inline-flex", alignItems: "center", gap: "10px" }}>
              <span style={{ width: "1px", height: "16px", background: "#5C46B6", display: "inline-block", borderRadius: 0 }} />
              Core AI Community
            </div>
            <h1 style={{
              fontFamily: "var(--font-heading), Space Grotesk, sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 600,
              letterSpacing: "-0.035em",
              lineHeight: 0.95,
              color: "#fff",
              marginBottom: "24px",
            }}>
              Student<br />
              <span style={{ color: "rgba(255,255,255,0.25)" }}>Projects</span>
            </h1>
            <p style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: "15px",
              maxWidth: "440px",
              lineHeight: 1.7,
              fontFamily: "var(--font-sans), Inter, sans-serif",
            }}>
              Innovative AI &amp; ML projects built by our talented community members.
            </p>
          </motion.div>
        </div>

        {/* Projects grid */}
        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "64px 32px 128px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "18px",
          }}>
            {projects.map((project, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: "#151515",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "6px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#111"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#151515"; }}
              >
                {/* Image */}
                <div style={{ position: "relative", height: "340px", overflow: "hidden", background: "#121212" }}>
                  <Image
                    src={project.image}
                    alt={project.project_name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="eager"
                    style={{ objectFit: "contain", objectPosition: "center center", background: "#121212" }}
                  />
                </div>

                <div style={{
                  padding: "14px 20px",
                  background: "linear-gradient(180deg, #5E3CC7 0%, #4B2EA7 100%)",
                }}>
                  <h3 style={{
                    fontFamily: "var(--font-heading), Space Grotesk, sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#fff",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.25,
                    margin: 0,
                  }}>
                    {project.project_name}
                  </h3>
                </div>

                {/* Body */}
                <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Users size={12} color="rgba(255,255,255,0.25)" />
                      <span style={{
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.45)",
                        fontFamily: "var(--font-sans), Inter, sans-serif",
                        letterSpacing: "0.03em",
                        textTransform: "uppercase",
                      }}>
                        Members
                      </span>
                    </div>
                    <ul style={{
                      margin: 0,
                      paddingLeft: "18px",
                      color: "rgba(255,255,255,0.55)",
                      fontSize: "13px",
                      lineHeight: 1.6,
                      fontFamily: "var(--font-sans), Inter, sans-serif",
                    }}>
                      {project.members.map((member, memberIndex) => (
                        <li key={`${project.project_name}-${memberIndex}`}>{member}</li>
                      ))}
                    </ul>
                  </div>

                  <p style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.38)",
                    lineHeight: 1.7,
                    flex: 1,
                    fontFamily: "var(--font-sans), Inter, sans-serif",
                  }}>
                    {expandedIndex === index
                      ? project.description
                      : project.description.split(" ").slice(0, 22).join(" ") +
                        (project.description.split(" ").length > 22 ? "..." : "")}
                  </p>

                  {project.description.split(" ").length > 22 && (
                    <button
                      onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                      style={{
                        background: "none", border: "none", cursor: "pointer",
                        color: "rgba(92,70,182,0.75)",
                        fontSize: "12px",
                        fontFamily: "var(--font-sans), Inter, sans-serif",
                        padding: 0, textAlign: "left",
                        letterSpacing: "0.02em",
                        transition: "color 0.15s",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#5C46B6"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(92,70,182,0.75)"; }}
                    >
                      {expandedIndex === index ? "Show less" : "Read more"}
                    </button>
                  )}

                  <div style={{
                    marginTop: "6px",
                    paddingTop: "12px",
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                  }}>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        color: "rgba(255,255,255,0.4)",
                        fontSize: "12px",
                        fontFamily: "var(--font-sans), Inter, sans-serif",
                        letterSpacing: "0.04em",
                        transition: "color 0.15s ease",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.78)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"; }}
                    >
                      <ExternalLink size={12} />
                      View Project
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>
    </SmoothScroll>
  );
}
