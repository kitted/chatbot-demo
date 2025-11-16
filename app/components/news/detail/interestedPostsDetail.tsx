"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { news } from "@/app/data/news";
import { slugify } from "@/app/lib/slugify";

type InterestedPostsDetailProps = {
  currentSlug?: string;
};

export default function InterestedPostsDetail({
  currentSlug,
}: InterestedPostsDetailProps) {
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
  const subTextColor = darkMode ? "text-gray-400" : "text-gray-700";

  // ✅ Lọc bỏ bài hiện tại
  const posts = news
    .filter((n) => slugify(n.title) !== currentSlug)
    .slice(0, 6);

  if (!posts.length) return null;

  return (
    <section className="my-8">
      <h2 className={`text-lg md:text-xl font-semibold mb-4 ${textColor}`}>
        Có thể bạn quan tâm
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/news/${slugify(post.title)}`}
            className="group block border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <div className="relative w-full h-44">
              <img
                src={post.banner.image}
                alt={post.title}
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="p-3">
              <h3
                className={`text-sm md:text-base font-semibold line-clamp-2 group-hover:underline ${textColor}`}
              >
                {post.title}
              </h3>
              <p className={`text-xs mt-2 ${subTextColor}`}>{post.time}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
