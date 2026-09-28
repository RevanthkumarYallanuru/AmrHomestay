// Seed data for demo purposes
import type { User, Room, Booking, Review, Employee } from '@/types';

export const seedUsers: User[] = [
  {
    id: 'admin-1',
    email: 'admin@viha.com',
    name: 'Admin',
    role: 'admin',
    phone: '+91 98765 43210',
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'guest-1',
    email: 'priya@example.com',
    name: 'Priya Sharma',
    role: 'guest',
    phone: '+91 98765 12345',
    createdAt: '2024-06-15T00:00:00.000Z',
  },
  {
    id: 'guest-2',
    email: 'rahul@example.com',
    name: 'Rahul Reddy',
    role: 'guest',
    phone: '+91 87654 32109',
    createdAt: '2024-08-20T00:00:00.000Z',
  },
];

export const seedRooms: Room[] = [
  {
    id: 'room-1',
    name: 'The Royal Tirumala Suite',
    type: 'suite',
    description: 'A majestic suite designed for those who seek the finest. Features a king-sized bed with handcrafted linens, a spacious living area, and breathtaking views of the sacred hills.',
    price: 4500,
    capacity: 2,
    amenities: ['High-Speed WiFi', 'Air Conditioning', 'Smart TV', 'Private Balcony', 'Mini Bar', 'Room Service', 'King Size Bed', 'Bathtub'],
    images: ['room-suite'],
    floorNumber: 3,
    status: 'available',
    featured: true,
  },
  {
    id: 'room-2',
    name: 'Deluxe Garden View',
    type: 'deluxe',
    description: 'Immerse yourself in tranquility. Perfect for couples seeking a quiet retreat. Features modern amenities while maintaining traditional elegance in a beautiful outdoor serenity.',
    price: 3200,
    capacity: 2,
    amenities: ['High-Speed WiFi', 'Air Conditioning', 'Smart TV', 'Garden View', 'Room Service', 'Queen Size Bed'],
    images: ['room-deluxe'],
    floorNumber: 2,
    status: 'available',
    featured: true,
  },
  {
    id: 'room-3',
    name: 'Family Grand Suite',
    type: 'family',
    description: 'Space for everyone you love. Our 2-bedroom suite offers two separate sleeping areas, a generous living space, and amenities for families seeking comfort without compromise.',
    price: 5500,
    capacity: 4,
    amenities: ['High-Speed WiFi', 'Air Conditioning', 'Smart TV', 'Living Area', 'Mini Kitchen', 'Room Service', 'Two Queen Beds'],
    images: ['room-family'],
    floorNumber: 2,
    status: 'available',
  },
  {
    id: 'room-4',
    name: 'Standard Comfort Room',
    type: 'standard',
    description: 'Essential comfort at its best. A cozy room with all the amenities you need for a peaceful stay in the heart of Tirupati.',
    price: 2100,
    capacity: 2,
    amenities: ['High-Speed WiFi', 'Air Conditioning', 'Smart TV', 'Room Service', 'Double Bed'],
    images: ['room-standard'],
    floorNumber: 1,
    status: 'available',
  },
  {
    id: 'room-5',
    name: 'Mountain View Deluxe',
    type: 'deluxe',
    description: 'Wake up to panoramic mountain views. This deluxe room combines modern luxury with the spiritual serenity of Tirumala.',
    price: 3500,
    capacity: 2,
    amenities: ['High-Speed WiFi', 'Air Conditioning', 'Smart TV', 'Mountain View', 'Balcony', 'Room Service', 'King Size Bed'],
    images: ['room-deluxe'],
    floorNumber: 3,
    status: 'occupied',
  },
  {
    id: 'room-6',
    name: 'Executive Suite',
    type: 'suite',
    description: 'For the discerning traveler. Premium workspace, luxury amenities, and dedicated concierge service make this the perfect choice for business travelers.',
    price: 4000,
    capacity: 2,
    amenities: ['High-Speed WiFi', 'Air Conditioning', 'Smart TV', 'Work Desk', 'Mini Bar', 'Room Service', 'King Size Bed', 'Lounge Access'],
    images: ['room-suite'],
    floorNumber: 3,
    status: 'cleaning',
  },
];

