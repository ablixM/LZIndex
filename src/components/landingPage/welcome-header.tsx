import { Badge } from "../ui/badge";

export function WelcomeHeader() {
  return (
    <div className="space-y-2 text-start">
      <h1 className="text-4xl font-bold tracking-tight">
        LZIndex <Badge>BETA</Badge>
      </h1>
      <p className="text-xl sm:text-4xl font-bold ">
        What would you like to know?
      </p>
      <p className="text-sm text-muted-foreground">
        Use one of the most common prompts below or use your own to begin
      </p>
    </div>
  );
}
