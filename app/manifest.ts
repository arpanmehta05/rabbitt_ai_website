import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rabbitt AI — Own Your Data. Own Your AI.",
    short_name: "Rabbitt AI",
    description:
      "Next-generation platform for enterprise generative AI and sovereign custom LLMs.",
    start_url: "/",
    display: "standalone",
    background_color: "#020305",
    theme_color: "#020305",
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
