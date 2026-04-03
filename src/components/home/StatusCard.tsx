import { useState } from "react";
import { motion } from "motion/react";
import { PROFILE } from "@/data/profile";

interface StatusCardProps {
  onClick: () => void;
}

export default function StatusCard({ onClick }: StatusCardProps) {
  const [h, setH] = useState(false);
  const [inView, setInView] = useState(false);

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onViewportEnter={() => setInView(true)}
      className="max-w-[560px] w-full cursor-pointer rounded-[10px] bg-orv-panel/[0.92] backdrop-blur-md overflow-hidden transition-all duration-500 animate-border-glow"
      style={{
        border: "1px solid",
        borderColor: h ? "rgba(212,168,67,0.5)" : "rgba(212,168,67,0.25)",
        boxShadow: h
          ? "0 0 50px rgba(212,168,67,0.12)"
          : "0 0 30px rgba(212,168,67,0.06)",
      }}
    >
      {/* Title bar */}
      <div className="py-3 px-5 border-b border-gold/15 flex justify-between items-center bg-gold/[0.04]">
        <span className="font-serif text-gold text-[0.82rem] tracking-[0.15em]">
          {"◈ STATUS WINDOW ◈"}
        </span>
        <div className="flex gap-[5px]">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-[7px] h-[7px] rounded-full border border-gold/30"
            />
          ))}
        </div>
      </div>

      <div className="py-5 px-5">
        {/* Top: bigger photo + name side by side */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src="/PXL_20250420_095839873~2.jpg"
            alt={PROFILE.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-gold/25 shadow-[0_0_16px_rgba(212,168,67,0.18)] shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="font-serif text-white text-[1.1rem] leading-tight mb-1.5">{PROFILE.name}</div>
            <div className="font-mono text-gold text-[0.78rem] border border-gold/30 rounded py-0.5 px-2.5 bg-gold/[0.06] inline-block">
              LV. {PROFILE.level}
            </div>
          </div>
        </div>

        {/* Info below */}
        <div className="mb-4">
          <div className="font-mono text-gold text-[0.65rem] tracking-wide mb-0.5">
            {PROFILE.class}
          </div>
          <div className="font-mono text-white/35 text-[0.6rem]">
            {PROFILE.title} · Age {PROFILE.age}
          </div>
          <div className="font-mono text-white/25 text-[0.55rem] mt-0.5">
            ⌜{PROFILE.constellation}⌟
          </div>
        </div>

        {/* Skill domain bars */}
        {Object.entries(PROFILE.bars).map(([k, val], i) => (
          <div key={k} className="mb-2.5">
            <div className="flex justify-between mb-[3px]">
              <span className="font-mono text-white/50 text-[0.66rem] tracking-wide">
                {k}
              </span>
              <span className="font-mono text-gold text-[0.66rem]">{val}</span>
            </div>
            <div className="h-[3px] bg-white/[0.06] rounded-sm overflow-hidden">
              <div
                className="h-full rounded-sm bg-gradient-to-r from-gold to-gold-bright shadow-[0_0_8px_rgba(212,168,67,0.4)]"
                style={{
                  width: inView ? val + "%" : "0%",
                  transition: `width 1.2s cubic-bezier(.16,1,.3,1)`,
                  transitionDelay: `${0.3 + i * 0.12}s`,
                }}
              />
            </div>
          </div>
        ))}
        <div className="text-center mt-3.5 font-mono text-[0.6rem] text-gold/35 tracking-[0.15em] animate-pulse">
          [ CLICK TO VIEW FULL PROFILE ]
        </div>
      </div>
    </motion.div>
  );
}
