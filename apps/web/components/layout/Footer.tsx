import Link from "next/link";

const columns = [
  {
    title: "Company",
    links: [
      { href: "/", label: "Home" },
      { href: "/product", label: "Product" },
      { href: "/stories", label: "Stories" },
      { href: "/insights", label: "Insights" },
      { href: "/careers", label: "Careers" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "For Creators",
    links: [
      { href: "/creators", label: "Join Creator Network" },
      { href: "/help", label: "Creator Support" },
      { href: "/help", label: "Campaign Guidelines" },
    ],
  },
  {
    title: "Product",
    links: [
      { href: "/product/ai-agents", label: "AI Agents" },
      { href: "/product/discovery", label: "Discovery" },
      { href: "/product/analytics", label: "Analytics" },
      { href: "/product/pricing", label: "Pricing" },
      { href: "/product/reporting", label: "Reporting" },
      { href: "/product/campaigns", label: "Briefs & Campaigns" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/insights", label: "Blog" },
      { href: "/insights", label: "Reports" },
      { href: "/help", label: "Help Center" },
      { href: "/help", label: "FAQs" },
      { href: "/stories", label: "Case Studies" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/privacy-policy", label: "Privacy Policy", newTab: true },
      { href: "/legal/terms-of-use", label: "Terms of Use", newTab: true },
      { href: "/legal/creator-terms", label: "Creator Terms", newTab: true },
      { href: "/legal/data-policy", label: "Data Policy", newTab: true },
    ],
  },
];

const social = [
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://youtube.com", label: "YouTube" },
  { href: "https://x.com", label: "X" },
];

export function Footer() {
  return (
    <footer className="bg-background-dark text-text-light section-y">
      <div className="container-page">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-16">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm uppercase tracking-nav font-medium mb-4 text-text-muted">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {"newTab" in link && link.newTab ? (
                      <Link
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-text-light/80 hover:text-text-light transition-probe"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-text-light/80 hover:text-text-light transition-probe"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-8 border-t border-white/10">
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} Cloutflow. Influence, engineered.
          </p>
          <div className="flex gap-6">
            {social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm uppercase tracking-nav hover:text-primary transition-probe"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
