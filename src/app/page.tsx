import { CourseCard } from "@/components/course-card";
import { courses } from "@/lib/data";
import { GraduationCap } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <div className="inline-flex items-center justify-center bg-primary text-primary-foreground p-4 rounded-full mb-4 shadow-lg">
          <GraduationCap className="w-12 h-12" />
        </div>
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
          Welcome to EduStream
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Your journey to mastery begins here. Select a course to start learning with AI-powered video analysis and interactive quizzes.
        </p>
      </header>
      
      <main>
        <h2 className="font-headline text-3xl font-bold mb-8 text-foreground text-center">Available Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </main>
    </div>
  );
}
