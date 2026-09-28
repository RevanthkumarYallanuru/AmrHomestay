import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ChevronRight,
  Wifi,
  Wind,
  Tv,
  Coffee,
  Bath,
  Home,
  Utensils,
  Car,
  Bell,
  MapPin,
  Check,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { amenities as initialAmenities } from '@/lib/data';

// Icon mapping
const iconMap: Record<string, any> = {
  Wifi,
  Wind,
  Tv,
  Coffee,
  Bath,
  Home,
  Utensils,
  Car,
  Bell,
  MapPin,
};

const categoryColors: Record<string, string> = {
  connectivity: 'bg-blue-100 text-blue-700',
  comfort: 'bg-emerald-100 text-emerald-700',
  entertainment: 'bg-purple-100 text-purple-700',
  dining: 'bg-orange-100 text-orange-700',
  bathroom: 'bg-cyan-100 text-cyan-700',
  outdoor: 'bg-green-100 text-green-700',
  facilities: 'bg-gray-100 text-gray-700',
  services: 'bg-amber-100 text-amber-700',
};

export default function AdminAmenities() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [amenitiesList, setAmenitiesList] = useState(
    initialAmenities.map(a => ({ ...a, enabled: true }))
  );

  const categories = ['all', ...new Set(initialAmenities.map(a => a.category))];

  const filteredAmenities = amenitiesList.filter(amenity => {
    const matchesSearch = 
      amenity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      amenity.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || amenity.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleAmenity = (amenityId: string) => {
    setAmenitiesList(prev =>
      prev.map(a => (a.id === amenityId ? { ...a, enabled: !a.enabled } : a))
    );
  };

  const stats = {
    total: amenitiesList.length,
    enabled: amenitiesList.filter(a => a.enabled).length,
    categories: categories.length - 1,
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Home</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground">Amenities Management</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl lg:text-3xl text-foreground">Amenities Management</h1>
          <p className="text-muted-foreground mt-1">
            Configure amenities, manage availability, and customize offerings.
          </p>
        </div>
        <Button className="bg-[#b8860b] hover:bg-[#8b6914] text-white gap-2 rounded-full">
          <Plus className="w-4 h-4" />
          Add Amenity
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-[#e8e4dd] p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#f5f3ef] flex items-center justify-center">
              <Wifi className="w-5 h-5 text-[#1a2e1a]" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-foreground">{stats.total}</p>
          <p className="text-sm text-muted-foreground">Total Amenities</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-[#e8e4dd] p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Check className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-foreground">{stats.enabled}</p>
          <p className="text-sm text-muted-foreground">Active</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-[#e8e4dd] p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Coffee className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-foreground">{stats.categories}</p>
          <p className="text-sm text-muted-foreground">Categories</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-[#e8e4dd] p-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Category Tabs */}
          <div className="relative flex gap-2 overflow-x-auto pb-2 lg:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all capitalize ${
                  activeCategory === cat
                    ? 'bg-[#1a2e1a] text-white'
                    : 'bg-white border border-[#e8e4dd] text-muted-foreground hover:border-[#1a2e1a]'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search amenities..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl border-[#e8e4dd]"
            />
          </div>
        </div>
      </div>

      {/* Amenities Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAmenities.map((amenity, index) => {
          const IconComponent = iconMap[amenity.icon] || Wifi;
          
          return (
            <motion.div
              key={amenity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className={`bg-white rounded-2xl border border-[#e8e4dd] p-5 ${
                !amenity.enabled ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    amenity.enabled ? 'bg-[#b8860b]/10' : 'bg-gray-100'
                  }`}>
                    <IconComponent className={`w-6 h-6 ${
                      amenity.enabled ? 'text-[#b8860b]' : 'text-gray-400'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{amenity.name}</h3>
                    <Badge 
                      className={`mt-1 capitalize text-xs border-0 ${
                        categoryColors[amenity.category] || 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {amenity.category}
                    </Badge>
                  </div>
                </div>
                <Switch
                  checked={amenity.enabled}
                  onCheckedChange={() => toggleAmenity(amenity.id)}
                />
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">{amenity.description}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-[#e8e4dd]">
                <Badge variant={amenity.enabled ? 'default' : 'secondary'} className={`${
                  amenity.enabled 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-gray-100 text-gray-500'
                } border-0`}>
                  {amenity.enabled ? '• Active' : '• Disabled'}
                </Badge>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" className="w-8 h-8 hover:bg-[#f5f3ef]">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="w-8 h-8 hover:bg-red-50 text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Add New Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border-2 border-dashed border-[#e8e4dd] flex items-center justify-center min-h-[200px] cursor-pointer hover:border-[#b8860b] transition-colors group"
        >
          <div className="text-center p-6">
            <div className="w-14 h-14 rounded-full bg-[#f5f3ef] flex items-center justify-center mx-auto mb-3 group-hover:bg-[#b8860b]/10 transition-colors">
              <Plus className="w-7 h-7 text-muted-foreground group-hover:text-[#b8860b]" />
            </div>
            <h3 className="font-medium text-foreground mb-1">Add New Amenity</h3>
            <p className="text-sm text-muted-foreground">Configure a new amenity</p>
          </div>
        </motion.div>
      </div>

      {filteredAmenities.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-[#e8e4dd]">
          <Wifi className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No amenities found.</p>
        </div>
      )}

      {/* MVP Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <p className="text-sm text-amber-800">
          <strong>MVP Notice:</strong> Amenities management is currently in preview mode. 
          Full add/edit functionality will be available in the next update. Toggle switches are functional for demo purposes.
        </p>
      </div>
    </div>
  );
}
