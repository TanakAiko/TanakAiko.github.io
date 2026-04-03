import { motion } from "motion/react";
import { SCENARIOS } from "@/data/scenarios";
import { DIFF_COLOR } from "@/lib/constants";

export default function ScenarioStats() {
  const mainCount = SCENARIOS.filter((s) => s.type === "Main").length;
  const subCount = SCENARIOS.filter((s) => s.type === "Sub").length;
  const hiddenCount = SCENARIOS.filter((s) => s.type === "Hidden").length;

  const diffCounts = SCENARIOS.reduce<Record<string, number>>((acc, s) => {
    acc[s.diff] = (acc[s.diff] || 0) + 1;
    return acc;
  }, {});

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className="flex flex-col gap-3 max-w-[240px] w-full"
    >
      {/* Summary */}
      <div className="rounded-lg border border-gold/15 bg-orv-panel/70 backdrop-blur-sm p-4">
        <div className="font-mono text-[0.58rem] text-gold/40 tracking-[0.12em] uppercase mb-3">
          Mission Report
        </div>
        <div className="text-center mb-3">
          <span className="font-serif text-[1.8rem] text-gold font-bold">{SCENARIOS.length}</span>
          <div className="font-mono text-[0.55rem] text-white/30 tracking-wide">SCENARIOS CLEARED</div>
        </div>
        <div className="flex justify-between">
          {[
            ["Main", mainCount, "#f0c050"],
            ["Sub", subCount, "rgba(255,255,255,0.5)"],
            ["Hidden", hiddenCount, "#a78bfa"],
          ].map(([label, count, color]) => (
            <div key={label as string} className="text-center">
              <div className="font-serif text-[1rem] font-bold" style={{ color: color as string }}>
                {count as number}
              </div>
              <div className="font-mono text-[0.5rem] text-white/25 tracking-wide">
                {(label as string).toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Difficulty breakdown */}
      <div className="rounded-lg border border-gold/15 bg-orv-panel/70 backdrop-blur-sm p-4">
        <div className="font-mono text-[0.58rem] text-gold/40 tracking-[0.12em] uppercase mb-3">
          Difficulty Cleared
        </div>
        {Object.entries(diffCounts).map(([diff, count]) => (
          <div key={diff} className="flex items-center justify-between mb-2 last:mb-0">
            <span
              className="font-serif text-[0.85rem] font-bold"
              style={{ color: DIFF_COLOR[diff] || "#fff" }}
            >
              {diff}
            </span>
            <span className="font-mono text-[0.55rem] text-white/35">×{count}</span>
          </div>
        ))}
      </div>

    </motion.div>
  );
}
