"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface NewsCardDetailProps {
  id: number;
  title: string;
  desc?: string;
  date: string;
  img: string;
  href: string;
}

export default function NewsCardDetail({
  id,
  title,
  desc,
  date,
  img,
  href,
}: NewsCardDetailProps) {
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
  const shadowColor = darkMode
    ? "drop-shadow-[0_4px_6px_rgba(255,255,255,0.25)]"
    : "drop-shadow-[0_4px_6px_rgba(255,255,255,0.25)]";
  return (
    <Link
      href={href}
      className={`${containerBg} rounded-2xl overflow-hidden bg-black shadow-lg ${shadowColor} transition-all duration-200`}
    >
      <div className="relative w-full h-40 md:h-48">
        <img src={img} alt={title} className="object-cover" />
      </div>
      <div className="p-4">
        <h3
          className={`text-sm md:text-base font-semibold line-clamp-2 ${textColor}`}
        >
          {title}
        </h3>
        {desc && (
          <p className="text-xs text-gray-400 mt-1 line-clamp-2">{desc}</p>
        )}
        <span className="block mt-2 text-xs text-gray-400">{date}</span>
      </div>
    </Link>
  );
}
