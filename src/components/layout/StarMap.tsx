import { useEffect, useRef } from "react";
import { CONSTELLATIONS } from "@/data/constellations";
import type { ConstellationData } from "@/lib/types";

// Star map constants
const PARALLAX_FACTOR = 0.35;
const PARTICLE_LINK_DISTANCE = 100;
const MOUSE_LINK_DISTANCE = 180;
const MOUSE_GLOW_RADIUS = 80;
const TOTAL_SKY_MULTIPLIER = 5;
const SHOOTING_STAR_CHANCE = 0.003;
const MAX_SHOOTING_STARS = 3;

// Responsive constants based on screen width
function getResponsiveConfig(w: number) {
  const isMobile = w < 768;
  return {
    bgStarCount: isMobile ? 150 : 300,
    particleCount: isMobile ? 60 : 140,
    constellationCols: isMobile ? 1 : w < 1024 ? 2 : 3,
    constellationScale: isMobile ? 0.7 : 1,
  };
}

interface BgStar {
  x: number;
  y: number;
  r: number;
  b: number;
  ph: number;
  spd: number;
  // drift for moving stars
  vx: number;
  vy: number;
}

interface PlacedConstellation extends ConstellationData {
  cx: number;
  cy: number;
  sz: number;
  rot: number;
  ph: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  b: number;
  ph: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  length: number;
  brightness: number;
}

