"use client";

import { useState, useMemo, useEffect, useDeferredValue } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Building2, BriefcaseBusiness, ExternalLink, FileText, Search } from "lucide-react";
import { mockCompanies } from "../data/companyCardDetails";
import DeadlineCountdown from "../components/DeadlineCountdown";

const TECH_KEYWORDS = [
  "ai",
  "ml",
  "data",
  "web dev",
  "web developer",
  "web development",
  "software",
  "developer",
  "engineer",
  "cyber",
  "security",
  "cloud",
  "devops",
  "full stack",
  "frontend",
  "backend",
  "unity",
  "ar",
  "vr",
  "cv/",
  "research",
  "analyst",
  "iot",
  "technical",
  "tech",
];

const NON_TECH_KEYWORDS = [
  "business development",
  "sales",
  "marketing",
  "social media",
  "content",
  "graphic design",
  "video editing",
  "video editor",
  "creative",
  "motion graphics",
  "brand",
];

const toSearchWords = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

const matchesSearchTokens = (tokens: string[], words: string[]) =>
  tokens.every((token) => words.some((word) => word.startsWith(token)));

const isTechRole = (roleTitle: string, roleType?: "tech" | "non-tech") => {
  if (roleType === "tech") return true;
  if (roleType === "non-tech") return false;

  const normalized = roleTitle.toLowerCase();
  if (NON_TECH_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return false;
  }
  return TECH_KEYWORDS.some((keyword) => normalized.includes(keyword));
};

