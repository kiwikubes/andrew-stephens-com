"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

type Tile = {
  id: string;
  className: string;
  glow: string;
  glowSoft: string;
  label: string;
  meta: string;
  objectPosition: string;
  backTitle?: string;
  backCopy?: string;
};

type TiledVideoWallProps = {
  videoSrc: string;
  posterSrc: string;
  className?: string;
};

const tiles: Tile[] = [
  {
    id: "signal",
    className:
      "col-span-6 row-span-2 md:[grid-column:1/span_5] md:[grid-row:1/span_3]",
    glow: "rgba(0, 229, 255, 0.58)",
    glowSoft: "rgba(0, 229, 255, 0.18)",
    label: "Aerial showreel",
    meta: "4K motion",
    objectPosition: "48% 38%"
  },
  {
    id: "property",
    className:
      "col-span-3 row-span-2 md:[grid-column:6/span_3] md:[grid-row:1/span_2]",
    glow: "rgba(255, 43, 214, 0.56)",
    glowSoft: "rgba(255, 43, 214, 0.16)",
    label: "Property",
    meta: "reveal shots",
    objectPosition: "54% 44%",
    backTitle: "Estate-ready edits",
    backCopy: "Smooth exterior reveals, area context, social crops, and clean listing assets."
  },
  {
    id: "coast",
    className:
      "col-span-3 row-span-2 md:[grid-column:9/span_4] md:[grid-row:1/span_4]",
    glow: "rgba(139, 92, 246, 0.58)",
    glowSoft: "rgba(139, 92, 246, 0.17)",
    label: "North East",
    meta: "coast + city",
    objectPosition: "44% 52%"
  },
  {
    id: "vertical",
    className:
      "col-span-4 row-span-3 md:[grid-column:1/span_3] md:[grid-row:4/span_3]",
    glow: "rgba(184, 255, 60, 0.54)",
    glowSoft: "rgba(184, 255, 60, 0.16)",
    label: "Vertical cuts",
    meta: "social-first",
    objectPosition: "46% 48%",
    backTitle: "Built for feeds",
    backCopy: "Short-form deliverables with punchy pacing for launches, events, and campaigns."
  },
  {
    id: "construction",
    className:
      "col-span-2 row-span-3 md:[grid-column:4/span_5] md:[grid-row:3/span_2]",
    glow: "rgba(255, 209, 102, 0.56)",
    glowSoft: "rgba(255, 209, 102, 0.16)",
    label: "Construction",
    meta: "progress",
    objectPosition: "52% 46%"
  },
  {
    id: "precision",
    className:
      "col-span-3 row-span-2 md:[grid-column:4/span_2] md:[grid-row:5/span_2]",
    glow: "rgba(0, 229, 255, 0.5)",
    glowSoft: "rgba(0, 229, 255, 0.15)",
    label: "Inspection",
    meta: "detail",
    objectPosition: "58% 50%",
    backTitle: "Detail passes",
    backCopy: "Clean angles and repeatable flight paths for visual checks and records."
  },
  {
    id: "events",
    className:
      "col-span-3 row-span-2 md:[grid-column:6/span_3] md:[grid-row:5/span_2]",
    glow: "rgba(255, 43, 214, 0.5)",
    glowSoft: "rgba(255, 43, 214, 0.15)",
    label: "Events",
    meta: "outdoor media",
    objectPosition: "50% 60%"
  },
  {
    id: "studio",
    className:
      "col-span-6 row-span-2 md:[grid-column:9/span_4] md:[grid-row:5/span_2]",
    glow: "rgba(184, 255, 60, 0.5)",
    glowSoft: "rgba(184, 255, 60, 0.15)",
    label: "Studio finish",
    meta: "edit + deliver",
    objectPosition: "50% 45%"
  }
];

