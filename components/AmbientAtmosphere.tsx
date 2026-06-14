"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseOpacity: number;
  opacity: number;
  size: number;
}

interface AmbientAtmosphereProps {
  variant?: "default" | "hero" | "intense";
}

export default function AmbientAtmosphere({ variant = "default" }: AmbientAtmosphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const nodes: Node[] = [];
    const nodeCount = variant === "hero" ? 60 : 40;
    const connectionDist = 180;
    const cursorInfluence = 150;

    for (let i = 0; i < nodeCount; i++) {
      const baseOpacity = Math.random() * 0.4 + 0.3;
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        baseOpacity,
        opacity: baseOpacity,
        size: Math.random() * 1.5 + 1,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < cursorInfluence) {
          const force = (1 - dist / cursorInfluence) * 0.3;
          node.x += dx * force * 0.02;
          node.y += dy * force * 0.02;
          node.opacity = Math.min(node.baseOpacity + force * 0.5, 0.8);
        } else {
          node.opacity += (node.baseOpacity - node.opacity) * 0.05;
        }
      });

      nodes.forEach((n1, i) => {
        nodes.slice(i + 1).forEach((n2) => {
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.15;
            const mouseDistToMid = Math.sqrt(
              Math.pow(mouse.x - (n1.x + n2.x) / 2, 2) +
              Math.pow(mouse.y - (n1.y + n2.y) / 2, 2)
            );
            const boost = mouseDistToMid < cursorInfluence ? 0.12 : 0;

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha + boost})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      nodes.forEach((node) => {
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 2.5);
        gradient.addColorStop(0, `rgba(167, 139, 250, ${node.opacity * 0.9}`);
        gradient.addColorStop(0.4, `rgba(139, 92, 246, ${node.opacity * 0.5}`);
        gradient.addColorStop(1, "rgba(139, 92, 246, 0)");

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${node.opacity * 0.7})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.85,
        mixBlendMode: "screen",
      }}
    />
  );
}
