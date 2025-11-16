'use client';

import ReviewCard from '../review-card';
import RatingStars from '../rating-stars';
import { Search, Plus, MapPin, Users } from 'lucide-react';

const hostelData = [
  {
    id: 1,
    name: 'Unity Hostel',
    location: 'East Campus',
    rating: 4.6,
    reviews: 28,
    capacity: '120 students',
    amenities: 'WiFi, Gym, Kitchen, Common Room',
    reviews_list: [
      {
        author: 'Grace Adeyemi',
        rating: 5,
        title: 'Great community vibes',
        text: 'Unity Hostel has an amazing sense of community. The rooms are spacious, the management is responsive, and the common areas are perfect for hanging out.',
        date: '3 weeks ago',
        helpful: 31,
      },
    ],
  },
  {
    id: 2,
    name: 'Harmony Heights',
    location: 'West Campus',
    rating: 4.1,
    reviews: 19,
    capacity: '85 students',
    amenities: 'WiFi, Common Room, Laundry',
    reviews_list: [
      {
        author: 'Kwesi Obimpeh',
        rating: 4,
        title: 'Good value for money',
        text: 'Decent hostel with reasonable rates. The facilities could use some updating, but overall it\'s a comfortable place to stay while studying here.',
        date: '1 month ago',
        helpful: 16,
      },
    ],
  },
  {
    id: 3,
    name: 'Sunrise Residence',
    location: 'North Campus',
    rating: 4.3,
    reviews: 35,
    capacity: '100 students',
    amenities: 'WiFi, Gym, Study Room, Cafeteria',
    reviews_list: [
      {
        author: 'Priscilla Mensah',
        rating: 5,
        title: 'Best place to live on campus',
        text: 'Sunrise Residence is top-notch. Clean rooms, excellent maintenance staff, and the cafeteria has great food. Highly recommend!',
        date: '5 days ago',
        helpful: 22,
      },
    ],
  },
];

export default function HostelsPage() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black mb-4 text-secondary">Hostel Reviews</h1>
          <p className="text-lg text-muted-foreground mb-8">Find the best hostel accommodation at Ashesi</p>

          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search hostels..."
                className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground"
              />
            </div>
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
              <Plus size={20} />
              Add Review
            </button>
          </div>
        </div>

        {/* Hostels Grid */}
        <div className="space-y-8">
          {hostelData.map((hostel) => (
            <div key={hostel.id} className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-card-foreground mb-2">{hostel.name}</h2>
                  <div className="flex flex-col gap-2 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      {hostel.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      {hostel.capacity}
                    </div>
                    <p className="text-sm">Amenities: {hostel.amenities}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-secondary mb-1">{hostel.rating}</div>
                  <RatingStars rating={hostel.rating} count={hostel.reviews} />
                </div>
              </div>

              {/* Reviews */}
              <div className="space-y-4">
                {hostel.reviews_list.map((review, idx) => (
                  <ReviewCard key={idx} {...review} />
                ))}
              </div>

              <button className="mt-6 text-primary font-semibold hover:underline">
                View all {hostel.reviews} reviews →
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
