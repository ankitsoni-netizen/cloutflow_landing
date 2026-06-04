import { CareersSection } from "@/components/careers/CareersSection";

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
      <div className="container-page w-full">
        <div className="lg:grid lg:grid-cols-[minmax(0,17rem)_1fr] lg:gap-x-12 xl:gap-x-16 lg:items-start">
          <div className="max-w-md mb-8 lg:mb-0">
            <p className="text-xs uppercase tracking-nav text-text-muted mb-2">
              How we work
            </p>
            <h2 className="text-xl md:text-2xl font-medium tracking-tightest">
              Core values
            </h2>
            <p className="mt-3 text-sm text-text-secondary leading-snug">
              Principles we hire against and hold each other to, not perks on a
              list, but the standard for how work gets done at Cloutflow.
            </p>
          </div>

          <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-0 list-none m-0 p-0">
            {values.map((value, index) => (
              <li
                key={value.title}
                className="careers-reactive-cell border-t border-border-light py-4 md:py-5 rounded-sm"
              >
                <span
                  className="font-label text-[10px] uppercase tracking-nav text-primary/80"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-sm md:text-base font-medium tracking-tightest leading-snug pl-3 border-l border-primary/30 transition-colors">
                  {value.title}
                </h3>
                <p className="mt-1.5 text-xs md:text-sm text-text-secondary leading-snug pl-3">
                  {value.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </CareersSection>
  );
}
