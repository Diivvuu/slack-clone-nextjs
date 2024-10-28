import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ChevronRight } from "lucide-react";
import { Id } from "../../convex/_generated/dataModel";
import { useGetChannel } from "@/features/channels/api/use-get-channel";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

interface ThreadsBarProps {
  memberId?: Id<"members">;
  channelId?: Id<"channels">;
  count?: number;
  image?: string;
  name?: string;
  timestamp?: number;
  onClick?: () => void;
}

export const ThreadsBar = ({
  memberId,
  channelId,
  count,
  image,
  name = "Member",
  timestamp,
}: ThreadsBarProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const SendChannelId = channelId ? channelId : ("" as Id<"channels">);
  const avatarFallback = name.charAt(0).toUpperCase();
  const { data: channelData, isLoading: ChannelLoading } = useGetChannel({
    id: SendChannelId,
  });
  console.log("channelid", channelId);
  const onClick = () => {
    router.push(
      channelId
        ? `/workspace/${workspaceId}/channel/${channelId}`
        : `/workspace/${workspaceId}/member/${memberId}`
    );
  };
  if (!count || !timestamp) return null;
  return (
    <div className="flex flex-col">
      <div>{"#" + channelData?.name}</div>
      <button
        onClick={onClick}
        className="p-1 rounded-md hover:bg-white border border-transparent hover:border-border flex items-center justify-start group/thread-bar transition max-w-[600px]"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <Avatar className="size-6 shrink-0">
            <AvatarImage src={image} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-sky-700 hover:underline font-bold truncate">
            {count} {count > 1 ? "replies" : "reply"}
          </span>
          <span className="text-xs text-muted-foreground truncate group-hover/thread-bar:hidden block">
            Last reply {formatDistanceToNow(timestamp, { addSuffix: true })}
          </span>
          <span className="text-xs text-muted-foreground truncate group-hover/thread-bar:block hidden">
            View Thread
          </span>
        </div>
        <ChevronRight className="size-4 text-muted-foreground ml-auto opacity-0 group-hover/thread-bar:opacity-100 tranistion shrink-0" />
      </button>
    </div>
  );
};
