import { useState } from "react";
import { motion } from "motion/react";
import type { Stigma } from "@/lib/types";
import { TIER_COLOR } from "@/lib/constants";
import TierBadge from "@/components/ui/TierBadge";

interface StigmaDetailCardProps {
  s: Stigma;
  i: number;
}

export default function StigmaDetailCard({ s, i: idx }: StigmaDetailCardProps) {
  const [h, setH] = useState(false);
  const [inView, setInView] = useState(false);
  const pct = (s.lv / 10) * 100;

  return (
    <motion.div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay: (idx % 6) * 0.06 }}
      onViewportEnter={() => setInView(true)}
      className="rounded-lg p-5 backdrop-blur-[10px] transition-all duration-400 relative overflow-hidden stigma-pulse"
      style={{
        border: "1px solid",
        borderColor: h ? "rgba(212,168,67,0.5)" : "rgba(212,168,67,0.12)",
        background: h ? "rgba(212,168,67,0.06)" : "rgba(10,10,25,0.75)",
      }}
    >
      {h && (
        <div
          className="absolute -top-[30px] -right-[30px] w-20 h-20 pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(212,168,67,0.12) 0%,transparent 70%)" }}
        />
      )}

      <div className="flex justify-between items-start mb-2.5">
        <div className="flex items-center gap-[9px]">
          <img
            src={s.icon}
            alt={s.name}
            className="w-[1.3rem] h-[1.3rem] transition-[filter] duration-300"
            style={{ filter: h ? "brightness(1.3)" : "none" }}
          />
          <div>
            <div className="font-serif text-white text-[0.88rem]">{s.name}</div>
            <div className="font-mono text-[0.56rem] text-gold/50 tracking-wide mt-0.5">
              [{s.cat}]
            </div>
          </div>
        </div>
        <TierBadge tier={s.tier} />
      </div>

      <div className="font-mono text-white/40 text-[0.7rem] leading-relaxed mb-3.5">{s.desc}</div>

      <div>
        <div className="flex justify-between mb-1">
          <span className="font-mono text-[0.58rem] text-white/35 tracking-wide">MASTERY</span>
          <span className="font-mono text-[0.58rem] text-gold">LV. {s.lv} / 10</span>
        </div>
        <div className="h-[3px] bg-white/[0.06] rounded-sm overflow-hidden">
          <div
            className="h-full rounded-sm"
            style={{
              width: inView ? pct + "%" : "0%",
              background: `linear-gradient(90deg, ${TIER_COLOR[s.tier]}90, ${TIER_COLOR[s.tier]})`,
              transition: "width 1s cubic-bezier(.16,1,.3,1)",
              transitionDelay: `${0.3 + (idx % 6) * 0.1}s`,
              boxShadow: `0 0 8px ${TIER_COLOR[s.tier]}60`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
