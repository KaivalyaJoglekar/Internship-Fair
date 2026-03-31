"use client";

type MaybePerformance = Performance & {
  clearMarks?: (markName?: string) => void;
  clearMeasures?: (measureName?: string) => void;
};

if (typeof window !== "undefined") {
  const perf = window.performance as MaybePerformance | undefined;

  if (perf) {
    if (typeof perf.clearMarks !== "function") {
      perf.clearMarks = () => {};
    }

    if (typeof perf.clearMeasures !== "function") {
      perf.clearMeasures = () => {};
    }
  }
}

export default function PerformancePolyfills() {
  return null;
}
