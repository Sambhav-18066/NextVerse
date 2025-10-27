import type { Metadata } from "next";
import "./globals.css";
import { MainLayout } from "@/components/layout/main-layout";
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from "@/firebase";

export const metadata: Metadata = {
  title: "NextVerseEducation",
  description: "Learn with AI-powered video analysis and quizzes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <MainLayout>{children}</MainLayout>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
