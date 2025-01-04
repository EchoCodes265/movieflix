import { createContext, useContext, ReactNode, useEffect, useReducer } from 'react';
import { Movie, TVShow } from '../types/tmdb';

type WatchlistItem = (Movie | TVShow) & { mediaType: 'movie' | 'tv' };

interface WatchlistState {
  items: WatchlistItem[];
}

type WatchlistAction = 
  | { type: 'ADD_TO_WATCHLIST'; payload: WatchlistItem }
  | { type: 'REMOVE_FROM_WATCHLIST'; payload: { id: number } }
  | { type: 'LOAD_WATCHLIST'; payload: WatchlistItem[] };

const initialState: WatchlistState = {
  items: []
};

const WatchlistContext = createContext<{
  state: WatchlistState;
  dispatch: React.Dispatch<WatchlistAction>;
} | undefined>(undefined);

function watchlistReducer(state: WatchlistState, action: WatchlistAction): WatchlistState {
  switch (action.type) {
    case 'ADD_TO_WATCHLIST':
      if (state.items.some(item => item.id === action.payload.id)) {
        return state;
      }
      return { 
        items: [...state.items, action.payload] 
      };
    case 'REMOVE_FROM_WATCHLIST':
      return { 
        items: state.items.filter(item => item.id !== action.payload.id) 
      };
    case 'LOAD_WATCHLIST':
      return { items: action.payload };
    default:
      return state;
  }
}

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(watchlistReducer, initialState);

  useEffect(() => {
    const savedWatchlist = localStorage.getItem('watchlist');
    if (savedWatchlist) {
      dispatch({ 
        type: 'LOAD_WATCHLIST', 
        payload: JSON.parse(savedWatchlist) 
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(state.items));
  }, [state.items]);

  return (
    <WatchlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
}