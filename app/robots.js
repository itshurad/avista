export default function robots() {
  const baseUrl = "https://avista.ir";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/private/"],
      },
    ],

    sitemap: `${baseUrl}/sitemap.xml`,

    host: baseUrl,
  };
}
