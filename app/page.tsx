'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/navigation';
import SignInModal from '@/components/sign-in-modal';
import CoursesPage from '@/components/pages/courses-page';
import RestaurantsPage from '@/components/pages/restaurants-page';
import LecturersPage from '@/components/pages/lecturers-page';
import HostelsPage from '@/components/pages/hostels-page';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('courses');
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    setShowSignIn(true);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'courses':
        return <CoursesPage />;
      case 'restaurants':
        return <RestaurantsPage />;
      case 'lecturers':
        return <LecturersPage />;
      case 'hostels':
        return <HostelsPage />;
      default:
        return <CoursesPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation 
        currentPage={currentPage} 
        onNavigate={setCurrentPage}
        onSignIn={() => setShowSignIn(true)}
      />
      {renderPage()}
      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
    </div>
  );
}
