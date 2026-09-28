import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Phone, 
  Clock, 
  Star,
  Wifi,
  Copy,
  Check,
  Navigation,
  Sparkles,
  Mail,
  FileText,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { bookingStorage } from '@/lib/storage';
import { initializeSeedData } from '@/lib/seed-data';
import { format } from 'date-fns';
import roomDeluxe from '@/assets/room-deluxe.jpg';
import roomSuite from '@/assets/room-suite.jpg';
import roomFamily from '@/assets/room-family.jpg';
import heroImage from '@/assets/hero-bedroom.jpg';

// Initialize seed data
initializeSeedData();

// Curated places data
const curatedPlaces = [
  {
    id: 1,
    name: 'Sri Kapileswara Swamy Temple',
    description: 'A sacred waterfall temple dedicated to Lord Shiva, nestled at the foot of the Tirumala hills.',
    distance: '12 km away',
    image: roomSuite,
    type: 'temple',
  },
  {
    id: 2,
    name: 'Talakona Waterfalls',
    description: 'The highest waterfall in Andhra Pradesh. Perfect for a day trip of nature walks and canopy visuals.',
    distance: '45 km away',
    image: roomFamily,
    type: 'nature',
  },
];

const diningRecommendation = {
  name: 'Agraharam Dining',
  description: 'Authentic pure-vegetarian Satvik cuisine. We recommend the special Thali for lunch.',
  rating: 4.9,
  image: heroImage,
};

// Host data
const hostInfo = {
  name: 'Ananya Reddy',
  status: 'Online now',
  message: '"Namaste! I\'m here to ensure your pilgrimage and stay are seamless. Reach out for anything."',
  phone: '+91 7207357312',
  whatsapp: '917207357312',
  email: 'host@vihahomestay.com',
};

