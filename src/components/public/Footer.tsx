import Link from "next/link";
import { Twitter, Instagram, Linkedin, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#050505] text-[#888] py-20 px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-white text-2xl font-bold tracking-tighter uppercase mb-6">Buildora</h2>
          <p className="max-w-md text-sm leading-relaxed mb-8">
            A digital studio crafting calm, confident, and cinematic web experiences for forward-thinking brands.
          </p>
          <div className="flex gap-4">
             {[
               { Icon: Twitter, href: "#" },
               { Icon: Instagram, href: "#" },
               { Icon: Linkedin, href: "#" },
               { Icon: Globe, href: "#" } // Using Globe for Awwwards substitute
             ].map(({ Icon, href }, i) => (
               <a 
                 key={i} 
                 href={href} 
                 className="p-2 rounded-full border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] group"
               >
                 <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
               </a>
             ))}
          </div>
        </div>
        
        <div className="hidden md:block">
          <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Socials</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-cyan-400 transition-colors hover:shadow-[0_0_8px_rgba(34,211,238,0.5)]">Twitter / X</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors hover:shadow-[0_0_8px_rgba(34,211,238,0.5)]">Instagram</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors hover:shadow-[0_0_8px_rgba(34,211,238,0.5)]">LinkedIn</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors hover:shadow-[0_0_8px_rgba(34,211,238,0.5)]">Awwwards</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Sitemap</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/" className="hover:text-white transition-colors">Work</Link></li>
            <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-[1800px] mx-auto mt-20 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[#555]">
        <p>&copy; {new Date().getFullYear()} Buildora Studio. All rights reserved.</p>
        <p>Designed with restraint.</p>
      </div>
    </footer>
  );
}
