import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useWatchlist } from '../context/WatchlistContext';
import { Movie, TVShow } from '../types/tmdb';

interface WatchlistButtonProps {
  media: Movie | TVShow;
  mediaType: 'movie' | 'tv';
}

export default function WatchlistButton({ media, mediaType }: WatchlistButtonProps) {
  const { state, dispatch } = useWatchlist();
  const isInWatchlist = state.items.some(item => item.id === media.id);

  const handleToggleWatchlist = () => {
    if (isInWatchlist) {
      dispatch({ 
        type: 'REMOVE_FROM_WATCHLIST', 
        payload: { id: media.id } 
      });
    } else {
      dispatch({ 
        type: 'ADD_TO_WATCHLIST', 
        payload: { ...media, mediaType } 
      });
    }
  };

  return (
    <button
      onClick={handleToggleWatchlist}
      className="p-2 rounded-full hover:bg-gray-700/50 transition-colors"
      title={isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
    >
      {isInWatchlist ? (
        <BookmarkCheck className="w-6 h-6 text-blue-400" />
      ) : (
        <Bookmark className="w-6 h-6" />
      )}
    </button>
  );
}