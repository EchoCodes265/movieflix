import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchMedia } from '../services/tmdb';
import { Movie, TVShow } from '../types/tmdb';
import { getImageUrl } from '../services/tmdb';

interface SearchResultsProps {
  query: string;
}

export default function SearchResults({ query }: SearchResultsProps) {
  const [results, setResults] = useState<(Movie | TVShow)[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim().length < 2) return;
      
      setLoading(true);
      try {
        const data = await searchMedia(query);
        setResults(data.slice(0, 5)); // Limit to 5 results
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  if (loading) {
    return (
      <div className="absolute top-full mt-2 w-full bg-gray-900 rounded-lg shadow-xl p-4">
        <div className="animate-pulse space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-2">
              <div className="w-12 h-16 bg-gray-800 rounded" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-800 rounded w-3/4" />
                <div className="h-3 bg-gray-800 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!results.length) {
    return null;
  }

  return (
    <div className="absolute top-full mt-2 w-full bg-gray-900 rounded-lg shadow-xl overflow-hidden">
      {results.map((item) => {
        const isMovie = 'title' in item;
        const title = isMovie ? (item as Movie).title : (item as TVShow).name;
        const year = new Date(isMovie ? (item as Movie).release_date : (item as TVShow).first_air_date).getFullYear();

        return (
          <Link
            key={item.id}
            to={`/${isMovie ? 'movie' : 'tv'}/${item.id}`}
            className="flex items-center gap-3 p-3 hover:bg-gray-800 transition-colors"
          >
            <img
              src={getImageUrl(item.poster_path, 'w92')}
              alt={title}
              className="w-12 h-16 object-cover rounded"
            />
            <div>
              <h3 className="font-medium">{title}</h3>
              <p className="text-sm text-gray-400">
                {year} • {isMovie ? 'Movie' : 'TV Show'}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}