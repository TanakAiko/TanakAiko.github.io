import { motion } from "motion/react";
import { PROFILE } from "@/data/profile";
import { STIGMAS } from "@/data/stigmas";
import { TIER_COLOR } from "@/lib/constants";

export default function ConstellationPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="flex flex-col gap-3 max-w-[280px] w-full"
    >
      {/* Quick Profile */}
      <div className="rounded-lg border border-gold/20 bg-orv-panel/80 backdrop-blur-sm overflow-hidden">
        <div className="py-2 px-4 border-b border-gold/10 bg-gold/[0.03]">
          <span className="font-mono text-[0.6rem] text-gold/50 tracking-[0.15em] uppercase">
            ◈ Quick Profile ◈
          </span>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-baseline mb-2">
            <span className="font-mono text-[0.58rem] text-white/30">Location</span>
            <span className="font-mono text-[0.6rem] text-gold/70">Dakar, Senegal</span>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent my-3" />
          <div className="font-mono text-[0.55rem] text-white/25 tracking-[0.1em] uppercase mb-2">
            Languages
          </div>
          {PROFILE.languages.map((l) => (
            <div key={l.n} className="flex justify-between items-baseline mb-1.5 last:mb-0">
              <span className="font-mono text-[0.58rem] text-white/35">{l.n}</span>
              <span className="font-mono text-[0.55rem] text-gold/55">{l.lv}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Stigmas */}
      <div className="rounded-lg border border-gold/15 bg-orv-panel/70 backdrop-blur-sm p-4">
        <div className="font-mono text-[0.58rem] text-gold/40 tracking-[0.12em] uppercase mb-3">
          Top Stigmas
        </div>
        {STIGMAS.slice(0, 4).map((s) => (
          <div key={s.name} className="flex items-center justify-between mb-2 last:mb-0">
            <div className="flex items-center gap-2 min-w-0">
              <img src={s.icon} alt={s.name} className="w-3.5 h-3.5" />
              <span className="font-mono text-[0.58rem] text-white/45 truncate">{s.name}</span>
            </div>
            <span
              className="font-mono text-[0.5rem] shrink-0 ml-2"
              style={{ color: TIER_COLOR[s.tier] }}
            >
              LV.{s.lv}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
