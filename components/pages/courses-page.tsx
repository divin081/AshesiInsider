'use client';

import ReviewCard from '../review-card';
import RatingStars from '../rating-stars';
import { Search, Plus } from 'lucide-react';

const courseData = [
  {
    id: 1,
    name: 'Data Structures & Algorithms',
    code: 'CS 201',
    rating: 4.2,
    reviews: 28,
    instructor: 'Dr. Kwame Asante',
    semester: 'Fall 2024',
    reviews_list: [
      {
        author: 'Ama Sarpong',
        rating: 5,
        title: 'Challenging but rewarding',
        text: 'Great course that really helps you understand the foundations of CS. Dr. Asante is very knowledgeable and makes complex topics understandable.',
        date: '2 weeks ago',
        helpful: 24,
      },
      {
        author: 'Kofi Mensah',
        rating: 4,
        title: 'Good content, heavy workload',
        text: 'The assignments are quite demanding, but the course material is well-structured. Definitely brought my algorithms game up.',
        date: '1 month ago',
        helpful: 15,
      },
    ],
  },
  {
    id: 2,
    name: 'African History & Culture',
    code: 'HST 150',
    rating: 4.7,
    reviews: 42,
    instructor: 'Prof. Ama Adjei',
    semester: 'Fall 2024',
    reviews_list: [
      {
        author: 'Nana Akosua',
        rating: 5,
        title: 'Absolutely fascinating!',
        text: 'Prof. Adjei brings African history to life. Engaging lectures, thoughtful discussions, and really makes you think critically about our heritage.',
        date: '3 weeks ago',
        helpful: 31,
      },
    ],
  },
  {
    id: 3,
    name: 'Business Analytics',
    code: 'BUS 210',
    rating: 3.8,
    reviews: 19,
    instructor: 'Dr. Samuel Boateng',
    semester: 'Fall 2024',
    reviews_list: [
      {
        author: 'Kojo Ansah',
        rating: 4,
        title: 'Practical skills for the real world',
        text: 'Very practical course with real-world applications. Dr. Boateng knows his stuff, though the Excel work can be tedious.',
        date: '1 month ago',
        helpful: 12,
      },
    ],
  },
];

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black mb-4 text-secondary">Course Reviews</h1>
          <p className="text-lg text-muted-foreground mb-8">Discover what your peers think about courses at Ashesi</p>

          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground"
              />
            </div>
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
              <Plus size={20} />
              Add Review
            </button>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="space-y-8">
          {courseData.map((course) => (
            <div key={course.id} className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary/20 px-4 py-2 rounded-lg">
                      <span className="text-primary font-bold">{course.code}</span>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-card-foreground">{course.name}</h2>
                  <p className="text-muted-foreground">Instructor: {course.instructor}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-secondary mb-1">{course.rating}</div>
                  <RatingStars rating={course.rating} count={course.reviews} />
                </div>
              </div>

              {/* Reviews */}
              <div className="space-y-4">
                {course.reviews_list.map((review, idx) => (
                  <ReviewCard key={idx} {...review} />
                ))}
              </div>

              <button className="mt-6 text-primary font-semibold hover:underline">
                View all {course.reviews} reviews →
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
