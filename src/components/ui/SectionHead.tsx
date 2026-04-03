import { motion } from "motion/react";

interface SectionHeadProps {
  title: string;
  sub: string;
}

export default function SectionHead({ title, sub }: SectionHeadProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="text-center mb-12"
    >
      <div className="font-mono text-gold/50 text-[0.63rem] tracking-[0.2em] mb-2.5 uppercase">
        {"◈ " + sub + " ◈"}
      </div>
      <h2 className="font-serif text-[clamp(1.4rem,3vw,2rem)] text-white m-0 font-semibold tracking-wide">
        {title}
      </h2>
      <div className="w-[50px] h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
    </motion.div>
  );
}
