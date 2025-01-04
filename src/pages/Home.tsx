import { useEffect } from 'react';
import { fetchTrending, fetchNowPlaying } from '../services/tmdb';
import { useMedia } from '../context/MediaContext';
import MediaSection from '../components/MediaSection';
import { Film, Tv } from 'lucide-react';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import SEOHead from '../components/common/SEOHead';

export default function Home() {
  const { state, dispatch } = useMedia();
  const { trendingMovies, trendingTVShows, nowPlayingMovies, onAirTVShows, loading, error } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'SET_LOADING' });
        const [trendingMovies, trendingTVShows, nowPlayingMovies, onAirTVShows] = 
          await Promise.all([
            fetchTrending('movie'),
            fetchTrending('tv'),
            fetchNowPlaying('movie'),
            fetchNowPlaying('tv')
          ]);

        dispatch({
          type: 'SET_MEDIA_DATA',
          payload: {
            trendingMovies,
            trendingTVShows,
            nowPlayingMovies,
            onAirTVShows,
          }
        });
      } catch (err) {
        dispatch({ 
          type: 'SET_ERROR', 
          payload: 'Failed to load content. Please try again later.'
        });
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) return <LoadingState message="Loading amazing content..." />;
  if (error) return <ErrorState message={error} />;

  return (
    <>
      <SEOHead 
        title="Home"
        description="Discover the latest movies and TV shows on MovieFlix. Watch trailers, browse ratings, and find your next favorite show."
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-12">
          <div id="movies">
            <div className="flex items-center gap-2 mb-6">
              <Film className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Movies</h2>
            </div>
            <div className="space-y-12">
              <MediaSection
                items={trendingMovies}
                type="movie"
                title="Trending Movies"
              />
              <MediaSection
                items={nowPlayingMovies}
                type="movie"
                title="Now Playing"
              />
            </div>
          </div>

          <div id="tv-shows">
            <div className="flex items-center gap-2 mb-6">
              <Tv className="w-6 h-6" />
              <h2 className="text-2xl font-bold">TV Shows</h2>
            </div>
            <div className="space-y-12">
              <MediaSection
                items={trendingTVShows}
                type="tv"
                title="Trending TV Shows"
              />
              <MediaSection
                items={onAirTVShows}
                type="tv"
                title="Currently Airing"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}