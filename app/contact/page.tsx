export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 w-full">
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in <span className="text-gradient-brand">Touch</span></h1>
        <p className="text-neutral-400 text-lg">Need help with your application? Our support team is here for you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800">
            <h3 className="text-xl font-bold text-white mb-2">Helpdesk Support</h3>
            <p className="text-neutral-400 mb-4">Available Mon-Fri, 9am - 5pm.</p>
            <p className="text-gradient-brand font-medium">trc@mpstme.edu</p>
          </div>
          <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800">
            <h3 className="text-xl font-bold text-white mb-2">Campus Office</h3>
            <p className="text-neutral-400">
              Placement Cell, Block A<br/>
              University Campus<br/>
              City, State 12345
            </p>
          </div>
        </div>

        <form className="space-y-4 p-8 rounded-3xl bg-neutral-900 border border-neutral-800">
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Name</label>
            <input type="text" className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-brand/50 focus:outline-none text-white" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Email</label>
            <input type="email" className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-brand/50 focus:outline-none text-white" placeholder="john@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Message</label>
            <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-brand/50 focus:outline-none text-white" placeholder="How can we help?"></textarea>
          </div>
          <button type="button" className="w-full px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 transition-colors">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
