'use client';

import RatingStars from './rating-stars';
import { ThumbsUp } from 'lucide-react';

interface ReviewCardProps {
  author: string;
  rating: number;
  title: string;
  text: string;
  date: string;
  helpful?: number;
}

export default function ReviewCard({ author, rating, title, text, date, helpful = 0 }: ReviewCardProps) {
  return (
    <div className="bg-card rounded-xl p-5 border border-border hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-semibold text-card-foreground">{author}</p>
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>
        <RatingStars rating={rating} />
      </div>
      <h3 className="font-bold text-card-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{text}</p>
      <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-accent transition-colors">
        <ThumbsUp size={14} />
        <span>Helpful ({helpful})</span>
      </button>
    </div>
  );
}
