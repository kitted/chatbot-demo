"use client";

import React, { useEffect, useState } from "react";

interface Props {
  overlayText?: string;
}

const ContentText: React.FC<Props> = ({ overlayText }) => {
  const textColor = "text-white";

  return (
    <div className={`w-full`}>
      {overlayText && (
        <div className="bottom-0 w-full flex justify-center py-10 sm:py-1 md:py-10 lg:py-10">
          <h1
            className={`${textColor}   font-black text-[20px] lg:text-[50px] md:text-[20px] sm:text-[20px] text-center px-4`}
            style={{ letterSpacing: "2%" }}
          >
            {overlayText}
          </h1>
        </div>
      )}
    </div>
  );
};

export default ContentText;
