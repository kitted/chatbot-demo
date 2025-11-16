"use client";

import FloatingButton from "./components/floatingButton";

function SubLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`relative w-full min-h-screen overflow-x-hidden`}>
      <div className={`relative z-30 transition-all duration-700 ease-in-out`}>
        <div>{children}</div>
        <FloatingButton />
      </div>
    </div>
  );
}

export default SubLayout;
