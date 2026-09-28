import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit, Trash2, BedDouble, Users, Image, X, Check, ChevronRight, Upload, Wifi, Coffee, Tv, Wind, Bath, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { roomStorage } from '@/lib/storage';
import { initializeSeedData } from '@/lib/seed-data';
import roomSuite from '@/assets/room-suite.jpg';
import roomDeluxe from '@/assets/room-deluxe.jpg';
import roomStandard from '@/assets/room-standard.jpg';
import roomFamily from '@/assets/room-family.jpg';

// Initialize seed data
initializeSeedData();

const roomImages: Record<string, string> = {
  'room-suite': roomSuite,
  'room-deluxe': roomDeluxe,
  'room-standard': roomStandard,
  'room-family': roomFamily,
};

const statusColors: Record<string, string> = {
  available: 'bg-emerald-100 text-emerald-700',
  occupied: 'bg-blue-100 text-blue-700',
  cleaning: 'bg-amber-100 text-amber-700',
  maintenance: 'bg-red-100 text-red-700',
};

const filterTabs = ['All Rooms', 'Available', 'Occupied', 'Cleaning'];

const amenitiesOptions = [
  { id: 'wifi', label: 'WiFi', icon: Wifi },
  { id: 'ac', label: 'Air Conditioning', icon: Wind },
  { id: 'tv', label: 'Smart TV', icon: Tv },
  { id: 'minibar', label: 'Mini Bar', icon: Coffee },
  { id: 'bathtub', label: 'Bathtub', icon: Bath },
  { id: 'balcony', label: 'Balcony', icon: Star },
];

const roomTypes = ['Deluxe Suite', 'Standard Room', 'Family Villa', 'Premium Suite', 'Garden View'];
const floorOptions = ['Ground Floor', 'First Floor', 'Second Floor', 'Third Floor'];

