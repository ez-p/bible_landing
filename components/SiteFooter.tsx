import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-14 max-w-[760px] px-6 text-center md:px-10">
      <span
        className="inline-block h-0.5 w-11"
        style={{ backgroundColor: "var(--gold)" }}
        aria-hidden="true"
      />
      <p className="mt-[18px] text-[15px]" style={{ color: "var(--text-footer)" }}>
        {site.footer.text}
      </p>
      <a
        href={`mailto:${site.footer.contactEmail}`}
        className="mt-6 inline-block border-b-[1.5px] pb-1 text-[15px] font-medium tracking-[0.04em] no-underline transition-colors hover:opacity-80"
        style={{ borderColor: "var(--gold)", color: "var(--cta)" }}
      >
        {site.footer.contactLabel}
      </a>
    </footer>
  );
}
