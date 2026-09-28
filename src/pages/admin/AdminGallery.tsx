import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Trash2, 
  Image, 
  Upload, 
  ChevronRight, 
  Eye,
  EyeOff,
  Star,
  Grid,
  List,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { galleryImages, galleryCategories } from '@/lib/data';

export default function AdminGallery() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [images, setImages] = useState(galleryImages);

  const filteredImages = images.filter(img => {
    const matchesSearch = img.alt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || img.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFeatured = (imageId: string) => {
    setImages(prev => 
      prev.map(img => 
        img.id === imageId ? { ...img, featured: !img.featured } : img
      )
    );
  };

  const stats = {
    total: images.length,
    featured: images.filter(img => img.featured).length,
    categories: galleryCategories.length - 1, // Exclude 'all'
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Home</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground">Gallery Management</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl lg:text-3xl text-foreground">Gallery Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage images, organize categories, and curate your visual showcase.
          </p>
        </div>
        <Button className="bg-[#b8860b] hover:bg-[#8b6914] text-white gap-2 rounded-full">
          <Upload className="w-4 h-4" />
          Upload Images
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
              <Image className="w-5 h-5 text-[#1a2e1a]" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-foreground">{stats.total}</p>
          <p className="text-sm text-muted-foreground">Total Images</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-[#e8e4dd] p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#b8860b]/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-[#b8860b]" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-foreground">{stats.featured}</p>
          <p className="text-sm text-muted-foreground">Featured</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-[#e8e4dd] p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Grid className="w-5 h-5 text-blue-600" />
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
            {galleryCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#1a2e1a] text-white'
                    : 'bg-white border border-[#e8e4dd] text-muted-foreground hover:border-[#1a2e1a]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search and View Toggle */}
          <div className="flex gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search images..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl border-[#e8e4dd]"
              />
            </div>
            <div className="flex border border-[#e8e4dd] rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-[#1a2e1a] text-white' : 'text-muted-foreground hover:bg-gray-50'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-[#1a2e1a] text-white' : 'text-muted-foreground hover:bg-gray-50'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
              className="group relative bg-white rounded-2xl border border-[#e8e4dd] overflow-hidden"
            >
              <div className="aspect-square">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                  <Eye className="w-4 h-4 text-[#1a2e1a]" />
                </button>
                <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>

              {/* Featured Badge */}
              {image.featured && (
                <Badge className="absolute top-2 left-2 bg-[#b8860b] text-white border-0">
                  <Star className="w-3 h-3 mr-1 fill-white" />
                  Featured
                </Badge>
              )}

              {/* Info */}
              <div className="p-3">
                <p className="text-sm font-medium text-foreground truncate">{image.alt}</p>
                <div className="flex items-center justify-between mt-2">
                  <Badge variant="outline" className="text-xs capitalize">{image.category}</Badge>
                  <Switch
                    checked={image.featured}
                    onCheckedChange={() => toggleFeatured(image.id)}
                  />
                </div>
              </div>
            </motion.div>
          ))}

          {/* Upload Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square bg-white rounded-2xl border-2 border-dashed border-[#e8e4dd] flex items-center justify-center cursor-pointer hover:border-[#b8860b] transition-colors group"
          >
            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-[#f5f3ef] flex items-center justify-center mx-auto mb-3 group-hover:bg-[#b8860b]/10 transition-colors">
                <Plus className="w-6 h-6 text-muted-foreground group-hover:text-[#b8860b]" />
              </div>
              <p className="text-sm text-muted-foreground">Add Image</p>
            </div>
          </motion.div>
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-2xl border border-[#e8e4dd] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e8e4dd] bg-[#f9f8f6]">
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Image</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Title</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Category</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Featured</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredImages.map((image) => (
                <tr key={image.id} className="border-b border-[#e8e4dd] last:border-0">
                  <td className="p-4">
                    <img src={image.src} alt={image.alt} className="w-16 h-16 rounded-lg object-cover" />
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-foreground">{image.alt}</p>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className="capitalize">{image.category}</Badge>
                  </td>
                  <td className="p-4">
                    <Switch
                      checked={image.featured}
                      onCheckedChange={() => toggleFeatured(image.id)}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" className="hover:bg-[#f5f3ef]">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="hover:bg-red-50 text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredImages.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-[#e8e4dd]">
          <Image className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No images found.</p>
        </div>
      )}

      {/* MVP Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <p className="text-sm text-amber-800">
          <strong>MVP Notice:</strong> Gallery management is currently in preview mode. 
          Full upload and editing functionality will be available in the next update.
        </p>
      </div>
    </div>
  );
}
