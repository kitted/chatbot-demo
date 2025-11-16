"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function GuideStep({
  step,
  title,
  icon,
  desc,
}: {
  step: number;
  title: string;
  icon: string;
  desc?: string;
}) {
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
  const layoutBg = darkMode ? "bg-white/10" : "bg-white";
  const textColor = darkMode ? "text-white" : "text-black";
  return (
    <div className="flex flex-col items-center text-center gap-3 my-6">
      <h2 className={`text-lg md:text-xl font-semibold ${textColor}`}>
        Bước {step}:
      </h2>
      <Image
        src={icon}
        alt={title}
        width={70}
        height={70}
        className="rounded-full w-[250px]"
      />
      {desc && <p className={`text-sm ${textColor}`}>{desc}</p>}
    </div>
  );
}
