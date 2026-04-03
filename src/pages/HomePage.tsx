import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionHead from "@/components/ui/SectionHead";
import OrvButton from "@/components/ui/OrvButton";
import HeroSection from "@/components/home/HeroSection";
import StatusCard from "@/components/home/StatusCard";
import ProfileModal from "@/components/home/ProfileModal";
import ConstellationPanel from "@/components/home/ConstellationPanel";
import StigmaCard from "@/components/home/StigmaCard";
import ScenarioPreview from "@/components/home/ScenarioPreview";
import ScenarioStats from "@/components/home/ScenarioStats";
import TimelineRow from "@/components/home/TimelineRow";
import ChannelSection from "@/components/home/ChannelSection";
import Footer from "@/components/layout/Footer";
import { STIGMAS } from "@/data/stigmas";
import { SCENARIOS } from "@/data/scenarios";
import { TIMELINE } from "@/data/timeline";

export default function HomePage() {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />

      <HeroSection />

      {/* STATUS — card + constellation panel side by side */}
      <section className="py-[100px] px-5 relative z-[1]">
        <SectionHead title="Status Window" sub="Click to view full character profile" />
        <div className="max-w-[920px] mx-auto flex justify-center gap-6 flex-wrap lg:flex-nowrap">
          <StatusCard onClick={() => setProfileOpen(true)} />
          <div className="hidden lg:block">
            <ConstellationPanel />
          </div>
        </div>
      </section>

      {/* STIGMAS */}
      <section className="py-[100px] px-5 relative z-[1]">
        <SectionHead title="Exclusive Stigmas" sub="Skills acquired through countless scenarios" />
        <div className="max-w-[800px] mx-auto grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-[11px]">
          {STIGMAS.slice(0, 4).map((s, i) => (
            <StigmaCard key={s.name} s={s} i={i} />
          ))}
        </div>
        {STIGMAS.length > 4 && (
          <div className="text-center mt-7">
            <div className="font-mono text-[0.62rem] text-gold/40 tracking-[0.12em] mb-3.5">
              Showing 4 of {STIGMAS.length} stigmas
            </div>
            <OrvButton onClick={() => navigate("/stigmas")}>{"View All Stigmas →"}</OrvButton>
          </div>
        )}
      </section>

      {/* SCENARIOS — list + stats panel side by side */}
      <section className="py-[100px] px-5 relative z-[1]">
        <SectionHead title="Completed Scenarios" sub="Missions cleared in the Star Stream" />
        <div className="max-w-[1000px] mx-auto flex justify-center gap-6 flex-wrap lg:flex-nowrap">
          <div className="max-w-[680px] w-full flex flex-col gap-[13px]">
            {SCENARIOS.slice(0, 3).map((s, i) => (
              <ScenarioPreview
                key={s.id}
                s={s}
                idx={i}
                onClick={() => navigate(`/scenarios/${s.id}`)}
              />
            ))}
            {SCENARIOS.length > 3 && (
              <div className="text-center mt-4">
                <div className="font-mono text-[0.62rem] text-gold/40 tracking-[0.12em] mb-3.5">
                  Showing 3 of {SCENARIOS.length} scenarios
                </div>
                <OrvButton onClick={() => navigate("/scenarios/1")}>{"View All Scenarios →"}</OrvButton>
              </div>
            )}
          </div>
          <div className="hidden lg:block">
            <ScenarioStats />
          </div>
        </div>
      </section>

      {/* STAR STREAM */}
      <section className="py-[100px] px-5 relative z-[1]">
        <SectionHead title="Star Stream" sub="The incarnation's journey through time" />
        <div className="max-w-[580px] mx-auto">
          {TIMELINE.map((t, i) => (
            <TimelineRow key={i} item={t} idx={i} />
          ))}
        </div>
      </section>

      {/* CHANNEL */}
      <section className="min-h-[55vh] flex flex-col justify-center items-center py-20 px-5 relative z-[1] overflow-hidden">
        <SectionHead title="Open Channel" sub="Break the Fourth Wall" />
        <ChannelSection />
      </section>

      <Footer />
    </>
  );
}
