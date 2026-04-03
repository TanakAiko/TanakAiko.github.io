import { motion } from "motion/react";
import type { TimelineEntry } from "@/lib/types";

interface TimelineRowProps {
  item: TimelineEntry;
  idx: number;
}

export default function TimelineRow({ item, idx }: TimelineRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.15 }}
      className="flex gap-4 mb-[26px]"
    >
      <div className="flex flex-col items-center pt-[5px]">
        <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_rgba(212,168,67,0.4)] shrink-0" />
        <div className="w-px flex-1 bg-gold/15 mt-1" />
      </div>
      <div>
        <div className="font-mono text-gold text-[0.68rem] tracking-wide mb-1">{item.year}</div>
        <div className="font-serif text-white text-[0.92rem] mb-[3px]">{item.role}</div>
        <div className="font-mono text-white/35 text-[0.68rem] mb-[5px]">{item.co}</div>
        <div className="font-sans text-white/45 text-[0.78rem] leading-normal">{item.desc}</div>
      </div>
    </motion.div>
  );
}
