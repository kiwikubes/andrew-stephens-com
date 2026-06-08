"use client";

import {
  Building2,
  CalendarDays,
  Clapperboard,
  HardHat,
  Megaphone,
  ScanLine,
  Waves
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { CSSProperties } from "react";

type IconName =
  | "property"
  | "construction"
  | "promo"
  | "tourism"
  | "events"
  | "inspection";

type ServiceFlipTileProps = {
  title: string;
  kicker: string;
  copy: string;
  detail: string;
  icon: IconName;
  glow: string;
  glowSoft: string;
};

const iconMap = {
  property: Building2,
  construction: HardHat,
  promo: Megaphone,
  tourism: Waves,
  events: CalendarDays,
  inspection: ScanLine
};

export function ServiceFlipTile({
  title,
  kicker,
  copy,
  detail,
  icon,
  glow,
  glowSoft
}: ServiceFlipTileProps) {
  const shouldReduceMotion = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const Icon = iconMap[icon] ?? Clapperboard;

  return (
    <motion.button
      type="button"
      className="service-flip-card min-h-[15.5rem]"
      style={
        {
          "--tile-glow": glow,
          "--tile-glow-soft": glowSoft
        } as CSSProperties
      }
      data-flipped={flipped ? "true" : "false"}
      onClick={() => setFlipped((current) => !current)}
      aria-pressed={flipped}
      aria-label={`${title}: ${copy}`}
      whileHover={shouldReduceMotion ? undefined : { y: -8, scale: 1.015 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="service-flip-inner">
        <div className="service-flip-face flex flex-col justify-between p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/14 bg-white/9 shadow-[0_0_24px_var(--tile-glow-soft)]">
              <Icon className="h-5 w-5 text-white" aria-hidden="true" />
            </span>
            <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_18px_var(--tile-glow)]" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
              {kicker}
            </p>
            <h3 className="mt-3 text-xl font-semibold leading-tight text-white">
              {title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-white/65">{copy}</p>
          </div>
        </div>
        <div className="service-flip-face service-flip-back">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
            Built around outcomes
          </p>
          <h3 className="mt-3 text-xl font-semibold text-white">{title}</h3>
          <p className="mt-4 text-sm leading-6 text-white/72">{detail}</p>
        </div>
      </div>
    </motion.button>
  );
}
