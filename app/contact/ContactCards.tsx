import { Instagram, Linkedin, MessageCircle } from "lucide-react";
import { contactInfo } from "./content";

type ContactCardsProps = {
  cardClassName?: string;
};

const socialIconMap = {
  Instagram,
  LinkedIn: Linkedin,
  WhatsApp: MessageCircle,
} as const;

export default function ContactCards({
  cardClassName = "p-8 rounded-3xl bg-transparent border border-white/10 backdrop-blur-sm hover:border-brand/35 hover:bg-white/[0.02] transition-all duration-300",
}: ContactCardsProps) {
  return (
    <div className="space-y-6">
      <div className={cardClassName}>
        <p className="text-xs uppercase tracking-[0.2em] text-brand-light/85 mb-3">Contact Person</p>

        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-1 tracking-tight">{contactInfo.secretaryName}</h3>
          <p className="text-neutral-300 mb-2">{contactInfo.secretaryPosition}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contactInfo.secretaryEmail}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-transparent px-4 py-2 text-sm font-semibold text-white hover:border-brand/40 hover:text-brand-light hover:bg-white/[0.03] transition-colors"
            >
              {contactInfo.secretaryEmail}
            </a>
            <a
              href={contactInfo.secretaryWhatsApp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-transparent px-4 py-2 text-sm font-semibold text-white hover:border-brand/40 hover:text-brand-light hover:bg-white/[0.03] transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4">
          <h3 className="text-xl font-bold text-white mb-1 tracking-tight">Soham Sawant</h3>
          <p className="text-neutral-300 mb-2">Joint Secretary, Technical and Research Cell</p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=soham.sawant27@nmims.in"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-transparent px-4 py-2 text-sm font-semibold text-white hover:border-brand/40 hover:text-brand-light hover:bg-white/[0.03] transition-colors"
            >
              soham.sawant27@nmims.in
            </a>
            <a
              href="https://wa.me/9082474542"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-transparent px-4 py-2 text-sm font-semibold text-white hover:border-brand/40 hover:text-brand-light hover:bg-white/[0.03] transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className={cardClassName}>
        <p className="text-xs uppercase tracking-[0.2em] text-brand-light/85 mb-3">Connect</p>
        <h3 className="text-xl font-bold text-white mb-4 tracking-tight">{contactInfo.socialsTitle}</h3>
        <div className="flex flex-wrap gap-3 md:gap-4">
          {contactInfo.socials.map((social) => {
            const Icon = socialIconMap[social.label as keyof typeof socialIconMap] ?? MessageCircle;

            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                title={social.label}
                aria-label={social.label}
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-transparent border border-white/10 text-neutral-100 hover:text-brand-light hover:border-brand/45 hover:bg-brand/10 transition-all duration-300"
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
                <span className="sr-only">{social.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
