import { CareersInlineIcon } from "@/components/careers/CareersInlineIcon";
import { CareersSection } from "@/components/careers/CareersSection";
import { careersValueIcons } from "@/data/careers-page-extras";

const values = [
  {
    title: "Business Problem First",
    desc: "We start from what the brand needs to move, not what is trendy.",
  },
  {
    title: "Culture Moves Fast, So Do We",
    desc: "Speed with clarity beats perfection in a vacuum.",
  },
  {
    title: "Ownership Over Instructions",
    desc: "We hire people who close loops without being chased.",
  },
  {
    title: "Creativity With Discipline",
    desc: "Bold ideas need sharp execution and clean ops.",
  },
  {
    title: "Data Makes Creativity Sharper",
    desc: "Measurement informs, it does not replace, instinct.",
  },
  {
    title: "People Build the System",
    desc: "Products and processes are built by teams who care.",
  },
];

export function CareersCoreValues() {
  return (
    <CareersSection variant="values">
      <div className="container-page">
        <div className="lg:grid lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-x-14 xl:gap-x-20 lg:items-start">
          <div className="max-w-md mb-10 lg:mb-0 lg:pt-2">
            <p className="text-xs uppercase tracking-nav text-text-muted mb-3">
              How we work
            </p>
            <h2 className="text-xl md:text-2xl font-medium tracking-tightest">
              Core values
            </h2>
            <p className="mt-4 text-sm text-text-secondary leading-relaxed">
              Principles we hire against and hold each other to — not perks on a
              list, but the standard for how work gets done at Cloutflow.
            </p>
          </div>

          <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-10 gap-y-1 list-none m-0 p-0">
            {values.map((value, index) => (
              <li
                key={value.title}
                className="careers-highlight-card careers-reactive-cell border-t border-border-light/80 py-5 md:py-6 rounded-sm"
              >
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/15 bg-white/70 text-primary">
                    <CareersInlineIcon name={careersValueIcons[index]} />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <span
                      className="font-label text-[10px] uppercase tracking-nav text-primary/70"
                      aria-hidden
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1 text-sm md:text-base font-medium tracking-tightest leading-snug">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-xs md:text-sm text-text-secondary leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </CareersSection>
  );
}
