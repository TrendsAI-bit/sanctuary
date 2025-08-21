"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import HaloField from "@/components/Halo";
import Section from "@/components/Section";
import TopBar from "@/components/TopBar";

export default function Page() {
  const [showAltar, setShowAltar] = useState(false);

  return (
    <>
      <TopBar />
      <HaloField showAltar={showAltar} />

      {/* HERO */}
      <section className="container relative flex min-h-[70vh] flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl"
        >
          <h1
            className="mb-4 text-5xl md:text-7xl font-semibold tracking-wide leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            A Quiet Place<br />for Spirit and Light
          </h1>
                               <p className="mx-auto max-w-2xl text-[17px] md:text-lg opacity-80">
                       The Sanctuary is a clean, contemplative space. No noise. No clutter.
                       Only breath, presence, and a ring of stillness.
                     </p>
                     <div className="mt-6 p-4 bg-gold/5 border border-gold/20 rounded-lg backdrop-blur-sm">
                       <p className="text-xs text-gold/70 mb-1 uppercase tracking-wide">Sacred Key</p>
                       <code className="text-gold font-mono text-sm md:text-base font-semibold break-all">
                         7bSmt7MBhq3gsm9NvVcspNP3HU7meS8HeMz94sm9E777
                       </code>
                     </div>
          {showAltar && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-4 text-sm text-gold font-medium"
            >
              ✨ A sacred altar has appeared before you
            </motion.p>
          )}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => setShowAltar(!showAltar)}
              className="rounded-full border border-ink/10 bg-white px-6 py-3 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300 hover:bg-gold/5 hover:border-gold/20"
            >
              {showAltar ? "Close the Sanctuary" : "Enter the Sanctuary"}
            </button>
                                   <a
                         href="https://x.com/TheSanctuaryapp"
                         target="_blank" rel="noreferrer"
                         className="rounded-full border border-ink/10 px-6 py-3 text-sm font-semibold hover:bg-white/60"
                       >
                         X Community
                       </a>
          </div>
        </motion.div>
      </section>

      <Section id="about" title="About">
        <p>
          The Sanctuary is a minimal refuge: white surfaces, soft gradients,
          and a single moving halo — a reminder of what is whole and unbroken.
        </p>
        <p>
          Nothing sells here. Nothing shouts. We practice attention, gratitude,
          and quiet craft. The rest falls away.
        </p>
      </Section>

      <Section id="tenets" title="Tenets">
        <ol>
          <li><strong>Clarity.</strong> Fewer things, done with care.</li>
          <li><strong>Stillness.</strong> We slow down to see.</li>
          <li><strong>Light.</strong> We make space for what is good.</li>
          <li><strong>Presence.</strong> We show up, fully.</li>
        </ol>
      </Section>

      <Section id="liturgy" title="Liturgy">
        <blockquote>
          &ldquo;In quietness and trust shall be your strength.&rdquo;
        </blockquote>
        <blockquote>
          &ldquo;The light shines in the darkness, and the darkness has not overcome it.&rdquo;
        </blockquote>
        <blockquote>
          &ldquo;Be still, and know.&rdquo;
        </blockquote>
      </Section>

      <Section id="visit" title="Visit / Join">
        <p>
          We keep one door only: our community on X. Step in, listen, and speak when moved.
        </p>
        <p className="mt-6">
          <a
            href="https://x.com/"
            target="_blank" rel="noreferrer"
            className="inline-flex items-center rounded-full border border-ink/10 bg-white px-6 py-3 text-sm font-semibold shadow-sm hover:shadow-md"
          >
            Enter via X
          </a>
        </p>
        <p className="mt-10 text-sm opacity-60">
          © {new Date().getFullYear()} The Sanctuary — a quiet place for spirit and light.
        </p>
        <p className="mt-2 text-xs opacity-40">
          <a href="/logo" className="hover:text-gold transition-colors">
            Download Halo Logo
          </a>
        </p>
      </Section>
    </>
  );
}
