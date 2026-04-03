import { useState, useEffect } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[9999] pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-gold/80 to-gold-bright shadow-[0_0_8px_rgba(212,168,67,0.5)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
