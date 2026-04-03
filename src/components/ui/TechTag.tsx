interface TechTagProps {
  name: string;
}

export default function TechTag({ name }: TechTagProps) {
  return (
    <span className="font-mono text-[0.58rem] text-gold bg-gold/[0.07] border border-gold/15 py-0.5 px-[9px] rounded-[3px]">
      {name}
    </span>
  );
}
