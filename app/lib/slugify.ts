export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // bỏ dấu tiếng Việt
    .replace(/[^a-z0-9]+/g, "-") // thay ký tự đặc biệt bằng "-"
    .replace(/^-+|-+$/g, ""); // xóa dấu - thừa
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

  // Nếu quá dài, cắt đến khoảng 6–8 từ đầu
  if (parts.length > 8) {
    parts = parts.slice(0, 8);
  }

  // Bỏ các từ vô nghĩa
  parts = parts.filter((p) => !stopWords.includes(p));

  return parts.join("-");
}
