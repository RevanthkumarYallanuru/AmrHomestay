import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star, Reply, ExternalLink, ChevronRight, ChevronDown, Search, Filter, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { reviewStorage } from '@/lib/storage';
import { initializeSeedData } from '@/lib/seed-data';
import { format } from 'date-fns';

// Initialize seed data
initializeSeedData();

const filterOptions = ['Latest First', 'Oldest First', 'Highest Rated', 'Lowest Rated'];
const ratingFilters = ['All Ratings', '5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'];

export default function AdminReviews() {
  const [reviews, setReviews] = useState(() => reviewStorage.getAll());
  const [expandedReview, setExpandedReview] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [sortBy, setSortBy] = useState('Latest First');
  const [ratingFilter, setRatingFilter] = useState('All Ratings');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReviews = useMemo(() => {
    let result = [...reviews];

    // Filter by rating
    if (ratingFilter !== 'All Ratings') {
      const stars = parseInt(ratingFilter[0]);
      result = result.filter(r => r.rating === stars);
    }

    // Filter by search
    if (searchQuery) {
      result = result.filter(r =>
        r.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.comment.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case 'Oldest First':
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'Highest Rated':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'Lowest Rated':
        result.sort((a, b) => a.rating - b.rating);
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [reviews, sortBy, ratingFilter, searchQuery]);

  const stats = useMemo(() => {
    const all = reviews;
    const avgRating = all.reduce((acc, r) => acc + r.rating, 0) / all.length || 0;
    const fiveStars = all.filter(r => r.rating === 5).length;
    
    return {
      total: all.length,
      avgRating: avgRating.toFixed(1),
      fiveStars,
      fiveStarPercent: Math.round((fiveStars / all.length) * 100) || 0,
      sentiment: avgRating >= 4.5 ? 'Positive' : avgRating >= 3.5 ? 'Neutral' : 'Needs Attention',
    };
  }, [reviews]);

  const toggleFeatured = (reviewId: string) => {
    const review = reviews.find(r => r.id === reviewId);
    if (review) {
      reviewStorage.update(reviewId, { featured: !review.featured });
      setReviews(reviewStorage.getAll());
    }
  };

  const handleReply = (reviewId: string) => {
    if (replyText[reviewId]) {
      // Here you would save the reply
      console.log('Reply to review', reviewId, ':', replyText[reviewId]);
      setReplyText(prev => ({ ...prev, [reviewId]: '' }));
      setExpandedReview(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Home</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground">Guest Reviews</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl lg:text-3xl text-foreground">Guest Reviews</h1>
          <p className="text-muted-foreground mt-1">
            Monitor guest satisfaction, respond to feedback, and showcase your best testimonials.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 rounded-full border-[#e8e4dd]">
            Export CSV
          </Button>
          <Button className="bg-[#b8860b] hover:bg-[#8b6914] text-white gap-2 rounded-full">
            Invite Review
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-[#e8e4dd] p-5"
        >
          <p className="text-sm text-muted-foreground mb-2">Average Rating</p>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-serif text-foreground">{stats.avgRating}</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(parseFloat(stats.avgRating))
                      ? 'fill-[#b8860b] text-[#b8860b]'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <Badge className="mt-2 bg-emerald-100 text-emerald-700 border-0">+3%</Badge>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-[#e8e4dd] p-5"
        >
          <p className="text-sm text-muted-foreground mb-2">Total Reviews</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif text-foreground">{stats.total}</span>
            <span className="text-sm text-muted-foreground">Lifetime</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-[#e8e4dd] p-5"
        >
          <p className="text-sm text-muted-foreground mb-2">5-Star Reviews</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif text-foreground">{stats.fiveStars}</span>
            <span className="text-sm text-muted-foreground">({stats.fiveStarPercent}%)</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-[#e8e4dd] p-5"
        >
          <p className="text-sm text-muted-foreground mb-2">Sentiment Trend</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold text-emerald-600">{stats.sentiment}</span>
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-[#e8e4dd] p-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl border-[#e8e4dd]"
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-[#e8e4dd] rounded-xl px-4 py-2 pr-10 text-sm"
              >
                {filterOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={ratingFilter}
                onChange={e => setRatingFilter(e.target.value)}
                className="appearance-none bg-white border border-[#e8e4dd] rounded-xl px-4 py-2 pr-10 text-sm"
              >
                {ratingFilters.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review, index) => {
          const initials = review.guestName.split(' ').map(n => n[0]).join('').toUpperCase();
          
          return (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl border border-[#e8e4dd] p-6"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Guest Info */}
                <div className="flex items-start gap-4 lg:w-56 flex-shrink-0">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-[#b8860b] text-white font-medium">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-foreground">{review.guestName}</h4>
                    <p className="text-sm text-muted-foreground">{review.roomName}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(new Date(review.createdAt), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>

                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'fill-[#b8860b] text-[#b8860b]' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">{review.rating}.0</span>
                  </div>
                  <p className="text-foreground leading-relaxed">{review.comment}</p>
                  
                  {/* Reply Section */}
                  {expandedReview === review.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 p-4 bg-[#f9f8f6] rounded-xl"
                    >
                      <p className="text-sm font-medium text-foreground mb-2">Your Response</p>
                      <textarea
                        value={replyText[review.id] || ''}
                        onChange={e => setReplyText(prev => ({ ...prev, [review.id]: e.target.value }))}
                        placeholder="Type your response to this review..."
                        className="w-full p-3 rounded-xl border border-[#e8e4dd] min-h-[80px] resize-none text-sm"
                      />
                      <div className="flex justify-end gap-2 mt-3">
                        <Button variant="outline" size="sm" onClick={() => setExpandedReview(null)} className="rounded-full">
                          Cancel
                        </Button>
                        <Button size="sm" onClick={() => handleReply(review.id)} className="bg-[#b8860b] hover:bg-[#8b6914] text-white rounded-full">
                          Send Reply
                        </Button>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Actions */}
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#e8e4dd]">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setExpandedReview(expandedReview === review.id ? null : review.id)}
                      className="gap-2 text-muted-foreground hover:text-foreground"
                    >
                      <Reply className="w-4 h-4" />
                      Reply to Review
                    </Button>
                    
                    <div className="flex items-center gap-2 ml-auto">
                      <span className="text-sm text-muted-foreground">Feature on Website</span>
                      <Switch
                        checked={review.featured}
                        onCheckedChange={() => toggleFeatured(review.id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {filteredReviews.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-[#e8e4dd]">
            <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No reviews found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
