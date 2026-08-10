import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://jenveda.com";

  return [
    { url: base,                              lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/about`,                   lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/why-jenveda`,             lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/industries`,              lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`,                 lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/privacy`,                 lastModified: new Date(), changeFrequency: "yearly",  priority: 0.4 },
    { url: `${base}/products/hrms`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/products/accounting`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/products/pms`,            lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/products/inventory`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];
}
