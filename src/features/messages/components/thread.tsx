import { Button } from "@/components/ui/button";
import { Id } from "../../../../convex/_generated/dataModel";
import { XIcon } from "lucide-react";

interface ThreadsProps {
  messageId: Id<"messages">;
  onClose: () => void;
}
export const Threads = ({ messageId, onClose }: ThreadsProps) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <p>Thread</p>
        <Button onClick={onClose} variant="ghost" size="iconSm">
          <XIcon className="size-5 stroke-[1.5]" />
        </Button>
      </div>
    </div>
  );
};
