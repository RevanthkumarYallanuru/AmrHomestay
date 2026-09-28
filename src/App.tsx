import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { GuestLayout } from "@/components/layout/GuestLayout";
import { SiteLoader } from "@/components/SiteLoader";
import { ScrollToTop } from "@/components/ScrollToTop";

// Pages
import Index from "./pages/Index";
import Rooms from "./pages/Rooms";
import RoomDetails from "./pages/RoomDetails";
import Booking from "./pages/Booking";
import Amenities from "./pages/Amenities";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Gallery from "./pages/Gallery";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminRooms from "./pages/admin/AdminRooms";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminStaff from "./pages/admin/AdminStaff";
import AdminEarnings from "./pages/admin/AdminEarnings";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminAmenities from "./pages/admin/AdminAmenities";

// Guest Pages
import GuestDashboard from "./pages/guest/GuestDashboard";
import GuestProfile from "./pages/guest/GuestProfile";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          {/* Site Loader */}
          <SiteLoader 
            duration={2500} 
            onLoadComplete={() => setIsLoading(false)} 
          />
          
          {!isLoading && (
            <>
              <Toaster />
              <Sonner />
              <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                {/* Scroll to top on navigation */}
                <ScrollToTop />
                
                <Routes>
                  {/* Public Routes */}
                  <Route element={<PublicLayout />}>
                    <Route path="/" element={<Index />} />
                    <Route path="/rooms" element={<Rooms />} />
                    <Route path="/rooms/:id" element={<RoomDetails />} />
                    <Route path="/amenities" element={<Amenities />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/reviews" element={<Index />} />
                  </Route>

                  {/* Auth Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Login />} />

                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="bookings" element={<AdminBookings />} />
                    <Route path="rooms" element={<AdminRooms />} />
                    <Route path="reviews" element={<AdminReviews />} />
                    <Route path="staff" element={<AdminStaff />} />
                    <Route path="earnings" element={<AdminEarnings />} />
                    <Route path="gallery" element={<AdminGallery />} />
                    <Route path="amenities" element={<AdminAmenities />} />
                    <Route path="checkins" element={<AdminBookings />} />
                    <Route path="messages" element={<AdminDashboard />} />
                    <Route path="notes" element={<AdminDashboard />} />
                    <Route path="settings" element={<AdminDashboard />} />
                  </Route>

                  {/* Guest Routes */}
                  <Route path="/dashboard" element={<GuestLayout />}>
                    <Route index element={<GuestDashboard />} />
                    <Route path="bookings" element={<GuestDashboard />} />
                    <Route path="trips" element={<GuestDashboard />} />
                    <Route path="reviews" element={<GuestDashboard />} />
                    <Route path="profile" element={<GuestProfile />} />
                  </Route>

                  {/* Catch-all */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </>
          )}
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
