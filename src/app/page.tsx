"use client";

import { StarsBackground } from "@/components/stars-background";
import { Card } from "@/components/ui/card";
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
        <Card
          className="mt-8 animate-fade-in-up border-white/20 bg-white/10 text-white backdrop-blur-sm h-24 w-96"
          style={{ animationDelay: "0.4s" }}
        >
        </Card>
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
