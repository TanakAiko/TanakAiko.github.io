import { useEffect, useRef } from "react";

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed w-[300px] h-[300px] rounded-full pointer-events-none z-[9997] -translate-x-1/2 -translate-y-1/2 transition-[left,top] duration-200 ease-out"
      style={{
        background: "radial-gradient(circle, rgba(212,168,67,0.06) 0%, rgba(212,168,67,0.02) 40%, transparent 70%)",
      }}
    />
  );
}
