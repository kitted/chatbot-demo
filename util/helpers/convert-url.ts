export function slugify(str: string): string {
  if (str === undefined) {
    return "a";
  }
  return str
    .toLowerCase()
    .replace(/đ/g, "d") // chuyển đ → d
    .normalize("NFD") // tách dấu
    .replace(/[\u0300-\u036f]/g, "") // xóa dấu
    .replace(/[^a-z0-9\s-]/g, "") // xóa ký tự đặc biệt (nhớ là `\s`, không `\\s`)
    .trim()
    .replace(/\s+/g, "-") // khoảng trắng → gạch ngang
    .replace(/-+/g, "-") // nhiều dấu - liền → 1
    .replace(/^-|-$/g, ""); // xóa - đầu/cuối
}
