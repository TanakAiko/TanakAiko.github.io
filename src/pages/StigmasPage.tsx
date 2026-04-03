import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { STIGMAS } from "@/data/stigmas";
import SectionHead from "@/components/ui/SectionHead";
import StigmaFilter from "@/components/stigmas/StigmaFilter";
import StigmaDetailCard from "@/components/stigmas/StigmaDetailCard";

export default function StigmasPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...Array.from(new Set(STIGMAS.map((s) => s.cat)))];
  const filtered = filter === "All" ? STIGMAS : STIGMAS.filter((s) => s.cat === filter);

  return (
    <div className="relative z-[1] min-h-screen">
      {/* Sticky nav */}
      <div className="mt-12 md:mt-0 py-3.5 px-[22px] sticky top-0 z-10 backdrop-blur-[10px] bg-orv-bg/[0.78] border-b border-gold/[0.08] flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="font-mono text-[0.7rem] text-gold bg-transparent border-none cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
        >
          {"← Return to Star Stream"}
        </button>
        <span className="font-mono text-gold/40 text-[0.63rem] tracking-[0.15em]">
          STIGMA ARCHIVE
        </span>
      </div>

      <div className="max-w-[900px] mx-auto py-9 px-5 pb-20">
        <SectionHead title="Exclusive Stigmas" sub="Complete archive of acquired abilities" />
        <StigmaFilter categories={categories} active={filter} onChange={setFilter} />

        <div className="font-mono text-[0.6rem] text-gold/35 tracking-[0.12em] text-center mb-5">
          {filtered.length} STIGMA{filtered.length !== 1 ? "S" : ""}{" "}
          {filter !== "All" ? `IN [${filter.toUpperCase()}]` : "ACQUIRED"}
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3.5">
          {filtered.map((s, i) => (
            <StigmaDetailCard key={s.name} s={s} i={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
