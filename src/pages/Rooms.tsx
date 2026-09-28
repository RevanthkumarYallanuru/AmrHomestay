import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Wifi, Wind, Tv, Coffee, Car, MapPin, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { roomStorage } from '@/lib/storage';
import { initializeSeedData } from '@/lib/seed-data';
import { BookingForm } from '@/components/BookingForm';
import { roomImageMap, roomTypes as roomTypesData, heroImages } from '@/lib/data';

// Initialize seed data
initializeSeedData();

const roomImages = roomImageMap;

const roomTypes = ['All Rooms', 'Luxury', 'Deluxe', 'Standard', 'Family'];

const amenityIcons: Record<string, React.ElementType> = {
  'High-Speed WiFi': Wifi,
  'Air Conditioning': Wind,
  'Smart TV': Tv,
  'Room Service': Coffee,
  'Valet Parking': Car,
};

export default function RoomsPage() {
  const [activeFilter, setActiveFilter] = useState('All Rooms');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<{ id: string; name: string; price: number } | null>(null);

  const rooms = useMemo(() => {
    let filtered = roomStorage.getAll();

    if (activeFilter !== 'All Rooms') {
      filtered = filtered.filter(room => {
        if (activeFilter === 'Luxury') return room.type === 'suite';
        if (activeFilter === 'Deluxe') return room.type === 'deluxe';
        if (activeFilter === 'Standard') return room.type === 'standard';
        if (activeFilter === 'Family') return room.type === 'family';
        return true;
      });
    }

    if (searchQuery) {
      filtered = filtered.filter(room =>
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [activeFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Booking Form Modal */}
      {selectedRoom && (
        <BookingForm
          isOpen={bookingOpen}
          onClose={() => {
            setBookingOpen(false);
            setSelectedRoom(null);
          }}
          roomName={selectedRoom.name}
          roomPrice={selectedRoom.price}
          roomId={selectedRoom.id}
        />
      )}
      {/* Hero */}
      <section className="bg-secondary py-16">
        <div className="section-container text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent font-medium text-sm tracking-wider uppercase"
          >
            THE ART OF STAY
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mt-4 mb-6"
          >
            The Rooms Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Curated spaces designed for the pilgrim soul. Experience Tirupati 
            with an exquisite blend of tradition and modern luxury.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-border sticky top-20 bg-background/95 backdrop-blur-sm z-30">
        <div className="section-container py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              {roomTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeFilter === type
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search rooms..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="relative py-12">
        <div className="section-container">
          {rooms.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No rooms found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setActiveFilter('All Rooms');
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-12">
              {rooms.map((room, index) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.1 }}
                  className="card-premium overflow-hidden"
                >
                  <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                    {/* Image */}
                    <div className={`relative h-72 lg:h-96 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                      <img
                        src={roomImages[room.images[0]] || roomSuite}
                        alt={room.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          room.status === 'available' 
                            ? 'bg-success/90 text-white' 
                            : 'bg-muted/90 text-muted-foreground'
                        }`}>
                          {room.status === 'available' ? 'Available' : room.status}
                        </span>
                        {room.featured && (
                          <span className="px-3 py-1 bg-accent/90 text-accent-foreground rounded-full text-xs font-medium">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 lg:p-10 flex flex-col justify-center">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <span className="text-accent text-sm font-medium uppercase tracking-wider">
                            {room.type.charAt(0).toUpperCase() + room.type.slice(1)} Room
                          </span>
                          <h2 className="font-serif text-2xl lg:text-3xl text-foreground mt-1">
                            {room.name}
                          </h2>
                        </div>
                        <div className="text-right">
                          <span className="text-3xl font-serif text-accent">₹{room.price.toLocaleString()}</span>
                          <span className="text-muted-foreground text-sm block">/night</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {room.description}
                      </p>

                      <div className="flex flex-wrap gap-3 mb-6">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{room.capacity} Guests</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>Floor {room.floorNumber}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <span>4.9 (128 reviews)</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {room.amenities.slice(0, 5).map(amenity => {
                          const Icon = amenityIcons[amenity] || Coffee;
                          return (
                            <span
                              key={amenity}
                              className="flex items-center gap-1 px-3 py-1.5 bg-secondary rounded-full text-xs text-muted-foreground"
                            >
                              <Icon className="w-3 h-3" />
                              {amenity}
                            </span>
                          );
                        })}
                        {room.amenities.length > 5 && (
                          <span className="px-3 py-1.5 bg-secondary rounded-full text-xs text-muted-foreground">
                            +{room.amenities.length - 5} more
                          </span>
                        )}
                      </div>

                      <div className="flex gap-4">
                        <Link to={`/rooms/${room.id}`} className="flex-1">
                          <Button variant="outline" className="w-full">
                            View Details
                          </Button>
                        </Link>
                        <Button
                          className="btn-gold flex-1"
                          onClick={() => {
                            setSelectedRoom({ id: room.id, name: room.name, price: room.price });
                            setBookingOpen(true);
                          }}
                        >
                          Book This Suite
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
