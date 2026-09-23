const ITEMS = [
  "Minifig // Archive",
  "Series 01 — Live",
  "Limited Edition Drops",
  "100% Articulated",
  "Monochrome Only",
  "Worldwide Shipping",
];

function Row({ hidden }) {
  return (
    <div aria-hidden={hidden} className="flex shrink-0 items-center">
      {ITEMS.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="font-display text-2xl sm:text-3xl uppercase tracking-wide px-8">
            {t}
          </span>
          <span className="w-2 h-2 bg-foreground inline-block" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee({ reverse = false }) {
  return (
    <div
      data-testid={reverse ? "marquee-reverse" : "marquee"}
      className="overflow-hidden border-b border-foreground py-5 select-none"
    >
      <div
        className="flex w-max marquee-track"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        <Row hidden={false} />
        <Row hidden={true} />
      </div>
    </div>
  );
}
