export const metadata = {
  title: "Mockup: Guardian QC",
  robots: { index: false, follow: false },
};

function Pill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger";
}) {
  const tones: Record<typeof tone, string> = {
    neutral: "border-slate-200 bg-slate-50 text-slate-700",
    success: "border-emerald-200 bg-emerald-50 text-emerald-800",
    warning: "border-amber-200 bg-amber-50 text-amber-900",
    danger: "border-rose-200 bg-rose-50 text-rose-800",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.2 7.25a1 1 0 0 1-1.421.003L3.29 9.164a1 1 0 1 1 1.42-1.41l3.09 3.118 6.49-6.53a1 1 0 0 1 1.414-.005Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function IconWarn({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l6.518 11.596c.75 1.334-.214 3.005-1.743 3.005H3.482c-1.53 0-2.493-1.671-1.743-3.005L8.257 3.1Zm1.743 3.401a1 1 0 0 0-1 1v3.8a1 1 0 1 0 2 0V7.5a1 1 0 0 0-1-1Zm0 8.2a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function VerifyMockupPage() {
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
              "Pricing Desk",
              "Campaign OS",
              "Guardian QC",
              "Reports",
              "Settings",
            ].map((item) => (
              <div
                key={item}
                className={`flex items-center justify-between rounded-md px-3 py-2 ${
                  item === "Guardian QC"
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-white"
                }`}
              >
                <span>{item}</span>
                {item === "Guardian QC" && (
                  <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] uppercase tracking-widest">
                    QC
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
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  Guardian QC
                </p>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                  Verify deliverables before they go live
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 w-[360px]">
                  <span className="text-slate-400">⌘</span>
                  <span className="text-slate-500">Search creator, campaign, or asset…</span>
                </div>
                <button className="h-10 px-4 rounded-md border border-slate-200 text-sm font-medium text-slate-800">
                  Filters
                </button>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1400px] px-10 py-10 grid grid-cols-[1fr_420px] gap-8">
            <section className="rounded-md border border-slate-200 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <Pill tone="neutral">All deliverables</Pill>
                  <Pill tone="warning">
                    <IconWarn className="h-4 w-4" /> Flagged 3
                  </Pill>
                  <Pill tone="success">
                    <IconCheck className="h-4 w-4" /> Approved 14
                  </Pill>
                </div>
                <div className="text-xs text-slate-500">Last updated 2m ago</div>
              </div>

              <div className="bg-slate-50 px-6 py-3 grid grid-cols-[240px_1fr_150px_170px_120px] gap-4 text-[11px] uppercase tracking-widest text-slate-500">
                <div>Creator</div>
                <div>Asset</div>
                <div>Authenticity</div>
                <div>Brief compliance</div>
                <div>Status</div>
              </div>

              <div className="divide-y divide-slate-200">
                {[
                  {
                    creator: "Priya Sharma",
                    asset: "IG Reel · Unboxing",
                    auth: "91/100",
                    compliance: "5/5",
                    status: "Approved",
                    tone: "success" as const,
                    selected: false,
                  },
                  {
                    creator: "Sarah Jenkins",
                    asset: "IG Reel · Story hook",
                    auth: "72/100",
                    compliance: "3/5",
                    status: "Flagged",
                    tone: "warning" as const,
                    selected: true,
                  },
                  {
                    creator: "Alex Rivera",
                    asset: "IG Story · CTA",
                    auth: "88/100",
                    compliance: "4/5",
                    status: "Review",
                    tone: "neutral" as const,
                    selected: false,
                  },
                  {
                    creator: "Mike Chen",
                    asset: "YouTube Short · Demo",
                    auth: "79/100",
                    compliance: "4/5",
                    status: "Flagged",
                    tone: "warning" as const,
                    selected: false,
                  },
                ].map((row) => (
                  <div
                    key={row.creator + row.asset}
                    className={`grid grid-cols-[240px_1fr_150px_170px_120px] gap-4 px-6 py-5 bg-white ${
                      row.selected ? "ring-2 ring-blue-600/40" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-slate-200" />
                      <div>
                        <div className="font-medium text-slate-900">{row.creator}</div>
                        <div className="text-xs text-slate-500">@handle</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="font-medium text-slate-900">{row.asset}</div>
                        <div className="text-xs text-slate-500">
                          Campaign: Summer Launch · Due today
                        </div>
                      </div>
                      <span className="text-xs text-slate-400">→</span>
                    </div>
                    <div className="flex items-center">
                      <Pill tone={row.tone}>
                        {row.status === "Flagged" && <IconWarn className="h-4 w-4" />}
                        {row.auth}
                      </Pill>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <div className="h-2 w-24 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className={`h-full ${
                            row.compliance === "5/5"
                              ? "bg-emerald-500 w-full"
                              : row.compliance === "4/5"
                                ? "bg-amber-500 w-4/5"
                                : "bg-rose-500 w-3/5"
                          }`}
                        />
                      </div>
                      <span className="text-xs text-slate-500">{row.compliance}</span>
                    </div>
                    <div className="flex items-center">
                      <Pill tone={row.tone}>
                        {row.status === "Flagged" && <IconWarn className="h-4 w-4" />}
                        {row.status}
                      </Pill>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <aside className="rounded-md border border-slate-200 bg-white overflow-hidden">
              <div className="border-b border-slate-200 px-6 py-5">
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  Selected deliverable
                </p>
                <h2 className="mt-1 font-semibold tracking-tight text-slate-900">
                  IG Reel, Story hook
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Issues detected before go-live
                </p>
              </div>

              <div className="p-6">
                <div className="aspect-video rounded-md bg-slate-100 border border-slate-200 mb-6" />

                <div className="space-y-3">
                  <div className="flex items-start gap-3 rounded-md border border-amber-200 bg-amber-50 p-4">
                    <IconWarn className="h-5 w-5 text-amber-700 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-amber-900">
                        Authenticity score: 72/100
                      </div>
                      <div className="text-xs text-amber-900/70 mt-1">
                        Engagement spike detected in first 10 minutes.
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md border border-slate-200 p-4">
                    <div className="text-sm font-medium text-slate-900 mb-3">
                      Brief compliance
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700">Mandatory talking point</span>
                        <span className="text-xs font-medium text-rose-700">
                          Missing
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700">Disclosure format</span>
                        <span className="text-xs font-medium text-emerald-700">
                          OK
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700">Brand claim check</span>
                        <span className="text-xs font-medium text-rose-700">
                          Needs review
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700">CTA placement</span>
                        <span className="text-xs font-medium text-emerald-700">
                          OK
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700">Tone + brand safety</span>
                        <span className="text-xs font-medium text-emerald-700">
                          OK
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button className="h-11 rounded-md border border-slate-200 text-sm font-medium text-slate-900 hover:bg-slate-50">
                    Request edits
                  </button>
                  <button
                    className="h-11 rounded-md bg-slate-200 text-sm font-medium text-slate-500 cursor-not-allowed"
                    aria-disabled
                  >
                    Approve
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