export default function CompaniesPage() {
  const [selectedRoleByCompany, setSelectedRoleByCompany] = useState<Record<string, string>>({});
  const [closedDeadlineToast, setClosedDeadlineToast] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleTypeFilter, setRoleTypeFilter] = useState<"all" | "tech" | "non-tech">("all");
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const isDeadlineClosed = (deadline?: string) => deadline?.trim().toLowerCase() === "closed";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const rawHash = window.location.hash;
    if (!rawHash || rawHash.indexOf("#", 1) === -1) return;

    const fragments = rawHash.split("#").filter(Boolean);
    const normalized = fragments[fragments.length - 1];
    if (!normalized) return;

    const nextUrl = `${window.location.pathname}#${normalized}`;
    window.history.replaceState(null, "", nextUrl);

    const target = document.getElementById(normalized);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    if (!closedDeadlineToast) return;

    const timeoutId = window.setTimeout(() => {
      setClosedDeadlineToast(null);
    }, 2600);

    return () => window.clearTimeout(timeoutId);
  }, [closedDeadlineToast]);

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

  const searchableCompanies = useMemo(
    () =>
      mockCompanies.map((company) => ({
        company,
        companyNameWords: toSearchWords(company.name),
        searchableRoles: company.roles.map((role) => ({
          role,
          isTech: isTechRole(role.title, role.roleType),
          searchWords: toSearchWords([role.title, role.stipend, company.deadline ?? ""].join(" ")),
        })),
      })),
    []
  );

  const filteredCompanies = useMemo(() => {
    const searchTokens = deferredSearchTerm.trim().toLowerCase().split(/\s+/).filter(Boolean);

    return searchableCompanies
      .map(({ company, companyNameWords, searchableRoles }) => {
        const rolesByType = searchableRoles.filter(({ isTech }) => {
          if (roleTypeFilter === "all") return true;
          return roleTypeFilter === "tech" ? isTech : !isTech;
        });

        if (rolesByType.length === 0) return null;

        if (searchTokens.length === 0) {
          return {
            ...company,
            visibleRoles: rolesByType.map(({ role }) => role),
          };
        }

        const companyNameMatches = matchesSearchTokens(searchTokens, companyNameWords);

        const roleMatches = rolesByType.filter(({ searchWords }) =>
          matchesSearchTokens(searchTokens, searchWords)
        );

        if (!companyNameMatches && roleMatches.length === 0) return null;

        return {
          ...company,
          visibleRoles: companyNameMatches
            ? (roleMatches.length > 0 ? roleMatches : rolesByType).map(({ role }) => role)
            : roleMatches.map(({ role }) => role),
        };
      })
      .filter((company): company is (typeof mockCompanies)[number] & { visibleRoles: (typeof mockCompanies)[number]["roles"] } => company !== null);
  }, [deferredSearchTerm, roleTypeFilter, searchableCompanies]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 w-full">
      <div className="mb-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Participating <span className="text-gradient-brand">Companies</span></h1>
            <p className="text-neutral-300 text-lg">Browse all internship openings and open role-specific JDs directly from each card.</p>
          </div>

          <div className="w-full lg:w-auto lg:min-w-[420px]">
            <DeadlineCountdown compact className="mx-0 w-full max-w-xl lg:ml-auto" />
          </div>
        </div>

        {/* Search and Role-Type Filters */}
        <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search companies or roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/15 bg-black/50 text-white placeholder-neutral-400 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all"
            />
          </div>

          <div className="flex w-full gap-2 md:w-auto">
            <button
              type="button"
              onClick={() => setRoleTypeFilter((prev) => (prev === "tech" ? "all" : "tech"))}
              className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                roleTypeFilter === "tech"
                  ? "border-brand/70 bg-brand/10 text-brand-light"
                  : "border-white/15 bg-black/50 text-brand-light hover:border-brand/60"
              }`}
            >
              Technical Roles
            </button>
            <button
              type="button"
              onClick={() => setRoleTypeFilter((prev) => (prev === "non-tech" ? "all" : "non-tech"))}
              className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                roleTypeFilter === "non-tech"
                  ? "border-brand/70 bg-brand/10 text-brand-light"
                  : "border-white/15 bg-black/50 text-brand-light hover:border-brand/60"
              }`}
            >
              Non-Technical Roles
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
        {filteredCompanies.map((company, i) => {
          const selectedRoleId = selectedRoleByCompany[company.id];
          const selectedRole = company.visibleRoles.find((role) => role.id === selectedRoleId) ?? company.visibleRoles[0];
          const deadlineClosed = isDeadlineClosed(company.deadline);

          return (
            <motion.article
              key={company.id}
              id={company.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="group scroll-mt-28 flex flex-col overflow-hidden rounded-3xl border border-white/12 bg-black/80 text-white shadow-[0_16px_35px_rgba(0,0,0,0.45)] transition-colors duration-300 hover:border-red-500/70"
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
                  <span className="shrink-0 rounded-full border border-brand/40 bg-brand/15 px-3 py-1 text-xs font-semibold text-white">{company.visibleRoles.length} {company.visibleRoles.length === 1 ? "Role" : "Roles"}</span>
                </div>

                <div className="mb-4 rounded-xl border border-violet-400/35 px-4 py-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-violet-200">
                    <BriefcaseBusiness className="w-3.5 h-3.5 text-violet-300" />
                    Role
                  </div>
                  <p className="mt-1 text-sm font-semibold text-violet-300">{selectedRole?.title ?? "Role to be updated"}</p>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {company.visibleRoles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => {
                        setSelectedRoleByCompany((prev) => ({ ...prev, [company.id]: role.id }));
                      }}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                      selectedRole?.id === role.id
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
                  <a
                    href={selectedRole?.jdPdf ?? "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="block"
                    aria-label={`Open ${company.name} JD PDF`}
                  >
                    <iframe
                      src={`${selectedRole?.jdPdf ?? ""}#toolbar=0&navpanes=0&scrollbar=0`}
                      title={`${company.name} JD preview`}
                      className="h-48 w-full bg-black pointer-events-none"
                    />
                  </a>
                </div>
              </div>

              <div className="px-6 pb-6 mt-auto">
                <a
                    href={selectedRole?.applyLink ?? "#"}
                    target={deadlineClosed ? undefined : "_blank"}
                    rel={deadlineClosed ? undefined : "noreferrer"}
                    onClick={(event) => {
                      if (!deadlineClosed) return;

                      event.preventDefault();
                      setClosedDeadlineToast("Deadline closed. No more applications are being accepted for this role.");
                    }}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                    aria-disabled={deadlineClosed}
                  >
                    Apply Now
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <p className="mt-2 text-sm font-semibold text-brand-light text-center">Deadline: {company.deadline ?? "To be announced"}</p>
                </div>
            </motion.article>
          );
        })}
      </div>

      {closedDeadlineToast ? (
        <div className="fixed left-1/2 top-[9.5rem] z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-xl border border-red-500/40 bg-black/95 px-4 py-3 text-center text-sm font-semibold text-red-400 shadow-2xl backdrop-blur-sm md:top-24 md:w-auto md:min-w-[360px] lg:left-auto lg:right-6 lg:translate-x-0 lg:text-left">
          {closedDeadlineToast}
        </div>
      ) : null}
    </div>
  );
}
