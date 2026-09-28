import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { bookingStorage, paymentStorage } from '@/lib/storage';
import { initializeSeedData } from '@/lib/seed-data';
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns';

// Initialize seed data
initializeSeedData();

// Mock transaction data
const mockTransactions = [
  { id: 1, date: '2023-10-24', description: '', guest: 'Sarah Jenkins', transactionId: 'INV-3921', type: 'Payment', status: 'Completed', amount: 1200 },
  { id: 2, date: '2023-10-23', description: 'Cleaning Fee Payout', guest: '', transactionId: 'PTX-4401', type: 'Payout', status: 'Pending', amount: -150 },
  { id: 3, date: '2023-10-23', description: '', guest: 'Michael Ross', transactionId: 'INV-3920', type: 'Payment', status: 'Completed', amount: 850 },
  { id: 4, date: '2023-10-22', description: '', guest: 'Elena Rodriguez', transactionId: 'INV-3919', type: 'Payment', status: 'Completed', amount: 2400 },
  { id: 5, date: '2023-10-21', description: 'Staff Salaries', guest: '', transactionId: 'PTX-4400', type: 'Payout', status: 'Completed', amount: -5000 },
];

export default function AdminEarnings() {
  const [dateRange, setDateRange] = useState('30 Days');
  const [activeTab, setActiveTab] = useState<'30 Days' | '3 Months' | 'Year'>('30 Days');

  const stats = useMemo(() => {
    const bookings = bookingStorage.getAll();
    const completedBookings = bookings.filter(
      b => b.status === 'confirmed' || b.status === 'checked-in' || b.status === 'checked-out'
    );
    
    const totalRevenue = completedBookings.reduce((acc, b) => acc + b.totalAmount, 0);
    const avgDailyRate = completedBookings.length > 0 
      ? Math.round(totalRevenue / completedBookings.length) 
      : 0;
    
    // Calculate net profit (mock calculation: 68% of revenue)
    const netProfit = Math.round(totalRevenue * 0.68);
    const occupancyRate = 85; // Mock value

    return {
      totalRevenue,
      avgDailyRate,
      netProfit,
      occupancyRate,
      lastMonthRevenue: Math.round(totalRevenue * 0.88), // 12% less last month
    };
  }, []);

  // Generate chart data points
  const chartData = useMemo(() => {
    const points = [];
    for (let i = 30; i >= 0; i -= 5) {
      points.push({
        date: format(subDays(new Date(), i), 'MMM dd'),
        value: Math.random() * 20000 + 25000,
      });
    }
    return points;
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl lg:text-3xl text-foreground">Earnings Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Track revenue, analyze trends, and manage your financial performance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-border">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-foreground">Oct 1 - Oct 31, 2023</span>
          </div>
          <Button variant="outline" size="icon">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Revenue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-[#e8e4dd] p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground uppercase tracking-wide">Total Revenue</p>
            <Badge className="bg-emerald-100 text-emerald-700 border-0">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +12%
            </Badge>
          </div>
          <p className="text-3xl font-semibold text-foreground">₹{stats.totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground mt-1">
            vs last month (₹{stats.lastMonthRevenue.toLocaleString()})
          </p>
          <div className="mt-4 h-2 bg-[#f5f3ef] rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '75%' }} />
          </div>
        </motion.div>

        {/* Avg Daily Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-[#e8e4dd] p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground uppercase tracking-wide">Avg. Daily Rate</p>
            <Badge className="bg-emerald-100 text-emerald-700 border-0">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +5%
            </Badge>
          </div>
          <p className="text-3xl font-semibold text-foreground">₹{stats.avgDailyRate.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Occupancy rate: {stats.occupancyRate}%
          </p>
          <div className="mt-4 h-2 bg-[#f5f3ef] rounded-full overflow-hidden">
            <div className="h-full bg-[#b8860b] rounded-full" style={{ width: `${stats.occupancyRate}%` }} />
          </div>
        </motion.div>

        {/* Net Profit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1a2e1a] rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-white/70 uppercase tracking-wide">Net Profit</p>
            <Badge className="bg-white/20 text-white border-0">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +8%
            </Badge>
          </div>
          <p className="text-3xl font-semibold text-white">₹{stats.netProfit.toLocaleString()}</p>
          <p className="text-sm text-white/60 mt-1">After expenses & fees</p>
          <div className="mt-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border border-[#e8e4dd] p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-serif text-lg text-foreground">Revenue Trends</h3>
            <p className="text-sm text-muted-foreground">Income over the last 30 days</p>
          </div>
          <div className="flex rounded-lg border border-border overflow-hidden">
            {['30 Days', '3 Months', 'Year'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-[#1a2e1a] text-white'
                    : 'bg-white text-muted-foreground hover:bg-muted'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Simple Chart Visualization */}
        <div className="h-64 relative">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-xs text-muted-foreground">
            <span>₹50k</span>
            <span>₹40k</span>
            <span>₹30k</span>
            <span>₹20k</span>
            <span>₹10k</span>
          </div>
          
          {/* Chart area */}
          <div className="ml-14 h-full flex items-end gap-1 pb-8">
            {chartData.map((point, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-[#1a2e1a] to-[#2a4e2a] rounded-t-sm transition-all hover:from-[#b8860b] hover:to-[#d4a84b]"
                  style={{ height: `${(point.value / 50000) * 100}%` }}
                />
                <span className="text-xs text-muted-foreground mt-2 whitespace-nowrap">
                  {point.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Transaction Log */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl border border-[#e8e4dd] overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-[#e8e4dd]">
          <h3 className="font-serif text-lg text-foreground">Transaction Log</h3>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f5f3ef]">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-6">Date</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-6">Description</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-6">ID</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-6">Type</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-6">Status</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-6">Amount</th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map((tx) => (
                <tr key={tx.id} className="border-b border-[#e8e4dd] hover:bg-[#faf9f6]">
                  <td className="py-4 px-6 text-sm text-foreground">{format(new Date(tx.date), 'MMM d, yyyy')}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      {tx.guest && (
                        <div className="w-8 h-8 rounded-full bg-[#1a2e1a] flex items-center justify-center text-white text-xs font-medium">
                          {tx.guest.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                      <span className="text-sm text-foreground">{tx.guest || tx.description}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-muted-foreground font-mono">{tx.transactionId}</td>
                  <td className="py-4 px-6">
                    <Badge variant="outline" className={tx.type === 'Payment' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-orange-50 text-orange-700 border-orange-200'}>
                      {tx.type}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <Badge variant="outline" className={tx.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}>
                      • {tx.status}
                    </Badge>
                  </td>
                  <td className={`py-4 px-6 text-sm font-medium text-right ${tx.amount > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
