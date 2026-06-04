import Image from "next/image";
import Link from "next/link";
import type { Story } from "@/lib/types";

export function HomeStoryCard({ story }: { story: Story }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-md border border-border-light bg-background-page">
      <div className="relative h-44 w-full shrink-0 bg-background-soft">
        {story.brandLogo ? (
          <Image
            src={story.brandLogo}
            alt={`${story.brandName} logo`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 280px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs uppercase text-text-muted">
            {story.brandName}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-medium mb-1">{story.title}</h3>
        <p className="text-sm text-text-secondary flex-1 mb-4">
          {story.shortResult}
        </p>
        <Link
          href={`/stories/${story.slug}`}
          className="text-sm uppercase tracking-nav text-primary font-medium w-fit"
        >
          View Story →
        </Link>
      </div>
    </article>
  );
}
