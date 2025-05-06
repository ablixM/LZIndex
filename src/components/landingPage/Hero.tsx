import { Card } from "../ui/card";
import { WelcomeHeader } from "./welcome-header";
import { motion } from "framer-motion";

import { cn } from "../../lib/utils";
import heroImage from "../../assets/hImage.png";
import { SearchTabs } from "./SearchTabs";

export function Hero() {
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
    <div className="relative ">
      <div className="absolute top-0 left-0 w-full h-1/2 overflow-hidden">
        {/* Base dark overlay */}
        <div className="absolute inset-0 bg-black/10 z-10 hidden md:block dark:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />

        {/* Base image */}
        <img
          src={heroImage}
          alt="Hero background"
          className="absolute object-cover w-full h-full"
          loading="eager"
        />
      </div>

      {/* Main Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={cn(
          "relative z-20 flex flex-col items-center justify-start p-4",
          "bg-gradient-to-b from-transparent from-50% to-background to-50%"
        )}
      >
        <div className="w-full max-w-4xl space-y-8">
          <motion.div variants={itemVariants}>
            <WelcomeHeader />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="p-4 mt-6 bg-background rounded-sm">
              <SearchTabs />
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
