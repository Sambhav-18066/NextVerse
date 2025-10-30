"use client";

import { StarsBackground } from "@/components/stars-background";

export default function UserPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-tr from-[#000000] via-[#0c0c2c] to-[#1a0f35]">
      <StarsBackground />
      <div className="z-10 flex flex-col items-center text-center">
        <h1
          className="animate-fade-in-up text-5xl font-bold text-white md:text-7xl"
          style={{ animationDelay: "0.2s" }}
        >
          User Dashboard
        </h1>
        <p 
          className="animate-fade-in-up mt-4 text-lg text-white/80"
          style={{ animationDelay: "0.4s" }}
        >
          Welcome, USER.
        </p>
      </div>
    </main>
  );
}
