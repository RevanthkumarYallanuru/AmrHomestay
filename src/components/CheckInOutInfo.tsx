import { motion } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';
import { hotelInfo } from '@/lib/data';

interface CheckInOutInfoProps {
  isCollapsible?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function CheckInOutInfo({ isCollapsible = false, isOpen = true, onToggle }: CheckInOutInfoProps) {
  const timings = hotelInfo.timings;
  const address = hotelInfo.address;

  const containerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="rounded-lg border border-border bg-card p-6"
    >
      {/* Header with toggle button (mobile) */}
      {isCollapsible && (
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between mb-4 p-0 hover:opacity-70 transition-opacity"
        >
          <h3 className="text-lg font-semibold text-foreground">Check-in & Check-out</h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-[#b8860b]">▼</span>
          </motion.div>
        </button>
      )}

      {/* Header without toggle (desktop) */}
      {!isCollapsible && (
        <h3 className="text-lg font-semibold text-foreground mb-6">Check-in & Check-out</h3>
      )}

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial={isCollapsible && !isOpen ? 'hidden' : 'visible'}
        animate={isCollapsible && !isOpen ? 'hidden' : 'visible'}
        className="overflow-hidden"
      >
        <div className="space-y-6">
          {/* Check-in & Check-out Times */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              custom={0}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-4 rounded-lg bg-secondary/50"
            >
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-[#b8860b]" />
                <p className="text-sm text-muted-foreground font-medium">Check-in</p>
              </div>
              <p className="text-lg font-semibold text-foreground">{timings.checkIn}</p>
            </motion.div>

            <motion.div
              custom={1}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-4 rounded-lg bg-secondary/50"
            >
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-[#b8860b]" />
                <p className="text-sm text-muted-foreground font-medium">Check-out</p>
              </div>
              <p className="text-lg font-semibold text-foreground">{timings.checkOut}</p>
            </motion.div>
          </div>

          {/* Important Notes */}
          <motion.div
            custom={2}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3 pt-2 border-t border-border"
          >
            <p className="text-sm font-medium text-foreground">Important Information:</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-[#b8860b] flex-shrink-0">✓</span>
                <span>Early check-in available upon request (subject to room availability)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#b8860b] flex-shrink-0">✓</span>
                <span>Late check-out can be arranged for an additional fee</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#b8860b] flex-shrink-0">✓</span>
                <span>Reception available 24/7 for assistance</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#b8860b] flex-shrink-0">✓</span>
                <span>Luggage storage available before check-in and after check-out</span>
              </li>
            </ul>
          </motion.div>

          {/* Location Info */}
          <motion.div
            custom={3}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3 pt-2 border-t border-border"
          >
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#b8860b] mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Property Address</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {address.line1}
                  <br />
                  {address.line2}
                  <br />
                  {address.city}, {address.state} {address.pincode}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
