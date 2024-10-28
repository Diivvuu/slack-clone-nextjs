import { usePaginatedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

const BATCH_SIZE = 20;
interface UseGetMessageProps {
  workspaceId: Id<"workspaces">;
  //   conversationId?: Id<"conversations">;
  //   parentMessageId?: Id<"messages">;
}

export type GetMessageReturnType =
  (typeof api.messages.getAllWorkspaceMessages._returnType)["page"];

export const useGetWorkspaceMessages = ({
  workspaceId,
  //   conversationId,
  //   parentMessageId,
}: UseGetMessageProps) => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.messages.getAllWorkspaceMessages,
    {
      workspaceId,
      //   conversationId,
      //   parentMessageId,
    },
    { initialNumItems: BATCH_SIZE }
  );
  return {
    results,
    status,
    loadMore: () => loadMore(BATCH_SIZE),
  };
};
