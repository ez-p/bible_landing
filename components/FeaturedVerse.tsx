import { site } from "@/data/site";

export function FeaturedVerse() {
  return (
    <section
      className="relative mx-auto mt-11 max-w-[760px] rounded px-8 py-[34px] text-center md:px-12"
      style={{ backgroundColor: "var(--olive)", color: "var(--parchment-light)" }}
      aria-label="Featured scripture"
    >
      <div
        className="absolute left-0 right-0 top-3 flex justify-center"
        aria-hidden="true"
      >
        <span
          className="block h-2 w-2 rotate-45"
          style={{ backgroundColor: "var(--gold)" }}
        />
      </div>
      <blockquote
        className="mt-2 font-[family-name:var(--font-cormorant)] text-[22px] font-medium italic leading-normal md:text-[27px]"
      >
        {site.featuredVerse.text}
      </blockquote>
      <p
        className="mt-5 text-[13px] uppercase tracking-[0.28em]"
        style={{ color: "var(--gold-muted)" }}
      >
        {site.featuredVerse.reference}
      </p>
    </section>
  );
}