export const seedBookings: Booking[] = [
  {
    id: 'booking-1',
    guestId: 'guest-1',
    guestName: 'Priya Sharma',
    guestEmail: 'priya@example.com',
    guestPhone: '+91 98765 12345',
    roomId: 'room-2',
    roomName: 'Deluxe Garden View',
    checkIn: '2024-10-15',
    checkOut: '2024-10-18',
    guests: 2,
    totalAmount: 9600,
    status: 'confirmed',
    createdAt: '2024-10-10T10:00:00.000Z',
  },
  {
    id: 'booking-2',
    guestId: 'guest-2',
    guestName: 'Rahul Reddy',
    guestEmail: 'rahul@example.com',
    guestPhone: '+91 87654 32109',
    roomId: 'room-1',
    roomName: 'The Royal Tirumala Suite',
    checkIn: '2024-10-20',
    checkOut: '2024-10-25',
    guests: 2,
    totalAmount: 22500,
    status: 'pending',
    specialRequests: 'Late check-in around 11 PM',
    createdAt: '2024-10-12T14:30:00.000Z',
  },
  {
    id: 'booking-3',
    guestId: 'guest-1',
    guestName: 'Priya Sharma',
    guestEmail: 'priya@example.com',
    guestPhone: '+91 98765 12345',
    roomId: 'room-5',
    roomName: 'Mountain View Deluxe',
    checkIn: '2024-10-08',
    checkOut: '2024-10-12',
    guests: 2,
    totalAmount: 14000,
    status: 'checked-in',
    createdAt: '2024-10-01T09:00:00.000Z',
  },
];

export const seedReviews: Review[] = [
  {
    id: 'review-1',
    guestId: 'guest-1',
    guestName: 'Sarah Jenkins',
    roomId: 'room-1',
    roomName: 'The Royal Tirumala Suite',
    rating: 5,
    comment: 'Absolutely loved our stay at Viha. The room was impeccable and the service was top-notch from arrival to departure. The concierge team went above and beyond to secure darshan reservations. Will definitely be returning next season!',
    featured: true,
    createdAt: '2024-10-12T10:00:00.000Z',
  },
  {
    id: 'review-2',
    guestId: 'guest-2',
    guestName: 'Michael Jordan',
    roomId: 'room-2',
    roomName: 'Deluxe Garden View',
    rating: 4,
    comment: 'Great location and beautiful architecture. The breakfast was delicious. Only reason for 4 stars was that the WiFi was a bit spotty in the far corner of the suite. Otherwise a perfect stay.',
    featured: true,
    createdAt: '2024-10-08T15:30:00.000Z',
  },
  {
    id: 'review-3',
    guestId: 'guest-1',
    guestName: 'Anita Desai',
    roomId: 'room-3',
    roomName: 'Family Grand Suite',
    rating: 5,
    comment: 'The homemade idlis and chutneys were the best the kids have had in years. It was all organic, fresh, and made with care. An authentic and heartfelt. Highly recommend for families.',
    featured: false,
    createdAt: '2024-09-28T11:00:00.000Z',
  },
];

export const seedEmployees: Employee[] = [
  {
    id: 'emp-1',
    name: 'Rajesh Kumar',
    email: 'rajesh@viha.com',
    phone: '+91 98765 00001',
    role: 'concierge',
    status: 'on-shift',
    rating: 4.8,
    shift: '06:00 AM - 02:00 PM',
  },
  {
    id: 'emp-2',
    name: 'Priya Sharma',
    email: 'priyasharma@viha.com',
    phone: '+91 98765 00002',
    role: 'housekeeping',
    status: 'on-shift',
    rating: 5.0,
    shift: '08:00 AM - 04:00 PM',
  },
  {
    id: 'emp-3',
    name: 'Arjun Mehta',
    email: 'arjun@viha.com',
    phone: '+91 98765 00003',
    role: 'front-desk',
    status: 'off-duty',
    rating: 4.2,
    shift: '02:00 PM - 10:00 PM',
  },
  {
    id: 'emp-4',
    name: 'Vikram Patel',
    email: 'vikram@viha.com',
    phone: '+91 98765 00004',
    role: 'security',
    status: 'on-shift',
    rating: 4.5,
    shift: '10:00 PM - 06:00 AM',
  },
];

// Initialize seed data if localStorage is empty
export function initializeSeedData(): void {
  const hasData = localStorage.getItem('viha_users');
  
  if (!hasData) {
    localStorage.setItem('viha_users', JSON.stringify(seedUsers));
    localStorage.setItem('viha_rooms', JSON.stringify(seedRooms));
    localStorage.setItem('viha_bookings', JSON.stringify(seedBookings));
    localStorage.setItem('viha_reviews', JSON.stringify(seedReviews));
    localStorage.setItem('viha_employees', JSON.stringify(seedEmployees));
    localStorage.setItem('viha_payments', JSON.stringify([]));
    localStorage.setItem('viha_notifications', JSON.stringify([]));
    localStorage.setItem('viha_notes', JSON.stringify([]));
  }
}
