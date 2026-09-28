// ============================================
// AMR HOME STAY - CENTRALIZED DATA MANAGEMENT
// ============================================
// All site data is managed from this single file
// Update this file to change content across the site

// Import images
import heroImage from '@/assets/hero-bedroom.jpg';
import roomSuite from '@/assets/room-suite.jpg';
import roomDeluxe from '@/assets/room-deluxe.jpg';
import roomStandard from '@/assets/room-standard.jpg';
import roomFamily from '@/assets/room-family.jpg';

// ============================================
// HOTEL INFORMATION
// ============================================
export const hotelInfo = {
  name: 'AMR',
  tagline: 'Home Stay',
  fullName: 'AMR Home Stay',
  description: 'Premium Accommodations in Tirupati',
  shortDescription: 'Discover luxury rooms and world-class hospitality at AMR Home Stay. Your perfect sanctuary in the spiritual capital of Tirupati.',
  
  // Contact Information
  contact: {
    phone: '080192 78493',
    alternatePhone: '080192 78493',
    email: 'info@amr-homestay.com',
    bookingEmail: 'booking@amr-homestay.com',
    whatsapp: '+91 7207357312',
  },
  
  // Address
  address: {
    line1: 'Road, 3rd Cross Rd, opposite Dmart',
    line2: 'Tirumala Reddy Nagar, Mangalam',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    pincode: '517507',
    country: 'India',
    landmark: 'Opposite to Dmart',
    plusCode: 'JCWW+W9, Tirupati, Andhra Pradesh',
    googleMapsUrl: 'https://maps.google.com/?q=Tirupati',
  },
  
  // Social Media
  social: {
    facebook: 'https://facebook.com/amr-homestay',
    instagram: 'https://instagram.com/amr-homestay',
    twitter: 'https://twitter.com/amr-homestay',
    youtube: 'https://youtube.com/amr-homestay',
  },
  
  // Timings
  timings: {
    checkIn: '12:00 PM',
    checkOut: '11:00 AM',
    reception: '24/7',
  },
  
  // Rating & Reviews
  rating: {
    score: 4.8,
    outOf: 5,
    reviewCount: 33,
    highlightedReviews: [
      'Well-maintained property',
      'Good service quality',
      'Beautiful rooms',
      'Strong customer service',
      'Frequently recommended by guests'
    ],
    sampleReviewThemes: [
      'Very good facilities and service',
      'Well maintained beautiful rooms',
      'Highly recommended for a remarkable stay'
    ]
  },
  
  // Branding Colors (for reference)
  colors: {
    primary: '#1a2e1a', // Forest Green
    accent: '#b8860b', // Gold
    background: '#faf9f6', // Cream
  },
};