export default function GuestDashboard() {
  const { user } = useAuth();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const bookings = useMemo(() => {
    if (!user) return [];
    return bookingStorage.getByGuestId(user.id);
  }, [user]);

  const currentStay = useMemo(() => {
    return bookings.find(b => b.status === 'checked-in');
  }, [bookings]);

  const upcomingTrips = useMemo(() => {
    return bookings
      .filter(b => b.status === 'confirmed' || b.status === 'pending')
      .slice(0, 2);
  }, [bookings]);

  const pastTrips = useMemo(() => {
    return bookings.filter(b => b.status === 'checked-out').slice(0, 2);
  }, [bookings]);

  // WiFi credentials for current stay
  const wifiCredentials = {
    ssid: 'Viha_Guest_5G',
    password: 'Serenity2024',
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hi, I need assistance with my stay at Viha Home Stay.');
    window.open(`https://wa.me/${hostInfo.whatsapp}?text=${message}`, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:${hostInfo.phone}`, '_blank');
  };

  const handleEmail = () => {
    window.open(`mailto:${hostInfo.email}`, '_blank');
  };

  const handleGetDirections = () => {
    window.open('https://maps.google.com/?q=Viha+Estate+Tirupati+AP', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-serif text-3xl lg:text-4xl text-[#1a2e1a] font-semibold">
            Welcome back, {user?.name?.split(' ')[0] || 'Guest'}
          </h1>
          <p className="text-[#6b7c6b] mt-2 text-base">
            We hope you are finding tranquility in your stay at Viha.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content - Left 2 Columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Current Stay Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="font-serif text-xl text-[#1a2e1a] font-semibold mb-4">My Current Stay</h2>
              
              {currentStay ? (
                <div className="bg-white rounded-2xl shadow-sm border border-[#e8e4dd] overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Room Image Card */}
                    <div className="relative h-64 md:h-72">
                      <img
                        src={roomDeluxe}
                        alt={currentStay.roomName}
                        className="w-full h-full object-cover"
                      />
                      {/* Active Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-[#4ade80] text-white text-xs font-medium rounded-full uppercase tracking-wide">
                          Active
                        </span>
                      </div>
                      {/* Room Name Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                        <h3 className="text-white font-serif text-2xl font-semibold">
                          {currentStay.roomName || 'The Garden Suite'}
                        </h3>
                        <div className="flex items-center gap-1 text-white/90 text-sm mt-1">
                          <MapPin className="w-4 h-4" />
                          <span>Viha Estate, Tirupati, AP</span>
                        </div>
                      </div>
                    </div>

                    {/* Stay Details */}
                    <div className="p-6 flex flex-col justify-between">
                      {/* Check-in/Check-out */}
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Calendar className="w-5 h-5 text-[#b8860b] mt-0.5" />
                          <div>
                            <p className="text-xs text-[#6b7c6b] uppercase tracking-wide">Check-in</p>
                            <p className="font-medium text-[#1a2e1a]">
                              {format(new Date(currentStay.checkIn), 'MMM d, h:mm a')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-[#b8860b] mt-0.5" />
                          <div>
                            <p className="text-xs text-[#6b7c6b] uppercase tracking-wide">Check-out</p>
                            <p className="font-medium text-[#1a2e1a]">
                              {format(new Date(currentStay.checkOut), 'MMM d, h:mm a')}
                            </p>
                          </div>
                        </div>

                        {/* WiFi Credentials */}
                        <div className="bg-[#f5f3ef] rounded-xl p-4 mt-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Wifi className="w-5 h-5 text-[#b8860b]" />
                              <span className="font-medium text-[#1a2e1a]">{wifiCredentials.ssid}</span>
                            </div>
                            <button
                              onClick={() => handleCopy(wifiCredentials.ssid, 'ssid')}
                              className="text-[#b8860b] hover:text-[#8b6914] transition-colors"
                            >
                              {copiedField === 'ssid' ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <span className="text-xs font-medium">COPY</span>
                              )}
                            </button>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-sm text-[#6b7c6b]">
                              Pass: <span className="text-[#1a2e1a]">{wifiCredentials.password}</span>
                            </p>
                            <button
                              onClick={() => handleCopy(wifiCredentials.password, 'password')}
                              className="text-[#b8860b] hover:text-[#8b6914] transition-colors"
                            >
                              {copiedField === 'password' ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-6">
                        <Button
                          onClick={handleGetDirections}
                          className="flex-1 bg-[#1a2e1a] hover:bg-[#2a3e2a] text-white rounded-full"
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          Get Directions
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 border-[#1a2e1a] text-[#1a2e1a] rounded-full hover:bg-[#1a2e1a] hover:text-white"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Services
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-[#e8e4dd] p-12 text-center">
                  <div className="w-20 h-20 rounded-full bg-[#f5f3ef] mx-auto flex items-center justify-center mb-4">
                    <MapPin className="w-10 h-10 text-[#6b7c6b]" />
                  </div>
                  <h3 className="font-serif text-xl text-[#1a2e1a] mb-2">No Active Stay</h3>
                  <p className="text-[#6b7c6b] mb-6 max-w-md mx-auto">
                    You don't have an active booking right now. Ready to plan your next spiritual retreat?
                  </p>
                  <Link to="/rooms">
                    <Button className="bg-[#b8860b] hover:bg-[#8b6914] text-white rounded-full px-8">
                      Explore Rooms
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>

            {/* Curated for you Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-serif text-xl text-[#1a2e1a] font-semibold">Curated for you</h2>
                  <p className="text-sm text-[#6b7c6b] mt-1">
                    Discover the spiritual and natural beauty of Tirupati.
                  </p>
                </div>
                <Link
                  to="/amenities"
                  className="text-[#b8860b] hover:text-[#8b6914] text-sm font-medium flex items-center gap-1"
                >
                  View all
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Place Cards */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {curatedPlaces.map((place) => (
                  <div
                    key={place.id}
                    className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer"
                  >
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Distance Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#1a2e1a] text-xs font-medium rounded-full">
                        {place.distance}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-serif text-lg font-semibold mb-1">
                        {place.name}
                      </h3>
                      <p className="text-white/80 text-xs line-clamp-2">
                        {place.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dining Recommendation */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#e8e4dd] p-4 flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={diningRecommendation.image}
                    alt={diningRecommendation.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-base text-[#1a2e1a] font-semibold">
                      {diningRecommendation.name}
                    </h3>
                    <div className="flex items-center gap-1 text-[#b8860b]">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">{diningRecommendation.rating}</span>
                    </div>
                  </div>
                  <p className="text-[#6b7c6b] text-sm mt-1 line-clamp-1">
                    {diningRecommendation.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            {/* Host Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-sm border border-[#e8e4dd] p-6"
            >
              <p className="text-xs text-[#6b7c6b] uppercase tracking-wider mb-3">Your Host</p>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#1a2e1a] flex items-center justify-center text-white font-serif text-lg">
                  A
                </div>
                <div>
                  <p className="font-medium text-[#1a2e1a]">{hostInfo.name}</p>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#4ade80]"></span>
                    <span className="text-xs text-[#4ade80]">{hostInfo.status}</span>
                  </div>
                </div>
              </div>

              <p className="text-[#6b7c6b] text-sm italic mb-6">
                {hostInfo.message}
              </p>

              <div className="space-y-3">
                <Button
                  onClick={handleWhatsApp}
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={handleCall}
                    variant="outline"
                    className="border-[#e8e4dd] text-[#1a2e1a] rounded-full hover:bg-[#f5f3ef]"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button
                    onClick={handleEmail}
                    variant="outline"
                    className="border-[#e8e4dd] text-[#1a2e1a] rounded-full hover:bg-[#f5f3ef]"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Upcoming Trips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-sm border border-[#e8e4dd] p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg text-[#1a2e1a] font-semibold">Upcoming Trips</h3>
                <Link
                  to="/rooms"
                  className="text-[#b8860b] hover:text-[#8b6914] text-sm font-medium"
                >
                  Book New
                </Link>
              </div>

              {upcomingTrips.length > 0 ? (
                <div className="space-y-4">
                  {upcomingTrips.map((trip) => (
                    <div key={trip.id} className="flex gap-3">
                      <div className="w-1 rounded-full bg-[#b8860b]"></div>
                      <div className="flex-1">
                        <p className="text-xs text-[#6b7c6b] uppercase tracking-wide">
                          Planned · {format(new Date(trip.checkIn), 'MMM yyyy')}
                        </p>
                        <p className="font-medium text-[#1a2e1a] mt-1">
                          {trip.roomName || 'Winter Spiritual Retreat'}
                        </p>
                        <p className="text-sm text-[#6b7c6b]">
                          {format(new Date(trip.checkIn), 'MMM d')} - {format(new Date(trip.checkOut), 'MMM d')} · {trip.guests} Guests
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-[#6b7c6b] text-sm">No upcoming trips planned</p>
                  <Link to="/rooms">
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 border-[#b8860b] text-[#b8860b] rounded-full hover:bg-[#b8860b] hover:text-white"
                    >
                      Plan a Trip
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>

            {/* Past Stays */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-sm border border-[#e8e4dd] p-6"
            >
              <h3 className="font-serif text-lg text-[#1a2e1a] font-semibold mb-4">Past Stays</h3>

              {pastTrips.length > 0 ? (
                <div className="space-y-4">
                  {pastTrips.map((trip) => (
                    <div key={trip.id} className="flex items-start justify-between">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={roomSuite}
                            alt={trip.roomName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-[#1a2e1a]">{trip.roomName || 'Monsoon Getaway'}</p>
                          <p className="text-sm text-[#6b7c6b]">
                            {format(new Date(trip.checkIn), 'MMM d')} - {format(new Date(trip.checkOut), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                      <button className="text-[#b8860b] hover:text-[#8b6914] text-sm font-medium flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        Invoice
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#6b7c6b] text-sm text-center py-4">No past stays yet</p>
              )}
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 pt-8 border-t border-[#e8e4dd] text-center"
        >
          <p className="text-sm text-[#6b7c6b]">
            © {new Date().getFullYear()} Viha Home Stay. Crafted with care in Tirupati.
          </p>
        </motion.footer>
      </div>
    </div>
  );
}