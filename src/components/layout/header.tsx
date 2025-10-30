import { GraduationCap, User } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";

export function Header() {
  return (
    <header className="bg-card shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold font-headline text-primary hover:opacity-80 transition-opacity">
            <GraduationCap className="h-6 w-6" />
            <span>NextVerseEducation</span>
          </Link>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button variant="outline" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">User Profile</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
