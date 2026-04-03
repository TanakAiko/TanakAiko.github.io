import { useState, useEffect } from "react";
import { PROFILE } from "@/data/profile";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[0.64rem] text-white/40 tracking-[0.14em] uppercase mb-[5px]">
      {children}
    </div>
  );
}

function Tag({ n, lv }: { n: string; lv: number }) {
  return (
    <span className="inline-block font-mono text-[0.71rem] text-gold bg-gold/[0.07] border border-gold/[0.18] rounded-[3px] py-[3px] px-2.5 mr-1 mb-[3px]">
      [{n} LV. {lv}]
    </span>
  );
}

export default function ProfileModal({ open, onClose }: ProfileModalProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setShow(true));
    } else {
      setShow(false);
    }
  }, [open]);

  if (!open) return null;

  const close = () => {
    setShow(false);
    setTimeout(onClose, 400);
  };

  return (
    <div
      onClick={close}
      className="fixed inset-0 z-[2000] flex justify-center items-center p-5 overflow-y-auto transition-all duration-400"
      style={{
        background: show ? "rgba(0,0,0,0.72)" : "rgba(0,0,0,0)",
        backdropFilter: show ? "blur(6px)" : "blur(0px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[1100px] rounded-[10px] backdrop-blur-[20px]"
        style={{
          border: "1px solid rgba(212,168,67,0.35)",
          background: "linear-gradient(170deg,rgba(15,18,42,0.97),rgba(8,10,25,0.98))",
          boxShadow: "0 0 60px rgba(212,168,67,0.1), inset 0 1px 0 rgba(212,168,67,0.1)",
          opacity: show ? 1 : 0,
          transform: show ? "translateY(0) scale(1)" : "translateY(30px) scale(0.96)",
          transition: "all .45s cubic-bezier(.16,1,.3,1)",
        }}
      >
        {/* Chrome bar */}
        <div className="py-[13px] px-5 border-b border-gold/20 flex justify-between items-center bg-gold/[0.05]">
          <span className="font-serif text-white text-[0.92rem] tracking-[0.1em] font-semibold">
            &lt;CHARACTER PROFILE&gt;
          </span>
          <div className="flex gap-[5px]">
            {["─", "□", "✕"].map((ch, idx) => (
              <button
                key={idx}
                onClick={idx === 2 ? close : undefined}
                className="w-[22px] h-[22px] border border-gold/20 bg-gold/[0.04] text-gold/50 text-[0.6rem] cursor-pointer rounded-[3px] flex items-center justify-center font-mono"
              >
                {ch}
              </button>
            ))}
          </div>
        </div>

        {/* Body — two-column layout */}
        <div className="flex flex-col md:flex-row">
          {/* Left column — identity */}
          <div className="md:w-[280px] shrink-0 p-6 border-b md:border-b-0 md:border-r border-gold/10 flex flex-col items-center justify-start relative overflow-hidden">
            {/* ORV art accent */}
            <div
              className="absolute inset-0 opacity-[0.12] bg-cover bg-center pointer-events-none"
              style={{ backgroundImage: "url('/art/dokja-phone.jpg')" }}
            />
            <img
              src="/PXL_20250420_095839873~2.jpg"
              alt={PROFILE.name}
              className="w-36 h-36 rounded-full object-cover border-2 border-gold/30 shadow-[0_0_24px_rgba(212,168,67,0.2)] mb-4"
            />
            <div className="font-serif text-white text-[1.1rem] text-center">{PROFILE.name}</div>
            <div className="font-mono text-gold/60 text-[0.62rem] tracking-wide mt-1 text-center">
              ⌜{PROFILE.constellation}⌟
            </div>
            <div className="font-mono text-white/35 text-[0.6rem] mt-1 text-center">
              {PROFILE.attribute}
            </div>

            <div className="w-full mt-5 pt-4 border-t border-gold/10">
              <Label>Incarnation Stats:</Label>
              <div className="flex flex-col gap-1.5 mt-1">
                {Object.entries(PROFILE.stats).map(([k, v]) => (
                  <div key={k} className="flex justify-between font-mono text-[0.68rem]">
                    <span className="text-white/40">{k}</span>
                    <span className="text-gold">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full mt-4 pt-4 border-t border-gold/10">
              <Label>Languages:</Label>
              <div className="flex flex-col gap-1.5 mt-1">
                {PROFILE.languages.map((l) => (
                  <div key={l.n} className="flex justify-between font-mono text-[0.68rem]">
                    <span className="text-white/40">{l.n}</span>
                    <span className="text-gold/70">{l.lv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column — details */}
          <div className="flex-1 p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <Label>Name:</Label>
                <span className="font-serif text-white text-[0.95rem]">{PROFILE.name}</span>
              </div>
              <div className="text-right">
                <Label>Age:</Label>
                <span className="font-serif text-white text-[0.95rem]">{PROFILE.age}</span>
              </div>
            </div>

            <div className="mb-4">
              <Label>Constellation Modifier:</Label>
              <span className="font-serif text-gold text-[0.95rem]">⌜{PROFILE.constellation}⌟</span>
            </div>

            <div className="mb-4">
              <Label>Personal Skills:</Label>
              <div className="mt-1">
                {PROFILE.personalSkills.map((s) => (
                  <Tag key={s.n} n={s.n} lv={s.lv} />
                ))}
              </div>
            </div>

            <div className="mb-4">
              <Label>Stigma:</Label>
              <div className="mt-1">
                {PROFILE.stigmaList.map((s) => (
                  <Tag key={s.n} n={s.n} lv={s.lv} />
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-gold/[0.12]">
              <Label>Overall Evaluation:</Label>
              <p className="font-mono text-[0.72rem] text-white/55 leading-[1.85] mt-2">
                {PROFILE.evaluation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
