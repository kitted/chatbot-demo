"use client";
import React, { useEffect, useState } from "react";

export default function GuideNote() {
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

  const textColor = darkMode ? "text-white" : "text-black";
  return (
    <div className={`text-sm ${textColor} mt-8 max-w-lg mx-auto space-y-3`}>
      <p>
        Vui Lòng Gửi Tin Nhắn (Zalo Hoặc Facebook) Cho Chúng Tôi Theo Cấu Trúc:
        <br />
        • Tên <br />
        • Số Điện Thoại <br />
        • Địa Chỉ Giao Hàng <br />
        • Tên Mặt Hàng Muốn Mua <br />• Số Lượng/Cân Nặng
      </p>
      <p>
        Bộ Phận Chăm Sóc Khách Hàng Của Chúng Tôi Liên Hệ Xác Nhận Đơn Hàng. Vui
        Lòng Trả Lời Trong Thời Gian Sớm Nhất.
      </p>
    </div>
  );
}
