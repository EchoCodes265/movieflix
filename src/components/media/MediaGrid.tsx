import { useCallback } from 'react';
import { Movie, TVShow, MediaType } from '../../types/tmdb';
import MediaCard from './MediaCard';

interface MediaGridProps {
  items: (Movie | TVShow)[];
  type: MediaType;
  title: string;
  onLoadMore?: () => void;
}

export default function MediaGrid({ items, type, title, onLoadMore }: MediaGridProps) {
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    if (!onLoadMore) return;
    
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      onLoadMore();
    }
  }, [onLoadMore]);

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
        onScroll={handleScroll}
      >
        {items.map((item) => (
          <MediaCard key={item.id} media={item} type={type} />
        ))}
      </div>
    </section>
  );
}