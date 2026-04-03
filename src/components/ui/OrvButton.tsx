interface OrvButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function OrvButton({ children, onClick }: OrvButtonProps) {
  return (
    <button
      onClick={onClick}
      className="font-mono text-[0.73rem] text-gold bg-gold/[0.06] border border-gold/30 py-2.5 px-[22px] rounded-md cursor-pointer tracking-wide hover:bg-gold/[0.12] hover:border-gold/50 transition-all duration-300"
    >
      {children}
    </button>
  );
}
