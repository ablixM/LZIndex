import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { ChatPromptCard } from "./chat-prompt-card";
import { WelcomeHeader } from "./welcome-header";
import { motion } from "framer-motion";
import { Code, Image, MessageSquare, FileText } from "lucide-react";
import Teams from "../Teams";

interface HeroProps {
  username?: string;
}

export function Hero({ username = "Guest" }: HeroProps) {
  const [prompt, setPrompt] = useState("");

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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col items-center justify-center min-h-screen p-4 bg-background"
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
                  onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
                      <span>��️ Use Image</span>
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
  );
}
