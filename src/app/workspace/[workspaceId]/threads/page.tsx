"use client";

import { ThreadBar } from "@/components/thread-bar";
import { useGetWorkspaceMessages } from "@/features/messages/api/use-get-all-messages";
import { useGetMessages } from "@/features/messages/api/use-get-messages";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info";
import { useChannelId } from "@/hooks/use-channel-id";
import { usePanel } from "@/hooks/use-panel";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { format } from "date-fns";

const ThreadPage = () => {
  const { parentMessageId, onOpenProfile, onOpenMessage, onClose } = usePanel();
  const workspaceId = useWorkspaceId();
  const { data: workspaceInfo, isLoading: workspaceInfoLoading } =
    useGetWorkspace({ id: workspaceId });
  const {
    results: data,
    status,
    loadMore,
  } = useGetWorkspaceMessages({
    workspaceId,
  });
  console.log(workspaceInfo);
  const groupedMessages = data?.reduce(
    (groups, message) => {
      const date = new Date(message._creationTime);
      const dateKey = format(date, "yyyy--MM-dd");
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].unshift(message);
      return groups;
    },
    {} as Record<string, typeof data>
  );

  return (
    <div className="flex flex-col h-full p-10">
      {workspaceInfo && (
        <div className="">
          <h1 className="font-semibold text-xl">
            #All the threads in{" "}
            <span className="underline underline-offset-1">
              {workspaceInfo?.name}
            </span>
            !
          </h1>
        </div>
      )}
      <div>
        {/* {Object.entries(groupedMessages || {}).map(([dateKey, messages]) => ( */}
        {Object.entries(groupedMessages || {}).map(([dataKey, messages]) => (
          <div key={dataKey}>
            {messages.map((message, index) => {
              return (
                <div key={index} className="mt-8">
                  <ThreadBar
                    count={message.threadCount}
                    image={message.threadImage}
                    name={message.threadName}
                    timestamp={message.threadTimestamp}
                    onClick={() => {
                      onOpenMessage(message._id);
                    }}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreadPage;
