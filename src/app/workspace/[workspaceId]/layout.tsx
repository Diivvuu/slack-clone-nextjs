"use client";

import React, { Children } from "react";
import workSpaceId from "./page";
import Toolbar from "./toolbar";
import Sidebar from "./sidebar";

interface WorkSpaceIdLayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: WorkSpaceIdLayoutProps) => {
  return (
    <div className="h-full">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default layout;
