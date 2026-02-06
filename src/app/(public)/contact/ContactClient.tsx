"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Send } from "lucide-react";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

export default function ContactClient() {
  return (
    <div className="pt-32 pb-20 px-6 md:px-12 min-h-[80vh] flex flex-col justify-between bg-background relative overflow-hidden">
      <AnimatedBackground />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8 block flex items-center gap-2"
          >
             <span className="w-2 h-2 rounded-full bg-foreground/20" />
            Contact
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase mb-12 text-foreground"
          >
            Let&apos;s<br />Talk
          </motion.h1>

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2, duration: 0.8 }}
          >
            <p className="text-xl text-muted-foreground mb-8 max-w-md">
              Have a project in mind? We&apos;d love to hear about it. Send us a message or email us directly.
            </p>
            <motion.a 
              href="mailto:hello@buildora.studio" 
              className="text-2xl font-medium text-foreground hover:text-muted-foreground transition-colors inline-flex items-center gap-4 border-b border-muted pb-2 hover:border-foreground mb-12"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              hello@buildora.studio
              <motion.span
                animate={{ x: 0, y: 0 }}
                whileHover={{ x: 4, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowUpRight className="w-6 h-6" />
              </motion.span>
            </motion.a>

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">Socials</h3>
              <ul className="space-y-2">
                {["Twitter", "Instagram", "LinkedIn"].map((social) => (
                  <motion.li
                    key={social}
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a href="#" className="text-lg text-foreground hover:text-muted-foreground transition-colors">
                      {social}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3, duration: 0.8 }}
           className="bg-foreground/5 p-8 md:p-12 rounded-2xl border border-border"
        >
          <motion.form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.div className="space-y-2" variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
              <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Name</label>
              <input 
                id="name" 
                type="text" 
                placeholder="What's your name?" 
                className="w-full bg-transparent border-b border-border py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground focus:shadow-[0_4px_20px_-2px_rgba(255,255,255,0.1)] transition-all duration-300"
              />
            </motion.div>
            <motion.div className="space-y-2" variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</label>
              <input 
                id="email" 
                type="email" 
                placeholder="Where can we reach you?" 
                className="w-full bg-transparent border-b border-border py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground focus:shadow-[0_4px_20px_-2px_rgba(255,255,255,0.1)] transition-all duration-300"
              />
            </motion.div>
            <motion.div className="space-y-2" variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
              <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Message</label>
              <textarea 
                id="message" 
                rows={4}
                placeholder="Tell us about your project..." 
                className="w-full bg-transparent border-b border-border py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground focus:shadow-[0_4px_20px_-2px_rgba(255,255,255,0.1)] transition-all duration-300 resize-none"
              />
            </motion.div>
            
            <motion.button 
              type="button"
              className="group w-full flex items-center justify-between bg-foreground text-background h-16 px-8 rounded-full font-bold text-lg"
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Send Message
              <motion.span
                animate={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <Send className="w-5 h-5" />
              </motion.span>
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}