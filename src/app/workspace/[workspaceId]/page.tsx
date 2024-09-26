"use client";

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

const workSpaceId = () => {
  const workspaceId = useWorkspaceId();
  const { data } = useGetWorkspace({ id: workspaceId });
  return <div>workSpaceId ID Data: {JSON.stringify(data)}</div>;
};

export default workSpaceId;
