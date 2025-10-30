"use client";

import { StarsBackground } from "@/components/stars-background";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-tr from-[#000000] via-[#0c0c2c] to-[#1a0f35]">
      <StarsBackground />
      <div className="z-10 flex flex-col items-center text-center">
        <h1
          className="animate-fade-in-up text-5xl font-bold text-white md:text-7xl"
          style={{ animationDelay: "0.2s" }}
        >
          NextVerseEducation
        </h1>
        <div
          className="mt-8 animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <ShimmerButton>
            Get Started
          </ShimmerButton>
        </div>
      </div>
    </main>
  );
}
