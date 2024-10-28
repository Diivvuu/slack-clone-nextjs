import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";
import { cn } from "@/lib/utils";

const SidebarItemVariants = cva(
  "flex items-center gap-1.5 justify-start font-normal h-7 px-[18px] text-sm overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-[#f9edffcc]",
        active: "text-[#481349] bg-white/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface SidebarItemProps {
  isChannel: boolean;
  label: string;
  id: string;
  icon: LucideIcon | IconType;
  variant?: VariantProps<typeof SidebarItemVariants>["variant"];
}

export const SidebarItem = ({
  isChannel,
  label,
  id,
  icon: Icon,
  variant,
}: SidebarItemProps) => {
  const workspaceId = useWorkspaceId();
  return (
    <Button
      variant="transparent"
      size="sm"
      asChild
      className={cn(SidebarItemVariants({ variant }))}
    >
      <Link
        href={
          isChannel
            ? `/workspace/${workspaceId}/channel/${id}`
            : `/workspace/${workspaceId}/threads`
        }
      >
        <Icon className="size-3.5 mr-1 shrink-0" />
        <span className="text-sm truncate">{label}</span>
      </Link>
    </Button>
  );
};
