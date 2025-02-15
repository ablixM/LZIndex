"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "../../components/ui/sheet";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MatrixTypeText } from "../ui/matrix-type-text";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "<A/> Chat", href: "/chat" },
  { name: "<A/> Prompts", href: "/prompt" },
  { name: "<A/> About", href: "/about" },
  { name: "<A/> Attributions", href: "/attributions" },
];

export default function Navbar() {
  const location = useLocation();

  // Add animation refs and handlers
  const sheetContentRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const getCurrentNavItem = useCallback(() => {
    const currentPath = location.pathname;
    return (
      navItems.find(
        (item) =>
          currentPath === item.href ||
          (item.href !== "/" && currentPath.startsWith(item.href))
      )?.name || "Chat"
    );
  }, [location.pathname]);

  const [activeItem, setActiveItem] = useState(getCurrentNavItem());

  // Update active item when route changes
  useEffect(() => {
    setActiveItem(getCurrentNavItem());
  }, [location, getCurrentNavItem]);

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
    setAnimateSheetContent(null);
  };

  // Replace the animateSheetContent callback with useGSAP
  const [animateSheetContent, setAnimateSheetContent] = useState<
    ((isOpen: boolean) => void) | null
  >(null);

  useGSAP(() => {
    if (!sheetContentRef.current) return;

    const slideIn = gsap.fromTo(
      sheetContentRef.current,
      { x: "100%" },
      { x: 0, duration: 0.3, ease: "power2.out", paused: true }
    );

    const staggerLinks = gsap.fromTo(
      linksRef.current,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.1,
        paused: true,
      }
    );

    setAnimateSheetContent(() => (isOpen: boolean) => {
      if (isOpen) {
        slideIn.play();
        staggerLinks.play();
      }
    });

    return () => {
      slideIn.kill();
      staggerLinks.kill();
    };
  }, []);

  return (
    <nav className="border-border/40">
      <div className="max-w-[1400px] mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="font text-2xl sm:text-md md:text-lg text-gray-500"
        >
          LZAI
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 px-10">
          {navItems.map((item, index) => (
            <div key={item.name} className="flex items-center">
              <Link
                to={item.href}
                className={`relative px-8 transition-colors hover:text-white text-md `}
                onClick={() => handleItemClick(item.name)}
                data-name={item.name}
              >
                <span
                  className={`${
                    activeItem === item.name
                      ? "text-white"
                      : "text-muted-foreground"
                  }`}
                >
                  <MatrixTypeText
                    text={item.name}
                    isActive={activeItem === item.name}
                    className="pointer-events-auto select-none"
                  />
                </span>
              </Link>
              {index < navItems.length - 1 && (
                <div className="h-6 w-[1px] bg-border/40" />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            className="relative group px-8 py-2 bg-neutral-400 hover:bg-neutral-500 text-white rounded-md 
            shadow-[0px_14px_56px_-11px_#b0b0b0] transition-all duration-300 w-[150px] overflow-hidden"
          >
            <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:opacity-0">
              Join
            </span>
            <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
              the community
            </span>
          </Button>

          {/* Mobile Navigation */}
          <Sheet onOpenChange={animateSheetContent ?? (() => {})}>
            <SheetTrigger asChild className="md:hidden ml-2">
              <Button
                className="rounded-md bg-cod-gray-900 hover:bg-cod-gray-800"
                variant="ghost"
                size="icon"
              >
                <Menu className="h-5 w-5 text-muted-foreground hover:text-white" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-cod-gray-950 border-none p-0 overflow-hidden"
              ref={sheetContentRef}
            >
              <div className="flex flex-col gap-1 border-t border-cod-gray-800 p-4 mt-10">
                {navItems.map((item, index) => (
                  <SheetClose asChild key={item.name}>
                    <Link
                      ref={(el) => {
                        linksRef.current[index] = el;
                      }}
                      to={item.href}
                      className={`relative text-xs sm:text-md transition-colors px-3 py-2 rounded-md ${
                        activeItem === item.name
                          ? "text-foreground bg-accent"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      }`}
                      onClick={() => handleItemClick(item.name)}
                    >
                      {item.name}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
