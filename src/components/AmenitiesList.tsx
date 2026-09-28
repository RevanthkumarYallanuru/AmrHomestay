import { motion } from 'framer-motion';
import { Wifi, Wind, Tv, Coffee, Bath, Home, Utensils, Car, Bell, Shirt, MapPin } from 'lucide-react';

const amenityIconMap: Record<string, React.ElementType> = {
  wifi: Wifi,
  ac: Wind,
  tv: Tv,
  minibar: Coffee,
  bathtub: Bath,
  balcony: Home,
  kitchen: Utensils,
  parking: Car,
  roomservice: Bell,
  laundry: Shirt,
  temple: MapPin,
};

interface AmenitiesListProps {
  amenities: string[];
  title?: string;
}

export function AmenitiesList({ amenities, title = 'Amenities' }: AmenitiesListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-2xl font-serif text-foreground mb-6">{title}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {amenities.map((amenity, index) => {
            const Icon = amenityIconMap[amenity] || Coffee;
            return (
              <motion.div
                key={amenity}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <Icon className="w-5 h-5 text-[#b8860b] flex-shrink-0" />
                <span className="text-sm font-medium text-foreground capitalize">
                  {amenity.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
