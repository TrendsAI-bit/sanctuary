"use client";

import { motion } from "framer-motion";

export default function Section({
  id, title, children
}: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="container py-24 md:py-32">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="mb-6 font-semibold text-3xl md:text-4xl tracking-wide"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="prose prose-zinc max-w-none prose-h3:mt-10 prose-p:text-[17px] md:prose-p:text-lg"
      >
        {children}
      </motion.div>
    </section>
  );
}
