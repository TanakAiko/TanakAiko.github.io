import { useState, useEffect } from "react";
import { WATCHERS, WATCHER_MSGS } from "@/data/constellations";

export default function Ticker() {
  const [wi, setWi] = useState(0);
  const [mi, setMi] = useState(0);
  const [vis, setVis] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => {
      setVis(false);
      setTimeout(() => {
        setWi(Math.floor(Math.random() * WATCHERS.length));
        setMi(Math.floor(Math.random() * WATCHER_MSGS.length));
        setVis(true);
      }, 500);
    }, 4500);
    return () => clearInterval(iv);
  }, []);

  return (
    <div
      className="hidden md:block fixed top-4 left-1/2 -translate-x-1/2 z-[100] font-mono text-[0.7rem] text-gold-bright bg-[rgba(10,10,20,0.88)] border border-gold/25 py-[7px] px-[18px] rounded backdrop-blur-sm whitespace-nowrap max-w-[92vw] overflow-hidden text-ellipsis transition-opacity duration-400"
      style={{ opacity: vis ? 1 : 0 }}
    >
      [Constellation &apos;{WATCHERS[wi]}&apos; {WATCHER_MSGS[mi]}]
    </div>
  );
}
