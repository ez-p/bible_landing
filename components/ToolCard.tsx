import Image from "next/image";
import type { StudyTool } from "@/data/tools";

type ToolCardProps = {
  tool: StudyTool;
};

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <a
      href={tool.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center rounded-lg border-[1.5px] border-[rgba(28,43,73,0.18)] px-7 py-[34px] pb-[30px] text-center no-underline transition-[transform,box-shadow,border-color] duration-[180ms] ease-out hover:-translate-y-[5px] hover:border-[rgba(28,43,73,0.4)] hover:shadow-[0_14px_30px_rgba(40,40,25,0.16)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none"
      style={{ backgroundColor: "var(--card-bg)", color: "inherit" }}
    >
      <Image
        src={tool.icon}
        alt={tool.iconAlt}
        width={88}
        height={88}
        className="h-[88px] w-[88px] object-contain drop-shadow-[0_4px_8px_rgba(40,40,25,0.18)]"
      />
      <span
        className="mt-4 text-[11px] font-medium uppercase tracking-[0.26em]"
        style={{ color: "var(--eyebrow)" }}
      >
        {tool.eyebrow}
      </span>
      <h3
        className="mt-2 font-[family-name:var(--font-cormorant)] text-[26px] font-semibold md:text-[29px]"
        style={{ color: "var(--text-heading)" }}
      >
        {tool.title}
      </h3>
      <p
        className="mt-3 text-[17px] leading-[1.55]"
        style={{ color: "var(--text-muted)" }}
      >
        {tool.description}
      </p>
      <span
        className="mt-5 border-b-[1.5px] pb-1 text-[15px] font-medium tracking-[0.04em]"
        style={{ borderColor: "var(--gold)", color: "var(--cta)" }}
      >
        {tool.cta}
      </span>
    </a>
  );
}
