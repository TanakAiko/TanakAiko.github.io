import { useState, useEffect, useRef } from "react";

interface TypewriterProps {
  text: string;
  delay?: number;
  speed?: number;
  gold?: boolean;
  dim?: boolean;
  highlight?: { start: number; end: number; className: string };
  onDone?: () => void;
}

export default function Typewriter({ text, delay = 0, speed = 35, gold = true, dim = false, highlight, onDone }: TypewriterProps) {
  const [out, setOut] = useState("");
  const [go, setGo] = useState(false);
  const [done, setDone] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const t = setTimeout(() => setGo(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!go || done) return;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(iv);
        setDone(true);
        onDoneRef.current?.();
      }
    }, speed);
    return () => clearInterval(iv);
  }, [go, text, speed, done]);

  if (!go) return null;

  return (
    <div
      className={`font-mono tracking-wide ${
        dim ? "text-gold/50 text-xs" : gold ? "text-gold text-sm" : "text-white text-sm"
      }`}
      style={{ letterSpacing: "0.05em" }}
    >
      {highlight
        ? <>
            {out.slice(0, highlight.start)}
            <span className={highlight.className}>{out.slice(highlight.start, highlight.end)}</span>
            {out.slice(highlight.end)}
          </>
        : out}
      {!done && (
        <span className="border-r-2 border-gold ml-0.5 animate-blink">&thinsp;</span>
      )}
    </div>
  );
}
