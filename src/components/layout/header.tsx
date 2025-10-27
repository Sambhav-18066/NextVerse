import { GraduationCap } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-card shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold font-headline text-primary hover:opacity-80 transition-opacity">
            <GraduationCap className="h-6 w-6" />
            <span>EduStream</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
