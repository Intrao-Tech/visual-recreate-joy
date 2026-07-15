import { useHead } from "@unhead/react";
import { graph, type JsonLd } from "./jsonLd";

/**
 * Emits one `application/ld+json` block per page.
 *
 * Uses @unhead rather than rendering a <script> in the tree so the block is
 * present in the prerendered HTML, where crawlers read it.
 */
export const useJsonLd = (nodes: JsonLd[]) => {
  useHead({
    script: [
      {
        id: "ld-json",
        type: "application/ld+json",
        innerHTML: JSON.stringify(graph(nodes)),
      },
    ],
  });
};
