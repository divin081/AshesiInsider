'use client';

import { BookOpen, UtensilsCrossed, Users, HomeIcon, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onSignIn: () => void;
}

export default function Navigation({ currentPage, onNavigate, onSignIn }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'restaurants', label: 'Restaurants', icon: UtensilsCrossed },
    { id: 'lecturers', label: 'Lecturers', icon: Users },
    { id: 'hostels', label: 'Hostels', icon: HomeIcon },
  ];

  return (
    <nav className="bg-secondary text-secondary-foreground sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('courses')}>
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold text-lg">
              🎓
            </div>
            <span className="font-bold text-xl hidden sm:inline">Ashesi Insider</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    currentPage === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-opacity-80'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sign In Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={onSignIn}
              className="hidden sm:block bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Sign In
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-secondary border-t border-secondary-foreground/20 py-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                    currentPage === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-opacity-80'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
            <button
              onClick={() => {
                onSignIn();
                setMobileMenuOpen(false);
              }}
              className="w-full mt-4 mx-4 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold"
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
