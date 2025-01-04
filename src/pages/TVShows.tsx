import { useEffect, useState } from 'react';
import { TVShow } from '../types/tmdb';
import { fetchTrending, fetchNowPlaying } from '../services/tmdb';
import MediaSection from '../components/MediaSection';
import { Tv, Loader } from 'lucide-react';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

export default function TVShows() {
  const [data, setData] = useState<{
    trending: TVShow[];
    onAir: TVShow[];
  }>({
    trending: [],
    onAir: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [trending, onAir] = await Promise.all([
          fetchTrending('tv'),
          fetchNowPlaying('tv'),
        ]);

        setData({ trending, onAir });
      } catch (err) {
        setError('Failed to load TV shows. Please try again later.');
        console.error('Error fetching TV shows:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingState message="Loading TV shows..." />;
  if (error) return <ErrorState message={error} />;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <Tv className="w-8 h-8" />
        <h1 className="text-3xl font-bold">TV Shows</h1>
      </div>

      <div className="space-y-12">
        <MediaSection
          items={data.trending}
          type="tv"
          title="Trending TV Shows"
        />
        <MediaSection
          items={data.onAir}
          type="tv"
          title="Currently Airing"
        />
      </div>
    </main>
  );
}