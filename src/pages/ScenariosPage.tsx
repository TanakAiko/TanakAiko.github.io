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
  const [showDetail, setShowDetail] = useState(!!id);

  const handleSelect = (s: typeof sel) => {
    setSel(s);
    setShowDetail(true);
  };

  const handleBack = () => {
    setShowDetail(false);
  };

  return (
    <div className="relative z-[1] h-screen flex flex-col overflow-hidden">
      {/* Sticky nav — offset below ticker */}
      <div className="mt-12 md:mt-0 py-3.5 px-[22px] shrink-0 z-10 backdrop-blur-[10px] bg-orv-bg/[0.78] border-b border-gold/[0.08] flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="font-mono text-[0.7rem] text-gold bg-transparent border-none cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
        >
          {"← Return to Star Stream"}
        </button>
        <span className="font-mono text-gold/40 text-[0.63rem] tracking-[0.15em] hidden sm:inline">
          SCENARIO ARCHIVE
        </span>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:flex max-w-[1100px] w-full mx-auto flex-1 py-7 px-5 gap-[22px] min-h-0">
        <div className="w-[260px] shrink-0 overflow-y-auto min-h-0 pr-1 scrollbar-thin">
          <ScenarioSidebar selected={sel} onSelect={handleSelect} />
        </div>
        <div className="flex-1 overflow-y-auto min-h-0 scrollbar-thin">
          <ScenarioDetail scenario={sel} />
        </div>
      </div>

      {/* Mobile layout — list or detail view */}
      <div className="flex md:hidden flex-1 min-h-0 flex-col">
        {!showDetail ? (
          <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin">
            <ScenarioSidebar selected={sel} onSelect={handleSelect} />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin">
            <button
              onClick={handleBack}
              className="font-mono text-[0.68rem] text-gold/70 bg-transparent border border-gold/20 rounded-md py-2 px-3 mb-4 cursor-pointer hover:bg-gold/[0.06] transition-colors"
            >
              ← Back to Scenarios
            </button>
            <ScenarioDetail scenario={sel} />
          </div>
        )}
      </div>
    </div>
  );
}
