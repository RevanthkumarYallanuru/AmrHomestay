import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wifi, Wind, Utensils, Car, MapPin, Star, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  heroImages, 
  roomTypes, 
  hotelInfo, 
  testimonials as testimonialsData,
  amenities as amenitiesData,
  getFeaturedRooms 
} from '@/lib/data';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

// Hero Section
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
        <img
          src={heroImages.main}
          alt="Luxury hotel room"
          className="w-full h-full object-cover"
        />
        {/* Elegant dark forest green gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2e1a]/90 via-[#1a2e1a]/60 to-[#1a2e1a]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1a]/70 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex items-center section-container"
      >
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-5 py-2.5 bg-[#b8860b]/20 backdrop-blur-sm rounded-full text-[#b8860b] text-sm font-medium mb-6 border border-[#b8860b]/30"
          >
            LUXURY HOME STAY IN TIRUPATI
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-6"
          >
            Premium <span className="italic text-[#b8860b]">Hotel Accommodation</span> in Tirupati
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-white/85 text-lg md:text-xl mb-8 max-w-xl leading-relaxed"
          >
            Discover luxury rooms and world-class hospitality at Viha Home Stay. 
            Your perfect sanctuary in the spiritual capital of Tirupati.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/booking">
              <Button size="lg" className="bg-[#b8860b] hover:bg-[#a07608] text-white gap-2 text-base px-8 rounded-full shadow-lg hover:shadow-xl transition-all">
                Book Your Stay
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/rooms">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 bg-white/90 text-[#1a2e1a] hover:bg-white hover:text-[#1a2e1a] gap-2 rounded-full backdrop-blur-sm font-medium"
              >
                Explore Rooms
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// About Section
function AboutSection() {
  return (
    <section className="relative py-24 bg-secondary">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={fadeInUp} className="space-y-6">
            <span className="text-accent font-medium text-sm tracking-wider uppercase">
              About Our Hotel
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
              Exceptional Home Stay in Tirupati
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Viha Home Stay offers premium accommodation in Tirupati with a perfect blend of 
              modern luxury and authentic hospitality. Our carefully designed rooms feature 
              world-class amenities, providing the ideal base for exploring the spiritual capital 
              or enjoying a peaceful retreat.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground">4.9 Rating</p>
                  <p className="text-sm text-muted-foreground">Guest Reviews</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Tirupati Hotel</p>
                  <p className="text-sm text-muted-foreground">Prime Location</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img
                src={heroImages.rooms}
                alt="Suite living area"
                className="rounded-2xl shadow-heavy w-full h-64 object-cover"
              />
              <img
                src={heroImages.amenities}
                alt="Deluxe room"
                className="rounded-2xl shadow-heavy w-full h-64 object-cover mt-8"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-heavy max-w-xs">
              <p className="font-serif text-lg text-foreground italic">
                "Best Hospitality Experience"
              </p>
              <p className="text-sm text-muted-foreground mt-2">24/7 Guest Support Available</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    { icon: Wifi, title: 'High-Speed WiFi', description: 'Ultra-fast fiber connection' },
    { icon: Wind, title: 'Climate Control', description: 'Centralized AC & heating' },
    { icon: Utensils, title: 'Gourmet Dining', description: 'Authentic South Indian cuisine' },
    { icon: Car, title: 'Valet Parking', description: 'Complimentary for guests' },
  ];

  return (
    <section className="relative py-24">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="text-accent font-medium text-sm tracking-wider uppercase">
            The Heritage Beliefs
          </motion.span>
          <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl text-foreground mt-4">
            Tradition Meets Modern Comfort
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="card-premium p-6 text-center group"
            >
              <div className="w-14 h-14 mx-auto rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-medium text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Rooms Preview Section
function RoomsPreviewSection() {
  // Use featured rooms from centralized data
  const rooms = getFeaturedRooms().slice(0, 3).map(room => ({
    id: room.id,
    name: room.name,
    price: room.price,
    image: room.thumbnail,
    type: room.type,
  }));

  return (
    <section className="relative py-24 bg-secondary">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <motion.span variants={fadeInUp} className="text-accent font-medium text-sm tracking-wider uppercase">
              The Art of Stay
            </motion.span>
            <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl text-foreground mt-4">
              The Rooms Collection
            </motion.h2>
          </div>
          <motion.div variants={fadeInUp}>
            <Link to="/rooms">
              <Button variant="outline" className="gap-2">
                View All Rooms
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {rooms.map((room) => (
            <motion.div
              key={room.id}
              variants={fadeInUp}
              className="card-premium overflow-hidden group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-card/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                    {room.type}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-medium text-foreground mb-2">{room.name}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">
                    <span className="text-2xl font-serif text-accent">₹{room.price.toLocaleString()}</span>
                    <span className="text-sm">/night</span>
                  </p>
                  <Link to={`/rooms/${room.id}`}>
                    <Button size="sm" variant="ghost" className="text-accent hover:text-accent/80">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  // Use testimonials from centralized data
  const testimonials = testimonialsData.map(t => ({
    name: t.name,
    role: t.room,
    rating: t.rating,
    comment: t.comment,
  }));

  return (
    <section className="relative py-24">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="text-accent font-medium text-sm tracking-wider uppercase">
            Guest Experience
          </motion.span>
          <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl text-foreground mt-4">
            Stories from Our Guests
          </motion.h2>
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-2 mt-4">
            <span className="font-serif text-5xl text-accent">5.0</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="card-premium p-8"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6 italic">
                "{testimonial.comment}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="relative py-24 bg-accent">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.span variants={fadeInUp} className="text-foreground font-medium text-sm tracking-wider uppercase">
            Begin Your Journey
          </motion.span>
          <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mt-4 mb-6">
            Ready to experience{' '}
            <span className="italic text-primary">serenity?</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-foreground/70 text-lg max-w-2xl mx-auto mb-10">
            Book your stay at Viha Home Stay today. A sanctuary of peace awaits you 
            in the heart of the spiritual capital.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button size="lg" className="btn-gold gap-2 text-base px-8 text-black">
                Book Your Stay
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-foreground/30 text-foreground hover:bg-foreground/10"
              >
                Contact Host
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Main Index Page
export default function Index() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <RoomsPreviewSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
