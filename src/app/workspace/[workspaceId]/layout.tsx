"use client";
import React from "react";
import { Id } from "../../../../convex/_generated/dataModel";

import { usePanel } from "@/hooks/use-panel";

import { Threads } from "@/features/messages/components/thread";
import { Profile } from "@/features/members/components/profile";

import Toolbar from "./toolbar";
import Sidebar from "./sidebar";
import WorkspaceSidebar from "./workspace-sidebar";

import { Loader } from "lucide-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface WorkSpaceIdLayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: WorkSpaceIdLayoutProps) => {
  const { parentMessageId, profileMemberId, onClose } = usePanel();
  //helps to detect ?parentMessageId in url
  const showPanel = !!parentMessageId || !!profileMemberId;
  return (
    <div className="h-full">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        <ResizablePanelGroup
          direction="horizontal"
          autoSave="sc-workpace-layout"
        >
          <ResizablePanel
            defaultSize={20}
            minSize={11}
            className="bg-[#5e2c5f]"
          >
            <WorkspaceSidebar />
            <div>Channels Sidebar</div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={20} defaultSize={80}>
            {children}
          </ResizablePanel>
          {showPanel && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel minSize={20} defaultSize={29}>
                {parentMessageId ? (
                  <Threads
                    messageId={parentMessageId as Id<"messages">}
                    onClose={onClose}
                  />
                ) : profileMemberId ? (
                  <Profile
                    memberId={profileMemberId as Id<"members">}
                    onClose={onClose}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Loader className="size-5 animate-spin text-muted-foreground" />
                  </div>
                )}
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Layout;
