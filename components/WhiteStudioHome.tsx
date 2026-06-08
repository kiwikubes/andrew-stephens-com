"use client";

import {
  ArrowUpRight,
  Camera,
  Clapperboard,
  Compass,
  Layers3,
  MonitorSmartphone,
  Palette,
  PenTool,
  Send,
  Sparkles
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const heroVideo = "/videos/hero-drone.mp4";
const heroPoster = "/images/hero-drone-poster.svg";

const services = [
  {
    title: "Aerial Video",
    copy: "Cinematic drone footage for places, properties, projects, and campaigns.",
    icon: Clapperboard
  },
  {
    title: "Photography",
    copy: "Clean stills for brands, spaces, people, listings, and launch moments.",
    icon: Camera
  },
  {
    title: "Web Design",
    copy: "Modern websites with sharp structure, confident visuals, and clear conversion paths.",
    icon: MonitorSmartphone
  },
  {
    title: "Business Content",
    copy: "Social, promotional, and campaign assets shaped around how your audience buys.",
    icon: Layers3
  },
  {
    title: "Property Media",
    copy: "Aerial, ground, and edited content that helps spaces feel tangible online.",
    icon: Compass
  },
  {
    title: "Brand Visuals",
    copy: "Identity-led image systems, motion assets, and creative direction.",
    icon: Palette
  }
];

const bentoTiles = [
  {
    area: "brand",
    kind: "brand",
    title: "ANDREW STEPHENS.",
    copy: "Creative Digital Studio"
  },
  {
    area: "message",
    kind: "message",
    title: "Creative visuals for businesses that need to be seen.",
    copy: "A premium creative partner for aerial, digital, and commercial content."
  },
  {
    area: "aerial",
    kind: "media",
    title: "Aerial Video",
    copy: "North East perspectives, filmed with purpose.",
    icon: Clapperboard
  },
  {
    area: "photo",
    kind: "media",
    title: "Photography",
    copy: "Still images with clean commercial polish.",
    icon: Camera
  },
  {
    area: "web",
    kind: "service",
    title: "Web Design",
    copy: "Digital homes for businesses ready to look established.",
    icon: MonitorSmartphone
  },
  {
    area: "content",
    kind: "service",
    title: "Business Content",
    copy: "Launches, socials, campaigns, and evergreen media.",
    icon: Layers3
  },
  {
    area: "property",
    kind: "service",
    title: "Property Media",
    copy: "Visuals that help spaces sell the feeling before a viewing.",
    icon: Compass
  },
  {
    area: "visuals",
    kind: "service",
    title: "Brand Visuals",
    copy: "Creative direction, image language, and asset systems.",
    icon: PenTool
  },
  {
    area: "palette",
    kind: "palette",
    title: "Studio Identity",
    copy: "Warm white, ink, sky, field, stone, and signal blue."
  },
  {
    area: "url",
    kind: "url",
    title: "andrew-stephens.com",
    copy: "North East / UK"
  }
];

function Reveal({
  children,
  className = "",
  delay = 0
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function StudioWordmark({ compact = false }: { compact?: boolean }) {
  return (
    <a
      className={`white-wordmark${compact ? " white-wordmark-compact" : ""}`}
      href="#"
      aria-label="Andrew Stephens home"
    >
      <span className="white-wordmark-copy">
        <span className="white-wordmark-name" aria-hidden="true">
          <span>ANDREW</span>
          <span>
            STEPHENS<span className="white-wordmark-stop">.</span>
          </span>
        </span>
        {!compact ? (
          <small className="white-wordmark-subline">
            <span className="white-subline-creative">Creative</span>
            <span className="white-subline-digital">Digital</span>
            <span className="white-subline-studio">Studio</span>
          </small>
        ) : null}
      </span>
    </a>
  );
}

function MediaVideo({ label }: { label: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <video
      className="white-media-video"
      muted
      loop
      playsInline
      preload="metadata"
      poster={heroPoster}
      autoPlay={!shouldReduceMotion}
      aria-label={label}
    >
      <source src={heroVideo} type="video/mp4" />
    </video>
  );
}

function BentoTile({
  tile,
  index
}: {
  tile: (typeof bentoTiles)[number];
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const Icon = ("icon" in tile && tile.icon ? tile.icon : Sparkles) as typeof Sparkles;

  return (
    <motion.article
      className={`white-bento-tile white-bento-${tile.kind}`}
      data-area={tile.area}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.62, delay: index * 0.035, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={shouldReduceMotion ? undefined : { y: -5, scale: 1.006 }}
    >
      {tile.kind === "media" ? (
        <>
          <MediaVideo label={`${tile.title} preview`} />
          <div className="white-media-wash" />
        </>
      ) : null}

      {tile.kind === "palette" ? (
        <div className="white-palette-swatches" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      ) : null}

      {tile.kind === "url" ? (
        <div className="white-vertical-url">
          <span>{tile.title}</span>
          <small>{tile.copy}</small>
        </div>
      ) : (
        <div className="white-bento-content">
          {tile.kind === "brand" ? <StudioWordmark compact /> : null}
          {tile.kind === "service" || tile.kind === "media" ? (
            <span className="white-bento-icon">
              <Icon size={20} strokeWidth={1.8} />
            </span>
          ) : null}
          {tile.kind !== "brand" ? <h3>{tile.title}</h3> : null}
          <p>{tile.copy}</p>
        </div>
      )}
    </motion.article>
  );
}

export function WhiteStudioHome() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="white-site">
      <header className="white-header">
        <StudioWordmark />
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="white-hero" id="work">
        <div className="white-hero-frame">
          <video
            className="white-hero-video"
            muted
            loop
            playsInline
            preload="metadata"
            poster={heroPoster}
            autoPlay
            aria-label="Andrew Stephens drone showreel"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="white-hero-fallback" aria-hidden="true" />
          <div className="white-hero-sheen" aria-hidden="true" />
          <motion.div
            className="white-hero-copy"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <span className="white-eyebrow">Drone / Photography / Web / Content</span>
            <h1>Creative visuals for businesses that need to be seen.</h1>
            <div className="white-hero-caption">
              <p>
                Drone video, photography, web design, and digital content for
                brands, properties, projects, and places across the North East.
              </p>
              <div className="white-hero-actions">
                <a href="#identity">View work</a>
                <a href="#contact">
                  Start a project
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="white-intro" id="about">
        <Reveal className="white-intro-inner">
          <p>
            A creative digital studio for businesses that need high-quality
            visuals without the agency fog.
          </p>
          <span>
            Based in the North East. Built around aerial perspective, clean
            design, and content that helps people understand what you do faster.
          </span>
        </Reveal>
      </section>

      <section className="white-bento-section" id="identity" aria-label="Studio identity board">
        <div className="white-section-label">
          <span>Studio board</span>
          <span>andrew-stephens.com</span>
        </div>
        <div className="white-bento-board">
          {bentoTiles.map((tile, index) => (
            <BentoTile key={tile.area} tile={tile} index={index} />
          ))}
        </div>
      </section>

      <section className="white-services" id="services">
        <Reveal className="white-section-heading">
          <span>Services</span>
          <h2>One studio for the visuals your business keeps needing.</h2>
        </Reveal>
        <div className="white-service-grid">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <Reveal key={service.title} delay={index * 0.035}>
                <article className="white-service-card">
                  <Icon size={25} strokeWidth={1.6} />
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="white-process">
        <Reveal className="white-process-panel">
          <div>
            <span>Process</span>
            <h2>Plan the story. Capture the proof. Shape the asset.</h2>
          </div>
          <ol>
            <li>
              <strong>01 Brief</strong>
              <span>Goals, audience, locations, deliverables, and practical constraints.</span>
            </li>
            <li>
              <strong>02 Capture</strong>
              <span>Drone, photography, supporting footage, and brand texture.</span>
            </li>
            <li>
              <strong>03 Build</strong>
              <span>Edits, web pages, content packs, and launch-ready files.</span>
            </li>
          </ol>
        </Reveal>
      </section>

      <section className="white-contact" id="contact">
        <Reveal className="white-contact-copy">
          <span>Start a project</span>
          <h2>Tell me what needs to be seen.</h2>
          <p>
            Use this concept form as the starting point. It can later connect to
            email, CRM, or a booking workflow.
          </p>
        </Reveal>
        <Reveal className="white-contact-form" delay={0.08}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <label>
              Name
              <input name="name" placeholder="Your name" required />
            </label>
            <label>
              Email
              <input name="email" type="email" placeholder="you@example.com" required />
            </label>
            <label>
              Project
              <select name="project" defaultValue="Aerial Video">
                <option>Aerial Video</option>
                <option>Photography</option>
                <option>Web Design</option>
                <option>Business Content</option>
                <option>Property Media</option>
                <option>Brand Visuals</option>
              </select>
            </label>
            <label>
              Brief
              <textarea name="brief" rows={5} placeholder="What are you trying to create?" required />
            </label>
            <button type="submit">
              Send enquiry
              <Send size={17} />
            </button>
          </form>
        </Reveal>
      </section>

      <footer className="white-footer">
        <StudioWordmark />
        <span>andrew-stephens.com</span>
      </footer>
    </main>
  );
}
