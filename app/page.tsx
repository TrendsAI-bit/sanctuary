"use client";

import { motion } from "framer-motion";
import HaloField from "@/components/Halo";
import Section from "@/components/Section";
import TopBar from "@/components/TopBar";

export default function Page() {
  return (
    <>
      <TopBar />
      <HaloField />

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
          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href="#visit"
              className="rounded-full border border-ink/10 bg-white px-6 py-3 text-sm font-semibold shadow-sm hover:shadow-md"
            >
              Enter the Sanctuary
            </a>
            <a
              href="https://x.com/"
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
          "In quietness and trust shall be your strength."
        </blockquote>
        <blockquote>
          "The light shines in the darkness, and the darkness has not overcome it."
        </blockquote>
        <blockquote>
          "Be still, and know."
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
      </Section>
    </>
  );
}
