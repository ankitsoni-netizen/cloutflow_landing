import type { RichBlock } from "@/lib/types";

export function BlocksRenderer({ blocks }: { blocks: RichBlock[] }) {
  return (
    <div className="prose-custom space-y-4">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={i}
                className="text-xl font-medium tracking-tight mt-8 mb-4"
              >
                {block.text}
              </h2>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-primary pl-6 text-lg italic text-text-secondary my-8"
              >
                {block.text}
              </blockquote>
            );
          case "list":
            return (
              <ul key={i} className="list-disc pl-6 space-y-2 text-text-secondary">
                {block.items?.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case "image":
            return block.src ? (
              <figure key={i} className="my-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={block.src}
                  alt={block.alt || ""}
                  className="w-full rounded-md"
                />
              </figure>
            ) : null;
          default:
            return (
              <p key={i} className="text-text-secondary leading-relaxed">
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
