"use client";

import ContentText from "../components/contentText";
import SubLayout from "../subLayout";
import React from "react";

export default function Example() {
  return (
    <>
      <SubLayout>
        <div className="pt-[65px] md:pt-[1px]">
          <ContentText overlayText={"CHAT BOT DEMO"} />
        </div>
      </SubLayout>
    </>
  );
}
