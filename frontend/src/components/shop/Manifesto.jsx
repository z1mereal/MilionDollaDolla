import { Reveal } from "./Reveal";

const CHAPTERS = [
  {
    n: "01",
    title: "Material Integrity",
    body: "Every figure is cast in dense, matte ABS and inspected under raking light. If a surface catches a highlight it did not earn, it does not ship. Weight, texture and tolerance are the entire luxury.",
  },
  {
    n: "02",
    title: "Articulated Geometry",
    body: "Up to twenty-eight points of articulation, engineered to hold a pose for decades, not seconds. Each joint is a decision: visible, mechanical, honest. Nothing hidden, nothing decorative.",
  },
  {
    n: "03",
    title: "Monochrome Purism",
    body: "Color is a shortcut. We removed it. What remains is silhouette, shadow and proportion — the three things that made these figures icons in the first place. Black, white, and nothing between.",
  },
];

const BAND_IMG =
  "https://images.unsplash.com/photo-1560529177-261a781ad3b3?q=80&w=1800&auto=format&fit=crop";

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      data-testid="manifesto-section"
      className="border-b border-foreground px-4 sm:px-8 lg:px-12 py-20 sm:py-28"
    >
      <Reveal>
        <p className="mono-tag opacity-50 mb-4">[ 03 — Manifesto ]</p>
        <h2 className="font-editorial font-extrabold uppercase text-4xl sm:text-6xl leading-[0.95] max-w-4xl mb-16 tracking-tight">
          An object does not need color to command a room.
        </h2>
      </Reveal>
      <div className="grid md:grid-cols-3 border border-foreground divide-y md:divide-y-0 md:divide-x divide-foreground">
        {CHAPTERS.map((c, i) => (
          <Reveal
            key={c.n}
            delay={i * 0.12}
            className="group p-8 lg:p-12 hover:bg-foreground hover:text-background transition-colors duration-500"
          >
            <p className="font-mono text-5xl lg:text-6xl opacity-20 group-hover:opacity-50 transition-opacity duration-500">
              {c.n}
            </p>
            <h3 className="font-editorial font-bold uppercase text-xl lg:text-2xl mt-10 mb-4 tracking-wide">
              {c.title}
            </h3>
            <p className="text-sm font-light leading-relaxed opacity-70">{c.body}</p>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1} className="mt-6">
        <div
          className="relative h-64 sm:h-96 overflow-hidden border border-foreground group"
          data-testid="editorial-band"
        >
          <img
            src={BAND_IMG}
            alt="Archive wall of minifigure heads"
            loading="lazy"
            className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute bottom-0 left-0 right-0 border-t border-foreground bg-background/85 backdrop-blur-sm px-6 py-4 flex justify-between mono-tag">
            <span>The Vault — Head Archive, Bin 14</span>
            <span className="hidden sm:inline">EST. 1978 Mold Line</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
