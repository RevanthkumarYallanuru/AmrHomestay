import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Plus, 
  Phone, 
  Mail, 
  Star,
  Users,
  Clock,
  Coffee,
  Shield,
  ChevronRight,
  MoreHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { employeeStorage } from '@/lib/storage';
import { initializeSeedData } from '@/lib/seed-data';

// Initialize seed data
initializeSeedData();

// Mock employee data matching the design
const mockEmployees = [
  { 
    id: '1', 
    name: 'Rajesh Kumar', 
    role: 'Head Concierge', 
    department: 'Concierge',
    status: 'on-shift', 
    rating: 4.8,
    avatar: 'RK',
    phone: '+91 98765 43210',
    shift: '06:00 AM - 02:00 PM',
  },
  { 
    id: '2', 
    name: 'Priya Sharma', 
    role: 'Housekeeping Lead', 
    department: 'Housekeeping',
    status: 'on-shift', 
    rating: 5.0,
    avatar: 'PS',
    phone: '+91 98765 43211',
    shift: '08:00 AM - 04:00 PM',
  },
  { 
    id: '3', 
    name: 'Arjun Mehta', 
    role: 'Front Desk', 
    department: 'Concierge',
    status: 'off-duty', 
    rating: 4.2,
    avatar: 'AM',
    phone: '+91 98765 43212',
    shift: '02:00 PM - 10:00 PM',
  },
  { 
    id: '4', 
    name: 'Sarah Jenkins', 
    role: 'General Manager', 
    department: 'Concierge',
    status: 'on-shift', 
    rating: 4.9,
    avatar: 'SJ',
    phone: '+91 98765 43213',
    shift: '09:00 AM - 05:00 PM',
  },
  { 
    id: '5', 
    name: 'Vikram Patel', 
    role: 'Night Watch', 
    department: 'Security',
    status: 'off-duty', 
    rating: 4.5,
    avatar: 'VP',
    phone: '+91 98765 43214',
    shift: '10:00 PM - 06:00 AM',
  },
];

// Mock duty roster
const dutyRoster = [
  { time: '04:00 AM - 12:00 PM', name: 'Priya Sharma', role: 'Morning Shift Lead', status: 'Housekeeping', color: 'bg-emerald-500' },
  { time: '08:00 AM - 04:00 PM', name: 'Rajesh Kumar', role: 'Check-Ins', status: 'Concierge', color: 'bg-[#b8860b]' },
  { time: '12:00 PM - 08:00 PM', name: 'Arjun Mehta', role: 'Front Desk', status: 'Front Desk', color: 'bg-blue-500' },
  { time: '12:00 PM - 08:00 PM', name: 'Vikram Patel', role: 'Night Watch', status: 'Security', color: 'bg-gray-500' },
];

// Mock pending requests
const pendingRequests = [
  { id: 1, name: 'Ananya Singh', request: 'Leave Request', status: 'pending' },
];

const departmentFilters = ['All Staff', 'Housekeeping', 'Concierge', 'Kitchen', 'Security'];

const statusConfig: Record<string, { label: string; className: string }> = {
  'on-shift': { label: 'On Shift', className: 'bg-emerald-100 text-emerald-700' },
  'off-duty': { label: 'Off Duty', className: 'bg-gray-100 text-gray-600' },
  'on-leave': { label: 'On Leave', className: 'bg-orange-100 text-orange-700' },
  'on-break': { label: 'On Break', className: 'bg-blue-100 text-blue-700' },
};

