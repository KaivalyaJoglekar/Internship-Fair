"use client";

import { useParams, useRouter } from "next/navigation";
import { mockCompanies } from "../../data/mock";
import { ArrowLeft, Building2, MapPin, Calendar, CreditCard, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Company } from "../../data/mock";

export default function CompanyDetail() {
  const router = useRouter();
  const params = useParams();
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    if (params.id) {
      const found = mockCompanies.find(c => c.id === params.id);
      if (found) setCompany(found);
    }
  }, [params.id]);

  if (!company) {
    return <div className="p-24 text-center text-white">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 w-full">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Companies
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Company Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 text-center">
            <div className="w-24 h-24 mx-auto flex items-center justify-center rounded-2xl bg-neutral-800 font-bold text-4xl text-gradient-brand mb-6">
              {company.logo}
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">{company.name}</h1>
            <p className="text-gradient-brand font-medium mb-6">{company.industry}</p>
            
            <div className="space-y-4 text-sm text-neutral-300">
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-neutral-500" />
                {company.location}
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800">
            <h3 className="font-semibold text-lg text-white mb-4">About Company</h3>
            <p className="text-neutral-400 leading-relaxed text-sm">
              {company.fullDescription}
            </p>
          </div>
        </div>

        {/* Right Column: Roles */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">Available Roles ({company.roles.length})</h2>
          
          {company.roles.map((role, i) => (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              key={role.id} 
              className="p-8 rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-900/50 border border-neutral-800 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="w-6 h-6 text-gradient-brand" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{role.title}</h3>
              <p className="text-gradient-brand text-sm font-medium mb-6">{role.domain}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-neutral-500 mt-0.5" />
                  <div>
                    <p className="text-xs text-neutral-500 font-medium">Stipend</p>
                    <p className="text-sm text-neutral-200">{role.stipend}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-neutral-500 mt-0.5" />
                  <div>
                    <p className="text-xs text-neutral-500 font-medium">Location</p>
                    <p className="text-sm text-neutral-200">{role.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-neutral-500 mt-0.5" />
                  <div>
                    <p className="text-xs text-neutral-500 font-medium">Eligibility</p>
                    <p className="text-sm text-neutral-200">{role.eligibility}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-neutral-500 mt-0.5" />
                  <div>
                    <p className="text-xs text-neutral-500 font-medium">Deadline</p>
                    <p className="text-sm text-neutral-200">{role.deadline}</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-xs text-neutral-500 font-medium mb-3">Required Skills</p>
                <div className="flex flex-wrap gap-2">
                  {role.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <a 
                href={role.applyLink}
                className="inline-flex w-full sm:w-auto items-center justify-center px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 transition-colors"
              >
                Apply Now
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
