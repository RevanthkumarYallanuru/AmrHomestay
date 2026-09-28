import { useMemo } from 'react';
import { roomTypes, amenities as amenitiesData, roomImageMap } from '@/lib/data';

/**
 * Hook to fetch room details and related data
 * @param roomId - The ID of the room to fetch
 * @returns Room object with resolved amenities and images, or null if not found
 */
export function useRoomDetails(roomId?: string) {
  return useMemo(() => {
    if (!roomId) return null;

    const room = roomTypes.find(r => r.id === roomId);
    if (!room) return null;

    // Resolve amenities
    const amenities = room.amenities
      .map(id => amenitiesData.find(a => a.id === id))
      .filter(Boolean);

    // Resolve images
    const images = room.images.map(
      imgId => roomImageMap[imgId] || roomImageMap['room-suite']
    );

    return {
      ...room,
      amenities: amenities,
      images: images,
    };
  }, [roomId]);
}

/**
 * Hook to calculate total room price based on nights and guests
 * @param pricePerNight - Base price per night
 * @param nights - Number of nights
 * @param guests - Number of guests
 * @returns Calculated total price
 */
export function usePriceCalculation(
  pricePerNight: number,
  nights: number = 1,
  guests: number = 1
) {
  return useMemo(() => {
    return {
      pricePerNight,
      nights,
      guests,
      subtotal: pricePerNight * nights,
      pricePerGuest: Math.ceil((pricePerNight * nights) / guests),
    };
  }, [pricePerNight, nights, guests]);
}

/**
 * Hook to get similar rooms (same type, different room)
 * @param roomId - Current room ID
 * @param type - Room type to match
 * @param limit - Maximum number of similar rooms to return
 * @returns Array of similar rooms
 */
export function useSimilarRooms(roomId?: string, type?: string, limit: number = 3) {
  return useMemo(() => {
    if (!roomId || !type) return [];

    return roomTypes
      .filter(room => room.type === type && room.id !== roomId)
      .slice(0, limit);
  }, [roomId, type, limit]);
}

/**
 * Hook to validate room availability
 * @param roomId - Room ID to check
 * @returns Availability status object
 */
export function useRoomAvailability(roomId?: string) {
  return useMemo(() => {
    if (!roomId) {
      return {
        isAvailable: false,
        status: 'unknown',
        message: 'Room not found',
      };
    }

    const room = roomTypes.find(r => r.id === roomId);
    if (!room) {
      return {
        isAvailable: false,
        status: 'not-found',
        message: 'Room does not exist',
      };
    }

    const isAvailable = room.status === 'available';
    return {
      isAvailable,
      status: room.status,
      message: isAvailable
        ? 'Available for booking'
        : `Room is currently ${room.status}`,
    };
  }, [roomId]);
}

/**
 * Hook to format price in Indian Rupees
 * @param amount - Amount to format
 * @returns Formatted price string
 */
export function useFormattedPrice(amount: number) {
  return useMemo(
    () => `₹${amount.toLocaleString('en-IN')}`,
    [amount]
  );
}

/**
 * Hook to calculate discount percentage
 * @param originalPrice - Original price
 * @param currentPrice - Current discounted price
 * @returns Discount percentage or 0 if no discount
 */
export function useDiscountPercentage(originalPrice?: number, currentPrice?: number) {
  return useMemo(() => {
    if (!originalPrice || !currentPrice || currentPrice >= originalPrice) {
      return 0;
    }
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  }, [originalPrice, currentPrice]);
}
