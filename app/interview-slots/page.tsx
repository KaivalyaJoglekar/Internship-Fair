"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Clock3,
  Search,
  UserRound,
} from "lucide-react";

type InterviewSlot = {
  company: string;
  role: string;
  panel: string;
  date: string;
  time: string;
};

type CompanyGroup = {
  company: string;
  slots: InterviewSlot[];
};

type SlotLookupResponse = {
  sapId: string;
  participant: {
    name: string;
    email: string;
  } | null;
  companies: CompanyGroup[];
  totalSlots: number;
};

type OnlineInterviewSlot = {
  time: string;
  name: string;
  sapId: string;
};

type OnlineScheduleResponse = {
  company: string;
  interviewDate: string;
  slots: OnlineInterviewSlot[];
  totalSlots: number;
};

const ONLINE_SCHEDULE_OPTIONS = [
  { key: "expanse", label: "Expanse Digital" },
  { key: "adbureau-online", label: "Adbureau (Online)" },
  { key: "hnt", label: "HNT Foods & Kreare" },
  { key: "stravex", label: "Stravex (Online)" },
  { key: "we-matter-round-2", label: "WE Matter - Round 2 (Online)" },
] as const;

export default function InterviewSlotsPage() {
  const [sapIdInput, setSapIdInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState<SlotLookupResponse | null>(null);
  const [onlineLoading, setOnlineLoading] = useState(false);
  const [onlineErrorMessage, setOnlineErrorMessage] = useState("");
  const [onlineSchedule, setOnlineSchedule] = useState<OnlineScheduleResponse | null>(null);
  const [activeOnlineCompanyKey, setActiveOnlineCompanyKey] = useState<string>("");

  const sapId = useMemo(() => sapIdInput.trim(), [sapIdInput]);

  const handleLookup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!sapId) {
      setErrorMessage("Please enter your SAP ID.");
      setResult(null);
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(`/api/interview-slots?sapId=${encodeURIComponent(sapId)}`);
      const data = (await response.json()) as SlotLookupResponse | { error?: string };

      if (!response.ok || !("companies" in data)) {
        const apiError = "error" in data ? data.error : undefined;
        setErrorMessage(apiError ?? "Unable to fetch interview slots right now.");
        setResult(null);
        return;
      }

      setResult(data);

      if (data.totalSlots === 0) {
        setErrorMessage("This SAP ID does not exist.");
      }
    } catch {
      setErrorMessage("Something went wrong while fetching your slots. Please try again.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleOnlineScheduleLookup = async (companyKey: string) => {
    if (activeOnlineCompanyKey === companyKey) {
      setActiveOnlineCompanyKey("");
      setOnlineSchedule(null);
      setOnlineErrorMessage("");
      return;
    }

    setOnlineLoading(true);
    setOnlineErrorMessage("");
    setActiveOnlineCompanyKey(companyKey);

    try {
      const response = await fetch(`/api/interview-slots/online?company=${encodeURIComponent(companyKey)}`);
      const data = (await response.json()) as OnlineScheduleResponse | { error?: string };

      if (!response.ok || !("slots" in data)) {
        const apiError = "error" in data ? data.error : undefined;
        setOnlineErrorMessage(apiError ?? "Unable to fetch the online schedule right now.");
        setOnlineSchedule(null);
        return;
      }

      setOnlineSchedule(data);
    } catch {
      setOnlineErrorMessage("Something went wrong while fetching the online schedule.");
      setOnlineSchedule(null);
    } finally {
      setOnlineLoading(false);
    }
  };

  return (
    <section className="relative isolate min-h-screen w-full bg-transparent px-3 py-10 sm:px-6 md:px-8 md:py-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] [background-size:64px_64px]"
      />

      <div className="mx-auto w-full max-w-6xl space-y-7 md:space-y-8">
        <header className="rounded-3xl bg-black/65 p-6 sm:p-8 md:p-10">
          <p className="mb-2 text-xs uppercase tracking-[0.24em] text-brand-light">Interview Slots</p>
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            View Your Interview Schedule
          </h1>
          
        </header>

        <form
          onSubmit={handleLookup}
          className="rounded-2xl border border-white/12 bg-black/65 p-3 sm:p-4"
        >
          <div className="flex flex-col gap-3.5 sm:flex-row">
            <label htmlFor="sap-id-input" className="sr-only">
              SAP ID
            </label>
            <input
              id="sap-id-input"
              type="text"
              value={sapIdInput}
              onChange={(event) => setSapIdInput(event.target.value)}
              placeholder="Enter your SAP ID"
              className="h-[124px] w-full flex-1 rounded-lg border border-white/25 bg-black/80 px-9 text-[1.55rem] leading-tight text-white outline-none transition-all placeholder:text-base placeholder:text-neutral-500 focus:border-brand/70 focus:ring-2 focus:ring-brand/25 sm:h-12 sm:px-4 sm:text-base sm:placeholder:text-sm"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-5 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 sm:h-12 sm:w-auto sm:px-6 sm:text-base"
            >
              <Search className="h-4 w-4" />
              {loading ? "Checking..." : "View my Slot"}
            </button>
          </div>
        </form>

        <p className="-mt-3 px-1 text-xs text-brand-light sm:text-sm">
          Note: Only applicable for Interviews held on 1st April, 2026
        </p>

        <section className="rounded-2xl border border-white/12 bg-black/65 p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-light">Online Schedules</p>
              <h2 className="mt-1 text-xl font-bold tracking-tight text-white sm:text-2xl">
                Company-Wise Online Interview Slots
              </h2>
            </div>
            <div className="grid w-full grid-cols-1 gap-2.5 sm:w-auto sm:max-w-none sm:flex sm:flex-wrap sm:justify-end">
              {ONLINE_SCHEDULE_OPTIONS.map((option) => {
                const isActive = activeOnlineCompanyKey === option.key;

                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => handleOnlineScheduleLookup(option.key)}
                    disabled={onlineLoading}
                    className={`inline-flex min-h-11 min-w-0 items-center justify-center rounded-xl border px-3 py-2 text-center text-xs font-semibold leading-snug transition-all disabled:cursor-not-allowed disabled:opacity-70 sm:min-h-0 sm:px-5 sm:text-sm ${
                      isActive
                        ? "border-red-400 text-red-300 ring-1 ring-red-400/40"
                        : "border-red-500/80 bg-transparent text-red-400 hover:border-red-400 hover:text-red-300"
                    }`}
                  >
                    {onlineLoading && isActive ? "Loading..." : option.label}
                  </button>
                );
              })}
            </div>
          </div>

          {onlineErrorMessage ? (
            <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {onlineErrorMessage}
            </p>
          ) : null}

          {onlineSchedule ? (
            <div className="mt-5 rounded-xl border border-white/12 bg-black/70">
              <div className="border-b border-white/10 px-3 py-3 text-sm font-medium text-neutral-200 sm:px-4">
                <span className="wrap-break-word">
                  {onlineSchedule.company} - {onlineSchedule.totalSlots} candidate
                  {onlineSchedule.totalSlots > 1 ? "s" : ""}
                </span>
              </div>
              <div className="border-b border-white/10 px-3 py-3 sm:px-4">
                <p className="mt-1 text-lg font-bold tracking-tight text-brand-light sm:text-xl md:text-2xl">
                  Interview Date: {onlineSchedule.interviewDate}
                </p>
              </div>

              {/* Mobile: stacked cards */}
              <ul className="divide-y divide-white/10 border-t border-white/10 sm:hidden">
                {onlineSchedule.slots.map((slot, index) => (
                  <li key={`${slot.sapId}-${slot.time}-${index}-m`} className="px-3 py-3">
                    <div className="flex items-start justify-between gap-2 text-xs text-neutral-400">
                      <span className="font-semibold text-neutral-300">#{index + 1}</span>
                      <span className="shrink-0 font-medium text-white">{slot.time}</span>
                    </div>
                    <p className="mt-2 wrap-break-word text-sm font-medium text-neutral-100">{slot.name}</p>
                    <p className="mt-1 font-mono text-xs text-neutral-300">{slot.sapId}</p>
                  </li>
                ))}
              </ul>

              {/* sm+: table */}
              <div className="hidden overflow-x-auto border-t border-white/10 sm:block">
                <table className="min-w-full text-left text-xs text-neutral-200 sm:text-sm">
                  <thead className="bg-white/5 text-[10px] uppercase tracking-[0.12em] text-neutral-400 sm:text-xs sm:tracking-[0.16em]">
                    <tr>
                      <th className="px-2 py-2.5 font-semibold sm:px-4 sm:py-3">No.</th>
                      <th className="px-2 py-2.5 font-semibold sm:px-4 sm:py-3">Time</th>
                      <th className="px-2 py-2.5 font-semibold sm:px-4 sm:py-3">Name</th>
                      <th className="px-2 py-2.5 font-semibold sm:px-4 sm:py-3">SAP ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {onlineSchedule.slots.map((slot, index) => (
                      <tr key={`${slot.sapId}-${slot.time}-${index}`} className="border-t border-white/10">
                        <td className="px-2 py-2.5 align-top text-neutral-300 sm:px-4 sm:py-3">{index + 1}</td>
                        <td className="px-2 py-2.5 align-top font-medium whitespace-nowrap text-white sm:px-4 sm:py-3">
                          {slot.time}
                        </td>
                        <td className="max-w-[min(12rem,40vw)] px-2 py-2.5 align-top wrap-break-word sm:max-w-none sm:px-4 sm:py-3">
                          {slot.name}
                        </td>
                        <td className="px-2 py-2.5 align-top font-mono text-[11px] text-neutral-100 sm:px-4 sm:py-3 sm:text-sm">
                          {slot.sapId}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p suppressHydrationWarning className="mt-4 text-sm text-neutral-400">
              Click on a company button to view the online interview schedule in a table.
            </p>
          )}
        </section>

        {errorMessage ? (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {errorMessage}
          </p>
        ) : null}

        {result && result.totalSlots > 0 ? (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-[1.6fr_1fr]">
              <div className="rounded-2xl border border-white/12 bg-black/70 p-5 sm:p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Participant</p>
                <div className="mt-3 flex items-start gap-3">
                  <span className="mt-0.5 rounded-xl border border-white/15 bg-black/70 p-2">
                    <UserRound className="h-4 w-4 text-brand-light" />
                  </span>
                  <div>
                    <p className="text-lg font-semibold text-white">{result.participant?.name}</p>
                    <p className="mt-1 break-all text-sm text-neutral-300">{result.participant?.email}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/12 bg-black/70 p-5 sm:p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Summary</p>
                <p className="mt-3 text-3xl font-bold text-white">{result.totalSlots}</p>
                <p className="mt-1 text-sm text-neutral-300">
                  Total slot{result.totalSlots > 1 ? "s" : ""} assigned
                </p>
                <p className="mt-3 text-xs text-neutral-500">Venue: Big Seminar Hall</p>
              </div>
            </div>

            <div className="space-y-4">
              {result.companies.map((companyGroup) => (
                <article
                  key={companyGroup.company}
                  className="overflow-hidden rounded-2xl border border-white/12 bg-black/70"
                >
                  <div className="border-b border-white/10 px-4 py-4 sm:px-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <Building2 className="h-5 w-5 text-brand-light" />
                        <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                          {companyGroup.company}
                        </h2>
                      </div>
                      <span className="rounded-full border border-brand/35 bg-brand/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-brand-light">
                        {companyGroup.slots.length} Slot{companyGroup.slots.length > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
                    {companyGroup.slots.map((slot, index) => (
                      <div
                        key={`${slot.company}-${slot.role}-${slot.panel}-${slot.date}-${slot.time}-${index}`}
                        className="rounded-xl border border-white/12 bg-black/80 p-4"
                      >
                        <div className="mb-3 flex items-start gap-2.5">
                          <BriefcaseBusiness className="mt-0.5 h-4 w-4 shrink-0 text-brand-light" />
                          <p className="text-sm font-semibold leading-6 text-white sm:text-base">
                            {slot.role || "Interview Round"}
                          </p>
                        </div>

                        <div className="space-y-1.5 text-sm text-neutral-300">
                          {slot.panel ? (
                            <p>
                              <span className="font-medium text-neutral-400">Panel:</span> {slot.panel}
                            </p>
                          ) : null}
                          {slot.date ? (
                            <p className="flex items-center gap-2">
                              <CalendarDays className="h-3.5 w-3.5 text-brand-light/90" />
                              <span>{slot.date}</span>
                            </p>
                          ) : null}
                          <p className="flex items-center gap-2">
                            <Clock3 className="h-3.5 w-3.5 text-brand-light/90" />
                            <span>{slot.time}</span>
                          </p>
                          <p className="pt-1 text-neutral-400">Venue: Big Seminar Hall</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}

        <section className="rounded-2xl border border-white/12 bg-black/65 p-5 sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-light">Please Note</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-neutral-200 sm:text-base">
            <li className="flex gap-3">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-light" />
              <span>
                Interview slots for Nexaflo Automations have been assigned only to candidates shortlisted by the company.
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-light" />
              <span>Interviews for HNT Foods and Kreare will be conducted in a single panel.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-light" />
              <span>
                Interviews for RUDRA Cybersecurity, Stravex, and Paryatech will be scheduled online later this week.
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-light" />
              <span>Florencia Paris will reach out directly to shortlisted candidates.</span>
            </li>
          </ul>
        </section>

        <div className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight text-brand-light sm:text-2xl">Guidelines</h2>

          <section className="rounded-2xl border border-white/12 bg-black/65 p-5 sm:p-6">
            <div className="space-y-5 text-base leading-7 text-white sm:text-lg">
            <div>
              <h3 className="text-base font-semibold uppercase tracking-[0.16em] text-white sm:text-lg">
                General Instructions
              </h3>
              <ul className="mt-3 space-y-2.5">
                <li className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-light" />
                  <span>
                    Adhere strictly to your allotted time slot. Changes will not be entertained except in cases of
                    genuine emergencies. Lecture clashes will not be considered.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-light" />
                  <span>Be available 10 minutes before and after your scheduled interview time.</span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-light" />
                  <span>Carry 2 copies of your CV.</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold uppercase tracking-[0.16em] text-white sm:text-lg">
                Additional Requirements for Galaxy Home Automations Applicants
              </h3>
              <ul className="mt-3 space-y-2.5">
                <li className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-light" />
                  <span>Carry a printed copy of the job description along with your CV.</span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-light" />
                  <span>Arrive 15 minutes prior to your allotted time.</span>
                </li>
              </ul>
            </div>

            <p className="font-semibold text-brand-light">Dress Code: Strictly Formals Only</p>
              <p className="text-white">We wish all candidates the very best!</p>
            
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
