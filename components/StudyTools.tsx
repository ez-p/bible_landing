import { site } from "@/data/site";
import { studyTools } from "@/data/tools";
import { ToolCard } from "@/components/ToolCard";

export function StudyTools() {
  return (
    <section aria-labelledby="study-tools-heading">
      <div className="mb-[26px] mt-14 text-center">
        <h2
          id="study-tools-heading"
          className="text-[13px] font-medium uppercase tracking-[0.32em]"
          style={{ color: "var(--eyebrow-tools)" }}
        >
          {site.toolsSectionLabel}
        </h2>
      </div>
      <div className="mx-auto grid max-w-[860px] grid-cols-1 gap-7 px-6 md:grid-cols-2 md:px-10">
        {studyTools.map((tool) => (
          <ToolCard key={tool.href} tool={tool} />
        ))}
      </div>
    </section>
  );
}
