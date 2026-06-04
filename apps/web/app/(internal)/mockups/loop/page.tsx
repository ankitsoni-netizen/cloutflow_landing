export const metadata = {
  title: "Mockup: IM DNA Loop",
  robots: { index: false, follow: false },
};

function StatCard({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta: string;
}) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-5">
      <p className="text-[11px] uppercase tracking-widest text-slate-500">{label}</p>
      <div className="mt-2 flex items-baseline justify-between gap-4">
        <p className="text-2xl font-semibold tracking-tight text-slate-900">{value}</p>
        <span className="text-xs font-medium text-emerald-700">{delta}</span>
      </div>
      <div className="mt-4 h-10 rounded-md bg-slate-50 border border-slate-200" />
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-700">
      {children}
    </span>
  );
}

export default function LoopMockupPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="flex min-h-screen">
        <aside className="w-72 border-r border-slate-200 bg-slate-50 px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold tracking-tight">Cloutflow</div>
            <span className="text-[10px] uppercase tracking-widest text-slate-500">
              Portal
            </span>
          </div>
          <div className="mt-8 space-y-2 text-sm">
            {[
              "Home",
              "Campaigns",
              "Discovery",
              "IM DNA",
              "Pricing Desk",
              "Campaign OS",
              "Guardian QC",
              "Reports",
            ].map((item) => (
              <div
                key={item}
                className={`flex items-center justify-between rounded-md px-3 py-2 ${
                  item === "IM DNA"
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-white"
                }`}
              >
                <span>{item}</span>
                {item === "IM DNA" && (
                  <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] uppercase tracking-widest">
                    Loop
                  </span>
                )}
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1">
          <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto max-w-[1400px] px-10 py-6 flex items-center justify-between gap-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500">IM DNA</p>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                  Plan next campaign
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <button className="h-10 px-4 rounded-md border border-slate-200 text-sm font-medium text-slate-800">
                  Export
                </button>
                <button className="h-10 px-4 rounded-md bg-blue-600 text-white text-sm font-medium">
                  Create draft plan
                </button>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1400px] px-10 py-10 grid grid-cols-12 gap-8">
            <section className="col-span-7 space-y-6">
              <div className="rounded-md border border-slate-200 bg-white p-6">
                <p className="text-[11px] uppercase tracking-widest text-slate-500">
                  Learnings from last campaign
                </p>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <StatCard label="Best CPV" value="₹0.38" delta="↓ 9%" />
                  <StatCard label="Top format" value="Reels" delta="+22%" />
                  <StatCard label="Top region" value="South" delta="+18%" />
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-md border border-slate-200 bg-slate-50 p-5">
                    <p className="text-[11px] uppercase tracking-widest text-slate-500 mb-3">
                      What worked
                    </p>
                    <ul className="space-y-2 text-sm text-slate-700">
                      <li>Short hooks in first 1.5s improved retention.</li>
                      <li>Mid-tier creators outperformed on CPV consistency.</li>
                      <li>Weekend drops lifted saves and shares.</li>
                    </ul>
                  </div>
                  <div className="rounded-md border border-slate-200 bg-slate-50 p-5">
                    <p className="text-[11px] uppercase tracking-widest text-slate-500 mb-3">
                      What to avoid
                    </p>
                    <ul className="space-y-2 text-sm text-slate-700">
                      <li>Long intros reduced completion rates.</li>
                      <li>Overlapping audiences inflated reach projections.</li>
                      <li>Late approvals created dispatch bottlenecks.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-slate-200 bg-white p-6">
                <p className="text-[11px] uppercase tracking-widest text-slate-500">
                  What changed vs previous plan
                </p>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="rounded-md border border-slate-200 bg-slate-50 p-5">
                    <p className="text-xs font-medium text-slate-900">Creator mix</p>
                    <p className="mt-2 text-sm text-slate-700">
                      Shifted from macro-heavy to mid-tier clusters.
                    </p>
                    <p className="mt-3 text-xs font-medium text-emerald-700">Improved fit</p>
                  </div>
                  <div className="rounded-md border border-slate-200 bg-slate-50 p-5">
                    <p className="text-xs font-medium text-slate-900">Flighting</p>
                    <p className="mt-2 text-sm text-slate-700">
                      Weekend + payday bursts, fewer weekday drops.
                    </p>
                    <p className="mt-3 text-xs font-medium text-emerald-700">Better momentum</p>
                  </div>
                  <div className="rounded-md border border-slate-200 bg-slate-50 p-5">
                    <p className="text-xs font-medium text-slate-900">Commercials</p>
                    <p className="mt-2 text-sm text-slate-700">
                      Locked preferred rates for 3 repeat creators.
                    </p>
                    <p className="mt-3 text-xs font-medium text-emerald-700">Lower variance</p>
                  </div>
                </div>
              </div>
            </section>

            <aside className="col-span-5 space-y-6">
              <div className="rounded-md border border-slate-200 bg-white p-6">
                <p className="text-[11px] uppercase tracking-widest text-slate-500">
                  Recommendations
                </p>
                <div className="mt-4 space-y-4">
                  {[
                    { name: "Creator A", tags: ["Beauty", "South", "Mid-tier"], cpv: "₹0.41" },
                    { name: "Creator B", tags: ["Lifestyle", "Hindi", "Micro"], cpv: "₹0.36" },
                    { name: "Creator C", tags: ["Grooming", "West", "Mid-tier"], cpv: "₹0.39" },
                  ].map((c) => (
                    <div
                      key={c.name}
                      className="rounded-md border border-slate-200 bg-slate-50 p-5"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-slate-200" />
                          <div>
                            <p className="text-sm font-medium text-slate-900">{c.name}</p>
                            <p className="text-xs text-slate-500">Audience fit: High</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs uppercase tracking-widest text-slate-500">
                            Projected CPV
                          </p>
                          <p className="text-sm font-semibold text-slate-900">{c.cpv}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {c.tags.map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-md border border-slate-200 bg-white p-6">
                <p className="text-[11px] uppercase tracking-widest text-slate-500">
                  Suggested flighting
                </p>
                <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-5">
                  <div className="grid grid-cols-7 gap-2 text-[10px] uppercase tracking-widest text-slate-500 mb-3">
                    {["M", "T", "W", "T", "F", "S", "S"].map((d) => (
                      <div key={d} className="text-center">
                        {d}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 21 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-8 rounded-md border ${
                          [5, 6, 12, 13, 19, 20].includes(i)
                            ? "border-blue-200 bg-blue-600/10"
                            : "border-slate-200 bg-white"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="mt-5 flex items-center justify-between text-sm">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-500">
                        Budget
                      </p>
                      <p className="font-semibold text-slate-900">₹12.0L</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-widest text-slate-500">
                        Projected CPV
                      </p>
                      <p className="font-semibold text-slate-900">₹0.39</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

