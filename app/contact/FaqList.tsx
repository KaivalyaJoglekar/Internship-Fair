import { ChevronDown } from "lucide-react";
import { faqs } from "./content";

type FaqListProps = {
  itemClassName?: string;
};

export default function FaqList({
  itemClassName = "group p-6 md:p-7 bg-transparent border border-white/10 rounded-2xl hover:border-brand/40 hover:bg-white/[0.02] transition-all duration-300 [&_summary::-webkit-details-marker]:hidden",
}: FaqListProps) {
  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <details key={faq.q} className={itemClassName}>
          <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold text-base md:text-lg text-white">
            <span>{faq.q}</span>
            <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/15 bg-transparent transition-all group-open:rotate-180 group-open:border-brand/40 group-open:text-brand-light">
              <ChevronDown className="w-4 h-4" />
            </span>
          </summary>
          <p className="text-neutral-300 mt-4 leading-relaxed text-sm md:text-base">{faq.a}</p>
        </details>
      ))}
    </div>
  );
}
