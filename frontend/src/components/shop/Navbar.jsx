import { ShoppingBag, Sun, Moon } from "lucide-react";

const LINKS = [
  { label: "Index", href: "#top" },
  { label: "Archive", href: "#archive" },
  { label: "Manifesto", href: "#manifesto" },
  { label: "Drop", href: "#drop" },
];

export default function Navbar({ theme, onToggleTheme, cartCount, onOpenCart }) {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-background/90 backdrop-blur-md border-b border-foreground">
      <div className="flex items-stretch justify-between h-16">
        <a
          data-testid="nav-brand"
          href="#top"
          className="flex items-center gap-3 px-4 sm:px-8"
        >
          <span className="w-3 h-3 bg-foreground inline-block" />
          <span className="font-display text-xl tracking-[0.15em] uppercase">
            Minifig<span className="opacity-40 mx-1">//</span>Archive
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-10">
          {LINKS.map((l) => (
            <a
              key={l.label}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              href={l.href}
              className="mono-tag hover:opacity-40 transition-opacity duration-300"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-stretch">
          <button
            data-testid="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label="Toggle dark mode"
            className="px-5 border-l border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            data-testid="cart-drawer-toggle"
            onClick={onOpenCart}
            className="px-5 border-l border-foreground flex items-center gap-3 hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            <ShoppingBag size={16} />
            <span className="mono-tag" data-testid="cart-count-badge">
              [{String(cartCount).padStart(2, "0")}]
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
