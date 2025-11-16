"use client";
import React, { useEffect, useState } from "react";
import GuideStep from "./guideStep";

export default function GuideContent() {
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
    <div className="mt-6">
      {/* Bước 1 */}
      <GuideStep
        step={1}
        title="Liên hệ"
        icon="/contact/phone.png"
        desc="Bấm Vào Nút Liên Lạc Trên Màn Hình"
      />

      {/* Bước 2 */}
      <h2
        className={`text-lg md:text-xl font-semibold ${textColor} text-center`}
      >
        Bước 2:
      </h2>
      <div className="flex justify-center gap-6 my-6">
        <img src="/contact/contact2.png" alt="Phone" className="w-[250px]" />
      </div>
      <p className={`text-center text-sm ${textColor}`}>
        Bấm chọn 1 trong 3 phương thức để đặt hàng và liên hệ cho chúng tôi
      </p>
    </div>
  );
}
