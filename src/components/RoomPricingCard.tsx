import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Users, Bed, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RoomPricingCardProps {
  price: number;
  originalPrice?: number;
  maxGuests: number;
  bedType: string;
  roomSize: string;
  onBook: (nights: number, guests: number) => void;
}

export function RoomPricingCard({
  price,
  originalPrice,
  maxGuests,
  bedType,
  roomSize,
  onBook,
}: RoomPricingCardProps) {
  const [nights, setNights] = useState(1);
  const [guests, setGuests] = useState(1);

  const totalPrice = price * nights;
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const handleNightsChange = (value: number) => {
    if (value >= 1 && value <= 30) setNights(value);
  };

  const handleGuestsChange = (value: number) => {
    if (value >= 1 && value <= maxGuests) setGuests(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="lg:sticky lg:top-24 bg-white rounded-2xl border border-border p-6 lg:p-8 shadow-sm"
    >
      {/* Price Section */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl lg:text-4xl font-serif text-[#b8860b]">
            ₹{price.toLocaleString()}
          </span>
          {originalPrice && (
            <>
              <span className="text-lg text-muted-foreground line-through">
                ₹{originalPrice.toLocaleString()}
              </span>
              <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-medium">
                {discount}% off
              </span>
            </>
          )}
        </div>
        <p className="text-muted-foreground text-sm">per night</p>
      </div>

      {/* Room Specs */}
      <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-border">
        <div className="text-center">
          <Bed className="w-5 h-5 mx-auto mb-1 text-[#b8860b]" />
          <p className="text-xs text-muted-foreground line-clamp-1">{bedType}</p>
        </div>
        <div className="text-center">
          <Maximize2 className="w-5 h-5 mx-auto mb-1 text-[#b8860b]" />
          <p className="text-xs text-muted-foreground">{roomSize}</p>
        </div>
        <div className="text-center">
          <Users className="w-5 h-5 mx-auto mb-1 text-[#b8860b]" />
          <p className="text-xs text-muted-foreground">Up to {maxGuests}</p>
        </div>
      </div>

      {/* Nights Selector */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-foreground block mb-3">
          Number of Nights
        </label>
        <div className="flex items-center gap-3 bg-secondary rounded-lg p-2">
          <button
            onClick={() => handleNightsChange(nights - 1)}
            disabled={nights === 1}
            className="p-2 hover:bg-white/50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Decrease nights"
          >
            <Minus className="w-4 h-4" />
          </button>
          <input
            type="number"
            value={nights}
            onChange={(e) => handleNightsChange(parseInt(e.target.value) || 1)}
            min="1"
            max="30"
            className="flex-1 text-center bg-transparent text-lg font-semibold outline-none"
            aria-label="Number of nights"
          />
          <button
            onClick={() => handleNightsChange(nights + 1)}
            disabled={nights === 30}
            className="p-2 hover:bg-white/50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Increase nights"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Guests Selector */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-foreground block mb-3">
          Number of Guests
        </label>
        <div className="flex items-center gap-3 bg-secondary rounded-lg p-2">
          <button
            onClick={() => handleGuestsChange(guests - 1)}
            disabled={guests === 1}
            className="p-2 hover:bg-white/50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Decrease guests"
          >
            <Minus className="w-4 h-4" />
          </button>
          <input
            type="number"
            value={guests}
            onChange={(e) => handleGuestsChange(parseInt(e.target.value) || 1)}
            min="1"
            max={maxGuests}
            className="flex-1 text-center bg-transparent text-lg font-semibold outline-none"
            aria-label="Number of guests"
          />
          <button
            onClick={() => handleGuestsChange(guests + 1)}
            disabled={guests === maxGuests}
            className="p-2 hover:bg-white/50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Increase guests"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-2 mb-6 pb-6 border-b border-border text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">₹{price.toLocaleString()} × {nights} night{nights > 1 ? 's' : ''}</span>
          <span className="font-semibold">₹{totalPrice.toLocaleString()}</span>
        </div>
        {guests > 0 && (
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">{guests} guest{guests > 1 ? 's' : ''}</span>
          </div>
        )}
      </div>

      {/* Total Price */}
      <div className="mb-6 p-4 bg-[#b8860b]/10 rounded-lg">
        <div className="flex justify-between items-center mb-1">
          <span className="text-muted-foreground">Total Price</span>
          <span className="text-2xl lg:text-3xl font-serif text-[#b8860b]">
            ₹{totalPrice.toLocaleString()}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          ₹{(totalPrice / nights).toLocaleString()} per night
        </p>
      </div>

      {/* Book Now Button */}
      <Button
        onClick={() => onBook(nights, guests)}
        size="lg"
        className="w-full bg-[#b8860b] hover:bg-[#a07608] text-white rounded-full font-semibold text-base"
      >
        Book Now
      </Button>

      {/* Additional Info */}
      <p className="text-xs text-muted-foreground text-center mt-4">
        Free cancellation up to 48 hours before check-in
      </p>
    </motion.div>
  );
}
