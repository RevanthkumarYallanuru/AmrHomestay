# Room Details Architecture Diagram

## Component Hierarchy

```
App.tsx
└── Routes
    └── /rooms/:id
        └── RoomDetails.tsx (Main Page)
            ├── Breadcrumb Navigation
            ├── Main Content Grid (3 columns on desktop)
            │   ├── Image Section (Left, 2 cols)
            │   │   └── RoomImageGallery.tsx
            │   │       ├── Main Image Display
            │   │       │   ├── Image Counter Badge
            │   │       │   ├── Navigation Buttons
            │   │       │   └── Zoom Button
            │   │       ├── Thumbnail Gallery
            │   │       └── Zoom Modal
            │   │
            │   ├── Details Section (Right, 1 col)
            │   │   ├── Room Header
            │   │   │   ├── Room Type Badge
            │   │   │   ├── Room Name (H1)
            │   │   │   └── Rating & Reviews
            │   │   ├── Room Description
            │   │   ├── Quick Highlights
            │   │   │   ├── Floor Location
            │   │   │   ├── Capacity
            │   │   │   ├── Room Size
            │   │   │   └── Bed Type
            │   │   └── Availability Badge
            │   │
            │   └── Pricing Card (Right, 1 col - Sticky on Desktop)
            │       └── RoomPricingCard.tsx
            │           ├── Price Display
            │           │   ├── Per Night Price
            │           │   ├── Original Price (if discount)
            │           │   └── Discount Badge
            │           ├── Room Specs Grid
            │           │   ├── Bed Type Icon
            │           │   ├── Size Icon
            │           │   └── Capacity Icon
            │           ├── Nights Selector
            │           │   ├── Decrease Button
            │           │   ├── Input Field
            │           │   └── Increase Button
            │           ├── Guests Selector
            │           │   ├── Decrease Button
            │           │   ├── Input Field
            │           │   └── Increase Button
            │           ├── Price Breakdown
            │           ├── Total Price Display
            │           ├── Book Now Button
            │           └── Cancellation Policy Info
            │
            ├── Amenities Section
            │   └── AmenitiesList.tsx
            │       └── Amenity Grid (3 columns on desktop)
            │           └── Amenity Item (repeated)
            │               ├── Icon
            │               └── Name
            │
            ├── Policies Section
            │   ├── Check-in & Check-out
            │   ├── Cancellation Policy
            │   ├── House Rules
            │   └── Guest Services
            │
            ├── Similar Rooms Section
            │   └── Room Card Grid (3 columns on desktop)
            │       └── Room Card (clickable)
            │           ├── Image
            │           ├── Name
            │           ├── Specs
            │           └── Price
            │
            ├── CTA Section
            │   ├── Heading
            │   ├── Description
            │   └── Book Now Button
            │
            └── Booking Form Modal
                └── BookingForm.tsx (Existing component)
```

## Data Flow Diagram

```
┌─────────────────────────┐
│   src/lib/data.ts       │
│  (Single Source Truth)  │
│                         │
│  ├─ roomTypes[]         │ Room definitions
│  ├─ amenities[]         │ Amenity definitions
│  ├─ roomImageMap{}      │ Image references
│  └─ hotelInfo           │ Hotel metadata
└────────┬────────────────┘
         │
         ├─────────────────────────────────────┐
         │                                     │
         ▼                                     ▼
┌──────────────────────────┐      ┌──────────────────────────┐
│   RoomDetails.tsx        │      │   useRoomDetails Hook    │
│   (Main Page)            │      │   (Data Resolution)      │
│                          │      │                          │
│  1. Get roomId from URL  │◄─────┤  1. Fetch room by ID     │
│  2. Fetch room data      │      │  2. Resolve amenities    │
│  3. Resolve images       │      │  3. Resolve images       │
│  4. Render sections      │      │  4. Return complete room │
└──────────┬───────────────┘      └──────────────────────────┘
           │
           ├──────────────┬──────────────┬─────────────────┐
           │              │              │                 │
           ▼              ▼              ▼                 ▼
        RoomImage    RoomPricing    AmenitiesList    Policies
        Gallery      Card           Section          Section
```

## State Management Flow

```
RoomDetails.tsx State:
├── roomId (from URL params)
├── bookingOpen (modal state)
└── bookingDetails (nights, guests)
    │
    ├─► RoomImageGallery Hook
    │   └── currentIndex (image selection)
    │
    ├─► RoomPricingCard Hook
    │   ├── nights (1-30)
    │   ├── guests (1-maxGuests)
    │   └── totalPrice (calculated)
    │
    └─► useRoomDetails Hook
        └── room (fetched & resolved)
```

## User Interaction Flow

```
User navigates to /rooms/deluxe-suite
         │
         ▼
URL params extracted (id = "deluxe-suite")
         │
         ▼
useRoomDetails hook fetches:
├── Room object from roomTypes
├── Amenity details from amenities array
└── Image URLs from roomImageMap
         │
         ▼
RoomDetails page renders:
├── Gallery Gallery with thumbnails
├── Room details (name, description, specs)
└── Pricing card with selectors
         │
         ▼
User interactions:
├── Browse images (prev/next, click thumbnail, zoom)
├── Change nights selector
├── Change guests selector
├── See price update in real-time
└── Click "Book Now"
         │
         ▼
Booking modal opens with:
├── Room name
├── Room price
├── Selected nights & guests
└── Form to complete booking
```

