import { Movie, TVShow, MediaType } from '../types/tmdb';
import MediaCard from './MediaCard';

interface MediaSectionProps {
  items: (Movie | TVShow)[];
  type: MediaType;
  title: string;
}

export default function MediaSection({ items, type, title }: MediaSectionProps) {
  if (!items?.length) return null;

  return (
    <section className="py-6">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {items.map((item) => (
          <MediaCard key={item.id} media={item} type={type} />
        ))}
      </div>
    </section>
  );
}