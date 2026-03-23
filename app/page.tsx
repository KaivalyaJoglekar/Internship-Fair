"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { mockCompanies } from "./data/mock";
import { ArrowRight, Sparkles, Building2, Users, Calendar, ChevronDown, Instagram, Linkedin } from "lucide-react";

const faqs = [
  {
    q: "Who is eligible to participate?",
    a: "All currently enrolled students in their pre-final and final years are eligible to participate, depending on the specific company requirements listed in their role descriptions.",
  },
  {
    q: "How do I apply for a role?",
    a: "Navigate to the Companies section, select a company, and click the 'Apply Now' button on the specific role you are interested in. This will redirect you to the official application portal.",
  },
  {
    q: "Can I apply to multiple companies?",
    a: "Yes, you can apply to as many companies as you'd like, provided you meet the specific eligibility criteria for each role.",
  },
  {
    q: "Will the interviews be on-campus or online?",
    a: "Interview modes vary by company. Most first-round assessments will be conducted online, while subsequent technical and HR rounds may be either on-campus or virtual. Please check the timeline for specifics.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero */}
      <section className="relative w-full overflow-hidden flex flex-col items-center justify-center min-h-[90vh] py-24">
        <div className="absolute inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-dark/10 via-neutral-950 to-neutral-950" />
        
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-brand/5 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-brand/5 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-brand-light"
          >
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-br from-white to-neutral-400 text-transparent bg-clip-text pb-2"
          >
            <span className="block text-2xl md:text-3xl text-gradient-brand mb-2">Student's Council's Technical and Research Cell</span>
            presents <br className="hidden md:block" />
            <span className="text-brand-dark">Internship Fair 2026</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed"
          >
            The premium tech internship portal. Browse exclusive job descriptions, connect with top-tier companies, and fast-track your placements.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              href="/companies"
              className="w-full sm:w-auto px-8 py-3 rounded-lg bg-gradient-brand text-black font-semibold hover:bg-brand-light transition-all flex items-center justify-center gap-2 group"
            >
              Explore Companies
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/faq"
              className="w-full sm:w-auto px-8 py-3 rounded-lg glass font-semibold hover:bg-white/5 transition-all text-white"
            >
              How it works
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="w-full max-w-7xl mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl font-bold mb-4">Featured Participants</h2>
            <p className="text-neutral-400 max-w-md">Discover roles from industry leaders and fast-growing startups shaping the future.</p>
          </div>
          <Link href="/companies" className="inline-flex items-center gap-2 text-gradient-brand hover:text-brand-light font-medium pb-1">
            View All Companies <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockCompanies.slice(0, 3).map((company) => (
            <Link key={company.id} href={`/companies/${company.id}`}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group flex flex-col h-full p-8 rounded-3xl bg-neutral-900/40 backdrop-blur-sm border border-white/5 hover:border-brand/30 hover:bg-neutral-900/60 hover:shadow-[0_8px_30px_rgb(239,68,68,0.05)] transition-all duration-300"
              >
                <div className="flex flex-col gap-5 mb-6">
                  <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-neutral-800/80 border border-white/5 font-bold text-xl text-white group-hover:bg-gradient-brand/10 group-hover:text-gradient-brand group-hover:border-brand/20 transition-all duration-300 shadow-inner">
                    {company.logo}
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
                    {company.roles.length} Roles
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-neutral-950 border border-white/5 text-neutral-300">
                    {company.location}
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full max-w-4xl mx-auto px-6 py-24">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked <span className="text-gradient-brand">Questions</span></h2>
          <p className="text-neutral-400 text-lg">Everything you need to know about the internship fair.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group p-6 bg-neutral-900 border border-neutral-800 rounded-2xl [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-lg text-white">
                {faq.q}
                <span className="transition group-open:rotate-180">
                  <ChevronDown className="w-5 h-5 text-gradient-brand" />
                </span>
              </summary>
              <p className="text-neutral-400 mt-4 leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full max-w-5xl mx-auto px-6 py-24">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Get in <span className="text-gradient-brand">Touch</span></h2>
          <p className="text-neutral-400 text-lg">Need help with your application? Our support team is here for you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800">
              <h3 className="text-xl font-bold text-white mb-2">Helpdesk Support</h3>
              <p className="text-neutral-400 mb-4">Available Mon-Fri, 9am - 5pm.</p>
              <p className="text-gradient-brand font-medium">trc@mpstme.edu</p>
            </div>
            <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800">
              <h3 className="text-xl font-bold text-white mb-2">Campus Office</h3>
              <p className="text-neutral-400 mb-8">
                Placement Cell, Block A<br/>
                University Campus<br/>
                City, State 12345
              </p>
              
              <h3 className="text-lg font-bold text-white mb-4">Connect With Us</h3>
              <div className="flex items-center gap-4">
                <a href="#" className="w-12 h-12 flex items-center justify-center rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white hover:border-brand/50 hover:bg-brand/10 transition-all duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-12 h-12 flex items-center justify-center rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white hover:border-brand/50 hover:bg-brand/10 transition-all duration-300">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <form className="space-y-4 p-8 rounded-3xl bg-neutral-900 border border-neutral-800">
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">Name</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-brand/50 focus:outline-none text-white" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">Email</label>
              <input type="email" className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-brand/50 focus:outline-none text-white" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">Message</label>
              <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-brand/50 focus:outline-none text-white" placeholder="How can we help?"></textarea>
            </div>
            <button type="button" className="w-full px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
