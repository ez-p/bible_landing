import { site } from "@/data/site";

export function BrandBar() {
  return (
    <header className="flex items-center justify-center gap-3 px-6 pb-1 pt-[26px]">
      <span
        className="block h-0.5 w-[30px] shrink-0"
        style={{ backgroundColor: "var(--gold)" }}
        aria-hidden="true"
      />
      <span
        className="text-center text-[13px] font-medium uppercase tracking-[0.34em]"
        style={{ color: "var(--eyebrow)" }}
      >
        {site.brandLabel}
      </span>
      <span
        className="block h-0.5 w-[30px] shrink-0"
        style={{ backgroundColor: "var(--gold)" }}
        aria-hidden="true"
      />
    </header>
  );
}
