import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="mx-auto max-w-[720px] px-6 pb-2 pt-10 text-center md:px-10">
      <h1
        className="font-[family-name:var(--font-cormorant)] text-[40px] font-semibold leading-[1.04] tracking-[0.005em] md:text-[64px]"
        style={{ color: "var(--text-heading)" }}
      >
        {site.hero.title}
      </h1>
      <p
        className="mx-auto mt-6 max-w-[560px] text-lg leading-relaxed md:text-xl"
        style={{ color: "var(--text-muted)" }}
      >
        {site.hero.subtitle}
      </p>
    </section>
  );
}
