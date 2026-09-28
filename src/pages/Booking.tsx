import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { roomStorage } from '@/lib/storage';
import { initializeSeedData } from '@/lib/seed-data';
import { sendBookingToWhatsApp } from '@/lib/whatsapp';
import { useToast } from '@/hooks/use-toast';

initializeSeedData();

const bookingSchema = z.object({
  guestName: z.string().min(2, 'Name must be at least 2 characters'),
  guestEmail: z.string().email('Invalid email address'),
  guestPhone: z.string().regex(/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number'),
  roomId: z.string().min(1, 'Please select a room'),
  checkIn: z.string().min(1, 'Check-in date is required'),
  checkOut: z.string().min(1, 'Check-out date is required'),
  guests: z.number().min(1, 'Number of guests is required'),
  specialRequests: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookingPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [nights, setNights] = useState(1);
  const rooms = roomStorage.getAll();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guestName: '',
      guestEmail: '',
      guestPhone: '',
      roomId: '',
      checkIn: '',
      checkOut: '',
      guests: 1,
      specialRequests: '',
    },
  });

  const selectedRoomId = form.watch('roomId');
  const selectedRoom = rooms.find(r => r.id === selectedRoomId);

  const checkInDate = form.watch('checkIn');
  const checkOutDate = form.watch('checkOut');

  const calculateNights = () => {
    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const calculatedNights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      if (calculatedNights > 0) {
        setNights(calculatedNights);
      }
    }
  };

  const onSubmit = async (data: BookingFormValues) => {
    calculateNights();
    setIsLoading(true);

    try {
      const room = rooms.find(r => r.id === data.roomId);
      if (!room) throw new Error('Room not found');

      const totalAmount = room.price * nights;

      const bookingDetails = {
        guestName: data.guestName,
        guestPhone: data.guestPhone,
        guestEmail: data.guestEmail,
        roomName: room.name,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        guests: data.guests,
        totalAmount: totalAmount,
        specialRequests: data.specialRequests,
      };

      sendBookingToWhatsApp(bookingDetails);

      toast({
        title: 'Booking Request Sent!',
        description: 'Your booking details have been sent to our team via WhatsApp. We will confirm your reservation shortly.',
        duration: 5000,
      });

      setTimeout(() => {
        form.reset();
      }, 1000);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send booking request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const totalAmount = selectedRoom ? selectedRoom.price * nights : 0;

  return (
    <div className="min-h-screen bg-background pt-20 pb-20">
      {/* Header */}
      <section className="bg-secondary py-16">
        <div className="section-container text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent font-medium text-sm tracking-wider uppercase"
          >
            RESERVE YOUR STAY
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mt-4 mb-6"
          >
            Book Your Perfect Room
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Choose your ideal room and let us make your stay unforgettable.
          </motion.p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="relative py-12">
        <div className="section-container max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-premium p-8 lg:p-12"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Guest Name */}
                <FormField
                  control={form.control}
                  name="guestName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} className="h-11" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="guestEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" {...field} className="h-11" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="guestPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">WhatsApp Number (10 digits)</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="9876543210"
                          maxLength="10"
                          {...field}
                          className="h-11"
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Room Selection */}
                <FormField
                  control={form.control}
                  name="roomId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">Select Room</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Choose a room" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {rooms.filter(r => r.status === 'available').map((room) => (
                            <SelectItem key={room.id} value={room.id}>
                              {room.name} - ₹{room.price}/night
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Check-in */}
                <FormField
                  control={form.control}
                  name="checkIn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">Check-in Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className="h-11"
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => {
                            field.onChange(e);
                            calculateNights();
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Check-out */}
                <FormField
                  control={form.control}
                  name="checkOut"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">Check-out Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className="h-11"
                          min={checkInDate || new Date().toISOString().split('T')[0]}
                          onChange={(e) => {
                            field.onChange(e);
                            calculateNights();
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Number of Guests */}
                <FormField
                  control={form.control}
                  name="guests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">Number of Guests</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          {...field}
                          className="h-11"
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Special Requests */}
                <FormField
                  control={form.control}
                  name="specialRequests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">Special Requests (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Any special requests for your stay?" {...field} className="min-h-24" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Price Summary */}
                {selectedRoom && (
                  <div className="bg-secondary p-6 rounded-lg space-y-3 border border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">₹{selectedRoom.price}/night</span>
                      <span className="font-medium">₹{selectedRoom.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{nights} night{nights > 1 ? 's' : ''}</span>
                      <span className="font-medium">×{nights}</span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between">
                      <span className="font-semibold">Total Amount</span>
                      <span className="text-accent text-xl font-serif">₹{totalAmount}</span>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading || !selectedRoom}
                  className="btn-gold w-full h-12 text-base"
                >
                  {isLoading ? 'Processing...' : 'Send Booking Request via WhatsApp'}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  Your booking request will be sent to our team via WhatsApp for confirmation.
                </p>
              </form>
            </Form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
