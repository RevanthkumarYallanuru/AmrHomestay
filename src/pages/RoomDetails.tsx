import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RoomImageGallery } from '@/components/RoomImageGallery';
import { RoomPricingCard } from '@/components/RoomPricingCard';
import { AmenitiesList } from '@/components/AmenitiesList';
import { CheckInOutInfo } from '@/components/CheckInOutInfo';
import { roomImageMap, roomTypes, amenities as amenitiesData, hotelInfo } from '@/lib/data';
import { roomStorage } from '@/lib/storage';
import { BookingForm } from '@/components/BookingForm';
import { useState } from 'react';

export default function RoomDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [amenitiesOpen, setAmenitiesOpen] = useState(false);
  const [timingsOpen, setTimingsOpen] = useState(true);

  // Get room data from storage (which has the actual room IDs like "room-1", "room-2", etc)
  const storedRoom = roomStorage.getById(id);
  
  // Map stored room to room type for display details
  // Match by name first, then by type mapping
  const roomType = storedRoom 
    ? roomTypes.find(r => {
        const storedNameLower = storedRoom.name.toLowerCase();
        const roomNameLower = r.name.toLowerCase();
        const roomTypeLower = r.type.toLowerCase();
        const storedTypeLower = storedRoom.type.toLowerCase();
        
        // Match by exact or partial name match
        if (roomNameLower.includes(storedNameLower) || storedNameLower.includes(roomNameLower)) {
          return true;
        }
        
        // Match by type mapping (suite/family/deluxe/standard maps to Suite/Villa/Deluxe/Standard)
        const typeMap: Record<string, string[]> = {
          'suite': ['suite'],
          'family': ['villa', 'family'],
          'deluxe': ['deluxe'],
          'standard': ['standard'],
        };
        
        const validRoomTypes = typeMap[storedTypeLower] || [];
        return validRoomTypes.some(t => roomTypeLower.includes(t));
      })
    : null;

  if (!storedRoom || !roomType) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif text-foreground mb-4">Room Not Found</h1>
          <p className="text-muted-foreground mb-6">The room you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/rooms')} className="bg-[#b8860b] hover:bg-[#a07608] text-white">
            Back to Rooms
          </Button>
        </div>
      </div>
    );
  }

  // Merge stored room data with room type for complete information
  const room = {
    ...roomType,
    id: storedRoom.id,
    name: storedRoom.name,
    price: storedRoom.price,
  };

  // Get amenity details
  const roomAmenities = room.amenities
    .map(id => amenitiesData.find(a => a.id === id))
    .filter(Boolean) as typeof amenitiesData;

  // Get gallery images - use galleryImages if available, fallback to old image mapping
  const images = (roomType?.galleryImages && roomType.galleryImages.length > 0) 
    ? roomType.galleryImages
    : room.images.map(imgId => roomImageMap[imgId] || roomImageMap['room-suite']);

  const handleBook = (nights: number, guests: number) => {
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Booking Form Modal */}
      {bookingOpen && (
        <BookingForm
          isOpen={bookingOpen}
          onClose={() => {
            setBookingOpen(false);
          }}
          roomName={room.name}
          roomPrice={room.price}
          roomId={room.id}
        />
      )}

      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <button onClick={() => navigate('/')} className="hover:text-foreground transition">
              Home
            </button>
            <span>/</span>
            <button onClick={() => navigate('/rooms')} className="hover:text-foreground transition">
              Rooms
            </button>
            <span>/</span>
            <span className="text-foreground">{room.name}</span>
          </nav>
        </div>
      </motion.div>

      {/* Main Content - 2 Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* LEFT COLUMN - Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <RoomImageGallery images={images} roomName={room.name} />
            </motion.div>

            {/* Room Header & Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-y-4"
            >
              <div>
                <p className="text-[#b8860b] text-sm font-medium uppercase tracking-wider mb-2">
                  {room.type}
                </p>
                <h1 className="text-3xl lg:text-4xl font-serif text-foreground leading-tight mb-4">
                  {room.name}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-foreground">4.8</span>
                  <span className="text-muted-foreground">(256 reviews)</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed text-base">
                {room.description}
              </p>

              {/* Quick Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-[#b8860b] flex-shrink-0" />
                  <span className="text-foreground font-medium">Floor {room.floor}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-[#b8860b] font-bold">👥</span>
                  <span className="text-foreground font-medium">{room.capacity} guests</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-[#b8860b] font-bold">📏</span>
                  <span className="text-foreground font-medium">{room.size}</span>
                </div>
                <div className="flex items-center gap-2 text-sm col-span-2 sm:col-span-1">
                  <span className="text-[#b8860b] font-bold">🛏️</span>
                  <span className="text-foreground font-medium">{room.bedType}</span>
                </div>
              </div>

              {/* Availability */}
              {room.status === 'available' && (
                <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm font-medium text-green-700">Available for booking</span>
                </div>
              )}
            </motion.div>

            {/* Amenities Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Desktop: Always visible */}
              <div className="hidden md:block">
                <h3 className="text-xl font-semibold text-foreground mb-6">Amenities</h3>
                <AmenitiesList amenities={room.amenities} />
              </div>

              {/* Mobile: Collapsible */}
              <div className="md:hidden">
                <button
                  onClick={() => setAmenitiesOpen(!amenitiesOpen)}
                  className="w-full flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-foreground">Amenities</h3>
                  <motion.div animate={{ rotate: amenitiesOpen ? 180 : 0 }}>
                    <span className="text-[#b8860b]">▼</span>
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: amenitiesOpen ? 'auto' : 0, opacity: amenitiesOpen ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pt-0">
                    <AmenitiesList amenities={room.amenities} />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Check-in / Check-out Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="hidden md:block"
            >
              <CheckInOutInfo isCollapsible={false} />
            </motion.div>

            {/* Mobile: Collapsible Check-in/Check-out */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="md:hidden"
            >
              <button
                onClick={() => setTimingsOpen(!timingsOpen)}
                className="w-full flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#b8860b]" />
                  Check-in & Check-out
                </h3>
                <motion.div animate={{ rotate: timingsOpen ? 180 : 0 }}>
                  <span className="text-[#b8860b]">▼</span>
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{ height: timingsOpen ? 'auto' : 0, opacity: timingsOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0">
                  <CheckInOutInfo isCollapsible={false} />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN - Booking Card (Sticky on Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <RoomPricingCard
              price={room.price}
              originalPrice={room.originalPrice}
              maxGuests={room.capacity}
              bedType={room.bedType}
              roomSize={room.size}
              onBook={handleBook}
            />
          </motion.div>
        </div>

        {/* Similar Rooms Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mt-20 pt-12 border-t border-border"
        >
          <h3 className="text-2xl font-serif text-foreground mb-8">Other Room Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roomStorage
              .getAll()
              .filter(r => r.id !== storedRoom.id)
              .slice(0, 3)
              .map((similarStoredRoom, index) => {
                // Find matching room type for this similar room
                const similarRoomType = roomTypes.find(rt => {
                  const storedNameLower = similarStoredRoom.name.toLowerCase();
                  const roomNameLower = rt.name.toLowerCase();
                  const roomTypeLower = rt.type.toLowerCase();
                  const storedTypeLower = similarStoredRoom.type.toLowerCase();
                  
                  if (roomNameLower.includes(storedNameLower) || storedNameLower.includes(roomNameLower)) {
                    return true;
                  }
                  
                  const typeMap: Record<string, string[]> = {
                    'suite': ['suite'],
                    'family': ['villa', 'family'],
                    'deluxe': ['deluxe'],
                    'standard': ['standard'],
                  };
                  
                  const validRoomTypes = typeMap[storedTypeLower] || [];
                  return validRoomTypes.some(t => roomTypeLower.includes(t));
                });
                
                if (!similarRoomType) return null;
                
                return (
                  <motion.button
                    key={similarStoredRoom.id}
                    onClick={() => navigate(`/rooms/${similarStoredRoom.id}`)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-left group"
                  >
                    <div className="rounded-xl overflow-hidden mb-4 bg-secondary aspect-video">
                      <img
                        src={roomImageMap[similarRoomType.images[0]] || roomImageMap['room-suite']}
                        alt={similarStoredRoom.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="font-semibold text-foreground group-hover:text-[#b8860b] transition-colors mb-1">
                      {similarStoredRoom.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {similarStoredRoom.capacity} guests • {similarRoomType.size}
                    </p>
                    <p className="text-[#b8860b] font-semibold">
                      ₹{similarStoredRoom.price.toLocaleString()}/night
                    </p>
                  </motion.button>
                );
              })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 pt-12 border-t border-border text-center"
        >
          <h3 className="text-2xl lg:text-3xl font-serif text-foreground mb-4">
            Ready to Experience Luxury?
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Book your stay at {hotelInfo.fullName} and discover the perfect blend of comfort, hospitality, and spiritual serenity.
          </p>
          <Button
            onClick={() => handleBook(1, 1)}
            size="lg"
            className="bg-[#b8860b] hover:bg-[#a07608] text-white px-8 rounded-full"
          >
            Start Your Booking
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
