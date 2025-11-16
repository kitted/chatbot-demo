"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ContactChannelProps {
  title: string;
  image: string;
  alt?: string;
}

export default function ContactChannel({
  title,
  image,
  alt,
}: ContactChannelProps) {
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
    <section className="my-8">
      <h2
        className={`text-center text-xl md:text-2xl font-semibold ${textColor} mb-4`}
      >
        {title}
      </h2>
      <div className="rounded-xl overflow-hidden shadow-md max-w-3xl mx-auto">
        <Image
          src={image}
          alt={alt || title}
          width={800}
          height={450}
          className="w-full object-cover"
        />
      </div>
    </section>
  );
}
