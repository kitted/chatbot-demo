import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function AboutSection() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setDarkMode(storedTheme === "dark");

    const handleThemeChange = () => {
      const newTheme = localStorage.getItem("theme");
      setDarkMode(newTheme === "dark");
    };

    window.addEventListener("themeChange", handleThemeChange);
    return () => window.removeEventListener("themeChange", handleThemeChange);
  }, []);

  const containerBg = darkMode ? "bg-black" : "bg-white";
  const layoutBg = darkMode ? "bg-white/10" : "bg-white";
  const textColor = darkMode ? "text-white" : "text-black";
  return (
    <section
      className={`${layoutBg} ${textColor} px-10 md:px-20 py-16  relative overflow-hidden`}
    >
      {/* Logo background (chỉ hiện ở mobile) */}
      <div className="absolute inset-0 md:hidden opacity-20 flex justify-center items-center pb-[40px]">
        <Image
          src="/logo.png"
          alt="Phuc Long Logo"
          width={400}
          height={400}
          className="w-[90%] h-[50%] object-contain"
        />
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left content */}
        <div className="space-y-6">
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold uppercase">
            Về Chúng Tôi
          </h2>

          {/* Description */}
          <p className="text-base leading-relaxed">
            Với hơn 10 năm kinh nghiệm trong lĩnh vực phân phối dầu nhớt và phụ
            tùng , NHÀ PHÂN PHỐI PHỤ TÙNG DẦU NHỚT Chat bot tự hào là đơn vị
            cung cấp đáng tin cậy cho hàng trăm đại lý và tiệm sửa xe tại Cần
            Thơ, Hậu Giang, Vĩnh Long và Đồng Tháp. Chúng tôi không chỉ mang đến
            sản phẩm chất lượng – giá cả hợp lý – giao hàng nhanh chóng, mà còn
            luôn đồng hành cùng khách hàng trong suốt quá trình kinh doanh...{" "}
            <br />
            <Link href="/about" className="underline font-medium">
              Xem thêm &gt;
            </Link>
          </p>

          {/* Small image */}
          <div className="w-full max-w-md">
            <img
              src="https://res.cloudinary.com/drqacgi7a/image/upload/v1763110888/cc9acba6-ce3b-4363-a90b-6a8de232336a.png"
              alt="Lubrex Factory"
              width={600}
              height={400}
              className="rounded-2xl object-cover"
            />
          </div>
        </div>

        {/* Right logo (desktop mới hiển thị riêng) */}
        <div className="hidden md:flex justify-center md:justify-end">
          <img
            src="https://res.cloudinary.com/drqacgi7a/image/upload/v1762966604/z7212871114971_bf1c7a207a3115e04361cfdf643c4155_rmuep8.png"
            alt="Phuc Long Logo"
            width={400}
            height={400}
            className="w-full max-w-[650px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
