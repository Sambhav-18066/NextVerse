
"use client";

import { StarsBackground } from "@/components/stars-background";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Search } from "lucide-react";
import placeholderImages from "@/lib/placeholder-images.json";

export default function Home() {
  const handleScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const coursesSection = document.getElementById("courses-section");
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gradient-to-tr from-[#000000] via-[#0c0c2c] to-[#1a0f35] text-white">
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
        <StarsBackground />
        <div className="z-10 flex flex-col items-center text-center">
          <h1
            className="animate-fade-in-up text-5xl font-bold text-white md:text-7xl"
            style={{ animationDelay: "0.2s" }}
          >
            NextVerseEducation
          </h1>
          <div className="mt-8 flex gap-4">
            <div
              className="animate-fade-in-up transition-transform duration-300 ease-in-out active:scale-95"
              style={{ animationDelay: "0.6s" }}
            >
              <Link href="/login">
                <ShimmerButton>Get Started</ShimmerButton>
              </Link>
            </div>
            <div
              className="animate-fade-in-up transition-transform duration-300 ease-in-out active:scale-95"
              style={{ animationDelay: "0.8s" }}
            >
              <ShimmerButton onClick={handleScroll}>Explore</ShimmerButton>
            </div>
          </div>
        </div>
      </main>

      <section id="courses-section" className="py-20 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="mb-12 flex flex-col items-center gap-6 text-center">
            <h2 className="text-4xl font-bold">Explore Our Courses</h2>
            <div className="relative w-full max-w-lg">
              <Input
                type="search"
                placeholder="Search for courses..."
                className="w-full rounded-full bg-white/10 p-6 pl-12 text-lg text-white placeholder:text-gray-300"
              />
              <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-300" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {placeholderImages.courses.map((course, index) => (
              <Card
                key={index}
                className="flex transform flex-col overflow-hidden rounded-lg border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20"
              >
                <CardHeader className="p-0">
                  <Image
                    src={course.src}
                    alt={course.alt}
                    width={600}
                    height={400}
                    className="h-48 w-full object-cover"
                    data-ai-hint={course.hint}
                  />
                </CardHeader>
                <CardContent className="flex-grow p-6">
                  <CardTitle className="mb-2 text-xl font-bold">
                    {course.title}
                  </CardTitle>
                  <p className="text-white/80">{course.description}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button className="w-full">Learn More</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
