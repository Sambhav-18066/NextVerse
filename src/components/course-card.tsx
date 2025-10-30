import type { Course } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  course: Course;
  className?: string;
}

export function CourseCard({ course, className }: CourseCardProps) {
  const placeholder = PlaceHolderImages.find(p => p.id === course.image);

  return (
    <Card className={cn("flex flex-col overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/30 animate-fade-in-up", className)}>
      <CardHeader>
        {placeholder && (
          <div className="aspect-video relative mb-4">
             <Image 
              src={placeholder.imageUrl} 
              alt={placeholder.description} 
              width={600}
              height={400}
              className="object-cover rounded-t-lg"
              data-ai-hint={placeholder.imageHint}
            />
          </div>
        )}
        <CardTitle className="font-headline text-2xl">{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow" />
      <CardFooter>
        <Button asChild className="w-full bg-primary hover:bg-primary/90">
          <Link href={`/courses/${course.id}`}>
            Start Learning
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
