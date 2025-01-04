import { useWatchlist } from '../context/WatchlistContext';
import MediaCard from '../components/MediaCard';
import { Bookmark } from 'lucide-react';
import SEOHead from '../components/common/SEOHead';

export default function Watchlist() {
  const { state } = useWatchlist();

  if (!state.items.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <Bookmark className="w-8 h-8" />
          My Watchlist
        </h1>
        <div className="text-center text-gray-400 py-12">
          <p className="text-lg">Your watchlist is empty</p>
          <p className="mt-2">Start adding movies and TV shows to keep track of what you want to watch</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead 
        title="My Watchlist"
        description="Your personal watchlist of movies and TV shows on MovieFlix"
      />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <Bookmark className="w-8 h-8" />
          My Watchlist
        </h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {state.items.map((item) => (
            <MediaCard
              key={item.id}
              media={item}
              type={item.mediaType}
            />
          ))}
        </div>
      </div>
    </>
  );
}