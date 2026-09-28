import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Bell, 
  CreditCard,
  Edit2,
  Camera,
  Check,
  X,
  Save,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { userStorage } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';

export default function GuestProfile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    promotionalEmails: true,
    bookingReminders: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Update user in storage
    if (user) {
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      };
      userStorage.setCurrentUser(updatedUser);
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: '',
    });
    setIsEditing(false);
  };

  const stats = [
    { label: 'Total Stays', value: '12', icon: Calendar },
    { label: 'Loyalty Points', value: '2,450', icon: Shield },
    { label: 'Member Since', value: 'Jan 2024', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-serif text-3xl text-[#1a2e1a] font-semibold">My Profile</h1>
          <p className="text-[#6b7c6b] mt-2">Manage your account settings and preferences</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-[#e8e4dd] p-6 text-center">
              {/* Avatar */}
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#b8860b] to-[#8b6914] flex items-center justify-center text-white font-serif text-3xl">
                  {user?.name?.charAt(0) || 'G'}
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#1a2e1a] text-white flex items-center justify-center hover:bg-[#2a3e2a] transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <h2 className="font-serif text-xl text-[#1a2e1a] font-semibold">{user?.name || 'Guest'}</h2>
              <p className="text-[#6b7c6b] text-sm mt-1">{user?.email}</p>
              
              {/* Membership Badge */}
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#b8860b]/10 rounded-full">
                <Shield className="w-4 h-4 text-[#b8860b]" />
                <span className="text-[#b8860b] text-sm font-medium">Gold Member</span>
              </div>

              {/* Stats */}
              <div className="mt-6 pt-6 border-t border-[#e8e4dd] grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <stat.icon className="w-5 h-5 text-[#b8860b] mx-auto mb-1" />
                    <p className="font-semibold text-[#1a2e1a]">{stat.value}</p>
                    <p className="text-xs text-[#6b7c6b]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-[#e8e4dd] p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-lg text-[#1a2e1a] font-semibold">Personal Information</h3>
                {!isEditing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="border-[#b8860b] text-[#b8860b] hover:bg-[#b8860b] hover:text-white rounded-full"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancel}
                      className="rounded-full"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSave}
                      className="bg-[#1a2e1a] hover:bg-[#2a3e2a] text-white rounded-full"
                    >
                      <Save className="w-4 h-4 mr-1" />
                      Save
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-[#1a2e1a] flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-[#b8860b]" />
                    Full Name
                  </Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="border-[#e8e4dd] focus:border-[#b8860b] focus:ring-[#b8860b]/20"
                    />
                  ) : (
                    <p className="text-[#1a2e1a] py-2">{formData.name || '-'}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="text-[#1a2e1a] flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-[#b8860b]" />
                    Email Address
                  </Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="border-[#e8e4dd] focus:border-[#b8860b] focus:ring-[#b8860b]/20"
                    />
                  ) : (
                    <p className="text-[#1a2e1a] py-2">{formData.email || '-'}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-[#1a2e1a] flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4 text-[#b8860b]" />
                    Phone Number
                  </Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="border-[#e8e4dd] focus:border-[#b8860b] focus:ring-[#b8860b]/20"
                    />
                  ) : (
                    <p className="text-[#1a2e1a] py-2">{formData.phone || '-'}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="address" className="text-[#1a2e1a] flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-[#b8860b]" />
                    Address
                  </Label>
                  {isEditing ? (
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your address"
                      className="border-[#e8e4dd] focus:border-[#b8860b] focus:ring-[#b8860b]/20"
                    />
                  ) : (
                    <p className="text-[#1a2e1a] py-2">{formData.address || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Notification Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-sm border border-[#e8e4dd] p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Bell className="w-5 h-5 text-[#b8860b]" />
                <h3 className="font-serif text-lg text-[#1a2e1a] font-semibold">Notification Preferences</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-[#e8e4dd]">
                  <div>
                    <p className="text-[#1a2e1a] font-medium">Email Notifications</p>
                    <p className="text-[#6b7c6b] text-sm">Receive booking confirmations and updates via email</p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, emailNotifications: checked }))}
                    className="data-[state=checked]:bg-[#b8860b]"
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-[#e8e4dd]">
                  <div>
                    <p className="text-[#1a2e1a] font-medium">SMS Notifications</p>
                    <p className="text-[#6b7c6b] text-sm">Get text messages for important updates</p>
                  </div>
                  <Switch
                    checked={notifications.smsNotifications}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, smsNotifications: checked }))}
                    className="data-[state=checked]:bg-[#b8860b]"
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-[#e8e4dd]">
                  <div>
                    <p className="text-[#1a2e1a] font-medium">Promotional Emails</p>
                    <p className="text-[#6b7c6b] text-sm">Receive special offers and promotions</p>
                  </div>
                  <Switch
                    checked={notifications.promotionalEmails}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, promotionalEmails: checked }))}
                    className="data-[state=checked]:bg-[#b8860b]"
                  />
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-[#1a2e1a] font-medium">Booking Reminders</p>
                    <p className="text-[#6b7c6b] text-sm">Get reminders before your check-in date</p>
                  </div>
                  <Switch
                    checked={notifications.bookingReminders}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, bookingReminders: checked }))}
                    className="data-[state=checked]:bg-[#b8860b]"
                  />
                </div>
              </div>
            </motion.div>

            {/* Payment Methods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-sm border border-[#e8e4dd] p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#b8860b]" />
                  <h3 className="font-serif text-lg text-[#1a2e1a] font-semibold">Payment Methods</h3>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#b8860b] text-[#b8860b] hover:bg-[#b8860b] hover:text-white rounded-full"
                >
                  Add New
                </Button>
              </div>

              {/* Saved Card */}
              <div className="flex items-center justify-between p-4 bg-[#f5f3ef] rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-gradient-to-r from-[#1a2e1a] to-[#2a4e2a] rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VISA</span>
                  </div>
                  <div>
                    <p className="text-[#1a2e1a] font-medium">•••• •••• •••• 4242</p>
                    <p className="text-[#6b7c6b] text-sm">Expires 12/26</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#4ade80] flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Default
                  </span>
                </div>
              </div>

              <p className="text-[#6b7c6b] text-sm mt-4 text-center">
                Your payment information is encrypted and secure
              </p>
            </motion.div>

            {/* Danger Zone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-sm border border-red-200 p-6"
            >
              <h3 className="font-serif text-lg text-red-600 font-semibold mb-4">Danger Zone</h3>
              <p className="text-[#6b7c6b] text-sm mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Button
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50 rounded-full"
              >
                Delete Account
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
