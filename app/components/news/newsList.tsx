"use client";
import React from "react";
import NewsItem from "./newsItem";
import { NewsType } from "@/app/news/type";

type Props = {
  data: NewsType[] | any;
};

export default function NewsList({ data }: Props) {
  if (!data?.length) {
    return (
      <p className="text-center text-gray-500 mt-10">Không có bài viết nào.</p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {data.map((item: any) => (
        <NewsItem
          key={item.id}
          title={item.title}
          desc={item.banner?.description?.[0]}
          date={item.time}
          img={item.banner?.image}
        />
      ))}
    </div>
  );
}
