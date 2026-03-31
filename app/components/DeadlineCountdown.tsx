"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Clock3 } from "lucide-react";
import { cn } from "../utils/cn";

type CountdownState = {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type DeadlineTarget = {
  target: Date | null;
  label: string;
};

const DAY = 24 * 60 * 60 * 1000;
const HOUR = 60 * 60 * 1000;
const MINUTE = 60 * 1000;
const SECOND = 1000;

const getDayOrdinal = (day: number): string => {
  if (day % 100 >= 11 && day % 100 <= 13) return `${day}th`;

  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
};

const formatDeadlineLabel = (date: Date): string => {
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = getDayOrdinal(date.getDate());
  const year = date.getFullYear();
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${day} ${month} ${year}, ${time}`;
};

const getActiveDeadline = (): DeadlineTarget => {
  const now = new Date();

  // Fixed, one-time schedule for March 31, 2026. This intentionally does not roll over to the next day.
  const nexafloDeadline = new Date(2026, 2, 31, 12, 0, 0, 0);
  const sevenPmDeadline = new Date(2026, 2, 31, 19, 0, 0, 0);

  if (now < nexafloDeadline) {
    return {
      target: nexafloDeadline,
      label: `Nexaflo Deadline: ${formatDeadlineLabel(nexafloDeadline)}`,
    };
  }

  if (now < sevenPmDeadline) {
    return {
      target: sevenPmDeadline,
      label: `ParyaTech, Adbureau & Halewood Deadline: ${formatDeadlineLabel(sevenPmDeadline)}`,
    };
  }

  return {
    target: null,
    label: "All Deadlines Closed",
  };
};

const getRemainingTime = (target: Date | null): CountdownState => {
  if (!target) {
    return {
      totalMs: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const diff = Math.max(target.getTime() - Date.now(), 0);

  const days = Math.floor(diff / DAY);
  const hours = Math.floor((diff % DAY) / HOUR);
  const minutes = Math.floor((diff % HOUR) / MINUTE);
  const seconds = Math.floor((diff % MINUTE) / SECOND);

  return {
    totalMs: diff,
    days,
    hours,
    minutes,
    seconds,
  };
};

const padTime = (value: number) => value.toString().padStart(2, "0");

type DeadlineCountdownProps = {
  className?: string;
  compact?: boolean;
};

export default function DeadlineCountdown({ className, compact = false }: DeadlineCountdownProps) {
  const [remaining, setRemaining] = useState<CountdownState>({
    totalMs: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [deadlineLabel, setDeadlineLabel] = useState("All Deadlines Closed");

  const refreshCountdown = useMemo(
    () => () => {
      const deadline = getActiveDeadline();
      setDeadlineLabel(deadline.label);
      setRemaining(getRemainingTime(deadline.target));
    },
    []
  );

  useEffect(() => {
    refreshCountdown();

    const interval = setInterval(refreshCountdown, 1000);

    return () => clearInterval(interval);
  }, [refreshCountdown]);

  const timeBlocks = [
    { label: "Days", value: padTime(remaining.days) },
    { label: "Hrs", value: padTime(remaining.hours) },
    { label: "Min", value: padTime(remaining.minutes) },
    { label: "Sec", value: padTime(remaining.seconds) },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.18 }}
      className={cn("mx-auto w-full max-w-3xl", className)}
    >
      <div className={cn("rounded-2xl border border-white/15 bg-black/45 backdrop-blur-sm", compact ? "p-3.5 sm:p-4.5" : "p-4 sm:p-5")}>
        <div className={cn("flex items-center justify-center gap-2 font-semibold uppercase tracking-[0.18em] text-neutral-200 whitespace-nowrap", compact ? "text-[9px] sm:text-[10px]" : "text-[10px] sm:text-xs")}>
          <Clock3 className="h-4 w-4 text-brand-light" />
          {deadlineLabel}
        </div>

        <div className={cn(compact ? "mt-3.5 grid grid-cols-4 gap-2" : "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4")}>
          {timeBlocks.map((item) => (
            <div key={item.label}>
              <div
                className={cn("rounded-xl border border-white/10 bg-black/55 text-center", compact ? "px-2 py-3" : "px-3 py-4")}
              >
                <p className={cn("font-bold leading-none tracking-tight text-brand-light", compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl")}>
                  {item.value}
                </p>
                <p className={cn("font-semibold uppercase tracking-[0.2em] text-neutral-400", compact ? "mt-1.5 text-[10px] sm:text-[10px]" : "mt-2 text-[10px] sm:text-xs")}>
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {remaining.totalMs === 0 ? (
          <p className="mt-4 text-center text-sm font-semibold text-brand-light">
            Deadline reached.
          </p>
        ) : null}
      </div>
    </motion.div>
  );
}