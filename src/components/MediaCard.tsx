import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { getImageUrl } from '../services/tmdb';
import { Movie, TVShow } from '../types/tmdb';
import WatchlistButton from './WatchlistButton';

interface MediaCardProps {
  media: Movie | TVShow;
  type: 'movie' | 'tv';
}

export default function MediaCard({ media, type }: MediaCardProps) {
  const title = type === 'movie' ? (media as Movie).title : (media as TVShow).name;
  const releaseDate = type === 'movie' 
    ? (media as Movie).release_date 
    : (media as TVShow).first_air_date;

  return (
    <Link 
      to={`/${type}/${media.id}`}
      className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl block"
    >
      <div className="aspect-[2/3] bg-gray-800">
        <img
          src={getImageUrl(media.poster_path)}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-2 right-2" onClick={(e) => e.preventDefault()}>
          <WatchlistButton media={media} mediaType={type} />
        </div>
        <div className="absolute bottom-0 p-4 space-y-2">
          <h3 className="text-lg font-bold line-clamp-2">{title}</h3>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
              <span>{media.vote_average.toFixed(1)}</span>
            </div>
            <span>•</span>
            <span>{new Date(releaseDate).getFullYear()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}