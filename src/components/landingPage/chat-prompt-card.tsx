import { Card } from "../ui/card";
import { LucideIcon } from "lucide-react";

interface ChatPromptCardProps {
  title: string;
  icon: LucideIcon;
}

export function ChatPromptCard({ title, icon: Icon }: ChatPromptCardProps) {
  return (
    <Card className="p-4 transition-colors hover:bg-accent cursor-pointer rounded-none">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold">{title}</p>
        <Icon className="w-5 h-5 text-muted-foreground" />
      </div>
    </Card>
  );
}
