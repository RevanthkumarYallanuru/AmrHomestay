import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  galleryImages as galleryData, 
  galleryCategories, 
  heroImages 
} from '@/lib/data';

// Transform gallery data to include title and description
const galleryImages = galleryData.map((img, index) => ({
  ...img,
  title: img.alt,
  description: `Beautiful ${img.category} view at Viha Home Stay`,
}));

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (image: typeof galleryImages[0], index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImages.gallery}
            alt="Gallery Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2e1a]/80 via-[#1a2e1a]/60 to-[#1a2e1a]/80" />
        </div>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 bg-[#b8860b]/20 backdrop-blur-sm rounded-full text-[#b8860b] text-sm font-medium mb-4"
          >
            VISUAL JOURNEY
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-serif text-4xl md:text-6xl text-white mb-4"
          >
            Our <span className="italic text-[#b8860b]">Gallery</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-white/80 text-lg max-w-2xl"
          >
            Explore the elegance and tranquility of Viha Home Stay through our curated collection
          </motion.p>
        </div>
      </section>
      {/* Gallery Content */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {galleryCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-[#1a2e1a] text-white shadow-lg'
                  : 'bg-white text-[#1a2e1a] border border-[#e8e4dd] hover:border-[#1a2e1a] hover:shadow-md'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="break-inside-avoid group cursor-pointer"
                onClick={() => openLightbox(image, index)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-500">
                  <div className={`relative ${index % 3 === 0 ? 'aspect-[4/5]' : index % 3 === 1 ? 'aspect-square' : 'aspect-[4/3]'}`}>
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1a]/90 via-[#1a2e1a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <span className="text-[#b8860b] text-xs font-medium uppercase tracking-wider mb-2">
                        {galleryCategories.find(c => c.id === image.category)?.label}
                      </span>
                      <h3 className="text-white font-serif text-xl mb-1">
                        {image.title}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {image.description}
                      </p>
                    </div>
                    
                    {/* Zoom Icon */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  
                  {/* Golden accent line */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#b8860b] to-[#d4a84b] group-hover:w-full transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#6b7c6b] text-lg">No images found in this category.</p>
          </div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1a2e1a]/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Image Container */}
            <motion.div
              key={selectedImage.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-full object-contain rounded-xl"
              />
              
              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#1a2e1a] to-transparent rounded-b-xl">
                <span className="text-[#b8860b] text-xs font-medium uppercase tracking-wider">
                  {galleryCategories.find(c => c.id === selectedImage.category)?.label}
                </span>
                <h3 className="text-white font-serif text-2xl mt-1">
                  {selectedImage.title}
                </h3>
                <p className="text-white/80 mt-1">
                  {selectedImage.description}
                </p>
                <p className="text-white/50 text-sm mt-2">
                  {currentIndex + 1} / {filteredImages.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call to Action */}
      <section className="relative py-20 bg-[#1a2e1a]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Experience the <span className="italic text-[#b8860b]">Luxury</span> Yourself
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Pictures capture moments, but staying with us creates lasting memories. 
              Book your stay and experience the elegance of Viha Home Stay.
            </p>
            <Button className="bg-[#b8860b] hover:bg-[#8b6914] text-white px-8 py-6 text-lg rounded-full">
              Book Your Stay
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
