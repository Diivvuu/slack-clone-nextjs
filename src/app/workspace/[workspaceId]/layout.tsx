"use client";
import { usePanel } from "@/hooks/use-panel";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import React, { Children } from "react";
import workSpaceId from "./page";
import Toolbar from "./toolbar";
import Sidebar from "./sidebar";

import WorkspaceSidebar from "./workspace-sidebar";
import { Loader } from "lucide-react";
import { Threads } from "@/features/messages/components/thread";
import { Id } from "../../../../convex/_generated/dataModel";

interface WorkSpaceIdLayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: WorkSpaceIdLayoutProps) => {
  const { parentMessageId, onClose } = usePanel();
  //helps to detect ?parentMessageId in url
  const showPanel = !!parentMessageId;
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
            <div>Channels Siderbar</div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={20}>{children}</ResizablePanel>
          {showPanel && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel minSize={20} defaultSize={29}>
                {parentMessageId ? (
                  <Threads
                    messageId={parentMessageId as Id<"messages">}
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

export default layout;
