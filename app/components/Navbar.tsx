"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  const links = [
    { name: "Home", href: "/" },
    { name: "Companies", href: "/companies" },
    { name: "FAQ", href: "/#faq" },
    { name: "Contact", href: "/#contact" },
  ];

  useEffect(() => {
    if (pathname !== "/") {
      setActiveHash("");
      return;
    }

    const syncHash = () => {
      setActiveHash(window.location.hash || "");
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);

    const sectionIds = ["home", "companies", "faq", "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length === 0) {
          return;
        }

        const topVisibleId = visibleEntries[0].target.id;
        setActiveHash(`#${topVisibleId}`);
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.2, 0.4, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("hashchange", syncHash);
      observer.disconnect();
    };
  }, [pathname]);

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/" && (!activeHash || activeHash === "#home");
    }

    if (href === "/companies") {
      return pathname.startsWith("/companies") || (pathname === "/" && activeHash === "#companies");
    }

    if (href.startsWith("/#")) {
      const targetHash = href.slice(1);
      return pathname === "/" && activeHash === targetHash;
    }

    return pathname === href;
  };

  return (
    <div className="fixed top-20 md:top-6 left-1/2 -translate-x-1/2 w-[94%] md:w-[92%] max-w-4xl z-50">
      <nav className="glass rounded-full border border-white/20 bg-black/80/95 backdrop-blur-2xl px-5 md:px-6 h-16 flex items-center gap-6 shadow-[0_12px_30px_rgba(0,0,0,0.5)] transition-all duration-300">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <span>Internship <span className="text-brand"> Fair</span></span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 ml-auto">
          {links.map((l) => (
            <Link
              key={l.name}
              href={l.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-brand",
                isActiveLink(l.href) ? "text-brand" : "text-neutral-400"
              )}
            >
              {l.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden ml-auto p-2 rounded-full hover:bg-white/5 transition-colors" onClick={() => setIsOpen(!isOpen)}>
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
            className="md:hidden mt-3 glass rounded-3xl border border-white/20 bg-black/70 flex flex-col p-4 gap-2 shadow-2xl overflow-hidden"
          >
            {links.map((l) => (
              <Link
                key={l.name}
                href={l.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-2xl text-base font-medium transition-colors",
                  isActiveLink(l.href)
                    ? "bg-brand/10 text-brand" 
                    : "text-neutral-400 hover:bg-white/5 hover:text-white"
                )}
              >
                {l.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
