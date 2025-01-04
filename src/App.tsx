import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MediaProvider } from './context/MediaContext';
import { WatchlistProvider } from './context/WatchlistContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import Layout from './components/Layout';
import Home from './pages/Home';
import Movies from './pages/Movies';
import TVShows from './pages/TVShows';
import Details from './pages/Details';
import Watchlist from './pages/Watchlist';

function App() {
  return (
    <ErrorBoundary>
      <MediaProvider>
        <WatchlistProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/tv-shows" element={<TVShows />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/:type/:id" element={<Details />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </WatchlistProvider>
      </MediaProvider>
    </ErrorBoundary>
  );
}

export default App;