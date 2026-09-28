import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { hotelInfo } from '@/lib/data';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function ContactPage() {
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero */}
      <section className="bg-secondary py-16">
        <div className="section-container text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent font-medium text-sm tracking-wider uppercase"
          >
            GET IN TOUCH
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mt-4 mb-6"
          >
            Contact {hotelInfo.fullName}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            We'd love to hear from you. Get in touch with us for reservations, inquiries, or feedback.
          </motion.p>
        </div>
      </section>
      {/* Contact Details & Map */}
      <section className="relative py-16 lg:py-24">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Contact Information */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.div variants={fadeInUp} className="mb-12">
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-2">Contact Information</h2>
                <p className="text-muted-foreground">Reach out to us through any of these methods.</p>
              </motion.div>

              <div className="space-y-8">
                {/* Address */}
                <motion.div variants={fadeInUp} className="card-premium p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-foreground mb-2">Address</h3>
                      <p className="text-muted-foreground mb-2">
                        {hotelInfo.fullName}<br />
                        {hotelInfo.address.line1}<br />
                        {hotelInfo.address.city}, {hotelInfo.address.state} {hotelInfo.address.pincode}<br />
                        {hotelInfo.address.country}
                      </p>
                      <a 
                        href={hotelInfo.address.googleMapsUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent/80 text-sm font-medium transition-colors"
                      >
                        View on Google Maps →
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div variants={fadeInUp} className="card-premium p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-foreground mb-2">Phone</h3>
                      <p className="text-muted-foreground mb-2">
                        <a href={`tel:${hotelInfo.contact.phone.replace(/\s/g, '')}`} className="hover:text-accent transition-colors">
                          {hotelInfo.contact.phone}
                        </a>
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Available 24/7 for reservations and inquiries
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* WhatsApp */}
                <motion.div variants={fadeInUp} className="card-premium p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-foreground mb-2">WhatsApp</h3>
                      <p className="text-muted-foreground mb-3">
                        Chat with us directly on WhatsApp for quick responses
                      </p>
                      <a 
                        href={`https://wa.me/${hotelInfo.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent/80 text-sm font-medium transition-colors"
                      >
                        Message on WhatsApp →
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div variants={fadeInUp} className="card-premium p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-foreground mb-2">Email</h3>
                      <p className="text-muted-foreground mb-2">
                        <a href={`mailto:${hotelInfo.contact.email}`} className="hover:text-accent transition-colors">
                          {hotelInfo.contact.email}
                        </a>
                      </p>
                      <p className="text-muted-foreground text-sm">
                        We respond to emails within 2 hours during business hours
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Hours */}
                <motion.div variants={fadeInUp} className="card-premium p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-foreground mb-2">Hours</h3>
                      <p className="text-muted-foreground">
                        Reservations: {hotelInfo.timings.reception}<br />
                        Front Desk: {hotelInfo.timings.reception}<br />
                        Check-in: {hotelInfo.timings.checkIn}<br />
                        Check-out: {hotelInfo.timings.checkOut}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="card-premium overflow-hidden"
            >
              <div className="w-full h-96 lg:h-full">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.42987742772!2d79.43766047802124!3d13.631594752578025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4b70f16c10f7%3A0xdea1f2acac11987b!2sViha%20Home%20Stay!5e0!3m2!1sen!2sin!4v1768847945231!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Contact Form Section */}
      <section className="relative py-20 bg-secondary\">
        <div className="section-container max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Send us a Message</h2>
            <p className="text-muted-foreground">
              Have a specific question? Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="card-premium p-8 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              toast({
                title: "Message Sent!",
                description: "Thank you for reaching out. We'll contact you soon.",
              });
              (e.target as HTMLFormElement).reset();
            }}
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
              <input
                type="tel"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="+91 9876543210"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Message</label>
              <textarea
                required
                rows={5}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                placeholder="Your message..."
              ></textarea>
            </div>

            <Button type="submit" className="btn-gold w-full text-black">
              Send Message
            </Button>
          </motion.form>
        </div>
      </section>
    </div>
  );
}
