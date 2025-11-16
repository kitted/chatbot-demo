"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function GuideHeader({ title }: any) {
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
    <div className="flex flex-col items-center text-center">
      <h1
        className={`${textColor}  text-2xl md:text-3xl font-extrabold italic   text-center mb-6`}
      >
        {title}
      </h1>
      <div className="rounded-xl p-4">
        <Image
          src="/logo.png"
          alt="Phuc Long Logo"
          width={200}
          height={200}
          className="mx-auto"
        />
      </div>
    </div>
  );
}
