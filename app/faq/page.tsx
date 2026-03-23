import { ChevronDown } from "lucide-react";

export default function FAQ() {
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

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 w-full">
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked <span className="text-gradient-brand">Questions</span></h1>
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
    </div>
  );
}
