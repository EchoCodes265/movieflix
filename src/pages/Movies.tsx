import { useEffect, useState } from 'react';
import { Movie } from '../types/tmdb';
import { fetchTrending, fetchNowPlaying } from '../services/tmdb';
import MediaSection from '../components/MediaSection';
import { Film, Loader } from 'lucide-react';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

export default function Movies() {
  const [data, setData] = useState<{
    trending: Movie[];
    nowPlaying: Movie[];
  }>({
    trending: [],
    nowPlaying: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [trending, nowPlaying] = await Promise.all([
          fetchTrending('movie'),
          fetchNowPlaying('movie'),
        ]);

        setData({ trending, nowPlaying });
      } catch (err) {
        setError('Failed to load movies. Please try again later.');
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingState message="Loading movies..." />;
  if (error) return <ErrorState message={error} />;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <Film className="w-8 h-8" />
        <h1 className="text-3xl font-bold">Movies</h1>
      </div>

      <div className="space-y-12">
        <MediaSection
          items={data.trending}
          type="movie"
          title="Trending Movies"
        />
        <MediaSection
          items={data.nowPlaying}
          type="movie"
          title="Now Playing"
        />
      </div>
    </main>
  );
}