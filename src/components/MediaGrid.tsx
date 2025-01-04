import { Movie, TVShow, MediaType } from '../types/tmdb';
import MediaCard from './MediaCard';

interface MediaGridProps {
  items: (Movie | TVShow)[];
  type: MediaType;
  title: string;
}

export default function MediaGrid({ items, type, title }: MediaGridProps) {
  console.log('MediaGrid rendering:', { title, itemCount: items?.length });
  
  if (!items?.length) {
    return null;
  }

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {items.map((item) => (
          <MediaCard key={item.id} media={item} type={type} />
        ))}
      </div>
    </section>
  );
}