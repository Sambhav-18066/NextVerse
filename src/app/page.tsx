import StarsBackground from "@/components/stars-background";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <StarsBackground />
      <div className="container mx-auto flex h-full items-center justify-center p-4">
        <h1 className="text-4xl font-bold text-center animate-fade-in-up">
          Your Blank Canvas
        </h1>
      </div>
    </main>
  );
}