"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "../utils/cn";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Companies", href: "/companies" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50">
      <nav className="glass rounded-full border border-white/10 px-6 h-16 flex items-center justify-between shadow-2xl transition-all duration-300">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <Briefcase className="w-5 h-5 text-brand" />
          <span>Internship<span className="text-brand">Fair</span></span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.name}
              href={l.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-brand",
                pathname === l.href ? "text-brand" : "text-neutral-400"
              )}
            >
              {l.name}
            </Link>
          ))}
          <div className="w-px h-6 bg-neutral-800" />
          <Link
            href="/companies"
            className="px-5 py-2 text-sm font-medium rounded-full bg-white text-black hover:bg-neutral-200 transition-colors"
          >
            Explore roles
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 rounded-full hover:bg-white/5 transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-3 glass rounded-3xl border border-white/10 flex flex-col p-4 gap-2 shadow-2xl overflow-hidden"
          >
            {links.map((l) => (
              <Link
                key={l.name}
                href={l.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-2xl text-base font-medium transition-colors",
                  pathname === l.href 
                    ? "bg-brand/10 text-brand" 
                    : "text-neutral-400 hover:bg-white/5 hover:text-white"
                )}
              >
                {l.name}
              </Link>
            ))}
            <Link
              href="/companies"
              onClick={() => setIsOpen(false)}
              className="mt-2 text-center px-4 py-3 text-sm font-medium rounded-2xl bg-white text-black hover:bg-neutral-200 transition-colors"
            >
              Explore roles
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
