interface StigmaFilterProps {
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
}

export default function StigmaFilter({ categories, active, onChange }: StigmaFilterProps) {
  return (
    <div className="flex gap-2 justify-center flex-wrap mb-9">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className="font-mono text-[0.65rem] tracking-wide py-1.5 px-4 rounded cursor-pointer transition-all duration-300"
          style={{
            color: active === cat ? "#d4a843" : "rgba(255,255,255,0.35)",
            background: active === cat ? "rgba(212,168,67,0.1)" : "transparent",
            border: "1px solid",
            borderColor: active === cat ? "rgba(212,168,67,0.4)" : "rgba(255,255,255,0.08)",
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
