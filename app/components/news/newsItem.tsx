"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { slugify } from "@/app/lib/slugify";

type Props = {
  title: string;
  desc: string;
  date: string;
  img: string;
};

export default function NewsItem({ title, desc, date, img }: Props) {
  const pathname = usePathname();
  const currentSlug = pathname.split("/")[2] || "";

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
    <Link
      href={`/news/${slugify(title)}`}
      className="flex gap-4 border-b border-white/10 pb-4"
    >
      {/* Thumbnail */}
      <div className="relative w-36 flex-shrink-0 rounded-md overflow-hidden">
        <img src={img} alt={title} className="object-cover" />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between">
        <h3 className={`text-base font-semibold ${textColor} mb-1`}>{title}</h3>
        <span className="text-xs text-gray-400 mt-1">{date}</span>
        <p className="text-sm text-gray-500 line-clamp-2">{desc}</p>
      </div>
    </Link>
    // <div className="flex gap-4 border-b border-white/10 pb-4">

    // </div>
  );
}
