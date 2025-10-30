"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StarsBackground } from "@/components/stars-background";

export default function SignupPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-tr from-[#000000] via-[#0c0c2c] to-[#1a0f35]">
      <StarsBackground />
      <div className="z-10 w-full max-w-md">
        <Card
          className="animate-fade-in-up border-white/20 bg-white/10 text-white backdrop-blur-sm"
          style={{ animationDelay: "0.2s" }}
        >
          <CardHeader>
            <CardTitle
              className="animate-fade-in-up text-2xl"
              style={{ animationDelay: "0.3s" }}
            >
              Create an account
            </CardTitle>
            <CardDescription
              className="animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              Enter your information to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div
                className="grid grid-cols-2 gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    id="first-name"
                    placeholder="Max"
                    required
                    className="bg-black/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    id="last-name"
                    placeholder="Robinson"
                    required
                    className="bg-black/20 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>
              <div
                className="grid gap-2 animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="bg-black/20 text-white placeholder:text-gray-400"
                />
              </div>
              <div
                className="grid gap-2 animate-fade-in-up"
                style={{ animationDelay: "0.7s" }}
              >
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  className="bg-black/20 text-white"
                />
              </div>
              <Button
                type="submit"
                className="w-full animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                Create account
              </Button>
              <Button
                variant="outline"
                className="w-full bg-transparent hover:bg-white/10 animate-fade-in-up"
                style={{ animationDelay: "0.9s" }}
              >
                Sign up with Google
              </Button>
            </div>
            <div
              className="mt-4 text-center text-sm animate-fade-in-up"
              style={{ animationDelay: "1.0s" }}
            >
              Already have an account?{" "}
              <Link href="/login" className="underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
