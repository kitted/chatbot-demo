"use client";
import Image from "next/image";
import React from "react";

interface NewsImageDetailProps {
  src: string;
  alt: string;
  caption?: string;
}

export default function NewsImageDetail({
  src,
  alt,
  caption,
}: NewsImageDetailProps) {
  return (
    <figure className="mb-6">
      <div className="relative w-full h-[220px] md:h-[400px] rounded-lg overflow-hidden">
        <img src={src} alt={alt} className="object-cover" />
      </div>
      {caption && (
        <figcaption className="text-sm text-gray-400 mt-2 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
