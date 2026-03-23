"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, MapPin, Building, Briefcase } from "lucide-react";
import { mockCompanies } from "../data/mock";

export default function CompaniesPage() {
  const [search, setSearch] = useState("");
  const [filterDomain, setFilterDomain] = useState("All");

  const domains = ["All", "Software", "AI/ML", "Finance", "Marketing", "Core"];

  const filteredCompanies = mockCompanies.filter((company) => {
    // Check search term
    const matchSearch = company.name.toLowerCase().includes(search.toLowerCase()) || company.roles.some((r) => r.title.toLowerCase().includes(search.toLowerCase()));
    
    // Check domain
    const matchDomain = filterDomain === "All" || company.roles.some((r) => r.domain.toLowerCase().includes(filterDomain.toLowerCase()));
    
    return matchSearch && matchDomain;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 w-full">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Participating <span className="text-gradient-brand">Companies</span></h1>
        <p className="text-neutral-400 text-lg">Browse available internship roles and find your perfect match.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search companies, roles, or skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-brand/50 focus:outline-none transition-colors text-white placeholder:text-neutral-500"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {domains.map((domain) => (
            <button
              key={domain}
              onClick={() => setFilterDomain(domain)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filterDomain === domain 
                ? "bg-gradient-brand text-black" 
                : "bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-800"
              }`}
            >
              {domain}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.length > 0 ? (
          filteredCompanies.map((company, i) => (
            <Link key={company.id} href={`/companies/${company.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col h-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-brand/50 transition-colors"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 shrink-0 flex items-center justify-center rounded-xl bg-neutral-800 font-bold text-2xl text-white group-hover:bg-gradient-brand/20 group-hover:text-gradient-brand transition-colors">
                    {company.logo}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">{company.name}</h2>
                    <div className="flex items-center gap-2 text-sm text-neutral-400">
                      <Building className="w-4 h-4" />
                      <span>{company.industry}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-neutral-300 leading-relaxed mb-6 flex-1">
                  {company.shortDescription}
                </p>

                <div className="space-y-3 pt-4 border-t border-neutral-800">
                  <div className="flex items-center gap-2 text-sm text-neutral-400">
                    <MapPin className="w-4 h-4 text-gradient-brand" />
                    <span>{company.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-400">
                    <Briefcase className="w-4 h-4 text-gradient-brand" />
                    <span>{company.roles.length} Open Roles</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-24 text-center">
            <p className="text-xl text-neutral-400">No companies found matching your criteria.</p>
            <button 
              onClick={() => { setSearch(""); setFilterDomain("All"); }}
              className="mt-4 text-gradient-brand hover:text-brand-light font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
