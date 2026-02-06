"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { Magnetic, TextShift } from "@/components/ui/Interactions";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Our Story", href: "/about" },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-4 md:top-6 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto relative flex flex-col items-center rounded-2xl md:rounded-[2rem] bg-black/60 backdrop-blur-xl backdrop-saturate-150 border border-white/10 shadow-2xl shadow-black/10 transition-all duration-300 hover:bg-black/70 max-w-5xl w-full">
        
        <div className="w-full flex items-center justify-between px-2 py-2 pl-6">
          {/* Left Side: Logo + Divider */}
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold tracking-tight text-white transition-opacity hover:opacity-80">
              BUILDORA
            </Link>
            <div className="h-6 w-[1px] bg-white/20 hidden md:block" />
          </div>

          {/* Center: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative px-4 py-2 text-sm font-medium rounded-full transition-colors",
                  pathname === item.href ? "text-white bg-white/10" : "text-white/70 hover:text-white hover:bg-white/5"
                )}
              >
                <TextShift text={item.name} className="relative z-10" />
              </Link>
            ))}
          </nav>

          {/* Right Side: Contact Button + Theme Toggle */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <ThemeToggle className="text-white/70 hover:text-white hover:bg-white/10" />

            <Link
              href="/login"
              className="hidden sm:inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-white/90 hover:text-white transition-colors hover:bg-white/10"
            >
              Login
            </Link>

            <Magnetic>
              <Link 
                href="/contact" 
                className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#F5F5DC] px-6 py-2.5 text-sm font-semibold text-neutral-900 transition-transform hover:shadow-lg active:scale-95"
              >
                Contact
              </Link>
            </Magnetic>
            
            {/* Mobile Menu Trigger */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <span className="sr-only">Menu</span>
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 8 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full overflow-hidden md:hidden px-2 pb-2"
            >
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "px-4 py-3 text-center text-sm font-medium rounded-xl transition-colors",
                      pathname === item.href 
                        ? "text-white bg-white/10" 
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="h-[1px] bg-white/10 my-2 mx-4" />
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-center text-sm font-medium rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-center text-sm font-medium rounded-xl bg-[#F5F5DC] text-neutral-900 font-semibold hover:bg-[#E5E5CC] transition-colors mx-4"
                >
                  Contact
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