export default function AdminRooms() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Rooms');
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [newRoom, setNewRoom] = useState({
    name: '',
    type: '',
    floor: '',
    capacity: 2,
    amenities: [] as string[],
    price: 0,
    description: '',
  });

  const rooms = useMemo(() => {
    let filtered = roomStorage.getAll();

    if (activeFilter !== 'All Rooms') {
      filtered = filtered.filter(r => r.status === activeFilter.toLowerCase());
    }

    if (searchQuery) {
      filtered = filtered.filter(
        r =>
          r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [searchQuery, activeFilter]);

  const stats = useMemo(() => {
    const all = roomStorage.getAll();
    return {
      total: all.length,
      available: all.filter(r => r.status === 'available').length,
      occupied: all.filter(r => r.status === 'occupied').length,
      cleaning: all.filter(r => r.status === 'cleaning').length,
    };
  }, []);

  const toggleAmenity = (amenityId: string) => {
    setNewRoom(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(a => a !== amenityId)
        : [...prev.amenities, amenityId],
    }));
  };

  const resetModal = () => {
    setShowAddModal(false);
    setModalStep(1);
    setNewRoom({
      name: '',
      type: '',
      floor: '',
      capacity: 2,
      amenities: [],
      price: 0,
      description: '',
    });
  };

  const handleSaveRoom = () => {
    // Here you would save the room to storage
    console.log('Saving room:', newRoom);
    resetModal();
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Home</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground">Room Management</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl lg:text-3xl text-foreground">Room Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage availability, pricing, and visual presentation for all boutique suites and villas.
          </p>
        </div>
        <Button 
          onClick={() => setShowAddModal(true)}
          className="bg-[#b8860b] hover:bg-[#8b6914] text-white gap-2 rounded-full"
        >
          <Plus className="w-4 h-4" />
          Add New Room
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {filterTabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === tab
                  ? 'bg-[#1a2e1a] text-white'
                  : 'bg-white border border-[#e8e4dd] text-muted-foreground hover:border-[#1a2e1a]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search rooms..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10 rounded-xl border-[#e8e4dd]"
          />
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room, index) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl border border-[#e8e4dd] overflow-hidden group hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={roomImages[room.images[0]] || roomSuite}
                alt={room.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <Badge className={`absolute top-3 left-3 ${statusColors[room.status]} border-0`}>
                • {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
              </Badge>
              <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="secondary" className="w-8 h-8 rounded-full bg-white/90 hover:bg-white">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="secondary" className="w-8 h-8 rounded-full bg-white/90 hover:bg-white">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <span className="text-xs text-[#b8860b] font-medium uppercase tracking-wider">
                    {room.type}
                  </span>
                  <h3 className="font-serif text-lg text-foreground mt-1">{room.name}</h3>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <BedDouble className="w-4 h-4" />
                  <span>{room.type}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{room.capacity}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#e8e4dd]">
                <div>
                  <span className="text-xs text-muted-foreground">Daily Rate</span>
                  <p className="text-xl font-serif text-[#b8860b]">₹{room.price.toLocaleString()}</p>
                </div>
                <Button size="sm" variant="outline" className="rounded-full">
                  Edit
                </Button>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Add New Room Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: rooms.length * 0.05 }}
          onClick={() => setShowAddModal(true)}
          className="bg-white rounded-2xl border-2 border-dashed border-[#e8e4dd] flex items-center justify-center min-h-[350px] cursor-pointer hover:border-[#b8860b] transition-colors"
        >
          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full bg-[#f5f3ef] flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-serif text-lg text-foreground mb-2">Add New Room</h3>
            <p className="text-sm text-muted-foreground">Configure a new suite or villa</p>
          </div>
        </motion.div>
      </div>

      {/* Add Room Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => resetModal()}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#e8e4dd]">
                <div>
                  <h2 className="font-serif text-xl text-foreground">Add New Room</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Step {modalStep} of 3 - {modalStep === 1 ? 'Basic Info' : modalStep === 2 ? 'Amenities & Gallery' : 'Pricing & Finalize'}
                  </p>
                </div>
                <button onClick={resetModal} className="p-2 hover:bg-[#f5f3ef] rounded-full">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center gap-4 px-6 py-4 bg-[#f9f8f6]">
                {[1, 2, 3].map(step => (
                  <div key={step} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step < modalStep ? 'bg-emerald-500 text-white' :
                      step === modalStep ? 'bg-[#b8860b] text-white' :
                      'bg-[#e8e4dd] text-muted-foreground'
                    }`}>
                      {step < modalStep ? <Check className="w-4 h-4" /> : step}
                    </div>
                    <span className={`text-sm ${step === modalStep ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                      {step === 1 ? 'Basic Info' : step === 2 ? 'Amenities' : 'Pricing'}
                    </span>
                    {step < 3 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                  </div>
                ))}
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[50vh]">
                {modalStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="roomName">Room Name</Label>
                      <Input
                        id="roomName"
                        placeholder="e.g., Royal Heritage Suite"
                        value={newRoom.name}
                        onChange={e => setNewRoom(prev => ({ ...prev, name: e.target.value }))}
                        className="mt-2 rounded-xl border-[#e8e4dd]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Room Type</Label>
                        <select
                          value={newRoom.type}
                          onChange={e => setNewRoom(prev => ({ ...prev, type: e.target.value }))}
                          className="mt-2 w-full p-3 rounded-xl border border-[#e8e4dd] bg-white"
                        >
                          <option value="">Select type</option>
                          {roomTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label>Floor</Label>
                        <select
                          value={newRoom.floor}
                          onChange={e => setNewRoom(prev => ({ ...prev, floor: e.target.value }))}
                          className="mt-2 w-full p-3 rounded-xl border border-[#e8e4dd] bg-white"
                        >
                          <option value="">Select floor</option>
                          {floorOptions.map(floor => (
                            <option key={floor} value={floor}>{floor}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <Label>Max Capacity</Label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={newRoom.capacity}
                        onChange={e => setNewRoom(prev => ({ ...prev, capacity: parseInt(e.target.value) || 2 }))}
                        className="mt-2 rounded-xl border-[#e8e4dd]"
                      />
                    </div>
                  </div>
                )}

                {modalStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base font-medium">Amenities</Label>
                      <p className="text-sm text-muted-foreground mb-4">Select the amenities available in this room</p>
                      <div className="grid grid-cols-2 gap-3">
                        {amenitiesOptions.map(amenity => (
                          <div
                            key={amenity.id}
                            onClick={() => toggleAmenity(amenity.id)}
                            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                              newRoom.amenities.includes(amenity.id)
                                ? 'border-[#b8860b] bg-[#b8860b]/5'
                                : 'border-[#e8e4dd] hover:border-[#b8860b]'
                            }`}
                          >
                            <Checkbox checked={newRoom.amenities.includes(amenity.id)} />
                            <amenity.icon className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{amenity.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-base font-medium">Gallery Images</Label>
                      <p className="text-sm text-muted-foreground mb-4">Upload photos of the room</p>
                      <div className="border-2 border-dashed border-[#e8e4dd] rounded-xl p-8 text-center hover:border-[#b8860b] transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
                      </div>
                    </div>
                  </div>
                )}

                {modalStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <Label>Daily Rate (₹)</Label>
                      <Input
                        type="number"
                        min="0"
                        placeholder="e.g., 15000"
                        value={newRoom.price || ''}
                        onChange={e => setNewRoom(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                        className="mt-2 rounded-xl border-[#e8e4dd] text-xl"
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <textarea
                        value={newRoom.description}
                        onChange={e => setNewRoom(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe the room features and ambiance..."
                        className="mt-2 w-full p-3 rounded-xl border border-[#e8e4dd] min-h-[100px] resize-none"
                      />
                    </div>

                    {/* Preview */}
                    <div className="bg-[#f9f8f6] rounded-xl p-4">
                      <h4 className="font-medium text-foreground mb-3">Preview</h4>
                      <div className="flex gap-4">
                        <div className="w-24 h-24 rounded-xl bg-[#e8e4dd] flex items-center justify-center">
                          <Image className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-[#b8860b] font-medium uppercase">{newRoom.type || 'Room Type'}</p>
                          <h5 className="font-serif text-lg">{newRoom.name || 'Room Name'}</h5>
                          <p className="text-sm text-muted-foreground">{newRoom.floor || 'Floor'} • {newRoom.capacity} Guests</p>
                          <p className="text-lg font-serif text-[#b8860b] mt-1">
                            ₹{newRoom.price?.toLocaleString() || '0'}/night
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between p-6 border-t border-[#e8e4dd] bg-[#f9f8f6]">
                <Button
                  variant="outline"
                  onClick={() => modalStep > 1 ? setModalStep(s => s - 1) : resetModal()}
                  className="rounded-full"
                >
                  {modalStep > 1 ? 'Back' : 'Cancel'}
                </Button>
                <Button
                  onClick={() => modalStep < 3 ? setModalStep(s => s + 1) : handleSaveRoom()}
                  className="bg-[#b8860b] hover:bg-[#8b6914] text-white rounded-full"
                >
                  {modalStep < 3 ? 'Next Step' : 'Create Room'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
