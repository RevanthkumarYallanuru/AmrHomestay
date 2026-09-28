// Core Types for Viha Home Stay

export type UserRole = 'admin' | 'guest' | 'staff';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export interface Room {
  id: string;
  name: string;
  type: 'standard' | 'deluxe' | 'suite' | 'family';
  description: string;
  price: number;
  capacity: number;
  amenities: string[];
  images: string[];
  floorNumber: number;
  status: 'available' | 'occupied' | 'cleaning' | 'maintenance';
  featured?: boolean;
}

export interface Booking {
  id: string;
  guestId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
  specialRequests?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  method: 'card' | 'upi' | 'cash' | 'bank';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  guestId: string;
  guestName: string;
  guestAvatar?: string;
  roomId: string;
  roomName: string;
  rating: number;
  comment: string;
  reply?: string;
  featured?: boolean;
  createdAt: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'housekeeping' | 'concierge' | 'kitchen' | 'security' | 'front-desk';
  status: 'on-shift' | 'off-duty' | 'on-leave' | 'on-break';
  avatar?: string;
  rating?: number;
  shift?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'booking' | 'review' | 'system' | 'alert';
  read: boolean;
  createdAt: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// Stats Types
export interface DashboardStats {
  totalRevenue: number;
  avgDailyRate: number;
  occupancyRate: number;
  totalBookings: number;
  pendingBookings: number;
  checkedInGuests: number;
}