export default function AdminStaff() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Staff');

  const employees = useMemo(() => {
    let filtered = mockEmployees;

    if (activeFilter !== 'All Staff') {
      filtered = filtered.filter(e => e.department === activeFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        e =>
          e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [searchQuery, activeFilter]);

  const stats = useMemo(() => {
    const all = mockEmployees;
    return {
      total: all.length,
      onDuty: all.filter(e => e.status === 'on-shift').length,
      onLeave: all.filter(e => e.status === 'on-leave').length,
      returning: 3,
      avgRating: (all.reduce((acc, e) => acc + (e.rating || 0), 0) / all.length).toFixed(1),
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Home</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground">Staff Management</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl lg:text-3xl text-foreground">Employee Directory</h1>
          <p className="text-muted-foreground mt-1">
            Manage roles, view performance, and organize shift schedules.
          </p>
        </div>
        <Button className="bg-[#b8860b] hover:bg-[#8b6914] text-white gap-2 rounded-full">
          <Plus className="w-4 h-4" />
          Add Member
        </Button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-[#e8e4dd] p-5"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-[#f5f3ef] flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#1a2e1a]" />
                </div>
              </div>
              <p className="text-2xl font-semibold text-foreground">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Staff</p>
              <Badge className="mt-2 bg-emerald-100 text-emerald-700 border-0">New</Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-[#e8e4dd] p-5"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
              <p className="text-2xl font-semibold text-foreground">{stats.onDuty}</p>
              <p className="text-sm text-muted-foreground">On Duty</p>
              <Badge className="mt-2 bg-emerald-100 text-emerald-700 border-0">Active</Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-[#e8e4dd] p-5"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-orange-600" />
                </div>
              </div>
              <p className="text-2xl font-semibold text-foreground">{stats.onLeave}</p>
              <p className="text-sm text-muted-foreground">On Leave</p>
              <p className="text-xs text-muted-foreground mt-2">{stats.returning} Returning</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl border border-[#e8e4dd] p-5"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-[#b8860b]/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-[#b8860b]" />
                </div>
              </div>
              <p className="text-2xl font-semibold text-foreground">{stats.avgRating}</p>
              <p className="text-sm text-muted-foreground">Avg. Performance</p>
              <Badge className="mt-2 bg-amber-100 text-amber-700 border-0">Trending ↑</Badge>
            </motion.div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, role or ID..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl border-[#e8e4dd]"
              />
            </div>
            <div className="relative flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {departmentFilters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeFilter === filter
                      ? 'bg-[#1a2e1a] text-white'
                      : 'bg-white border border-[#e8e4dd] text-muted-foreground hover:border-[#1a2e1a]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Employee Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {employees.map((employee, index) => (
              <motion.div
                key={employee.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-[#e8e4dd] p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <Badge className={`${statusConfig[employee.status]?.className || 'bg-gray-100 text-gray-600'} border-0`}>
                    • {statusConfig[employee.status]?.label || employee.status}
                  </Badge>
                  <button className="p-1 hover:bg-muted rounded">
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                <div className="flex flex-col items-center text-center mb-4">
                  <Avatar className="w-16 h-16 mb-3">
                    <AvatarFallback className="bg-[#b8860b] text-white text-lg font-medium">
                      {employee.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium text-foreground">{employee.name}</h3>
                  <p className="text-sm text-muted-foreground">{employee.role}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.round(employee.rating) ? 'fill-[#b8860b] text-[#b8860b]' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">{employee.rating}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 rounded-full gap-1">
                    <Phone className="w-3 h-3" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 rounded-full gap-1">
                    <Mail className="w-3 h-3" />
                    Email
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar - Duty Roster */}
        <div className="space-y-6">
          {/* Duty Roster */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl border border-[#e8e4dd] p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg text-foreground">Duty Roster</h3>
              <p className="text-sm text-muted-foreground">TODAY</p>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Oct 24, 2023</p>

            <div className="space-y-4">
              {dutyRoster.map((duty, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-1 h-12 rounded-full ${duty.color}`} />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">{duty.time}</p>
                    <p className="font-medium text-foreground text-sm">{duty.name}</p>
                    <p className="text-xs text-muted-foreground">{duty.role}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {duty.status}
                  </Badge>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pending Requests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl border border-[#e8e4dd] p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg text-foreground">Pending Requests</h3>
              <Badge className="bg-red-100 text-red-700 border-0">1</Badge>
            </div>

            {pendingRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between py-3 border-b border-[#e8e4dd] last:border-0">
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                      {request.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">{request.name}</p>
                    <p className="text-xs text-muted-foreground">{request.request}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">✓</button>
                  <button className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</button>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Quick Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-2"
          >
            <Badge className="bg-emerald-100 text-emerald-700 border-0">• On Shift</Badge>
            <Badge className="bg-orange-100 text-orange-700 border-0">• On Leave</Badge>
            <Badge className="bg-gray-100 text-gray-600 border-0">• On Shift</Badge>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
