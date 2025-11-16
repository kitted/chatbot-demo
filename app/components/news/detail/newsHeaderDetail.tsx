import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { shortenSlug } from "@/app/lib/slugify";

interface NewsHeaderDetailProps {
  title: string;
  category: string;
  author: string;
  date: string;
}

export default function NewsHeaderDetail({
  title,
  category,
  author,
  date,
}: NewsHeaderDetailProps) {
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
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
    <header className="mb-8 text-center">
      {/* Breadcrumb */}
      {/* <Breadcrumbs /> */}
      <nav className="text-sm text-gray-400 mb-2">
        <ol className="inline-flex gap-1 flex-wrap justify-center">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          {segments?.map((seg, idx) => {
            const href = "/" + segments.slice(0, idx + 1).join("/");
            const isLast = idx === segments.length - 1;

            return (
              <li key={idx} className="flex items-center gap-1">
                <span>&gt;</span>
                {isLast ? (
                  <span className="text-gray-500 capitalize">
                    {shortenSlug(seg)}
                  </span>
                ) : (
                  <Link href={href} className="hover:underline capitalize">
                    {seg}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Title */}
      <h1
        className={`text-2xl md:text-3xl font-bold leading-snug mb-3 ${textColor}`}
      >
        {title}
      </h1>

      {/* Meta info */}
      <p className="text-xs md:text-sm text-gray-400">
        <span className={`font-semibold ${textColor}`}>{author}</span> - {date}
      </p>
    </header>
  );
}
