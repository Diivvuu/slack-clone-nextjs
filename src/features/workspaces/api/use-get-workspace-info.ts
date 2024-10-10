import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

interface UseGetWorkspaceInfoProps {
  id: Id<"workspaces">;
}

export const useGetWorkspaceInfo = ({ id }: UseGetWorkspaceInfoProps) => {
  const data = useQuery(api.workspaces.getInfoById, { id });
  const isLoading = data === undefined;

  return { data, isLoading };
};
