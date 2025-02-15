import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { ChatPromptCard } from "./chat-prompt-card";
import { WelcomeHeader } from "./welcome-header";
import { motion } from "framer-motion";
import { Code, Image, MessageSquare, FileText } from "lucide-react";
import Teams from "../Teams";
import { cn } from "../../lib/utils";
import heroImage from "../../assets/hImage.png";

interface HeroProps {
  username?: string;
}

export function Hero({ username = "Guest" }: HeroProps) {
  const [prompt, setPrompt] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const spotlightSize =
    typeof window !== "undefined"
      ? Math.min(window.innerWidth, window.innerHeight) / 4
      : 150;

  const commonPrompts = [
    {
      title: "Write some code",
      icon: Code,
    },
    {
      title: "Analyze an image",
      icon: Image,
    },
    {
      title: "Chat conversation",
      icon: MessageSquare,
    },
    {
      title: "Analyze document",
      icon: FileText,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="absolute top-0 left-0 w-full h-1/2 overflow-hidden">
        {/* Base dark overlay - hidden on mobile */}
        <div className="absolute inset-0 bg-black/30 z-10 hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />

        {/* Base image - visible on mobile, darkened on desktop */}
        <img
          src={heroImage}
          alt="Hero background"
          className="absolute object-cover w-full h-full md:brightness-50 hidden md:block"
          loading="eager"
        />

        {/* Spotlight effect - only on desktop */}
        <div
          className="absolute inset-0 z-20 mix-blend-normal hidden md:block"
          style={{
            background: `radial-gradient(circle ${spotlightSize}px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, #0A0A0A 100%)`,
          }}
        />

        {/* Bright version of the image - only on desktop */}
        <img
          src={heroImage}
          alt="Hero background bright"
          className="absolute object-cover w-full h-full z-10 mix-blend-lighten hidden md:block"
          loading="eager"
          style={{
            clipPath: `circle(${spotlightSize}px at ${mousePosition.x}px ${mousePosition.y}px)`,
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={cn(
          "relative z-20 flex flex-col items-center justify-center min-h-screen p-4",
          "bg-gradient-to-b from-transparent from-50% to-background to-50%"
        )}
      >
        <div className="w-full">
          <Teams />
        </div>
        <div className="w-full max-w-3xl space-y-8">
          <motion.div variants={itemVariants}>
            <WelcomeHeader username={username} />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {commonPrompts.map((prompt, index) => (
              <motion.div
                key={prompt.title}
                variants={itemVariants}
                custom={index}
              >
                <ChatPromptCard title={prompt.title} icon={prompt.icon} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="p-4 mt-6 rounded-none">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-2">
                  <Textarea
                    className="min-h-[100px] resize-none p-3 bg-secondary/50 border-0 focus:ring-1 focus:ring-primary/20 rounded-none text-sm sm:text-md"
                    placeholder="Ask whatever you want..."
                    value={prompt}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setPrompt(e.target.value)
                    }
                    onKeyDown={(
                      e: React.KeyboardEvent<HTMLTextAreaElement>
                    ) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        // Add your send logic here
                      }
                    }}
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <button className="flex items-center space-x-2 hover:text-foreground transition-colors">
                        <span>📎 Add Attachment</span>
                      </button>
                      <button className="flex items-center space-x-2 hover:text-foreground transition-colors">
                        <span>️ Use Image</span>
                      </button>
                    </div>
                    <Button className="px-6 bg-foreground text-background hover:bg-foreground/80">
                      Send →
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