export default function StarMap() {
  const cvs = useRef<HTMLCanvasElement>(null);
  const anim = useRef<number>(0);
  const mouse = useRef({ x: -999, y: -999 });
  const scrollTarget = useRef(0);
  const scrollSmooth = useRef(0);
  const placed = useRef<PlacedConstellation[]>([]);
  const dots = useRef<Particle[]>([]);
  const shootingStars = useRef<ShootingStar[]>([]);

  useEffect(() => {
    const el = cvs.current;
    if (!el) return;
    const ctx = el.getContext("2d")!;
    let W = (el.width = window.innerWidth || 800);
    let H = (el.height = window.innerHeight || 600);
    let config = getResponsiveConfig(W);

    const makeBgStars = (count: number) =>
      Array.from({ length: count }, () => {
        const moving = Math.random() < 0.25;
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.4 + 0.2,
          b: Math.random(),
          ph: Math.random() * Math.PI * 2,
          spd: 0.5 + Math.random() * 2.5,
          vx: moving ? (Math.random() - 0.5) * 0.08 : 0,
          vy: moving ? (Math.random() - 0.5) * 0.08 : 0,
        };
      });

    let bgStars: BgStar[] = makeBgStars(config.bgStarCount);

    const layout = () => {
      const cols = config.constellationCols;
      const scale = config.constellationScale;
      const total = H * TOTAL_SKY_MULTIPLIER;
      const rows = Math.ceil(CONSTELLATIONS.length / cols);
      const cW = (W - (W < 768 ? 40 : 100)) / cols;
      const cH = total / rows;
      placed.current = CONSTELLATIONS.map((c, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        return {
          ...c,
          cx: (W < 768 ? 20 : 50) + col * cW + cW * (0.15 + Math.random() * 0.6),
          cy: row * cH + cH * (0.15 + Math.random() * 0.6),
          sz: Math.min(cW, cH) * (0.35 + Math.random() * 0.25) * scale,
          rot: (Math.random() - 0.5) * 0.4,
          ph: Math.random() * Math.PI * 2,
        };
      });
    };
    layout();

    const makeParticles = (count: number) =>
      Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.8 + 0.5,
        b: Math.random(),
        ph: Math.random() * Math.PI * 2,
      }));

    dots.current = makeParticles(config.particleCount);

    const spawnShootingStar = () => {
      const angle = Math.PI * 0.15 + Math.random() * Math.PI * 0.25; // roughly diagonal
      const speed = 6 + Math.random() * 8;
      shootingStars.current.push({
        x: Math.random() * W * 0.8,
        y: Math.random() * H * 0.4,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 0.6 + Math.random() * 0.6,
        length: 60 + Math.random() * 100,
        brightness: 0.7 + Math.random() * 0.3,
      });
    };

    const project = (s: { x: number; y: number }, c: PlacedConstellation, sc: number) => {
      const dx = s.x - 0.5;
      const dy = s.y - 0.5;
      const co = Math.cos(c.rot);
      const si = Math.sin(c.rot);
      return {
        x: c.cx + (dx * co - dy * si) * c.sz,
        y: c.cy + (dx * si + dy * co) * c.sz - sc * PARALLAX_FACTOR,
      };
    };

    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      const t = performance.now() * 0.001;
      // Smooth scroll interpolation — prevents janky updates on mobile
      scrollSmooth.current += (scrollTarget.current - scrollSmooth.current) * 0.15;
      const sc = scrollSmooth.current;

      // Layer 1: Background stars (brighter + some moving)
      for (const s of bgStars) {
        // Move drifting stars
        if (s.vx !== 0 || s.vy !== 0) {
          s.x += s.vx;
          s.y += s.vy;
          if (s.x < 0) s.x = W;
          if (s.x > W) s.x = 0;
          if (s.y < 0) s.y = H;
          if (s.y > H) s.y = 0;
        }

        const twinkle = 0.3 + 0.7 * ((Math.sin(t * s.spd + s.ph) + 1) * 0.5);
        const alpha = (0.3 + 0.7 * s.b) * twinkle; // brighter base (was 0.15 + 0.6)
        const warm = s.b > 0.7;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * (0.7 + 0.3 * twinkle), 0, Math.PI * 2);
        ctx.fillStyle = warm
          ? `rgba(255,225,150,${alpha})`  // brighter warm stars
          : `rgba(210,220,240,${alpha * 0.8})`; // brighter cool stars
        ctx.fill();
        if (s.b > 0.75 && s.r > 0.8) { // more stars get halos (was 0.85 and 1)
          const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 7);
          g.addColorStop(0, `rgba(212,168,67,${alpha * 0.35})`);
          g.addColorStop(1, "rgba(212,168,67,0)");
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 7, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }
      }

      // Layer 2: Constellation patterns
      for (const c of placed.current) {
        const ss = c.stars.map((s) => project(s, c, sc));
        if (!ss.some((s) => s.x > -250 && s.x < W + 250 && s.y > -250 && s.y < H + 250)) continue;
        const br = 0.75 + 0.25 * Math.sin(t * 0.5 + c.ph);

        for (const [a, b] of c.lines) {
          ctx.beginPath();
          ctx.moveTo(ss[a].x, ss[a].y);
          ctx.lineTo(ss[b].x, ss[b].y);
          ctx.strokeStyle = `rgba(212,168,67,${0.22 * br})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(ss[a].x, ss[a].y);
          ctx.lineTo(ss[b].x, ss[b].y);
          ctx.strokeStyle = `rgba(212,168,67,${0.06 * br})`;
          ctx.lineWidth = 3;
          ctx.stroke();
        }

        ss.forEach((s, i) => {
          const mg = c.mag?.[i] ?? 3;
          const r = Math.max(1.2, (5 - mg) * 1.1);
          const fl = 0.65 + 0.35 * Math.sin(t * 1.5 + i * 1.3 + c.ph);
          const a = Math.min(1, (0.5 + 0.5 * ((5 - mg) / 5)) * br * fl);

          const haloR = mg < 1.5 ? r * 12 : mg < 2.5 ? r * 8 : r * 5;
          const haloA = mg < 1.5 ? a * 0.4 : mg < 2.5 ? a * 0.25 : a * 0.12;
          const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, haloR);
          g.addColorStop(0, `rgba(240,200,80,${haloA})`);
          g.addColorStop(0.4, `rgba(212,168,67,${haloA * 0.4})`);
          g.addColorStop(1, "rgba(212,168,67,0)");
          ctx.beginPath();
          ctx.arc(s.x, s.y, haloR, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,235,170,${a})`;
          ctx.fill();
          if (mg < 2) {
            ctx.beginPath();
            ctx.arc(s.x, s.y, r * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,240,${a * 0.9})`;
            ctx.fill();
          }
        });

        const cen = ss.reduce(
          (acc, s) => ({ x: acc.x + s.x / ss.length, y: acc.y + s.y / ss.length }),
          { x: 0, y: 0 }
        );
        if (cen.x > 0 && cen.x < W && cen.y > 0 && cen.y < H) {
          ctx.font = "500 10px monospace";
          ctx.textAlign = "center";
          ctx.fillStyle = `rgba(212,168,67,${0.25 * br})`;
          ctx.fillText(c.name.toUpperCase(), cen.x, Math.max(...ss.map((s) => s.y)) + 22);
        }
      }

      // Layer 3: Floating ambient particles (brighter links)
      for (let i = 0; i < dots.current.length; i++) {
        const p = dots.current[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        const fl = 0.4 + 0.6 * Math.sin(t * 2 + p.ph);
        const alpha = 0.35 + 0.6 * p.b * fl; // brighter particles (was 0.25 + 0.55)

        if (p.b > 0.5) {
          const pg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
          pg.addColorStop(0, `rgba(212,168,67,${alpha * 0.25})`);
          pg.addColorStop(1, "rgba(212,168,67,0)");
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
          ctx.fillStyle = pg;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230,200,110,${alpha})`; // brighter particle color
        ctx.fill();

        // Particle-to-particle links (brighter)
        for (let j = i + 1; j < dots.current.length; j++) {
          const p2 = dots.current[j];
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < PARTICLE_LINK_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(212,168,67,${0.14 * (1 - d / PARTICLE_LINK_DISTANCE)})`; // brighter (was 0.08)
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        // Mouse-linked connections (brighter)
        const md = Math.hypot(p.x - mouse.current.x, p.y - mouse.current.y);
        if (md < MOUSE_LINK_DISTANCE) {
          const strength = 1 - md / MOUSE_LINK_DISTANCE;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.current.x, mouse.current.y);
          ctx.strokeStyle = `rgba(245,210,90,${0.45 * strength})`; // much brighter (was 0.25)
          ctx.lineWidth = 1.0 + strength * 0.8; // thicker lines
          ctx.stroke();
        }
      }

      // Mouse cursor glow (brighter)
      if (mouse.current.x > 0 && mouse.current.y > 0) {
        const mg = ctx.createRadialGradient(
          mouse.current.x, mouse.current.y, 0,
          mouse.current.x, mouse.current.y, MOUSE_GLOW_RADIUS
        );
        mg.addColorStop(0, "rgba(245,210,90,0.12)"); // brighter glow (was 0.06)
        mg.addColorStop(1, "rgba(245,210,90,0)");
        ctx.beginPath();
        ctx.arc(mouse.current.x, mouse.current.y, MOUSE_GLOW_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = mg;
        ctx.fill();
      }

      // Layer 4: Shooting stars
      if (Math.random() < SHOOTING_STAR_CHANCE && shootingStars.current.length < MAX_SHOOTING_STARS) {
        spawnShootingStar();
      }

      for (let i = shootingStars.current.length - 1; i >= 0; i--) {
        const ss = shootingStars.current[i];
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.life -= 0.018 / ss.maxLife;

        if (ss.life <= 0 || ss.x > W + 100 || ss.y > H + 100) {
          shootingStars.current.splice(i, 1);
          continue;
        }

        const fadeIn = Math.min(1, (1 - ss.life) * 5); // quick fade in
        const fadeOut = Math.min(1, ss.life * 3); // gradual fade out
        const opacity = fadeIn * fadeOut * ss.brightness;

        // Tail
        const tailX = ss.x - (ss.vx / Math.hypot(ss.vx, ss.vy)) * ss.length * opacity;
        const tailY = ss.y - (ss.vy / Math.hypot(ss.vx, ss.vy)) * ss.length * opacity;

        const grad = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255,240,200,${opacity * 0.9})`);
        grad.addColorStop(0.3, `rgba(240,200,80,${opacity * 0.5})`);
        grad.addColorStop(1, `rgba(212,168,67,0)`);

        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Head glow
        const headGlow = ctx.createRadialGradient(ss.x, ss.y, 0, ss.x, ss.y, 4);
        headGlow.addColorStop(0, `rgba(255,250,230,${opacity})`);
        headGlow.addColorStop(1, `rgba(255,240,200,0)`);
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = headGlow;
        ctx.fill();
      }

      anim.current = requestAnimationFrame(frame);
    };
    frame();

    const onResize = () => {
      W = el.width = window.innerWidth || 800;
      H = el.height = window.innerHeight || 600;
      config = getResponsiveConfig(W);
      bgStars = makeBgStars(config.bgStarCount);
      dots.current = makeParticles(config.particleCount);
      layout();
    };
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const onScroll = () => {
      scrollTarget.current = window.scrollY || 0;
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(anim.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={cvs}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
}
