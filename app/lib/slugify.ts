export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
export function shortenSlug(slug: string) {
  const stopWords = [
    "nen-tang",
    "noi",
    "khong",
    "cho",
    "phep",
    "vi-sao",
    "bi",
    "cam",
    "gay-soc",
    "bat-ngo",
    "giai-ma",
    "he-lo",
  ];

  let parts = slug.split("-");

  if (parts.length > 8) {
    parts = parts.slice(0, 8);
  }

  parts = parts.filter((p) => !stopWords.includes(p));

  return parts.join("-");
}
