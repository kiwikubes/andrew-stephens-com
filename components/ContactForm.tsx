"use client";

import { Send } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.form
      className="glass-line relative overflow-hidden rounded-[2rem] p-5 md:p-7"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-cyanGlow/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-28 left-10 h-56 w-56 rounded-full bg-magentaGlow/18 blur-3xl"
      />
      <div className="relative grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-white/70">
            Name
            <input
              required
              name="name"
              className="rounded-2xl border border-white/12 bg-black/48 px-4 py-3 text-white outline-none transition focus:border-cyanGlow/70 focus:shadow-neonCyan"
              placeholder="Your name"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-white/70">
            Email
            <input
              required
              type="email"
              name="email"
              className="rounded-2xl border border-white/12 bg-black/48 px-4 py-3 text-white outline-none transition focus:border-magentaGlow/70 focus:shadow-neonMagenta"
              placeholder="you@example.com"
            />
          </label>
        </div>
        <label className="grid gap-2 text-sm font-medium text-white/70">
          Project type
          <select
            name="projectType"
            className="rounded-2xl border border-white/12 bg-black/48 px-4 py-3 text-white outline-none transition focus:border-limeGlow/70 focus:shadow-neonLime"
            defaultValue="Commercial video"
          >
            <option>Commercial video</option>
            <option>Property / estate agent</option>
            <option>Construction progress</option>
            <option>Tourism / destination content</option>
            <option>Event coverage</option>
            <option>Aerial inspection-style footage</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium text-white/70">
          Brief
          <textarea
            required
            name="brief"
            rows={5}
            className="resize-none rounded-2xl border border-white/12 bg-black/48 px-4 py-3 text-white outline-none transition focus:border-cyanGlow/70 focus:shadow-neonCyan"
            placeholder="Tell us about the location, outcome, timeline, and where the content will be used."
          />
        </label>
        <button
          type="submit"
          className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3.5 text-sm font-bold text-black transition hover:bg-limeGlow focus:outline-none focus:ring-2 focus:ring-limeGlow/80 focus:ring-offset-2 focus:ring-offset-black md:w-auto"
        >
          Send enquiry
          <Send className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </button>
        {sent ? (
          <p className="rounded-2xl border border-limeGlow/30 bg-limeGlow/10 px-4 py-3 text-sm text-limeGlow">
            Enquiry captured locally for this concept. Wire this form to your
            CRM or email provider when the site goes live.
          </p>
        ) : null}
      </div>
    </motion.form>
  );
}
