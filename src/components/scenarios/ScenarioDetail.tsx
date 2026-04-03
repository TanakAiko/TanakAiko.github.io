import { useState, useEffect } from "react";
import type { Scenario } from "@/lib/types";
import { DIFF_COLOR } from "@/lib/constants";
import TypeBadge from "@/components/ui/TypeBadge";
import TechTag from "@/components/ui/TechTag";

interface ScenarioDetailProps {
  scenario: Scenario;
}

export default function ScenarioDetail({ scenario: sel }: ScenarioDetailProps) {
  const [entered, setEntered] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setEntered(false);
    setActiveImg(0);
    requestAnimationFrame(() => setEntered(true));
  }, [sel.id]);

  return (
    <div
      className="rounded-[10px] bg-orv-panel/[0.92] backdrop-blur-md overflow-hidden shadow-[0_0_40px_rgba(212,168,67,0.06)] border border-gold/20 transition-all duration-500"
      style={{
        opacity: entered ? 1 : 0,
        transform: entered ? "none" : "translateX(18px)",
        transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
      }}
    >
      {/* Header */}
      <div className="py-[13px] px-5 border-b border-gold/20 flex justify-between items-center bg-gold/[0.05]">
        <div className="flex items-center gap-[9px]">
          <TypeBadge type={sel.type} />
          <span className="font-mono text-[0.58rem] text-green-400">{"✓ " + sel.status}</span>
        </div>
        <span
          className="font-serif text-[1.35rem] font-bold"
          style={{ color: DIFF_COLOR[sel.diff] || "#fff" }}
        >
          {sel.diff}
        </span>
      </div>

      {/* Body */}
      <div className="pt-[22px] px-[22px] pb-7">
        <h2 className="font-serif text-white text-[1.2rem] m-0 mb-4 font-semibold">{sel.title}</h2>

        {/* Screenshot gallery */}
        {sel.images && sel.images.length > 0 && (
          <div className="mb-5">
            <div className="rounded-md overflow-hidden border border-gold/15 bg-black/30">
              <img
                src={sel.images[activeImg]}
                alt={`${sel.title} screenshot ${activeImg + 1}`}
                className="w-full max-h-[320px] object-contain"
              />
            </div>
            {sel.images.length > 1 && (
              <div className="flex gap-2 mt-2 overflow-x-auto scrollbar-thin pb-1">
                {sel.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className="shrink-0 w-16 h-10 rounded overflow-hidden border cursor-pointer transition-all duration-200"
                    style={{
                      borderColor: i === activeImg ? "rgba(212,168,67,0.6)" : "rgba(212,168,67,0.12)",
                      opacity: i === activeImg ? 1 : 0.5,
                    }}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex gap-[18px] mb-[18px] flex-wrap">
          {([["Duration", sel.duration], ["Team", sel.team], ["Reward", sel.reward]] as const).map(
            ([label, val]) => (
              <div key={label}>
                <div className="font-mono text-[0.58rem] text-white/35 tracking-wide uppercase">
                  {label}
                </div>
                <div
                  className="font-mono text-[0.76rem] mt-0.5"
                  style={{ color: label === "Reward" ? "#d4a843" : "rgba(255,255,255,0.7)" }}
                >
                  {val}
                </div>
              </div>
            )
          )}
        </div>
        <div className="font-sans text-white/[0.58] text-[0.83rem] leading-[1.7] mb-[22px]">
          {sel.full}
        </div>
        <div className="mb-[22px]">
          <div className="font-mono text-gold text-[0.68rem] tracking-[0.12em] mb-2.5 uppercase">
            Key Challenges Overcome
          </div>
          {sel.challenges.map((c, i) => (
            <div key={i} className="flex gap-[9px] mb-[9px]">
              <span className="font-mono text-gold text-[0.68rem] shrink-0 mt-0.5">{"▸"}</span>
              <span className="font-sans text-white/[0.52] text-[0.78rem] leading-relaxed">{c}</span>
            </div>
          ))}
        </div>
        <div>
          <div className="font-mono text-gold text-[0.68rem] tracking-[0.12em] mb-[9px] uppercase">
            Technology Stack
          </div>
          <div className="flex flex-wrap gap-[5px]">
            {sel.tech.map((t) => (
              <TechTag key={t} name={t} />
            ))}
          </div>
        </div>

        {sel.repo && (
          <div className="mt-6 pt-5 border-t border-gold/[0.12]">
            <a
              href={sel.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[0.74rem] text-gold/80 bg-gold/[0.06] border border-gold/20 rounded-md py-2.5 px-4 no-underline hover:bg-gold/[0.12] hover:border-gold/35 hover:text-gold transition-all duration-200 cursor-pointer"
            >
              <svg
                viewBox="0 0 16 16"
                width="16"
                height="16"
                fill="currentColor"
                className="shrink-0"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              View Source Code
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
