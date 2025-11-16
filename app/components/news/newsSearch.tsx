"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function NewsSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentType = searchParams.get("type") || "";
  const currentSearch = searchParams.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(currentSearch);
  const [darkMode, setDarkMode] = useState(false);

  // ====== THEME ======
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

  // ====== SEARCH LOGIC ======
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams();

      if (currentType) params.set("type", currentType);
      if (searchTerm.trim()) params.set("search", searchTerm.trim());

      const query = params.toString() ? `?${params.toString()}` : "";
      router.push(`/news${query}`);
    }, 500); // debounce 0.5s để mượt

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // ====== UI ======
  const containerBg = darkMode
    ? "bg-gradient-to-r from-gray-900 to-gray-800"
    : "bg-gradient-to-r from-gray-100 to-gray-50";
  const textColor = darkMode ? "text-white" : "text-black";
  const placeholderColor = darkMode
    ? "placeholder-gray-400"
    : "placeholder-gray-500";
  const borderColor = darkMode ? "focus:ring-[#0054A6]" : "focus:ring-blue-500";

  return (
    <div className="w-full max-w-xl mx-auto mb-6 border rounded-xl">
      <input
        type="text"
        placeholder="Tìm kiếm bài viết..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`w-full px-4 py-2 rounded-xl ${containerBg} ${textColor} ${placeholderColor} focus:outline-none focus:ring-2 ${borderColor}`}
      />
    </div>
  );
}
