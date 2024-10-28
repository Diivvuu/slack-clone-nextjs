"use client";

import { ThreadsBar } from "@/components/threads-bar";
import { ThreadsBarMember } from "@/components/threads-bar-member";
import { useGetWorkspaceMessages } from "@/features/messages/api/use-get-all-messages";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { usePanel } from "@/hooks/use-panel";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { format } from "date-fns";

const ThreadPage = () => {
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
  console.log(data);
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
            {messages
              .filter((message) => message.threadCount > 0)
              .map((message, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-start gap-x-4 mt-8"
                  >
                    {message.channelId ? (
                      <ThreadsBar
                        // memberId={message.memberId}
                        channelId={message.channelId}
                        count={message.threadCount}
                        image={message.threadImage}
                        name={message.threadName}
                        timestamp={message.threadTimestamp}
                        onClick={() => {
                          // onOpenMessage(message._id);
                        }}
                      />
                    ) : (
                      <ThreadsBarMember
                        memberId={message.memberId}
                        // channelId={message.channelId}
                        count={message.threadCount}
                        image={message.threadImage}
                        name={message.threadName}
                        timestamp={message.threadTimestamp}
                        onClick={() => {
                          // onOpenMessage(message._id);
                        }}
                      />
                    )}
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
