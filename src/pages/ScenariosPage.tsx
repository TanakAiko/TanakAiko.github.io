import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SCENARIOS } from "@/data/scenarios";
import ScenarioSidebar from "@/components/scenarios/ScenarioSidebar";
import ScenarioDetail from "@/components/scenarios/ScenarioDetail";

export default function ScenariosPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const initialId = id ? parseInt(id, 10) : 1;
  const [sel, setSel] = useState(
    SCENARIOS.find((s) => s.id === initialId) || SCENARIOS[0]
  );

  return (
    <div className="relative z-[1] h-screen flex flex-col overflow-hidden">
      {/* Sticky nav */}
      <div className="py-3.5 px-[22px] shrink-0 z-10 backdrop-blur-[10px] bg-orv-bg/[0.78] border-b border-gold/[0.08] flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="font-mono text-[0.7rem] text-gold bg-transparent border-none cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
        >
          {"← Return to Star Stream"}
        </button>
        <span className="font-mono text-gold/40 text-[0.63rem] tracking-[0.15em]">
          SCENARIO ARCHIVE
        </span>
      </div>

      <div className="max-w-[1100px] w-full mx-auto flex-1 py-7 px-5 flex gap-[22px] min-h-0">
        {/* Scrollable sidebar — narrow */}
        <div className="w-[260px] shrink-0 overflow-y-auto min-h-0 pr-1 scrollbar-thin">
          <ScenarioSidebar selected={sel} onSelect={setSel} />
        </div>

        {/* Detail panel — takes remaining space, scrolls independently */}
        <div className="flex-1 overflow-y-auto min-h-0 scrollbar-thin">
          <ScenarioDetail scenario={sel} />
        </div>
      </div>
    </div>
  );
}
