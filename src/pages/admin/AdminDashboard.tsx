import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CalendarDays, 
  DollarSign, 
  Users, 
  Star, 
  TrendingUp,
  ArrowUpRight,
  BedDouble,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { bookingStorage, roomStorage, reviewStorage } from '@/lib/storage';
import { initializeSeedData } from '@/lib/seed-data';
import { format } from 'date-fns';

// Initialize seed data
initializeSeedData();

export default function AdminDashboard() {
  const stats = useMemo(() => {
    const bookings = bookingStorage.getAll();
    const rooms = roomStorage.getAll();
    const reviews = reviewStorage.getAll();

    const totalRevenue = bookings
      .filter(b => b.status === 'confirmed' || b.status === 'checked-in' || b.status === 'checked-out')
      .reduce((acc, b) => acc + b.totalAmount, 0);

    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length || 0;
    const occupancyRate = Math.round((rooms.filter(r => r.status === 'occupied').length / rooms.length) * 100);

    return {
      totalRevenue,
      avgDailyRate: Math.round(totalRevenue / 30),
      occupancyRate,
      totalBookings: bookings.length,
      pendingBookings: bookings.filter(b => b.status === 'pending').length,
      checkedIn: bookings.filter(b => b.status === 'checked-in').length,
      avgRating: avgRating.toFixed(1),
      totalReviews: reviews.length,
    };
  }, []);

  const recentBookings = useMemo(() => {
    return bookingStorage.getAll()
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  }, []);

  const statCards = [
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      subtitle: 'This month',
      icon: DollarSign,
      trend: '+12%',
      trendUp: true,
    },
    {
      title: 'Avg. Daily Rate',
      value: `₹${stats.avgDailyRate.toLocaleString()}`,
      subtitle: 'Per room',
      icon: TrendingUp,
      trend: '+5%',
      trendUp: true,
    },
    {
      title: 'Occupancy Rate',
      value: `${stats.occupancyRate}%`,
      subtitle: 'Current',
      icon: BedDouble,
      trend: stats.occupancyRate > 70 ? 'High' : 'Normal',
      trendUp: stats.occupancyRate > 70,
    },
    {
      title: 'Guest Rating',
      value: stats.avgRating,
      subtitle: `${stats.totalReviews} reviews`,
      icon: Star,
      trend: 'Excellent',
      trendUp: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="font-serif text-2xl lg:text-3xl text-foreground">Daily Overview</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's what's happening at Viha Home Stay today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card-premium p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-accent" />
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  stat.trendUp
                    ? 'bg-success/10 text-success'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {stat.trend}
              </span>
            </div>
            <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.subtitle}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions + Recent Bookings */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-premium p-6"
        >
          <h2 className="font-serif text-lg text-foreground mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link to="/admin/bookings">
              <Button variant="outline" className="w-full justify-between group">
                View All Bookings
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </Link>
            <Link to="/admin/rooms">
              <Button variant="outline" className="w-full justify-between group">
                Manage Rooms
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </Link>
            <Link to="/admin/reviews">
              <Button variant="outline" className="w-full justify-between group">
                View Reviews
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Pending Items */}
          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="text-sm font-medium text-foreground mb-3">Pending Items</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Pending Bookings</span>
                <span className="font-medium text-warning">{stats.pendingBookings}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Currently Checked In</span>
                <span className="font-medium text-success">{stats.checkedIn}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 card-premium p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg text-foreground">Recent Bookings</h2>
            <Link to="/admin/bookings">
              <Button variant="ghost" size="sm" className="text-accent">
                View All
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {recentBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                  {booking.guestName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{booking.guestName}</p>
                  <p className="text-sm text-muted-foreground truncate">{booking.roomName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    {format(new Date(booking.checkIn), 'MMM d')} - {format(new Date(booking.checkOut), 'MMM d')}
                  </p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      booking.status === 'confirmed'
                        ? 'bg-success/10 text-success'
                        : booking.status === 'pending'
                        ? 'bg-warning/10 text-warning'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
