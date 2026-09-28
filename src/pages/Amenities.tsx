import { motion } from 'framer-motion';
import { Wifi, Wind, Tv, Headphones, Phone, User2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { heroImages, amenities as amenitiesData, hotelInfo } from '@/lib/data';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

// Main Amenities Page
export default function AmenitiesPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden bg-foreground/10">
        <div className="absolute inset-0">
          <img
            src={heroImages.amenities}
            alt="Luxury amenities"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/40 to-transparent" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center section-container">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent font-medium text-sm tracking-wider uppercase mb-4"
          >
            Experience True Luxury
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl text-primary-foreground leading-tight max-w-4xl"
          >
            Curated for <span className="italic text-accent">Your Comfort</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-primary-foreground/90 text-lg md:text-xl mt-6 max-w-2xl"
          >
            Every detail at Viha Home Stay is thoughtfully chosen to ensure a restful, 
            premium experience that feels less like a hotel and more like a sanctuary.
          </motion.p>
        </div>
      </section>

      {/* Rest & Rejuvenation Section */}
      <section className="relative py-24 bg-background">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp} className="space-y-8">
              <div>
                <span className="text-accent font-medium text-sm tracking-wider uppercase">
                  Rest & Rejuvenation
                </span>
                <h2 className="font-serif text-4xl md:text-5xl text-foreground mt-2 mb-4">
                  Sanctuary & Sleep
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Experience the pinnacle of relaxation with our thoughtfully designed sleep environment. 
                  We prioritize silence, softness, and serenity above all else.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: 'Premium Linens',
                    description: '500 thread-count Egyptian cotton sheets for a silky, breathable sleep experience.'
                  },
                  {
                    title: 'Sound proofed',
                    description: 'Thick walls and double glazed windows ensure undisturbed peace.'
                  },
                  {
                    title: 'Blackout Curtains',
                    description: 'High-density curtains guarantee total darkness for deep sleep.'
                  }
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeInUp} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded bg-accent/10">
                        <span className="text-accent text-sm font-semibold">✓</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="rounded-2xl overflow-hidden shadow-2xl">
              <img src={heroImages.rooms} alt="Bedroom sanctuary" className="w-full h-96 object-cover" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Modern Comforts Section */}
      <section className="py-24 bg-secondary">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp} className="rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1">
              <img src={heroImages.gallery} alt="Modern workspace" className="w-full h-96 object-cover" />
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-8 order-1 lg:order-2">
              <div>
                <span className="text-accent font-medium text-sm tracking-wider uppercase">
                  Connectivity & Ease
                </span>
                <h2 className="font-serif text-4xl md:text-5xl text-foreground mt-2 mb-4">
                  Modern Comforts
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Stay connected with the world or tune out completely with our state-of-the-art 
                  technological amenities designed for the modern traveler.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: Wifi,
                    title: 'High-Speed WiFi',
                    description: 'Enterprise-grade fiber internet perfect for streaming or remote work.'
                  },
                  {
                    icon: Wind,
                    title: 'Climate Control',
                    description: 'Whisper-quiet split AC unit providing instant cooling and humidification.'
                  },
                  {
                    icon: Tv,
                    title: 'Smart Entertainment',
                    description: '55" Smart TV with pre-loaded streaming apps (Netflix, Prime).'
                  }
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={i} variants={fadeInUp} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Exceptional Hospitality Section */}
      <section className="relative py-24 bg-background">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp} className="space-y-8">
              <div>
                <span className="text-accent font-medium text-sm tracking-wider uppercase">
                  Exceptional Hospitality
                </span>
                <h2 className="font-serif text-4xl md:text-5xl text-foreground mt-2 mb-4">
                  Our Service Excellence
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  We believe luxury is in the service. Our dedicated team is on hand to ensure your stay 
                  in Tirupati is seamless and memorable.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: Phone,
                    title: 'Responsive Host',
                    description: '24/7 guest concierge for any inquiry, from travel tips to local recommendations.'
                  },
                  {
                    icon: MapPin,
                    title: 'Curated Local Guide',
                    description: 'Expert suggestions for temples, restaurants, and hidden gems to explore.'
                  },
                  {
                    icon: User2,
                    title: 'Daily Housekeeping',
                    description: 'Optional daily service to keep your sanctuary pristine and comfortable.'
                  }
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={i} variants={fadeInUp} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="rounded-2xl overflow-hidden shadow-2xl">
              <img src={heroImages.main} alt="Hospitality service" className="w-full h-96 object-cover" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-secondary">
        <div className="section-container text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
                Ready to Experience The Difference?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Book your stay at Viha Home Stay and discover why our guests choose comfort and culture.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex justify-center gap-4">
              <Link to="/booking">
                <Button className="btn-gold text-primary text-base px-8 font-medium">
                  Check Availability
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
