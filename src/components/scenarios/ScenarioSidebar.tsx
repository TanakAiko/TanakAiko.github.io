import { useState } from "react";
import { SCENARIOS } from "@/data/scenarios";
import { DIFF_COLOR } from "@/lib/constants";
import type { Scenario } from "@/lib/types";

interface ScenarioSidebarProps {
  selected: Scenario;
  onSelect: (s: Scenario) => void;
}

const TYPE_COLORS: Record<string, string> = {
  Main: "#f0c050",
  Hidden: "#a78bfa",
  Sub: "rgba(255,255,255,0.4)",
};

const ALL_TYPES = ["All", "Main", "Sub", "Hidden"] as const;
const ALL_DIFFS = ["All", "S", "A+", "A", "B+", "B", "C+"] as const;

export default function ScenarioSidebar({ selected, onSelect }: ScenarioSidebarProps) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [diffFilter, setDiffFilter] = useState<string>("All");

  const filtered = SCENARIOS.filter((s) => {
    if (typeFilter !== "All" && s.type !== typeFilter) return false;
    if (diffFilter !== "All" && s.diff !== diffFilter) return false;
    if (search && !s.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="w-full md:flex-[0_0_260px] md:min-w-[240px]">
      {/* Search */}
      <input
        type="text"
        placeholder="Search scenarios..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-3 py-2 px-3 rounded-md bg-orv-panel/80 border border-gold/15 font-mono text-[0.6rem] text-white/70 placeholder:text-white/25 outline-none focus:border-gold/35 transition-colors"
      />

      {/* Type filter */}
      <div className="flex gap-1 mb-2 flex-wrap">
        {ALL_TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className="font-mono text-[0.48rem] tracking-wide py-1 px-2 rounded cursor-pointer border transition-all duration-200"
            style={{
              color: typeFilter === t ? "#fff" : "rgba(255,255,255,0.35)",
              borderColor: typeFilter === t ? "rgba(212,168,67,0.4)" : "rgba(212,168,67,0.1)",
              background: typeFilter === t ? "rgba(212,168,67,0.1)" : "transparent",
            }}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Difficulty filter */}
      <div className="flex gap-1 mb-3 flex-wrap">
        {ALL_DIFFS.map((d) => (
          <button
            key={d}
            onClick={() => setDiffFilter(d)}
            className="font-serif text-[0.55rem] font-bold py-1 px-2 rounded cursor-pointer border transition-all duration-200"
            style={{
              color: diffFilter === d ? (DIFF_COLOR[d] || "#fff") : "rgba(255,255,255,0.3)",
              borderColor: diffFilter === d ? "rgba(212,168,67,0.4)" : "rgba(212,168,67,0.1)",
              background: diffFilter === d ? "rgba(212,168,67,0.08)" : "transparent",
            }}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="font-mono text-gold/50 text-[0.61rem] tracking-[0.18em] mb-3 uppercase">
        {"◈ "}{filtered.length} Scenario{filtered.length !== 1 ? "s" : ""}{" ◈"}
      </div>

      {filtered.length === 0 && (
        <div className="font-mono text-white/25 text-[0.6rem] text-center py-4">
          No scenarios match filters
        </div>
      )}

      {filtered.map((s) => {
        const active = selected.id === s.id;
        const tc = TYPE_COLORS[s.type] || "rgba(255,255,255,0.4)";
        return (
          <div
            key={s.id}
            onClick={() => onSelect(s)}
            className="rounded-md p-[11px] px-[13px] mb-[7px] cursor-pointer transition-all duration-300"
            style={{
              border: "1px solid",
              borderColor: active ? "rgba(212,168,67,0.4)" : "rgba(212,168,67,0.08)",
              background: active ? "rgba(212,168,67,0.06)" : "transparent",
            }}
          >
            <div className="flex justify-between items-center">
              <span
                className="font-mono text-[0.5rem] tracking-wide py-px px-1.5 rounded-[3px]"
                style={{ color: tc, border: `1px solid ${tc}40` }}
              >
                {s.type.toUpperCase()}
              </span>
              <span
                className="font-serif text-[0.82rem] font-bold"
                style={{ color: DIFF_COLOR[s.diff] || "#fff" }}
              >
                {s.diff}
              </span>
            </div>
            <div
              className="font-serif text-[0.78rem] mt-[5px] transition-colors duration-300"
              style={{ color: active ? "#fff" : "rgba(255,255,255,0.6)" }}
            >
              {s.title}
            </div>
          </div>
        );
      })}
    </div>
  );
}
