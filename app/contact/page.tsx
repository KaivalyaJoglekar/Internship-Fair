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
        
      </div>
    </div>
  );
}
