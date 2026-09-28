import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Users,
  CheckCircle,
  Clock,
  XCircle,
  LogIn,
  LogOut as LogOutIcon,
  ChevronRight,
  Calendar,
  Filter,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { bookingStorage } from '@/lib/storage';
import { initializeSeedData } from '@/lib/seed-data';

// Initialize seed data
initializeSeedData();

const statusConfig: Record<string, { label: string; icon: any; className: string }> = {
  pending: { label: 'Pending', icon: Clock, className: 'bg-amber-100 text-amber-700' },
  confirmed: { label: 'Confirmed', icon: CheckCircle, className: 'bg-emerald-100 text-emerald-700' },
  'checked-in': { label: 'Checked In', icon: LogIn, className: 'bg-blue-100 text-blue-700' },
  'checked-out': { label: 'Checked Out', icon: LogOutIcon, className: 'bg-gray-100 text-gray-600' },
  cancelled: { label: 'Cancelled', icon: XCircle, className: 'bg-red-100 text-red-700' },
};

const filterTabs = ['All', 'Pending', 'Confirmed', 'Checked In', 'Checked Out'];

export default function AdminBookings() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [dateRange] = useState('Oct 1-31, 2024');

  const bookings = useMemo(() => {
    let filtered = bookingStorage.getAll();

    if (statusFilter !== 'All') {
      const filterKey = statusFilter.toLowerCase().replace(' ', '-');
      filtered = filtered.filter(b => b.status === filterKey);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        b =>
          b.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.roomName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.guestEmail.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [searchQuery, statusFilter]);

  const stats = useMemo(() => {
    const all = bookingStorage.getAll();
    return {
      total: all.length,
      pending: all.filter(b => b.status === 'pending').length,
      confirmed: all.filter(b => b.status === 'confirmed').length,
      checkedIn: all.filter(b => b.status === 'checked-in').length,
    };
  }, []);

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    bookingStorage.update(bookingId, { status: newStatus as any });
    setSearchQuery(q => q);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Home</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground">Bookings</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl lg:text-3xl text-foreground">Bookings Management</h1>
          <p className="text-muted-foreground mt-1">Manage reservations, track availability, and update guest statuses.</p>
        </div>
        <Button className="bg-[#b8860b] hover:bg-[#8b6914] text-white gap-2 rounded-full">
          <Plus className="w-4 h-4" />
          New Booking
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-[#e8e4dd] p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#f5f3ef] flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#1a2e1a]" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-foreground">{stats.total}</p>
          <p className="text-sm text-muted-foreground">Total Bookings</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-[#e8e4dd] p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-foreground">{stats.pending}</p>
          <p className="text-sm text-muted-foreground">Pending</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-[#e8e4dd] p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-foreground">{stats.confirmed}</p>
          <p className="text-sm text-muted-foreground">Confirmed</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-[#e8e4dd] p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <LogIn className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-foreground">{stats.checkedIn}</p>
          <p className="text-sm text-muted-foreground">Checked In</p>
        </motion.div>
      </div>

      {/* Filters Row */}
      <div className="bg-white rounded-2xl border border-[#e8e4dd] p-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="relative flex gap-2 overflow-x-auto pb-2 lg:pb-0">
            {filterTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  statusFilter === tab
                    ? 'bg-[#1a2e1a] text-white'
                    : 'bg-white border border-[#e8e4dd] text-muted-foreground hover:border-[#1a2e1a]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search guest or booking ID..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl border-[#e8e4dd]"
              />
            </div>
            <Button variant="outline" className="gap-2 rounded-xl border-[#e8e4dd]">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">{dateRange}</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="gap-2 rounded-xl border-[#e8e4dd]">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl border border-[#e8e4dd] overflow-hidden">
        <div className="relative overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e8e4dd] bg-[#f9f8f6]">
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Guest Details</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Room Info</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Timeline</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Total</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => {
                const StatusIcon = statusConfig[booking.status]?.icon || Clock;
                const initials = booking.guestName.split(' ').map(n => n[0]).join('').toUpperCase();
                return (
                  <motion.tr
                    key={booking.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b border-[#e8e4dd] last:border-0 hover:bg-[#f9f8f6] transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-[#b8860b] text-white font-medium">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{booking.guestName}</p>
                          <p className="text-sm text-muted-foreground">{booking.guestEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-foreground">{booking.roomName}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Users className="w-3 h-3" /> {booking.guests} guests
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="text-foreground">{format(new Date(booking.checkIn), 'MMM d, yyyy')}</p>
                      <p className="text-sm text-muted-foreground">→ {format(new Date(booking.checkOut), 'MMM d, yyyy')}</p>
                    </td>
                    <td className="p-4">
                      <Badge className={`${statusConfig[booking.status]?.className || 'bg-gray-100'} border-0 gap-1`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig[booking.status]?.label || booking.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-foreground">₹{booking.totalAmount.toLocaleString()}</p>
                    </td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="hover:bg-[#f5f3ef]">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleStatusChange(booking.id, 'confirmed')}>
                            <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" /> Confirm
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(booking.id, 'checked-in')}>
                            <LogIn className="w-4 h-4 mr-2 text-blue-600" /> Check In
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(booking.id, 'checked-out')}>
                            <LogOutIcon className="w-4 h-4 mr-2 text-gray-600" /> Check Out
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleStatusChange(booking.id, 'cancelled')}>
                            <XCircle className="w-4 h-4 mr-2" /> Cancel
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {bookings.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No bookings found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
