import { useState } from "react";
import { motion } from "motion/react";
import type { Scenario } from "@/lib/types";
import { DIFF_COLOR } from "@/lib/constants";
import TypeBadge from "@/components/ui/TypeBadge";
import TechTag from "@/components/ui/TechTag";

interface ScenarioPreviewProps {
  s: Scenario;
  idx: number;
  onClick: () => void;
}

export default function ScenarioPreview({ s, idx, onClick }: ScenarioPreviewProps) {
  const [h, setH] = useState(false);

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay: idx * 0.1 }}
      className="rounded-lg overflow-hidden cursor-pointer backdrop-blur-sm transition-all duration-400"
      style={{
        border: "1px solid",
        borderColor: h ? "rgba(212,168,67,0.5)" : "rgba(212,168,67,0.1)",
        background: h ? "rgba(212,168,67,0.04)" : "rgba(10,10,25,0.7)",
      }}
    >
      <div className="py-[9px] px-4 border-b border-gold/[0.08] flex justify-between items-center bg-gold/[0.025]">
        <div className="flex items-center gap-2">
          <TypeBadge type={s.type} />
          <span className="font-mono text-[0.58rem] text-green-400">{"✓ " + s.status}</span>
        </div>
        <span
          className="font-serif text-[1.05rem] font-bold"
          style={{ color: DIFF_COLOR[s.diff] || "#fff" }}
        >
          {s.diff}
        </span>
      </div>
      <div className="p-4">
        <div className="font-serif text-white text-[0.95rem] mb-[7px]">{s.title}</div>
        <div className="font-mono text-white/40 text-[0.68rem] leading-relaxed mb-2.5">
          {s.short}
        </div>
        <div className="flex flex-wrap gap-[5px]">
          {s.tech.slice(0, 4).map((t) => (
            <TechTag key={t} name={t} />
          ))}
          {s.tech.length > 4 && (
            <span className="font-mono text-[0.58rem] text-gold opacity-50">
              +{s.tech.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
