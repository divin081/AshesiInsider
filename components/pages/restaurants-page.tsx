'use client';

import ReviewCard from '../review-card';
import RatingStars from '../rating-stars';
import { Search, Plus, MapPin, Clock } from 'lucide-react';

const restaurantData = [
  {
    id: 1,
    name: 'The Chill Spot',
    location: 'Campus Gate',
    rating: 4.5,
    reviews: 56,
    cuisine: 'Ghanaian & Continental',
    hours: '7am - 10pm',
    reviews_list: [
      {
        author: 'Abigail Aboagye',
        rating: 5,
        title: 'Best jollof on campus!',
        text: 'Their jollof rice is absolutely incredible. Great service, fair prices, and the atmosphere is perfect for hanging with friends.',
        date: '1 week ago',
        helpful: 42,
      },
    ],
  },
  {
    id: 2,
    name: 'Campus Café',
    location: 'Student Center',
    rating: 3.9,
    reviews: 38,
    cuisine: 'Coffee & Pastries',
    hours: '6am - 8pm',
    reviews_list: [
      {
        author: 'Yaw Boadu',
        rating: 4,
        title: 'Perfect for studying',
        text: 'Great coffee and a quiet study environment. WiFi is reliable too. A bit pricey for students but worth it sometimes.',
        date: '2 weeks ago',
        helpful: 28,
      },
    ],
  },
  {
    id: 3,
    name: 'Grillhouse Express',
    location: 'Main Street',
    rating: 4.3,
    reviews: 45,
    cuisine: 'Grilled Meats',
    hours: '11am - 11pm',
    reviews_list: [
      {
        author: 'Akweley Mensah',
        rating: 5,
        title: 'Suya night vibes!',
        text: 'Best place to grab suya after evening classes. The meat is always fresh and seasoned perfectly. Highly recommended!',
        date: '3 days ago',
        helpful: 19,
      },
    ],
  },
];

export default function RestaurantsPage() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black mb-4 text-secondary">Restaurant Reviews</h1>
          <p className="text-lg text-muted-foreground mb-8">Find the best dining spots around Ashesi</p>

          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search restaurants..."
                className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground"
              />
            </div>
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
              <Plus size={20} />
              Add Review
            </button>
          </div>
        </div>

        {/* Restaurants Grid */}
        <div className="space-y-8">
          {restaurantData.map((restaurant) => (
            <div key={restaurant.id} className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-card-foreground mb-2">{restaurant.name}</h2>
                  <div className="flex flex-col gap-1 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      {restaurant.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      {restaurant.hours}
                    </div>
                    <p className="text-sm">{restaurant.cuisine}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-secondary mb-1">{restaurant.rating}</div>
                  <RatingStars rating={restaurant.rating} count={restaurant.reviews} />
                </div>
              </div>

              {/* Reviews */}
              <div className="space-y-4">
                {restaurant.reviews_list.map((review, idx) => (
                  <ReviewCard key={idx} {...review} />
                ))}
              </div>

              <button className="mt-6 text-primary font-semibold hover:underline">
                View all {restaurant.reviews} reviews →
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
