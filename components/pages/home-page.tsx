'use client';

import { BookOpen, UtensilsCrossed, Users, HomeIcon } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const categories = [
    {
      id: 'courses',
      title: 'Courses',
      description: 'Discover and review courses at Ashesi',
      icon: BookOpen,
      color: 'bg-blue-500',
    },
    {
      id: 'restaurants',
      title: 'Restaurants',
      description: 'Find the best dining spots around campus',
      icon: UtensilsCrossed,
      color: 'bg-orange-500',
    },
    {
      id: 'lecturers',
      title: 'Lecturers',
      description: 'Rate and review your favorite lecturers',
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      id: 'hostels',
      title: 'Hostels',
      description: 'Find the best hostel accommodations',
      icon: HomeIcon,
      color: 'bg-green-500',
    },
  ];

  return (
    <main className="min-h-screen bg-white text-foreground py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-balance">
            Welcome to <span className="text-primary">Ashesi Insider</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance">
            The ultimate student review platform for discovering courses, restaurants, lecturers, and hostels
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => onNavigate(category.id)}
                className="group bg-card border border-border rounded-2xl p-8 hover:bg-accent/5 transition-all hover:scale-105 text-left"
              >
                <div className={`${category.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4 text-white`}>
                  <Icon size={32} />
                </div>
                <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
                <p className="text-muted-foreground">{category.description}</p>
                <div className="mt-4 text-primary font-semibold group-hover:translate-x-2 transition-transform">
                  Explore →
                </div>
              </button>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="bg-card border border-border rounded-2xl p-8 grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-black text-primary mb-2">240+</div>
            <p className="text-muted-foreground">Courses Reviewed</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-primary mb-2">85+</div>
            <p className="text-muted-foreground">Lecturers Rated</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-primary mb-2">35+</div>
            <p className="text-muted-foreground">Restaurants Listed</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-primary mb-2">12+</div>
            <p className="text-muted-foreground">Hostels Reviewed</p>
          </div>
        </div>
      </div>
    </main>
  );
}
