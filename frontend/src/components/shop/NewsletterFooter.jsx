import { useState } from "react";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "./Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function NewsletterFooter() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      const r = await axios.post(`${API}/newsletter`, { email });
      toast.success(
        r.data.status === "already_subscribed"
          ? "YOU ARE ALREADY IN THE ARCHIVE"
          : "WELCOME TO THE ARCHIVE — SERIES 02 INTEL INCOMING"
      );
      setEmail("");
    } catch {
      toast.error("TRANSMISSION FAILED — CHECK THE ADDRESS AND RETRY");
    } finally {
      setBusy(false);
    }
  };

  return (
    <footer id="drop" data-testid="newsletter-footer" className="px-4 sm:px-8 lg:px-12 pt-20 sm:pt-28">
      <Reveal>
        <p className="mono-tag opacity-50 mb-4">[ 04 — Transmissions ]</p>
        <h2 className="font-display uppercase leading-[0.9] text-5xl sm:text-7xl max-w-4xl">
          Series 02 drops without warning.
        </h2>
        <p className="mt-6 max-w-md text-sm sm:text-base font-light opacity-70 leading-relaxed">
          One email per drop. No noise, no color. Leave an address; we handle
          the rest.
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <form
          onSubmit={submit}
          data-testid="newsletter-form"
          className="mt-10 flex max-w-xl border border-foreground"
        >
          <input
            data-testid="newsletter-form-input"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="YOUR@ADDRESS.COM"
            className="flex-1 min-w-0 bg-transparent px-5 py-4 font-mono text-xs uppercase tracking-[0.2em] placeholder:opacity-40 outline-none"
          />
          <button
            data-testid="newsletter-submit-btn"
            type="submit"
            disabled={busy}
            className="bg-foreground text-background px-6 flex items-center gap-2 mono-tag hover:opacity-75 transition-opacity duration-300 disabled:opacity-50"
          >
            {busy ? "Sending" : "Notify Me"} <ArrowRight size={14} />
          </button>
        </form>
      </Reveal>
      <div className="mt-24 border-t border-foreground overflow-hidden">
        <p
          aria-hidden
          className="font-display uppercase whitespace-nowrap leading-none text-[13vw] opacity-[0.06] py-4 select-none"
        >
          Minifig // Archive
        </p>
      </div>
      <div className="border-t border-foreground py-6 flex flex-wrap gap-4 justify-between mono-tag opacity-60">
        <span>© 2026 Minifig // Archive</span>
        <span data-testid="footer-coords">51.5072° N / 0.1276° W</span>
        <span>Series 01 — Live</span>
      </div>
    </footer>
  );
}