function TileShell({
  interactive,
  flipped,
  onClick,
  children,
  style,
  ariaLabel
}: {
  interactive: boolean;
  flipped: boolean;
  onClick: () => void;
  children: ReactNode;
  style: CSSProperties;
  ariaLabel: string;
}) {
  const commonProps = {
    className: "mosaic-tile",
    "data-flip": interactive ? "true" : "false",
    "data-flipped": flipped ? "true" : "false",
    style
  };

  if (interactive) {
    return (
      <button
        {...commonProps}
        type="button"
        aria-label={ariaLabel}
        aria-pressed={flipped}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return <div {...commonProps}>{children}</div>;
}

export function TiledVideoWall({
  videoSrc,
  posterSrc,
  className = ""
}: TiledVideoWallProps) {
  const shouldReduceMotion = useReducedMotion();
  const [flippedTiles, setFlippedTiles] = useState<Record<string, boolean>>({});
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const videoType = useMemo(
    () => (videoSrc.endsWith(".webm") ? "video/webm" : "video/mp4"),
    [videoSrc]
  );

  const setVideoRef = useCallback(
    (id: string) => (node: HTMLVideoElement | null) => {
      videoRefs.current[id] = node;
    },
    []
  );

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const playAll = () => {
      const videos = Object.values(videoRefs.current).filter(Boolean);
      const leader = videos[0];

      if (!leader) {
        return;
      }

      videos.forEach((video) => {
        if (!video) {
          return;
        }

        video.muted = true;
        video.currentTime = leader.currentTime || 0;
        void video.play().catch(() => undefined);
      });
    };

    const initialTimer = window.setTimeout(playAll, 180);
    const syncTimer = window.setInterval(() => {
      const videos = Object.values(videoRefs.current).filter(Boolean);
      const leader = videos[0];

      if (!leader || leader.readyState < 2) {
        return;
      }

      videos.slice(1).forEach((video) => {
        if (!video || video.readyState < 2) {
          return;
        }

        if (Math.abs(video.currentTime - leader.currentTime) > 0.18) {
          video.currentTime = leader.currentTime;
        }

        if (!leader.paused && video.paused) {
          void video.play().catch(() => undefined);
        }
      });
    }, 700);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(syncTimer);
    };
  }, [shouldReduceMotion]);

  return (
    <div className={`relative ${className}`}>
      <div
        aria-hidden="true"
        className="absolute -inset-8 rounded-[3rem] bg-[radial-gradient(circle_at_12%_20%,rgba(0,229,255,0.22),transparent_28%),radial-gradient(circle_at_84%_28%,rgba(255,43,214,0.2),transparent_30%),radial-gradient(circle_at_56%_92%,rgba(184,255,60,0.14),transparent_32%)] blur-2xl"
      />
      <motion.div
        className="mosaic-video-grid relative z-10 grid-cols-6 gap-3 md:grid-cols-12 md:gap-4"
        initial={shouldReduceMotion ? false : "hidden"}
        animate={shouldReduceMotion ? undefined : "visible"}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.07
            }
          }
        }}
      >
        {tiles.map((tile, index) => {
          const isInteractive = Boolean(tile.backTitle);
          const isFlipped = Boolean(flippedTiles[tile.id]);
          const style = {
            "--tile-glow": tile.glow,
            "--tile-glow-soft": tile.glowSoft
          } as CSSProperties;

          return (
            <motion.div
              key={tile.id}
              className={tile.className}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 26,
                  scale: 0.96,
                  rotate: index % 2 === 0 ? -1.5 : 1.5
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotate: 0
                }
              }}
              transition={{ duration: 0.72, ease: [0.2, 0.8, 0.2, 1] }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -8,
                      scale: 1.018,
                      rotateX: 1.3,
                      rotateY: index % 2 === 0 ? -1.6 : 1.6
                    }
              }
            >
              <TileShell
                interactive={isInteractive}
                flipped={isFlipped}
                ariaLabel={`${tile.label}: ${tile.meta}`}
                style={style}
                onClick={() =>
                  setFlippedTiles((current) => ({
                    ...current,
                    [tile.id]: !current[tile.id]
                  }))
                }
              >
                <div className="mosaic-card-inner">
                  <div className="mosaic-card-face bg-black">
                    <video
                      ref={setVideoRef(tile.id)}
                      className="absolute inset-0 h-full w-full object-cover opacity-90 saturate-[1.25] contrast-[1.06]"
                      style={{ objectPosition: tile.objectPosition }}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster={posterSrc}
                      autoPlay={!shouldReduceMotion}
                      aria-label="Andrew Stephens Aerial placeholder showreel"
                    >
                      <source src={videoSrc} type={videoType} />
                    </video>
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.2),transparent_34%),radial-gradient(circle_at_78%_12%,rgba(255,255,255,0.2),transparent_20%),linear-gradient(180deg,transparent_40%,rgba(0,0,0,0.62))]" />
                    <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3">
                      <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_18px_var(--tile-glow)]" />
                      <span className="rounded-full border border-white/15 bg-black/28 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
                        {tile.meta}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-sm font-semibold text-white md:text-base">
                        {tile.label}
                      </p>
                    </div>
                  </div>
                  {isInteractive ? (
                    <div className="mosaic-card-face mosaic-card-back">
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/50">
                        {tile.meta}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-white">
                        {tile.backTitle}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-white/72">
                        {tile.backCopy}
                      </p>
                    </div>
                  ) : null}
                </div>
              </TileShell>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
