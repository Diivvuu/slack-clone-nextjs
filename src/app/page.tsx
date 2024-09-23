"use client";

// import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";
import { UserButton } from "@/features/auth/components/user-button";
export default function Home() {
  const { signOut } = useAuthActions();
  return (
    <div className="min-h-screen flex items-center justify-center">
      You are logged in user
      <UserButton />
    </div>
  );
}
