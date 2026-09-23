import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

const FREE_SHIP = 150;

export default function CartDrawer({ open, onClose, cart, setQty }) {
  const subtotal = cart.reduce((a, i) => a + i.price * i.qty, 0);
  const progress = Math.min(100, Math.round((subtotal / FREE_SHIP) * 100));
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            data-testid="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60"
          />
          <motion.aside
            data-testid="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-background border-l border-foreground flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-16 border-b border-foreground shrink-0">
              <p className="mono-tag">Crate [{String(cart.length).padStart(2, "0")}]</p>
              <button
                data-testid="cart-close-btn"
                onClick={onClose}
                aria-label="Close cart"
                className="hover:opacity-50 transition-opacity duration-300"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <p className="mono-tag opacity-50 p-6" data-testid="cart-empty">
                  Crate is empty — acquire something.
                </p>
              ) : (
                cart.map((i) => (
                  <div
                    key={i.slug}
                    data-testid={`cart-item-${i.slug}`}
                    className="flex gap-4 p-4 border-b border-foreground"
                  >
                    <img
                      src={i.image}
                      alt={i.name}
                      className="w-20 h-24 object-cover grayscale contrast-125 border border-foreground"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2">
                        <h4 className="font-display text-lg uppercase leading-tight">
                          {i.name}
                        </h4>
                        <button
                          data-testid={`cart-remove-${i.slug}`}
                          onClick={() => setQty(i.slug, 0)}
                          aria-label={`Remove ${i.name}`}
                          className="hover:opacity-50 transition-opacity duration-300 shrink-0"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="mono-tag opacity-50 mt-1">{i.edition}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-foreground">
                          <button
                            data-testid={`cart-dec-${i.slug}`}
                            onClick={() => setQty(i.slug, i.qty - 1)}
                            className="px-3 py-1 hover:bg-foreground hover:text-background transition-colors duration-200"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-3 font-mono text-xs">{i.qty}</span>
                          <button
                            data-testid={`cart-inc-${i.slug}`}
                            onClick={() => setQty(i.slug, i.qty + 1)}
                            className="px-3 py-1 hover:bg-foreground hover:text-background transition-colors duration-200"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <p className="font-mono text-sm">${i.price * i.qty}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="border-t border-foreground p-6 space-y-5 shrink-0">
              <div>
                <div className="flex justify-between mono-tag mb-2">
                  <span data-testid="shipping-progress-label">
                    {subtotal >= FREE_SHIP
                      ? "Free shipping unlocked"
                      : `$${FREE_SHIP - subtotal} to free shipping`}
                  </span>
                  <span>{progress}%</span>
                </div>
                <div className="h-1 bg-foreground/15">
                  <div
                    className="h-full bg-foreground transition-[width] duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="mono-tag">Subtotal</span>
                <span className="font-mono text-xl" data-testid="cart-subtotal">
                  ${subtotal}
                </span>
              </div>
              <button
                data-testid="cart-checkout-btn"
                onClick={() =>
                  toast("CHECKOUT OPENS WITH SERIES 02 — THIS IS A SHOWCASE ARCHIVE")
                }
                className="w-full bg-foreground text-background py-4 mono-tag hover:opacity-75 transition-opacity duration-300"
              >
                Proceed to Checkout
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
