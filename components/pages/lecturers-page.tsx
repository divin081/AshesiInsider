'use client';

import ReviewCard from '../review-card';
import RatingStars from '../rating-stars';
import { Search, Plus } from 'lucide-react';

const lecturerData = [
  {
    id: 1,
    name: 'Dr. Kwame Asante',
    department: 'Computer Science',
    rating: 4.4,
    reviews: 33,
    courses: 'Data Structures, Algorithms, OOP',
    reviews_list: [
      {
        author: 'Benjamin Osei',
        rating: 5,
        title: 'Makes complex topics simple',
        text: 'Dr. Asante has an amazing ability to break down complex concepts. His examples are relatable and his office hours are genuinely helpful.',
        date: '2 weeks ago',
        helpful: 27,
      },
    ],
  },
  {
    id: 2,
    name: 'Prof. Ama Adjei',
    department: 'History',
    rating: 4.8,
    reviews: 51,
    courses: 'African History, World History',
    reviews_list: [
      {
        author: 'Esi Owusu',
        rating: 5,
        title: 'The best lecturer on campus',
        text: 'Prof. Adjei is passionate about her subject and it shows in every class. Engaging, fair grading, and truly cares about student learning.',
        date: '1 week ago',
        helpful: 38,
      },
    ],
  },
  {
    id: 3,
    name: 'Mr. Samuel Boateng',
    department: 'Business',
    rating: 3.7,
    reviews: 22,
    courses: 'Business Analytics, Marketing',
    reviews_list: [
      {
        author: 'Nii Armah',
        rating: 4,
        title: 'Knowledgeable but demanding',
        text: 'Mr. Boateng knows business inside and out, but expects a lot from students. The course is challenging but definitely worth taking.',
        date: '3 weeks ago',
        helpful: 14,
      },
    ],
  },
];

export default function LecturersPage() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black mb-4 text-secondary">Lecturer Reviews</h1>
          <p className="text-lg text-muted-foreground mb-8">Rate and review your favorite lecturers</p>

          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search lecturers..."
                className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground"
              />
            </div>
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
              <Plus size={20} />
              Add Review
            </button>
          </div>
        </div>

        {/* Lecturers Grid */}
        <div className="space-y-8">
          {lecturerData.map((lecturer) => (
            <div key={lecturer.id} className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-14 h-14 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                      {lecturer.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-card-foreground">{lecturer.name}</h2>
                      <p className="text-muted-foreground text-sm">{lecturer.department}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-3">Teaches: {lecturer.courses}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-secondary mb-1">{lecturer.rating}</div>
                  <RatingStars rating={lecturer.rating} count={lecturer.reviews} />
                </div>
              </div>

              {/* Reviews */}
              <div className="space-y-4">
                {lecturer.reviews_list.map((review, idx) => (
                  <ReviewCard key={idx} {...review} />
                ))}
              </div>

              <button className="mt-6 text-primary font-semibold hover:underline">
                View all {lecturer.reviews} reviews →
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
