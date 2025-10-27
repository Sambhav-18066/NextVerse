'use client';

import { CourseCard } from "@/components/course-card";
import { courses as initialCourses } from "@/lib/data";
import { GraduationCap, Loader2, Sparkles, Search } from "lucide-react";
import { useState, useMemo } from "react";
import type { Course } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { handleGenerateCourse } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export default function Home() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [searchQuery, setSearchQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredCourses = useMemo(() => {
    if (!searchQuery) {
      return courses;
    }
    return courses.filter((course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, courses]);
  
  const coursesByCategory = useMemo(() => {
    return filteredCourses.reduce((acc, course) => {
      const category = course.subject;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(course);
      return acc;
    }, {} as Record<string, Course[]>);
  }, [filteredCourses]);

  const generateCourse = async () => {
    setIsGenerating(true);
    try {
      const result = await handleGenerateCourse(searchQuery);
      if (result.error) {
        toast({
          variant: "destructive",
          title: "Course Generation Failed",
          description: result.error,
        });
      } else if (result.course) {
        setCourses(prevCourses => [...prevCourses, result.course!]);
        setSearchQuery(""); // Clear search to show all courses including the new one
        toast({
          title: "Course Generated!",
          description: `${result.course.title} has been added.`,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "An Unexpected Error Occurred",
        description: "Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <div className="inline-flex items-center justify-center bg-primary text-primary-foreground p-4 rounded-full mb-4 shadow-lg">
          <GraduationCap className="w-12 h-12" />
        </div>
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
          Welcome to NextVerseEducation
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Your journey to mastery begins here. Explore our courses or generate a new one with AI.
        </p>
      </header>
      
      <main>
        <div className="mb-12 max-w-lg mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for courses like 'Quantum Computing'..."
              className="w-full pl-10 h-12 text-lg"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {Object.keys(coursesByCategory).length > 0 ? (
           Object.entries(coursesByCategory).map(([category, coursesInCategory]) => (
            <div key={category} className="mb-12">
              <h2 className="font-headline text-3xl font-bold mb-8 text-foreground capitalize">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {coursesInCategory.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <Card className="text-center max-w-md mx-auto">
            <CardHeader>
              <CardTitle>No Courses Found</CardTitle>
              <CardDescription>
                We couldn't find any courses matching your search. Would you like our AI to create one for you on the topic of "{searchQuery}"?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={generateCourse} disabled={isGenerating} className="w-full">
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Course...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate with AI
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
