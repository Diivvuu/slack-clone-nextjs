"use client";

// import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";
import { UserButton } from "@/features/auth/components/user-button";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useEffect, useMemo } from "react";
import { useCreateWorkSpaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { Modals } from "@/components/modals";
import { useRouter } from "next/navigation";
export default function Home() {
  const { signOut } = useAuthActions();
  const router = useRouter();
  const [open, setOpen] = useCreateWorkSpaceModal();

  const { data, isLoading } = useGetWorkspaces();
  const workspaceId = useMemo(() => data?.[0]?._id, [data]);
  useEffect(() => {
    if (isLoading) return;
    if (workspaceId) {
      console.log("redirect to workspace");
      router.replace(`/workspace/${workspaceId}`);
    } else if (!open) {
      setOpen(true);
    } else {
      console.log("open creation model");
    }
  }, [workspaceId, isLoading, open, setOpen]);
  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* You are logged in user */}
      {/* <Modals /> */}
      <UserButton />
    </div>
  );
}
