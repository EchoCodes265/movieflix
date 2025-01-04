import { createContext, useContext, ReactNode, useReducer } from 'react';
import { Movie, TVShow } from '../types/tmdb';

interface MediaState {
  trendingMovies: Movie[];
  trendingTVShows: TVShow[];
  nowPlayingMovies: Movie[];
  onAirTVShows: TVShow[];
  loading: boolean;
  error: string | null;
}

type MediaAction = 
  | { type: 'SET_LOADING' }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_MEDIA_DATA'; payload: Partial<MediaState> };

const initialState: MediaState = {
  trendingMovies: [],
  trendingTVShows: [],
  nowPlayingMovies: [],
  onAirTVShows: [],
  loading: false,
  error: null,
};

const MediaContext = createContext<{
  state: MediaState;
  dispatch: React.Dispatch<MediaAction>;
} | undefined>(undefined);

function mediaReducer(state: MediaState, action: MediaAction): MediaState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: true, error: null };
    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SET_MEDIA_DATA':
      return { ...state, ...action.payload, loading: false, error: null };
    default:
      return state;
  }
}

export function MediaProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(mediaReducer, initialState);

  return (
    <MediaContext.Provider value={{ state, dispatch }}>
      {children}
    </MediaContext.Provider>
  );
}

export function useMedia() {
  const context = useContext(MediaContext);
  if (context === undefined) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
}