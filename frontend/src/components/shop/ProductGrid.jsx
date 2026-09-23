import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Eye } from "lucide-react";
import { Reveal } from "./Reveal";

const CATS = ["ALL", "VANGUARD", "OPERATIVE", "ARTIFACT"];
const EASE = [0.16, 1, 0.3, 1];

function ProductCard({ p, index, onAdd, onQuickView }) {
  const [spot, setSpot] = useState({ x: 50, y: 50, on: false });
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: EASE }}
      className="group border border-foreground bg-background flex flex-col"
      data-testid={`product-card-${p.slug}`}
    >
      <div
        className="relative aspect-[3/4] overflow-hidden border-b border-foreground"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setSpot({
            x: ((e.clientX - r.left) / r.width) * 100,
            y: ((e.clientY - r.top) / r.height) * 100,
            on: true,
          });
        }}
        onMouseLeave={() => setSpot((s) => ({ ...s, on: false }))}
      >
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: spot.on ? 1 : 0,
            background: `radial-gradient(260px circle at ${spot.x}% ${spot.y}%, rgba(255,255,255,0.4), transparent 70%)`,
            mixBlendMode: "overlay",
          }}
        />
        <span
          className={`absolute top-0 left-0 mono-tag px-3 py-2 ${
            p.status === "IN STOCK"
              ? "bg-foreground text-background"
              : "bg-background text-foreground border-b border-r border-foreground"
          }`}
        >
          {p.status}
        </span>
        <span className="absolute top-0 right-0 mono-tag px-3 py-2 bg-background/80 backdrop-blur-sm border-b border-l border-foreground">
          {p.edition}
        </span>
        <button
          data-testid={`quick-view-${p.slug}`}
          onClick={() => onQuickView(p)}
          aria-label={`Quick view ${p.name}`}
          className="absolute bottom-4 right-4 bg-background border border-foreground p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-foreground hover:text-background"
        >
          <Eye size={16} />
        </button>
      </div>
      <div className="p-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl uppercase tracking-wide leading-none">
            {p.name}
          </h3>
          <p className="mono-tag opacity-50 mt-2">
            {p.category} / {p.articulation} PTS
          </p>
        </div>
        <p className="font-mono text-sm" data-testid={`price-${p.slug}`}>
          ${p.price}
        </p>
      </div>
      <button
        data-testid={`add-to-cart-${p.slug}`}
        onClick={() => onAdd(p)}
        className="mt-auto border-t border-foreground py-4 mono-tag flex items-center justify-center gap-2 hover:bg-foreground hover:text-background transition-colors duration-300"
      >
        <Plus size={14} /> Add to Crate
      </button>
    </motion.article>
  );
}

export default function ProductGrid({ products, onAdd, onQuickView }) {
  const [cat, setCat] = useState("ALL");
  const visible = cat === "ALL" ? products : products.filter((p) => p.category === cat);
  return (
    <section id="archive" data-testid="product-grid-section" className="border-b border-foreground">
      <div className="px-4 sm:px-8 lg:px-12 py-20 sm:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-8 mb-14">
            <div>
              <p className="mono-tag opacity-50 mb-4">[ 02 — The Archive ]</p>
              <h2 className="font-display uppercase leading-[0.9] text-5xl sm:text-7xl">
                Current
                <br />
                Acquisition
              </h2>
            </div>
            <div className="flex flex-wrap border border-foreground" data-testid="category-filter-bar">
              {CATS.map((c) => (
                <button
                  key={c}
                  data-testid={`filter-${c.toLowerCase()}`}
                  onClick={() => setCat(c)}
                  className={`px-5 py-3 mono-tag transition-colors duration-300 ${
                    cat === c ? "bg-foreground text-background" : "hover:bg-foreground/10"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
        {products.length === 0 ? (
          <p className="mono-tag opacity-50 py-20" data-testid="catalog-loading">
            Catalog loading — contacting archive…
          </p>
        ) : (
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {visible.map((p, i) => (
                <ProductCard key={p.slug} p={p} index={i} onAdd={onAdd} onQuickView={onQuickView} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
