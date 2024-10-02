"use client";

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

interface WorkSpaceIdLayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: WorkSpaceIdLayoutProps) => {
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
          <ResizablePanel minSize={20}>
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default layout;
