"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import type { ReactNode } from "react";

type StudioBentoHeroProps = {
  videoSrc: string;
  posterSrc: string;
};

function StudioMark() {
  return (
    <span className="studio-identity-mark" aria-hidden="true">
      <span />
      <span />
    </span>
  );
}

function Tile({
  area,
  className = "",
  delay = 0,
  children
}: {
  area: string;
  className?: string;
  delay?: number;
  children: ReactNode;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`studio-bento-tile ${className}`}
      data-area={area}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.65, delay, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.006 }}
    >
      {children}
    </motion.div>
  );
}

function MediaTile({
  area,
  videoSrc,
  posterSrc,
  className = "",
  delay = 0,
  children
}: {
  area: string;
  videoSrc: string;
  posterSrc: string;
  className?: string;
  delay?: number;
  children?: ReactNode;
}) {
  const shouldReduceMotion = useReducedMotion();
  const videoType = useMemo(
    () => (videoSrc.endsWith(".webm") ? "video/webm" : "video/mp4"),
    [videoSrc]
  );

  return (
    <Tile area={area} className={`studio-bento-media ${className}`} delay={delay}>
      <video
        className="studio-bento-media-object"
        muted
        loop
        playsInline
        preload="metadata"
        poster={posterSrc}
        autoPlay={!shouldReduceMotion}
        aria-label="Andrew Stephens Studios placeholder media"
      >
        <source src={videoSrc} type={videoType} />
      </video>
      <div className="studio-bento-media-vignette" aria-hidden="true" />
      {children}
    </Tile>
  );
}

export function StudioBentoHero({ videoSrc, posterSrc }: StudioBentoHeroProps) {
  return (
    <section className="studio-bento-hero" aria-label="Andrew Stephens Studios">
      <div className="studio-bento-board">
        <Tile area="brand" className="studio-brand-panel" delay={0}>
          <div className="studio-brand-lockup">
            <StudioMark />
            <p>
              <span>Andrew Stephens</span>
              <span>Studios</span>
            </p>
          </div>
        </Tile>

        <Tile area="url" className="studio-url-panel" delay={0.05}>
          <span className="studio-url-pill">
            <strong>AS</strong>
            <span>andrewstephens.studio</span>
          </span>
        </Tile>

        <MediaTile
          area="mediaTop"
          videoSrc={videoSrc}
          posterSrc={posterSrc}
          className="studio-photo-panel"
          delay={0.08}
        />

        <MediaTile
          area="story"
          videoSrc={videoSrc}
          posterSrc={posterSrc}
          className="studio-story-panel"
          delay={0.12}
        >
          <h1>Creative visuals for businesses that need to be seen.</h1>
        </MediaTile>

        <Tile area="services" className="studio-service-stripes" delay={0.16}>
          <span>Aerial</span>
          <span>Photography</span>
          <span>Web Design</span>
          <span>Business Content</span>
        </Tile>

        <Tile area="copy" className="studio-copy-panel" delay={0.2}>
          <div className="studio-copy-logo">
            <StudioMark />
            <span>Andrew Stephens Studios</span>
          </div>
          <p>
            Aerial, photography, web design, and content systems for brands
            ready to stand out.
          </p>
        </Tile>

        <Tile area="mark" className="studio-mark-panel" delay={0.24}>
          <div className="studio-blueprint-grid" aria-hidden="true" />
          <span className="studio-giant-mark">AS</span>
        </Tile>
      </div>
    </section>
  );
}
