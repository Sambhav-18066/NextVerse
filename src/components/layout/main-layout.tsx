import type { PropsWithChildren } from "react";
import { Header } from "./header";
import { Button } from "../ui/button";

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <div className="fixed bottom-4 left-4 z-50">
        <Button variant="outline" size="icon" className="rounded-full h-12 w-12 text-lg font-bold bg-card">
          N
        </Button>
      </div>
    </div>
  );
}
