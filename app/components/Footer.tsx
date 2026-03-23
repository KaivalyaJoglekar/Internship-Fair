export default function Footer() {
  return (
    <footer className="w-full glass border-t border-neutral-800 py-12 px-6 mt-32">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between opacity-80 gap-6 text-sm text-neutral-400">
        <div className="flex flex-col md:flex-row gap-8 text-center md:text-left">
          <p>© 2026 MPSTME Technical and Research Cell. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-6">
          <a href="/faq" className="hover:text-gradient-brand transition-colors">FAQ</a>
          <a href="/contact" className="hover:text-gradient-brand transition-colors">Support</a>
          <a href="/terms" className="hover:text-gradient-brand transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
