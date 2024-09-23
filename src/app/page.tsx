"use client";

// import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";
import { UserButton } from "@/features/auth/components/user-button";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useMemo } from "react";
export default function Home() {
  const { signOut } = useAuthActions();
  const { data, isLoading } = useGetWorkspaces();
  const workspaceId = useMemo(() => data?.[0]?._id, [data]);
  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* You are logged in user */}
      <UserButton />
    </div>
  );
}
