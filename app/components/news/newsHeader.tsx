"use client";
import React, { useEffect, useState } from "react";

export default function NewsHeader() {
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
  const textColor = darkMode ? "text-white" : "text-black";
  return (
    <h1
      className={`${containerBg} text-2xl md:text-3xl font-extrabold italic ${textColor} text-center mb-6`}
    >
      Tin Tức Nổi Bật
    </h1>
  );
}
