import { useState } from "react";
import { motion } from "motion/react";
import type { Stigma } from "@/lib/types";
import { TIER_COLOR } from "@/lib/constants";
import TierBadge from "@/components/ui/TierBadge";

interface StigmaCardProps {
  s: Stigma;
  i: number;
}

export default function StigmaCard({ s, i: idx }: StigmaCardProps) {
  const [h, setH] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay: idx * 0.07 }}
      className="rounded-md p-4 backdrop-blur-sm transition-all duration-400 stigma-pulse"
      style={{
        border: "1px solid",
        borderColor: h ? "rgba(212,168,67,0.5)" : "rgba(212,168,67,0.12)",
        background: h ? "rgba(212,168,67,0.06)" : "rgba(10,10,25,0.7)",
      }}
    >
      <div className="flex justify-between items-start mb-[7px]">
        <div className="flex items-center gap-[7px]">
          <img src={s.icon} alt={s.name} className="w-4 h-4" />
          <span className="font-serif text-white text-[0.8rem]">{s.name}</span>
        </div>
        <TierBadge tier={s.tier} />
      </div>
      <div className="font-mono text-white/35 text-[0.66rem] leading-normal mb-[7px]">
        {s.desc}
      </div>
      <div className="flex justify-between">
        <span className="font-mono text-[0.58rem] text-gold/45">[{s.cat}]</span>
        <span className="font-mono text-[0.58rem] text-gold">LV. {s.lv}</span>
      </div>
    </motion.div>
  );
}
