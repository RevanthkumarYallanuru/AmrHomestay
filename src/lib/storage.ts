// LocalStorage utilities for Viha Home Stay
import type { User, Room, Booking, Payment, Review, Employee, Notification, Note } from '@/types';

const STORAGE_KEYS = {
  USERS: 'viha_users',
  CURRENT_USER: 'viha_current_user',
  ROOMS: 'viha_rooms',
  BOOKINGS: 'viha_bookings',
  PAYMENTS: 'viha_payments',
  REVIEWS: 'viha_reviews',
  EMPLOYEES: 'viha_employees',
  NOTIFICATIONS: 'viha_notifications',
  NOTES: 'viha_notes',
} as const;

// Generic storage helpers
function getItem<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// User operations
export const userStorage = {
  getAll: (): User[] => getItem(STORAGE_KEYS.USERS, []),
  
  getById: (id: string): User | undefined => {
    const users = userStorage.getAll();
    return users.find(u => u.id === id);
  },
  
  getByEmail: (email: string): User | undefined => {
    const users = userStorage.getAll();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },
  
  create: (user: Omit<User, 'id' | 'createdAt'>): User => {
    const users = userStorage.getAll();
    const newUser: User = {
      ...user,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    setItem(STORAGE_KEYS.USERS, users);
    return newUser;
  },
  
  getCurrentUser: (): User | null => getItem(STORAGE_KEYS.CURRENT_USER, null),
  
  setCurrentUser: (user: User | null): void => {
    if (user) {
      setItem(STORAGE_KEYS.CURRENT_USER, user);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  },
};

// Room operations
export const roomStorage = {
  getAll: (): Room[] => getItem(STORAGE_KEYS.ROOMS, []),
  
  getById: (id: string): Room | undefined => {
    const rooms = roomStorage.getAll();
    return rooms.find(r => r.id === id);
  },
  
  create: (room: Omit<Room, 'id'>): Room => {
    const rooms = roomStorage.getAll();
    const newRoom: Room = { ...room, id: crypto.randomUUID() };
    rooms.push(newRoom);
    setItem(STORAGE_KEYS.ROOMS, rooms);
    return newRoom;
  },
  
  update: (id: string, updates: Partial<Room>): Room | undefined => {
    const rooms = roomStorage.getAll();
    const index = rooms.findIndex(r => r.id === id);
    if (index === -1) return undefined;
    rooms[index] = { ...rooms[index], ...updates };
    setItem(STORAGE_KEYS.ROOMS, rooms);
    return rooms[index];
  },
  
  delete: (id: string): boolean => {
    const rooms = roomStorage.getAll();
    const filtered = rooms.filter(r => r.id !== id);
    if (filtered.length === rooms.length) return false;
    setItem(STORAGE_KEYS.ROOMS, filtered);
    return true;
  },
  
  getAvailable: (): Room[] => {
    return roomStorage.getAll().filter(r => r.status === 'available');
  },
};

// Booking operations
export const bookingStorage = {
  getAll: (): Booking[] => getItem(STORAGE_KEYS.BOOKINGS, []),
  
  getById: (id: string): Booking | undefined => {
    const bookings = bookingStorage.getAll();
    return bookings.find(b => b.id === id);
  },
  
  getByGuestId: (guestId: string): Booking[] => {
    return bookingStorage.getAll().filter(b => b.guestId === guestId);
  },
  
  create: (booking: Omit<Booking, 'id' | 'createdAt'>): Booking => {
    const bookings = bookingStorage.getAll();
    const newBooking: Booking = {
      ...booking,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    bookings.push(newBooking);
    setItem(STORAGE_KEYS.BOOKINGS, bookings);
    return newBooking;
  },
  
  update: (id: string, updates: Partial<Booking>): Booking | undefined => {
    const bookings = bookingStorage.getAll();
    const index = bookings.findIndex(b => b.id === id);
    if (index === -1) return undefined;
    bookings[index] = { ...bookings[index], ...updates };
    setItem(STORAGE_KEYS.BOOKINGS, bookings);
    return bookings[index];
  },
  
  delete: (id: string): boolean => {
    const bookings = bookingStorage.getAll();
    const filtered = bookings.filter(b => b.id !== id);
    if (filtered.length === bookings.length) return false;
    setItem(STORAGE_KEYS.BOOKINGS, filtered);
    return true;
  },
};

// Payment operations
export const paymentStorage = {
  getAll: (): Payment[] => getItem(STORAGE_KEYS.PAYMENTS, []),
  
  create: (payment: Omit<Payment, 'id' | 'createdAt'>): Payment => {
    const payments = paymentStorage.getAll();
    const newPayment: Payment = {
      ...payment,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    payments.push(newPayment);
    setItem(STORAGE_KEYS.PAYMENTS, payments);
    return newPayment;
  },
  
  getByBookingId: (bookingId: string): Payment | undefined => {
    return paymentStorage.getAll().find(p => p.bookingId === bookingId);
  },
};

// Review operations
export const reviewStorage = {
  getAll: (): Review[] => getItem(STORAGE_KEYS.REVIEWS, []),
  
  create: (review: Omit<Review, 'id' | 'createdAt'>): Review => {
    const reviews = reviewStorage.getAll();
    const newReview: Review = {
      ...review,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    reviews.push(newReview);
    setItem(STORAGE_KEYS.REVIEWS, reviews);
    return newReview;
  },
  
  update: (id: string, updates: Partial<Review>): Review | undefined => {
    const reviews = reviewStorage.getAll();
    const index = reviews.findIndex(r => r.id === id);
    if (index === -1) return undefined;
    reviews[index] = { ...reviews[index], ...updates };
    setItem(STORAGE_KEYS.REVIEWS, reviews);
    return reviews[index];
  },
  
  getFeatured: (): Review[] => {
    return reviewStorage.getAll().filter(r => r.featured);
  },
};

// Employee operations
export const employeeStorage = {
  getAll: (): Employee[] => getItem(STORAGE_KEYS.EMPLOYEES, []),
  
  create: (employee: Omit<Employee, 'id'>): Employee => {
    const employees = employeeStorage.getAll();
    const newEmployee: Employee = { ...employee, id: crypto.randomUUID() };
    employees.push(newEmployee);
    setItem(STORAGE_KEYS.EMPLOYEES, employees);
    return newEmployee;
  },
  
  update: (id: string, updates: Partial<Employee>): Employee | undefined => {
    const employees = employeeStorage.getAll();
    const index = employees.findIndex(e => e.id === id);
    if (index === -1) return undefined;
    employees[index] = { ...employees[index], ...updates };
    setItem(STORAGE_KEYS.EMPLOYEES, employees);
    return employees[index];
  },
};

// Notification operations
export const notificationStorage = {
  getAll: (): Notification[] => getItem(STORAGE_KEYS.NOTIFICATIONS, []),
  
  create: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>): Notification => {
    const notifications = notificationStorage.getAll();
    const newNotification: Notification = {
      ...notification,
      id: crypto.randomUUID(),
      read: false,
      createdAt: new Date().toISOString(),
    };
    notifications.unshift(newNotification);
    setItem(STORAGE_KEYS.NOTIFICATIONS, notifications);
    return newNotification;
  },
  
  markAsRead: (id: string): void => {
    const notifications = notificationStorage.getAll();
    const index = notifications.findIndex(n => n.id === id);
    if (index !== -1) {
      notifications[index].read = true;
      setItem(STORAGE_KEYS.NOTIFICATIONS, notifications);
    }
  },
  
  getUnreadCount: (): number => {
    return notificationStorage.getAll().filter(n => !n.read).length;
  },
};

// Note operations
export const noteStorage = {
  getAll: (): Note[] => getItem(STORAGE_KEYS.NOTES, []),
  
  create: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Note => {
    const notes = noteStorage.getAll();
    const now = new Date().toISOString();
    const newNote: Note = {
      ...note,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    notes.unshift(newNote);
    setItem(STORAGE_KEYS.NOTES, notes);
    return newNote;
  },
  
  update: (id: string, updates: Partial<Note>): Note | undefined => {
    const notes = noteStorage.getAll();
    const index = notes.findIndex(n => n.id === id);
    if (index === -1) return undefined;
    notes[index] = { ...notes[index], ...updates, updatedAt: new Date().toISOString() };
    setItem(STORAGE_KEYS.NOTES, notes);
    return notes[index];
  },
  
  delete: (id: string): boolean => {
    const notes = noteStorage.getAll();
    const filtered = notes.filter(n => n.id !== id);
    if (filtered.length === notes.length) return false;
    setItem(STORAGE_KEYS.NOTES, filtered);
    return true;
  },
};
