import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";

export default function QuickView({ product, onClose, onAdd }) {
  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            data-testid="quick-view-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60"
          />
          <motion.div
            data-testid="quick-view-modal"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-3xl bg-background border border-foreground grid md:grid-cols-2 max-h-[90vh] overflow-y-auto"
          >
            <div className="relative aspect-square md:aspect-auto border-b md:border-b-0 md:border-r border-foreground overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover grayscale contrast-125"
              />
              <span className="absolute top-0 left-0 mono-tag px-3 py-2 bg-foreground text-background">
                {product.status}
              </span>
            </div>
            <div className="p-8 flex flex-col">
              <button
                data-testid="quick-view-close"
                onClick={onClose}
                aria-label="Close quick view"
                className="self-end hover:opacity-50 transition-opacity duration-300"
              >
                <X size={18} />
              </button>
              <p className="mono-tag opacity-50 mt-2">
                {product.series} / {product.edition}
              </p>
              <h3 className="font-display text-5xl uppercase mt-4 leading-[0.9]">
                {product.name}
              </h3>
              <p className="text-sm font-light leading-relaxed opacity-70 mt-6">
                {product.description}
              </p>
              <div className="grid grid-cols-3 border border-foreground divide-x divide-foreground mt-8 mono-tag text-center">
                <div className="py-3">{product.articulation} PTS</div>
                <div className="py-3">{product.height}</div>
                <div className="py-3">ABS</div>
              </div>
              <div className="mt-auto pt-8 flex items-center justify-between gap-4">
                <p className="font-mono text-2xl" data-testid="quick-view-price">
                  ${product.price}
                </p>
                <button
                  data-testid="quick-view-add-btn"
                  onClick={() => {
                    onAdd(product);
                    onClose();
                  }}
                  className="bg-foreground text-background px-6 py-4 mono-tag flex items-center gap-2 hover:opacity-75 transition-opacity duration-300"
                >
                  <Plus size={14} /> Add to Crate
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
