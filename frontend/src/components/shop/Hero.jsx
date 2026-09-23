import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const HERO_IMG =
  "https://images.unsplash.com/photo-1610568781018-995405522539?q=80&w=1400&auto=format&fit=crop";

const LINES = ["Small Form.", "Monumental", "Presence."];

const STATS = [
  ["08", "Figures in Series 01"],
  ["500", "Edition cap per figure"],
  ["26", "Articulation points"],
  ["00", "Colors used"],
];

const EASE = [0.16, 1, 0.3, 1];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), {
    stiffness: 50,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), {
    stiffness: 50,
    damping: 18,
  });

  const handleMouse = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      ref={ref}
      data-testid="hero-section"
      onMouseMove={handleMouse}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative border-b border-foreground pt-16 overflow-hidden"
    >
      <span
        aria-hidden
        className="pointer-events-none select-none absolute -bottom-14 -left-6 font-display text-[36vw] leading-none opacity-[0.05]"
      >
        01
      </span>
      <div className="grid lg:grid-cols-12 relative">
        <div className="lg:col-span-7 px-4 sm:px-8 lg:px-12 py-16 sm:py-24 flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mono-tag mb-10 flex items-center gap-4"
          >
            <span className="w-10 h-px bg-foreground inline-block" />
            Series 01 — Monochrome Drop
          </motion.p>
          <h1 className="font-display uppercase leading-[0.85] tracking-tight text-[17vw] sm:text-[12vw] lg:text-[8.25rem]">
            {LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1 -mb-1">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 0.2 + i * 0.14, duration: 0.9, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7, ease: EASE }}
            className="mt-10 max-w-md text-sm sm:text-base font-light leading-relaxed opacity-70"
          >
            Eight articulated minifigures cast under a strict black-and-white
            discipline. Limited editions, museum framing, zero decoration —
            the silhouette does all the talking.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.7, ease: EASE }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <a
              href="#archive"
              data-testid="hero-cta-explore"
              className="group bg-foreground text-background px-8 py-4 mono-tag flex items-center gap-3 hover:opacity-75 transition-opacity duration-300"
            >
              Explore the Archive
              <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform duration-300" />
            </a>
            <a
              href="#manifesto"
              data-testid="hero-cta-manifesto"
              className="group border border-foreground px-8 py-4 mono-tag flex items-center gap-3 hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              Read Manifesto
              <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </a>
          </motion.div>
        </div>
        <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-foreground relative">
          <motion.div
            style={{ rotateX, rotateY, transformPerspective: 1000 }}
            className="relative h-[52vh] lg:h-full min-h-[440px] overflow-hidden"
          >
            <motion.img
              src={HERO_IMG}
              alt="Series 01 minifigure, de-saturated"
              style={{ y: imgY }}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1.2, ease: EASE }}
              className="absolute inset-0 w-full h-[125%] object-cover grayscale contrast-125"
            />
            <span aria-hidden className="absolute top-4 left-4 w-6 h-6 border-t border-l border-background mix-blend-difference" />
            <span aria-hidden className="absolute top-4 right-4 w-6 h-6 border-t border-r border-background mix-blend-difference" />
          </motion.div>
          <div className="absolute bottom-0 left-0 right-0 border-t border-foreground bg-background/85 backdrop-blur-sm px-6 py-4 flex justify-between mono-tag">
            <span data-testid="hero-caption">Fig. 003 — Void Walker, Field Frame</span>
            <span className="hidden sm:inline">4.0 CM / ABS</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-foreground relative bg-background">
        {STATS.map(([n, label], i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.1, duration: 0.6, ease: EASE }}
            className="px-6 py-6 border-foreground border-r last:border-r-0 [&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r"
            data-testid={`hero-stat-${i}`}
          >
            <p className="font-display text-4xl sm:text-5xl leading-none">{n}</p>
            <p className="mono-tag opacity-50 mt-2">{label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
