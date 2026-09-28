// WhatsApp Message Integration for Bookings
const ADMIN_PHONE = "917207357312"; // WhatsApp number without + symbol
const WHATSAPP_API_URL = "https://api.whatsapp.com/send";

export interface BookingDetails {
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  specialRequests?: string;
}

/**
 * Format booking details into a WhatsApp message
 */
export function formatBookingMessage(booking: BookingDetails): string {
  const checkInDate = new Date(booking.checkIn).toLocaleDateString('en-IN');
  const checkOutDate = new Date(booking.checkOut).toLocaleDateString('en-IN');
  
  const message = `
🏨 *New Booking Request at Viha Stay Suite*

👤 *Guest Details:*
Name: ${booking.guestName}
Email: ${booking.guestEmail}
Phone: ${booking.guestPhone}

🛏️ *Room Details:*
Room: ${booking.roomName}
Guests: ${booking.guests}
Check-in: ${checkInDate}
Check-out: ${checkOutDate}

💰 *Booking Amount:*
₹${booking.totalAmount}

${booking.specialRequests ? `📝 *Special Requests:*\n${booking.specialRequests}\n` : ''}

Please confirm this booking by replying to this message.
  `.trim();

  return message;
}

/**
 * Send booking details to admin via WhatsApp
 */
export function sendBookingToWhatsApp(booking: BookingDetails): void {
  const message = formatBookingMessage(booking);
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `${WHATSAPP_API_URL}?phone=${ADMIN_PHONE}&text=${encodedMessage}`;
  
  // Open WhatsApp Web or WhatsApp app
  window.open(whatsappURL, '_blank');
}

/**
 * Create a shareable WhatsApp link for admin
 */
export function getWhatsAppAdminLink(): string {
  return `https://wa.me/${ADMIN_PHONE}`;
}

/**
 * Send booking confirmation message to guest
 */
export function sendBookingConfirmationToGuest(booking: BookingDetails): void {
  const message = `
Thank you for booking at Viha Stay Suite!

We've received your booking request:
- Room: ${booking.roomName}
- Check-in: ${new Date(booking.checkIn).toLocaleDateString('en-IN')}
- Check-out: ${new Date(booking.checkOut).toLocaleDateString('en-IN')}
- Amount: ₹${booking.totalAmount}

Our team will confirm your booking shortly. You'll receive a confirmation message on this number.
  `.trim();

  const encodedMessage = encodeURIComponent(message);
  const phoneWithoutPlus = booking.guestPhone.replace(/\D/g, '');
  const whatsappURL = `${WHATSAPP_API_URL}?phone=${phoneWithoutPlus}&text=${encodedMessage}`;
  
  window.open(whatsappURL, '_blank');
}
