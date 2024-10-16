import { useMemberId } from "@/hooks/use-member-id";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { useGetMember } from "@/features/members/api/use-get-member";
import { useGetMessages } from "@/features/messages/api/use-get-messages";
import { Loader } from "lucide-react";
import { Header } from "./header";
import { ChatInput } from "./chat-input";
import { MessageList } from "@/components/message-list";

interface ConversationProps {
  id: Id<"conversations">;
}

export const Conversations = ({ id }: ConversationProps) => {
  const memberId = useMemberId();

  const { data: member, isLoading: memberLoading } = useGetMember({
    id: memberId,
  });
  console.log(member);
  const { results, status, loadMore } = useGetMessages({
    conversationId: id,
  });

  if (memberLoading || status === "LoadingFirstPage")
    return (
      <div className="h-full flex justify-center items-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );

  return (
    <div className="flex flex-col h-full">
      <Header
        memberName={member?.user.name}
        memberImage={member?.user.image}
        onClick={() => {}}
      />
      <MessageList
        data={results}
        variant="channel"
        memberImage={member?.user.image}
        memberName={member?.user.name}
        loadMore={loadMore}
        canLoadMore={status === "CanLoadMore"}
        isLoadingMore={status === "LoadingMore"}
      />
      <ChatInput
        placeholder={`Message ${member?.user.name}`}
        conversationId={id}
      />
    </div>
  );
};
