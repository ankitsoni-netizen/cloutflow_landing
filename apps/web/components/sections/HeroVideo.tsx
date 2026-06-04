/**
 * Hero video placeholder — production intent:
 *
 * CONCEPT: "The Signal Room → Growth Pathway"
 * Thousands of cultural signals (creator videos, searches, comments, trends,
 * campaign metrics) float as light particles in a dark command-center space,
 * then converge into one clean growth pathway for the brand.
 * Metaphor: Cloutflow turns scattered creator noise into structured business
 * intelligence and measurable brand growth.
 *
 * Alt concepts for production:
 * - "From Spark to System"
 * - "Beyond the Feed"
 */
export function HeroVideo() {
  return (
    <div
      className="absolute inset-0 bg-background-dark overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-8 max-w-lg border border-white/10 p-8 rounded-md">
          <p className="text-xs uppercase tracking-nav text-text-muted mb-2">
            Hero video placeholder
          </p>
          <p className="text-sm text-text-light/70 font-mono">
            The Signal Room → Growth Pathway
          </p>
          <p className="text-xs text-text-muted mt-4">
            Cinematic · Enterprise · Tech-forward
          </p>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-background-dark/40" />
    </div>
  );
}
