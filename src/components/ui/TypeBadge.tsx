interface TypeBadgeProps {
  type: "Main" | "Sub" | "Hidden";
  suffix?: string;
}

const TYPE_COLORS: Record<string, string> = {
  Main: "#f0c050",
  Hidden: "#a78bfa",
  Sub: "rgba(255,255,255,0.4)",
};

export default function TypeBadge({ type, suffix = "SCENARIO" }: TypeBadgeProps) {
  const color = TYPE_COLORS[type] || "rgba(255,255,255,0.4)";
  return (
    <span
      className="font-mono text-[0.56rem] tracking-wide py-0.5 px-[7px] rounded-[3px]"
      style={{ color, border: `1px solid ${color}40` }}
    >
      {type.toUpperCase()} {suffix}
    </span>
  );
}
