interface WelcomeHeaderProps {
  username: string;
}

export function WelcomeHeader({ username }: WelcomeHeaderProps) {
  return (
    <div className="space-y-2 text-start">
      <h1 className="text-4xl font-bold tracking-tight">
        Hi there, <span className="text-foreground">{username}</span>
      </h1>
      <p className="text-xl text-muted-foreground">
        What would you like to know?
      </p>
      <p className="text-sm text-muted-foreground">
        Use one of the most common prompts below or use your own to begin
      </p>
    </div>
  );
}
