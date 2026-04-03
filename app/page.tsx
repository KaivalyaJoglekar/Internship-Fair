"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { mockCompanies } from "./data/companyCardDetails";
import { ArrowRight, Sparkles, Search } from "lucide-react";
import FaqList from "./contact/FaqList";
import ContactCards from "./contact/ContactCards";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const parseStipendAmount = (stipend: string) => {
    const numeric = stipend.replace(/[^\d]/g, "");
    return numeric ? Number.parseInt(numeric, 10) : Number.NaN;
  };

  const getStipendDisplay = (stipends: string[]) => {
    if (stipends.length === 0) return "TBA";
    if (stipends.length === 1) return stipends[0];

    const normalized = stipends.map((stipend) => stipend.trim());
    const uniqueStipends = new Set(normalized);
    if (uniqueStipends.size === 1) return normalized[0];

    const parsed = stipends
      .map(parseStipendAmount)
      .filter((amount) => !Number.isNaN(amount));

    if (parsed.length === 0) return "TBA";

    const min = Math.min(...parsed);
    const max = Math.max(...parsed);
    if (min === max) return `₹${min.toLocaleString("en-IN")} / month`;
    return `₹${min.toLocaleString("en-IN")} - ₹${max.toLocaleString("en-IN")} / month`;
  };

  const filteredCompanies = useMemo(() => {
    if (!searchTerm.trim()) return mockCompanies;
    return mockCompanies.filter(company =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);
  return (
    <div className="flex flex-col items-center justify-center">
      <Link
        href="/"
        className="fixed top-3 left-3 md:top-5 md:left-5 lg:top-4 lg:left-5 z-50 rounded-xl bg-black/55 p-1 backdrop-blur-sm"
      >
        <Image
          src="/trclogosvg.svg"
          alt="TRC logo"
          width={132}
          height={132}
          priority
          className="h-16 w-16 md:h-20 md:w-20 lg:h-28 lg:w-28 object-contain"
        />
      </Link>

      {/* Hero */}
      <section id="home" className="scroll-mt-32 relative w-full overflow-hidden flex flex-col items-center justify-center min-h-[82vh] pt-24 pb-14 md:pt-20 md:pb-12">
        <div className="absolute inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-dark/10 via-neutral-950 to-neutral-950" />
        
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-brand/5 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-brand/5 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 text-center space-y-6 z-10">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-neutral-900/60 px-4 py-2 text-sm font-medium text-neutral-200"
          >
            <Sparkles className="h-4 w-4 text-brand-light" />
            Student&apos;s Council&apos;s Technical and Research Cell
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            <span className="mt-2 inline-flex justify-center">
              <Image
                src="/IF logo without bg.png"
                alt="Internship Fair logo"
                width={560}
                height={190}
                priority
                className="h-auto w-[340px] md:w-[520px]"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mx-auto max-w-2xl text-base leading-relaxed text-neutral-300 md:text-lg"
          >
           Discover top internships, explore roles in detail, and apply seamlessly, all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              href="/companies"
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-brand text-black font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 group shadow-[0_10px_24px_rgba(214,15,24,0.25)]"
            >
              Explore Companies
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="/CV_Format.docx"
              download="CV_Format.docx"
              className="w-full sm:w-auto px-8 py-3 rounded-xl border border-white/15 bg-neutral-900/70 font-semibold hover:bg-white/5 transition-all text-white"
            >
              CV Format
            </a>
            <Link
              href="/interview-slots"
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-white font-semibold text-black hover:bg-neutral-200 transition-all"
            >
              View my Slot
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Companies */}
      <section id="companies" className="scroll-mt-32 w-full max-w-7xl mx-auto px-6 pt-12 pb-20 md:pt-10 md:pb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-brand-light mb-2">Opportunities</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Participating Companies</h2>
           
          </div>
          <Link href="/companies" className="inline-flex items-center gap-2 text-gradient-brand hover:text-brand-light font-medium pb-1">
            View All Companies <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/15 bg-black/50 text-white placeholder-neutral-400 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <Link key={company.id} href={`/companies#${company.id}`}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group flex flex-col h-full p-8 rounded-3xl bg-neutral-900/50 backdrop-blur-sm border border-white/10 hover:border-brand/40 hover:bg-neutral-900/70 hover:shadow-[0_16px_35px_rgba(214,15,24,0.12)] transition-all duration-300 cursor-pointer"
              >
                <div className="flex flex-col gap-5 mb-6">
                  <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white border border-black/10 p-2 transition-all duration-300 shadow-inner">
                    <Image
                      src={company.logo}
                      alt={`${company.name} logo`}
                      width={56}
                      height={56}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-white mb-1 tracking-tight">{company.name}</h3>
                    <p className="text-sm font-medium text-gradient-brand/80">{company.industry}</p>
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3">
                    {company.shortDescription}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-medium pt-8 mt-auto border-t border-white/5">
                  <span className="px-3 py-1.5 rounded-full bg-neutral-950 border border-white/5 text-neutral-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-brand"></span>
                    {company.roles.length} {company.roles.length === 1 ? "Role" : "Roles"}
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-neutral-950 border border-white/5 text-neutral-300">
                    {getStipendDisplay(company.roles.map((role) => role.stipend))}
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="scroll-mt-32 w-full max-w-4xl mx-auto px-6 pt-14 pb-18 md:pt-10 md:pb-14">
        <div className="mb-10 text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.22em] text-brand-light">Quick Answers</p>
          <h2 className="text-3xl md:text-5xl font-bold">Frequently Asked <span className="text-gradient-brand">Questions</span></h2>
          <p className="text-neutral-400 text-base md:text-lg">Everything you need to know about the Internship Fair.</p>
        </div>

        <FaqList />
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-32 w-full max-w-4xl mx-auto px-6 pt-14 pb-20 md:pt-10 md:pb-16">
        <div className="mb-12 text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.22em] text-brand-light">Contact Desk</p>
          <h2 className="text-3xl md:text-5xl font-bold">Get in <span className="text-gradient-brand">Touch</span></h2>
          <p className="text-neutral-400 text-base md:text-lg">Need help with your application? Our support team is here for you.</p>
        </div>

        <ContactCards />
      </section>
    </div>
  );
}