// ============================================
// ROOM DATA
// ============================================
export const roomTypes = [
  {
    id: 'deluxe-suite',
    name: 'Deluxe Suite',
    type: 'Suite',
    description: 'Spacious suite with premium amenities and city view. Perfect for couples seeking luxury and comfort.',
    shortDescription: 'Spacious suite with premium amenities',
    price: 4500,
    originalPrice: 5500,
    capacity: 2,
    bedType: 'King Size Bed',
    size: '450 sq ft',
    floor: 'First Floor',
    images: ['room-suite', 'room-deluxe'],
    galleryImages: [
      'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      'https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      'https://images.pexels.com/photos/1579842/pexels-photo-1579842.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      'https://images.pexels.com/photos/2252570/pexels-photo-2252570.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    ],
    thumbnail: roomSuite,
    amenities: ['wifi', 'ac', 'tv', 'minibar', 'bathtub', 'balcony'],
    highlights: ['City View', 'Work Desk', 'Room Service'],
    status: 'available',
    featured: true,
  },
  {
    id: 'premium-room',
    name: 'Premium Room',
    type: 'Deluxe',
    description: 'Comfortable room with modern amenities. Ideal for business travelers and solo guests.',
    shortDescription: 'Modern comfort with all essentials',
    price: 3500,
    originalPrice: 4000,
    capacity: 2,
    bedType: 'Queen Size Bed',
    size: '350 sq ft',
    floor: 'Second Floor',
    images: ['room-deluxe', 'room-standard'],
    galleryImages: [
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      'https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      'https://images.pexels.com/photos/1579842/pexels-photo-1579842.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    ],
    thumbnail: roomDeluxe,
    amenities: ['wifi', 'ac', 'tv', 'minibar'],
    highlights: ['Garden View', 'Work Desk'],
    status: 'available',
    featured: true,
  },
  {
    id: 'standard-room',
    name: 'Standard Room',
    type: 'Standard',
    description: 'Cozy room with essential amenities. Great value for pilgrims and budget travelers.',
    shortDescription: 'Cozy and affordable comfort',
    price: 2500,
    originalPrice: 3000,
    capacity: 2,
    bedType: 'Double Bed',
    size: '280 sq ft',
    floor: 'Ground Floor',
    images: ['room-standard'],
    galleryImages: [
      'https://images.pexels.com/photos/1684894/pexels-photo-1684894.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      'https://images.pexels.com/photos/1916823/pexels-photo-1916823.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    ],
    thumbnail: roomStandard,
    amenities: ['wifi', 'ac', 'tv'],
    highlights: ['Courtyard Access'],
    status: 'available',
    featured: false,
  },
  {
    id: 'family-villa',
    name: 'Family Villa',
    type: 'Villa',
    description: 'Spacious villa perfect for families. Features separate living area and private garden.',
    shortDescription: 'Perfect for family vacations',
    price: 7500,
    originalPrice: 9000,
    capacity: 6,
    bedType: '2 King Beds + Sofa Bed',
    size: '800 sq ft',
    floor: 'Ground Floor',
    images: ['room-family', 'room-suite'],
    galleryImages: [
      'https://images.pexels.com/photos/2252570/pexels-photo-2252570.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      'https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      'https://images.pexels.com/photos/1579842/pexels-photo-1579842.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    ],
    thumbnail: roomFamily,
    amenities: ['wifi', 'ac', 'tv', 'minibar', 'bathtub', 'balcony', 'kitchen'],
    highlights: ['Private Garden', 'Living Room', 'Kitchen'],
    status: 'available',
    featured: true,
  },
];

// ============================================
// AMENITIES DATA
// ============================================
export const amenities = [
  {
    id: 'wifi',
    name: 'High-Speed WiFi',
    icon: 'Wifi',
    description: 'Complimentary high-speed internet throughout the property',
    category: 'connectivity',
  },
  {
    id: 'ac',
    name: 'Air Conditioning',
    icon: 'Wind',
    description: 'Climate-controlled rooms for your comfort',
    category: 'comfort',
  },
  {
    id: 'tv',
    name: 'Smart TV',
    icon: 'Tv',
    description: '43" Smart TV with streaming services',
    category: 'entertainment',
  },
  {
    id: 'minibar',
    name: 'Mini Bar',
    icon: 'Coffee',
    description: 'In-room refreshments and snacks',
    category: 'dining',
  },
  {
    id: 'bathtub',
    name: 'Bathtub',
    icon: 'Bath',
    description: 'Relaxing bathtub with premium toiletries',
    category: 'bathroom',
  },
  {
    id: 'balcony',
    name: 'Private Balcony',
    icon: 'Home',
    description: 'Private balcony with scenic views',
    category: 'outdoor',
  },
  {
    id: 'kitchen',
    name: 'Kitchenette',
    icon: 'Utensils',
    description: 'Fully equipped kitchenette',
    category: 'dining',
  },
  {
    id: 'parking',
    name: 'Free Parking',
    icon: 'Car',
    description: 'Complimentary secure parking',
    category: 'facilities',
  },
  {
    id: 'breakfast',
    name: 'Breakfast Included',
    icon: 'Utensils',
    description: 'Complimentary breakfast buffet',
    category: 'dining',
  },
  {
    id: 'laundry',
    name: 'Laundry Service',
    icon: 'Shirt',
    description: 'Same-day laundry and dry cleaning',
    category: 'services',
  },
  {
    id: 'roomservice',
    name: '24/7 Room Service',
    icon: 'Bell',
    description: 'Round-the-clock room service',
    category: 'services',
  },
  {
    id: 'temple',
    name: 'Temple Assistance',
    icon: 'MapPin',
    description: 'Tirumala darshan booking assistance',
    category: 'services',
  },
];

// ============================================
// GALLERY DATA
// ============================================
export const galleryImages = [
  {
    id: 'gallery-1',
    src: roomSuite,
    alt: 'Deluxe Suite Interior',
    category: 'rooms',
    featured: true,
  },
  {
    id: 'gallery-2',
    src: roomDeluxe,
    alt: 'Premium Room',
    category: 'rooms',
    featured: true,
  },
  {
    id: 'gallery-3',
    src: roomStandard,
    alt: 'Standard Room',
    category: 'rooms',
    featured: false,
  },
  {
    id: 'gallery-4',
    src: roomFamily,
    alt: 'Family Villa',
    category: 'rooms',
    featured: true,
  },
  {
    id: 'gallery-5',
    src: heroImage,
    alt: 'Hotel Lobby',
    category: 'property',
    featured: true,
  },
  {
    id: 'gallery-6',
    src: roomSuite,
    alt: 'Dining Area',
    category: 'dining',
    featured: false,
  },
  {
    id: 'gallery-7',
    src: roomDeluxe,
    alt: 'Garden View',
    category: 'outdoor',
    featured: false,
  },
  {
    id: 'gallery-8',
    src: roomFamily,
    alt: 'Swimming Pool',
    category: 'amenities',
    featured: true,
  },
];

export const galleryCategories = [
  { id: 'all', label: 'All Photos' },
  { id: 'rooms', label: 'Rooms' },
  { id: 'property', label: 'Property' },
  { id: 'dining', label: 'Dining' },
  { id: 'outdoor', label: 'Outdoor' },
  { id: 'amenities', label: 'Amenities' },
];

// ============================================
// HERO & BANNER IMAGES
// ============================================
export const heroImages = {
  main: heroImage,
  rooms: roomSuite,
  amenities: roomDeluxe,
  gallery: roomFamily,
  contact: heroImage,
  booking: roomSuite,
};

// ============================================
// ROOM IMAGE MAPPING
// ============================================
export const roomImageMap: Record<string, string> = {
  'room-suite': roomSuite,
  'room-deluxe': roomDeluxe,
  'room-standard': roomStandard,
  'room-family': roomFamily,
};

// ============================================
// TESTIMONIALS / REVIEWS
// ============================================
export const testimonials = [
  {
    id: '1',
    name: 'Priya Sharma',
    avatar: 'PS',
    rating: 5,
    comment: 'Exceptional stay! The rooms were spotless and the staff went above and beyond. Perfect location for Tirumala visit.',
    date: '2024-01-15',
    room: 'Deluxe Suite',
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    avatar: 'RK',
    rating: 5,
    comment: 'Best homestay in Tirupati. The temple assistance service was incredibly helpful. Will definitely return.',
    date: '2024-01-10',
    room: 'Family Villa',
  },
  {
    id: '3',
    name: 'Ananya Reddy',
    avatar: 'AR',
    rating: 4,
    comment: 'Great value for money. Clean rooms, friendly staff, and excellent breakfast. Highly recommended!',
    date: '2024-01-05',
    room: 'Premium Room',
  },
];

// ============================================
// NEARBY ATTRACTIONS
// ============================================
export const nearbyAttractions = [
  {
    id: '1',
    name: 'Tirumala Temple',
    distance: '25 km',
    description: 'Famous Sri Venkateswara Temple',
    icon: 'Temple',
  },
  {
    id: '2',
    name: 'APSRTC Bus Stand',
    distance: '500 m',
    description: 'Main bus station',
    icon: 'Bus',
  },
  {
    id: '3',
    name: 'Tirupati Railway Station',
    distance: '2 km',
    description: 'Main railway station',
    icon: 'Train',
  },
  {
    id: '4',
    name: 'Sri Padmavathi Temple',
    distance: '5 km',
    description: 'Ancient temple dedicated to Goddess Padmavathi',
    icon: 'Temple',
  },
];

// ============================================
// FAQ DATA
// ============================================
export const faqs = [
  {
    question: 'What are the check-in and check-out times?',
    answer: 'Check-in is at 12:00 PM and check-out is at 11:00 AM. Early check-in and late check-out can be arranged based on availability.',
  },
  {
    question: 'Do you provide Tirumala darshan assistance?',
    answer: 'Yes, we provide complete assistance for Tirumala darshan including ticket booking, transportation, and guidance.',
  },
  {
    question: 'Is parking available?',
    answer: 'Yes, we offer complimentary secure parking for all our guests.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit/debit cards, UPI, net banking, and cash payments.',
  },
  {
    question: 'Is breakfast included in the room rate?',
    answer: 'Breakfast is included in select room categories. Please check the room details for more information.',
  },
];

// ============================================
// UTILITY FUNCTIONS
// ============================================
export const getRoomById = (id: string) => roomTypes.find(room => room.id === id);
export const getAmenityById = (id: string) => amenities.find(amenity => amenity.id === id);
export const getFeaturedRooms = () => roomTypes.filter(room => room.featured);
export const getGalleryByCategory = (category: string) => 
  category === 'all' ? galleryImages : galleryImages.filter(img => img.category === category);
export const getFeaturedGallery = () => galleryImages.filter(img => img.featured);
