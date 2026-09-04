const baseUrl = "https://avista.ir";

export default function sitemap() {
  return [
    {
      url: baseUrl,
      lastModified: "2026-09-04",
      changeFrequency: "weekly",
      priority: 1,
    },

    {
      url: `${baseUrl}/learn`,
      lastModified: "2026-09-04",
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/dictionary`,
      lastModified: "2026-09-04",
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/quiz`,
      lastModified: "2026-09-04",
      changeFrequency: "weekly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/progress`,
      lastModified: "2026-09-04",
      changeFrequency: "monthly",
      priority: 0.5,
    },

    {
      url: `${baseUrl}/sources`,
      lastModified: "2026-09-04",
      changeFrequency: "monthly",
      priority: 0.7,
    },

    {
      url: `${baseUrl}/about`,
      lastModified: "2026-09-04",
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
