import { motion } from "motion/react";
import { CONTACTS } from "@/data/contacts";

export default function ChannelSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center"
    >
      <div className="font-mono text-gold/60 text-[0.73rem] mb-7 leading-[1.8]">
        [System: The Constellation wishes to contact this incarnation.]
        <br />
        [Opening communication channel...]
      </div>
      <div className="flex gap-3 justify-center flex-wrap">
        {CONTACTS.map((l, i) => (
          <motion.a
            key={l.label}
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.3 + i * 0.1 }}
            className="font-mono text-[0.73rem] text-gold border border-gold/25 py-[11px] px-5 rounded-md flex items-center gap-[7px] bg-orv-panel/80 backdrop-blur-sm tracking-wide no-underline hover:bg-gold/[0.08] hover:border-gold/40 transition-all duration-300"
          >
            <span>{l.icon}</span> {l.label}
          </motion.a>
        ))}
      </div>
      <a
        href="tel:+221771718256"
        className="inline-block font-mono text-gold/70 text-[0.73rem] mt-5 tracking-wide hover:text-gold transition-colors duration-300"
      >
        +221 771 718 256
      </a>
    </motion.div>
  );
}
