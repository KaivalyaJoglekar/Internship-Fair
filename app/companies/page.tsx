"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Building2, BriefcaseBusiness, CalendarDays, ExternalLink, FileText, Search } from "lucide-react";
import { mockCompanies } from "../data/companyCardDetails";

export default function CompaniesPage() {
  const [selectedRoleByCompany, setSelectedRoleByCompany] = useState<Record<string, number>>({});
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
    <div className="max-w-7xl mx-auto px-6 py-12 w-full">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Participating <span className="text-gradient-brand">Companies</span></h1>
        <p className="text-neutral-300 text-lg">Browse all internship openings and open role-specific JDs directly from each card.</p>

        {/* Search Bar */}
        <div className="mt-8 max-w-md">
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
        {filteredCompanies.map((company, i) => {
          const selectedRoleIndex = selectedRoleByCompany[company.id] ?? 0;
          const selectedRole = company.roles[selectedRoleIndex] ?? company.roles[0];

          return (
            <motion.article
              key={company.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-white/12 bg-black/80 text-white shadow-[0_16px_35px_rgba(0,0,0,0.45)] transition-colors duration-300 hover:border-red-500/70"
            >
              <div className="p-6 pb-4">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 shrink-0 rounded-xl bg-white border border-black/10 flex items-center justify-center p-2">
                      <Image
                        src={company.logo}
                        alt={`${company.name} logo`}
                        width={56}
                        height={56}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold leading-tight">{company.name}</h2>
                      <div className="mt-1 flex items-center gap-2 text-sm text-neutral-300">
                        <Building2 className="w-4 h-4" />
                        <span>{company.industry}</span>
                      </div>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full border border-brand/40 bg-brand/15 px-3 py-1 text-xs font-semibold text-white">{company.roles.length} {company.roles.length === 1 ? "Role" : "Roles"}</span>
                </div>

                <div className="mb-4 rounded-xl border border-violet-400/35 px-4 py-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-violet-200">
                    <BriefcaseBusiness className="w-3.5 h-3.5 text-violet-300" />
                    Role
                  </div>
                  <p className="mt-1 text-sm font-semibold text-violet-300">{selectedRole?.title ?? "Role to be updated"}</p>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {company.roles.map((role, roleIndex) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRoleByCompany((prev) => ({ ...prev, [company.id]: roleIndex }))}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                      selectedRoleIndex === roleIndex
                        ? "border-brand/70 bg-transparent text-white"
                        : "border-white/15 bg-transparent text-neutral-300 hover:border-brand/70 hover:text-white"
                    }`}
                    >
                      {role.title}
                    </button>
                  ))}
                </div>

                <p className="text-sm leading-relaxed text-neutral-300 mb-4">{company.shortDescription}</p>
              </div>

              <div className="px-6 pb-4">
                <div className="rounded-2xl border border-white/10 overflow-hidden bg-black/75">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <FileText className="w-4 h-4" />
                      Job Description 
                    </div>
                    <a
                      href={selectedRole?.jdPdf}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-medium text-neutral-200 hover:text-white transition-colors"
                    >
                      Open PDF
                    </a>
                  </div>
                  <iframe
                    src={`${selectedRole?.jdPdf ?? ""}#toolbar=0&navpanes=0&scrollbar=0`}
                    title={`${company.name} JD preview`}
                    className="h-48 w-full bg-black"
                  />
                </div>
              </div>

              <div className="px-6 pb-6 mt-auto">
                <a
                    href={selectedRole?.applyLink ?? "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                  >
                    Apply Now
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <p className="mt-2 text-sm font-semibold text-red-500 text-center">Deadline: {selectedRole?.deadline ?? "To be announced"}</p>
                </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
