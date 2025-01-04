import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Calendar, Clock, Users, Loader, Play } from 'lucide-react';
import { fetchDetails, getImageUrl } from '../services/tmdb';
import VideoPlayer from '../components/VideoPlayer';
import WatchlistButton from '../components/WatchlistButton';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import SEOHead from '../components/common/SEOHead';

export default function Details() {
  const { type, id } = useParams();
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      if (!type || !id) return;
      
      try {
        setLoading(true);
        setError(null);
        const data = await fetchDetails(type as 'movie' | 'tv', id);
        setDetails(data);
      } catch (err) {
        setError('Failed to load details. Please try again later.');
        console.error('Error fetching details:', err);
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, [type, id]);

  if (loading) return <LoadingState message="Loading details..." />;
  if (error || !details) return <ErrorState message={error || 'Failed to load details'} />;

  const title = type === 'movie' ? details.title : details.name;
  const releaseDate = type === 'movie' ? details.release_date : details.first_air_date;
  const trailer = details.videos?.results?.find((v: any) => v.type === 'Trailer');

  return (
    <>
      <SEOHead 
        title={title}
        description={details.overview}
        image={getImageUrl(details.backdrop_path, 'original')}
        type="video.movie"
      />

      <div>
        <div 
          className="h-[50vh] relative bg-cover bg-center"
          style={{
            backgroundImage: `url(${getImageUrl(details.backdrop_path, 'original')})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50" />
        </div>

        <main className="container mx-auto px-4 -mt-32 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <img
                src={getImageUrl(details.poster_path, 'w500')}
                alt={title}
                className="w-full rounded-xl shadow-xl"
              />
            </div>

            <div className="md:col-span-2 space-y-6">
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <h1 className="text-4xl font-bold">{title}</h1>
                  <WatchlistButton media={details} mediaType={type as 'movie' | 'tv'} />
                </div>
                <div className="flex flex-wrap gap-4 text-gray-300">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
                    <span>{details.vote_average.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(releaseDate).getFullYear()}</span>
                  </div>
                  {type === 'movie' && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-5 h-5" />
                      <span>{details.runtime} min</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Users className="w-5 h-5" />
                    <span>{details.vote_count.toLocaleString()} votes</span>
                  </div>
                </div>
              </div>

              {details.overview && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Overview</h2>
                  <p className="text-gray-300 leading-relaxed">{details.overview}</p>
                </div>
              )}

              {trailer && (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
                >
                  <Play className="w-5 h-5" />
                  Watch Trailer
                </button>
              )}

              {showTrailer && trailer && (
                <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
                  <div className="relative w-full max-w-4xl">
                    <button
                      onClick={() => setShowTrailer(false)}
                      className="absolute -top-10 right-0 text-white hover:text-gray-300"
                    >
                      Close
                    </button>
                    <VideoPlayer videoKey={trailer.key} />
                  </div>
                </div>
              )}

              {details.genres && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Genres</h2>
                  <div className="flex flex-wrap gap-2">
                    {details.genres.map((genre: any) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {details.credits?.cast && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Cast</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {details.credits.cast.slice(0, 8).map((person: any) => (
                      <div key={person.id} className="text-center">
                        <img
                          src={getImageUrl(person.profile_path, 'w185')}
                          alt={person.name}
                          className="w-full rounded-lg mb-2"
                          loading="lazy"
                        />
                        <p className="font-medium line-clamp-1">{person.name}</p>
                        <p className="text-sm text-gray-400 line-clamp-1">{person.character}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}