import { useState, useEffect } from "react";
import Typewriter from "@/components/ui/Typewriter";

export default function HeroSection() {
  const [heroReady, setHeroReady] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showSub, setShowSub] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroReady(true), 200);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center relative px-5 z-[1]">
      <div className="mb-10">
        {heroReady && (
          <Typewriter
            text="[System Alert: A new scenario has been detected.]"
            delay={300}
            onDone={() => setShowTitle(true)}
          />
        )}
        {heroReady && (
          <Typewriter
            text="[The Incarnation 'Cheikh Ahmed Tidiane Cherif MBAYE' has entered the Star Stream.]"
            delay={2500}
            highlight={{ start: 18, end: 51, className: "text-white font-semibold drop-shadow-[0_0_8px_rgba(212,168,67,0.6)]" }}
          />
        )}
        {heroReady && (
          <Typewriter
            text="[Loading Status Window...]"
            delay={5000}
            speed={40}
            dim
            onDone={() => setShowSub(true)}
          />
        )}
      </div>
      <div
        className="transition-all duration-1000"
        style={{
          opacity: showTitle ? 1 : 0,
          transform: showTitle ? "none" : "translateY(20px)",
          transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
        }}
      >
        <h1 className="font-serif text-[clamp(2rem,6vw,3.5rem)] font-bold text-white tracking-wide leading-tight">
          Omniscient
          <br />
          <span className="text-gold">Developer&apos;s</span>
          <br />
          Viewpoint
        </h1>
        <div className="w-[50px] h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto my-6" />
        <p className="font-sans text-white/45 text-[0.95rem] font-light tracking-[0.18em]">
          FULL STACK DEVELOPER
        </p>
      </div>
      <div
        className="absolute bottom-9 left-1/2 -translate-x-1/2 font-mono text-[0.62rem] text-gold tracking-[0.2em] flex flex-col items-center transition-opacity duration-1000"
        style={{ opacity: showSub ? 0.4 : 0 }}
      >
        SCROLL TO BEGIN
        <div className="w-px h-7 bg-gradient-to-b from-gold to-transparent mt-2" />
      </div>
    </section>
  );
}
