/**
 * ROOM DETAILS PAGE - USAGE EXAMPLES
 * 
 * This file demonstrates how to use the Room Details page and its components
 * throughout the application.
 */

// ============================================
// EXAMPLE 1: Navigation to Room Details
// ============================================

// In any component that imports useNavigate from react-router-dom:
import { useNavigate } from 'react-router-dom';

function ExampleComponent() {
  const navigate = useNavigate();

  const viewRoomDetails = (roomId: string) => {
    // Navigate to room details page
    navigate(`/rooms/${roomId}`);
  };

  return (
    <button onClick={() => viewRoomDetails('deluxe-suite')}>
      View Deluxe Suite Details
    </button>
  );
}

// ============================================
// EXAMPLE 2: Using useRoomDetails Hook
// ============================================

import { useRoomDetails } from '@/hooks/useRoomDetails';

function CustomRoomComponent() {
  const roomId = 'family-villa'; // From URL params or props
  const room = useRoomDetails(roomId);

  if (!room) return <div>Room not found</div>;

  return (
    <div>
      <h1>{room.name}</h1>
      <p>{room.description}</p>
      <img src={room.images[0]} alt={room.name} />
    </div>
  );
}

// ============================================
// EXAMPLE 3: Using Price Calculation Hook
// ============================================

import { usePriceCalculation } from '@/hooks/useRoomDetails';
import { useState } from 'react';

function PriceCalculatorExample() {
  const [nights, setNights] = useState(1);
  const [guests, setGuests] = useState(1);

  const pricing = usePriceCalculation(4500, nights, guests);

  return (
    <div>
      <p>Price per night: ₹{pricing.pricePerNight}</p>
      <p>Total for {nights} nights: ₹{pricing.subtotal}</p>
      <p>Price per guest: ₹{pricing.pricePerGuest}</p>
    </div>
  );
}

// ============================================
// EXAMPLE 4: Room Image Gallery Usage
// ============================================

import { RoomImageGallery } from '@/components/RoomImageGallery';
import { roomImageMap } from '@/lib/data';

function ImageGalleryExample() {
  const roomImages = [
    roomImageMap['room-suite'],
    roomImageMap['room-deluxe'],
    roomImageMap['room-standard'],
  ];

  const handleImageClick = (index: number) => {
    console.log(`User clicked on image ${index + 1}`);
  };

  return (
    <RoomImageGallery
      images={roomImages}
      roomName="Deluxe Suite"
      onImageClick={handleImageClick}
    />
  );
}

// ============================================
// EXAMPLE 5: Room Pricing Card Usage
// ============================================

import { RoomPricingCard } from '@/components/RoomPricingCard';

function PricingCardExample() {
  const handleBook = (nights: number, guests: number) => {
    console.log(`Booking for ${nights} nights with ${guests} guests`);
    // Navigate to booking form or open modal
  };

  return (
    <RoomPricingCard
      price={4500}
      originalPrice={5500}
      maxGuests={2}
      bedType="King Size Bed"
      roomSize="450 sq ft"
      onBook={handleBook}
    />
  );
}

// ============================================
// EXAMPLE 6: Amenities List Usage
// ============================================

import { AmenitiesList } from '@/components/AmenitiesList';

function AmenitiesExample() {
  const roomAmenities = ['wifi', 'ac', 'tv', 'minibar', 'bathtub', 'balcony'];

  return (
    <AmenitiesList
      amenities={roomAmenities}
      title="Room Amenities"
    />
  );
}

// ============================================
// EXAMPLE 7: Data Fetching Pattern
// ============================================

// The room data comes from src/lib/data.ts
// Each room object has the following structure:

const exampleRoomStructure = {
  id: 'deluxe-suite',
  name: 'Deluxe Suite',
  type: 'Suite',
  description: 'Spacious suite with premium amenities...',
  shortDescription: 'Spacious suite with premium amenities',
  price: 4500,                    // Per night in ₹
  originalPrice: 5500,            // Optional: For showing discounts
  capacity: 2,                    // Max guests
  bedType: 'King Size Bed',
  size: '450 sq ft',
  floor: 'First Floor',
  images: ['room-suite', 'room-deluxe'],    // Image IDs
  thumbnail: 'roomSuite',         // For preview
  amenities: ['wifi', 'ac', 'tv', 'minibar', 'bathtub', 'balcony'],
  highlights: ['City View', 'Work Desk', 'Room Service'],
  status: 'available',            // 'available' | 'occupied' | 'cleaning' | 'maintenance'
  featured: true,
};

// ============================================
// EXAMPLE 8: Custom Room Details Component
// ============================================

import { useParams } from 'react-router-dom';

function CustomRoomDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const room = useRoomDetails(id);

  if (!room) {
    return (
      <div className="text-center py-20">
        <h2>Room not found</h2>
        <p>The room you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1>{room.name}</h1>
      <RoomImageGallery images={room.images} roomName={room.name} />
      <RoomPricingCard
        price={room.price}
        originalPrice={room.originalPrice}
        maxGuests={room.capacity}
        bedType={room.bedType}
        roomSize={room.size}
        onBook={(nights, guests) => {
          console.log(`Book: ${nights} nights, ${guests} guests`);
        }}
      />
      <AmenitiesList amenities={room.amenities} />
    </div>
  );
}

// ============================================
// EXAMPLE 9: Integration with Booking Form
// ============================================

import { BookingForm } from '@/components/BookingForm';

function RoomWithBooking() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const room = useRoomDetails(id);

  if (!room) return null;

  const handleBook = (nights: number, guests: number) => {
    // Store booking details in state or context
    setBookingOpen(true);
  };

  return (
    <>
      <RoomPricingCard
        price={room.price}
        originalPrice={room.originalPrice}
        maxGuests={room.capacity}
        bedType={room.bedType}
        roomSize={room.size}
        onBook={handleBook}
      />

      {bookingOpen && (
        <BookingForm
          isOpen={bookingOpen}
          onClose={() => setBookingOpen(false)}
          roomName={room.name}
          roomPrice={room.price}
          roomId={room.id}
        />
      )}
    </>
  );
}

// ============================================
// EXAMPLE 10: Responsive Design Patterns
// ============================================

// The Room Details page uses Tailwind's responsive prefixes:
// - Mobile (default): Single column
// - md (768px+): Multi-column layouts
// - lg (1024px+): Full 3-column layout with sticky pricing

// Grid layout example from RoomDetails:
const layoutExample = `
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  {/* 
    Mobile: 1 column (full width)
    Desktop: 3 columns
  */}
  
  {/* Images - 2 cols on desktop */}
  <div className="lg:col-span-2">
    <RoomImageGallery ... />
  </div>

  {/* Details - 1 col on desktop */}
  <div className="lg:col-span-1">
    <RoomDetails ... />
  </div>

  {/* Pricing - Sticky on desktop, flows on mobile */}
  <div className="lg:col-span-1 lg:col-start-3">
    <RoomPricingCard ... />
  </div>
</div>
`;

// ============================================
// EXAMPLE 11: URL Navigation Patterns
// ============================================

// Direct URL navigation:
// www.example.com/rooms/deluxe-suite
// www.example.com/rooms/premium-room
// www.example.com/rooms/standard-room
// www.example.com/rooms/family-villa

// Programmatic navigation:
// navigate('/rooms/deluxe-suite');

// Link component:
// <Link to={`/rooms/${room.id}`}>View Details</Link>

// ============================================
// EXAMPLE 12: Hooks for Extended Functionality
// ============================================

import {
  useSimilarRooms,
  useRoomAvailability,
  useFormattedPrice,
  useDiscountPercentage,
} from '@/hooks/useRoomDetails';

function AdvancedExample() {
  const room = useRoomDetails('deluxe-suite');
  const similar = useSimilarRooms('deluxe-suite', 'Suite', 3);
  const availability = useRoomAvailability('deluxe-suite');
  const formattedPrice = useFormattedPrice(4500);
  const discount = useDiscountPercentage(5500, 4500);

  return (
    <div>
      <h1>{room?.name}</h1>
      {!availability.isAvailable && (
        <p className="text-red-500">{availability.message}</p>
      )}
      <p className="text-lg">
        {formattedPrice}
        {discount > 0 && <span className="text-red-500">{discount}% off</span>}
      </p>
      <h3>Similar Rooms:</h3>
      <ul>
        {similar.map(r => (
          <li key={r.id}>{r.name}</li>
        ))}
      </ul>
    </div>
  );
}

// ============================================
// IMPORTANT NOTES
// ============================================

/*
1. All room data is stored in src/lib/data.ts (single source of truth)

2. Room images must be imported and mapped in roomImageMap in data.ts

3. Amenities must have corresponding IDs in the amenities array in data.ts

4. The RoomDetails page handles all fetching and error states automatically

5. Components are fully typed with TypeScript for better development experience

6. All animations use Framer Motion for smooth, performant transitions

7. Responsive design uses Tailwind CSS breakpoints (mobile-first)

8. Accessibility features include:
   - Alt text for all images
   - ARIA labels on interactive elements
   - Keyboard navigation support
   - Proper color contrast

9. Performance optimizations:
   - Memoized hooks prevent unnecessary recalculations
   - Lazy loading for images
   - Proper React best practices for re-renders

10. For production, test all room IDs thoroughly and ensure all image references are correct
*/
