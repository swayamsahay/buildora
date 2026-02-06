"use client";

import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { motion, Variants } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function SignupPage() {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <AnimatedLink href="/" variant="ghost" icon={ArrowLeft} className="text-xs uppercase tracking-widest text-neutral-500 hover:text-white">
          Back to Home
        </AnimatedLink>
      </motion.div>

      <div className="relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-2xl">
        <motion.div variants={itemVariants} className="mb-10">
          <h1 className="text-3xl font-medium tracking-tight text-white mb-2">Start building</h1>
          <p className="text-neutral-400 text-sm">Create an account to join the studio.</p>
        </motion.div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
              <motion.div variants={itemVariants} className="space-y-2">
              <label htmlFor="first-name" className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 ml-1">First Name</label>
              <input 
                  id="first-name" 
                  placeholder="John" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300"
                  required 
              />
              </motion.div>
              <motion.div variants={itemVariants} className="space-y-2">
              <label htmlFor="last-name" className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 ml-1">Last Name</label>
              <input 
                  id="last-name" 
                  placeholder="Doe" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300"
                  required 
              />
              </motion.div>
          </div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 ml-1">Email</label>
            <input 
              id="email" 
              type="email" 
              placeholder="name@example.com" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300"
              required 
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-2">
            <label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 ml-1">Password</label>
            <input 
              id="password" 
              type="password" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300"
              required 
            />
          </motion.div>

          <motion.div variants={itemVariants} className="pt-6">
            <button 
              type="submit" 
              className="group w-full flex items-center justify-center gap-2 bg-white text-black h-12 rounded-xl font-semibold text-sm hover:bg-neutral-200 transition-colors duration-300"
            >
              Create Account
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>
        </form>

        <motion.div variants={itemVariants} className="mt-8 text-center border-t border-white/5 pt-6">
          <p className="text-neutral-500 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-white hover:text-neutral-300 transition-colors font-medium">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}