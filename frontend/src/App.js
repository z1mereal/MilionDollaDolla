import { useEffect, useState, useCallback } from "react";
import "@/App.css";
import axios from "axios";
import Lenis from "lenis";
import { Toaster, toast } from "sonner";
import Navbar from "@/components/shop/Navbar";
import Hero from "@/components/shop/Hero";
import Marquee from "@/components/shop/Marquee";
import ProductGrid from "@/components/shop/ProductGrid";
import Manifesto from "@/components/shop/Manifesto";
import NewsletterFooter from "@/components/shop/NewsletterFooter";
import CartDrawer from "@/components/shop/CartDrawer";
import QuickView from "@/components/shop/QuickView";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("mfa-theme") || "light"
  );
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickView, setQuickView] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("mfa-theme", theme);
  }, [theme]);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09 });
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    axios
      .get(`${API}/products`)
      .then((r) => setProducts(r.data))
      .catch(() => {});
  }, []);

  const addToCart = useCallback((p) => {
    setCart((prev) => {
      const found = prev.find((i) => i.slug === p.slug);
      if (found)
        return prev.map((i) =>
          i.slug === p.slug ? { ...i, qty: i.qty + 1 } : i
        );
      return [...prev, { ...p, qty: 1 }];
    });
    toast.success(`${p.name} — ADDED TO CRATE`);
  }, []);

  const setQty = useCallback((slug, qty) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((i) => i.slug !== slug)
        : prev.map((i) => (i.slug === slug ? { ...i, qty } : i))
    );
  }, []);

  const cartCount = cart.reduce((a, i) => a + i.qty, 0);

  return (
    <div id="top" className="min-h-screen bg-background text-foreground font-body">
      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
      />
      <main>
        <Hero />
        <Marquee />
        <ProductGrid products={products} onAdd={addToCart} onQuickView={setQuickView} />
        <Marquee reverse />
        <Manifesto />
        <NewsletterFooter />
      </main>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} setQty={setQty} />
      <QuickView product={quickView} onClose={() => setQuickView(null)} onAdd={addToCart} />
      <Toaster
        theme={theme}
        position="bottom-right"
        toastOptions={{
          style: {
            borderRadius: 0,
            background: "hsl(var(--background))",
            color: "hsl(var(--foreground))",
            border: "1px solid hsl(var(--foreground))",
            fontFamily: "'Space Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          },
        }}
      />
    </div>
  );
}