## Responsive Layout Flow

```
┌─────────────────────────────────────────────────┐
│           MOBILE (< 768px)                      │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │     RoomImageGallery                    │   │
│  │     (100% width, full height)           │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │     Room Details Section                │   │
│  │     (Title, desc, specs)                │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │     RoomPricingCard                     │   │
│  │     (100% width, not sticky)            │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │     AmenitiesList                       │   │
│  │     (1 column grid)                     │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│        TABLET (768px - 1024px)                       │
│                                                      │
│  ┌────────────────────┐   ┌─────────────────────┐   │
│  │ RoomImageGallery   │   │ Room Details        │   │
│  │ (wider, 2/3)       │   │ + Availability      │   │
│  │                    │   │ (1/3)               │   │
│  ├────────────────────┤   ├─────────────────────┤   │
│  │ Thumbnails         │   │ RoomPricingCard     │   │
│  │                    │   │ (sticky on larger)  │   │
│  └────────────────────┘   └─────────────────────┘   │
│  ┌──────────────────────────────────────────────┐   │
│  │ AmenitiesList (2 column grid)                │   │
│  └──────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│         DESKTOP (> 1024px)                                 │
│                                                            │
│  ┌──────────────────────┐  ┌─────────┐ ┌────────────────┐ │
│  │ RoomImageGallery     │  │  Room   │ │ RoomPricingCard│ │
│  │ (2 columns, 60%)     │  │Details  │ │(1 column,      │ │
│  │                      │  │(1 col,  │ │sticky, 20%)    │ │
│  │                      │  │20%)     │ │                │ │
│  │                      │  │         │ │                │ │
│  │                      │  │         │ │ [stays visible │ │
│  │                      │  │         │ │  while scroll] │ │
│  │                      │  │         │ │                │ │
│  ├──────────────────────┤  ├─────────┤ └────────────────┘ │
│  │ Thumbnails           │  │ Avail.  │                    │
│  │                      │  │ Badge   │                    │
│  └──────────────────────┘  └─────────┘                    │
│  ┌────────────────────────────────────────────────────────┤
│  │ AmenitiesList (3 column grid, 100%)                   │
│  └────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────────┤
│  │ Policies Section (100%)                               │
│  └────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────────┤
│  │ Similar Rooms (3 column grid, 100%)                   │
│  └────────────────────────────────────────────────────────┘
└────────────────────────────────────────────────────────────┘
```

## Component Dependencies

```
RoomDetails.tsx
├── Imports:
│   ├── useParams, useNavigate (react-router-dom)
│   ├── motion, AnimatePresence (framer-motion)
│   ├── Icons (lucide-react)
│   ├── Button (ui/button)
│   ├── RoomImageGallery (components)
│   ├── RoomPricingCard (components)
│   ├── AmenitiesList (components)
│   ├── BookingForm (components)
│   ├── Room data (lib/data)
│   └── useState (react)
│
├── RoomImageGallery.tsx
│   ├── Imports:
│   │   ├── useState (react)
│   │   ├── motion, AnimatePresence (framer-motion)
│   │   ├── Icons (lucide-react)
│   │   └── Button (ui/button)
│
├── RoomPricingCard.tsx
│   ├── Imports:
│   │   ├── useState (react)
│   │   ├── motion (framer-motion)
│   │   ├── Icons (lucide-react)
│   │   └── Button (ui/button)
│
├── AmenitiesList.tsx
│   ├── Imports:
│   │   ├── motion (framer-motion)
│   │   └── Icons (lucide-react)
│
└── Utility Hooks (useRoomDetails.ts)
    ├── Imports:
    │   ├── useMemo (react)
    │   └── Room data (lib/data)
```

## API/Data Integration

```
┌─────────────────────────────────────┐
│      External Data Sources          │
│   (Future Integration Points)       │
└─────────────────────────────────────┘
         │
         ├─ Real Availability API
         ├─ Pricing Database
         ├─ Image Storage (CDN)
         ├─ Reviews API
         └─ Booking System
         │
         ▼
┌─────────────────────────────────────┐
│      Currently: data.ts             │
│   (Hardcoded, Single Source)        │
│                                     │
│  Future: Connect to backend APIs    │
└─────────────────────────────────────┘
         │
         ▼
    RoomDetails.tsx & Hooks
         │
         ▼
    UI Components
```

---

This architecture ensures:
✅ **Scalability** - Easy to add new features
✅ **Maintainability** - Clear component structure
✅ **Reusability** - Components can be used elsewhere
✅ **Performance** - Optimized data flow
✅ **Type Safety** - Full TypeScript support
✅ **Responsive** - Mobile-first design
✅ **Accessible** - WCAG compliant
