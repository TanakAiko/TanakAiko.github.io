import { TIER_COLOR } from "@/lib/constants";

interface TierBadgeProps {
  tier: string;
}

export default function TierBadge({ tier }: TierBadgeProps) {
  const color = TIER_COLOR[tier] || "#fff";
  return (
    <span
      className="font-mono text-[0.5rem] tracking-wide py-0.5 px-[7px] rounded-[3px] shrink-0"
      style={{ color, border: `1px solid ${color}30` }}
    >
      {tier.toUpperCase()}
    </span>
  );
}
