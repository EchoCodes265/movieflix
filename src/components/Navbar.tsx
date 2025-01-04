import { Film, Search, Menu, X, Bookmark } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import SearchResults from './SearchResults';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleSearchFocus = () => setShowResults(true);
  const handleSearchBlur = () => {
    setTimeout(() => setShowResults(false), 200);
  };

  return (
    <header className="bg-black/30 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          <Link to="/" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
            <Film className="w-8 h-8" />
            <h1 className="text-3xl font-bold">MovieFlix</h1>
          </Link>

          <div className="relative flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search movies and TV shows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                className="w-full bg-gray-800/50 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {showResults && searchQuery.trim() && (
              <div className="absolute top-full mt-2 w-full bg-gray-900 rounded-lg shadow-xl">
                <SearchResults query={searchQuery} />
              </div>
            )}
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/movies"
              className={`hover:text-blue-400 transition-colors ${
                location.pathname === '/movies' ? 'text-blue-400' : ''
              }`}
            >
              Movies
            </Link>
            <Link
              to="/tv-shows"
              className={`hover:text-blue-400 transition-colors ${
                location.pathname === '/tv-shows' ? 'text-blue-400' : ''
              }`}
            >
              TV Shows
            </Link>
            <Link
              to="/watchlist"
              className={`hover:text-blue-400 transition-colors flex items-center gap-1 ${
                location.pathname === '/watchlist' ? 'text-blue-400' : ''
              }`}
            >
              <Bookmark className="w-5 h-5" />
              Watchlist
            </Link>
          </nav>

          <button
            className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="mt-4 bg-black/50 rounded-lg p-4 md:hidden">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search movies and TV shows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                className="w-full bg-gray-800/50 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {showResults && searchQuery.trim() && (
              <div className="mt-2 bg-gray-900 rounded-lg shadow-xl">
                <SearchResults query={searchQuery} />
              </div>
            )}

            <Link
              to="/movies"
              className={`block py-2 hover:text-blue-400 transition-colors ${
                location.pathname === '/movies' ? 'text-blue-400' : ''
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Movies
            </Link>
            <Link
              to="/tv-shows"
              className={`block py-2 hover:text-blue-400 transition-colors ${
                location.pathname === '/tv-shows' ? 'text-blue-400' : ''
              }`}
              onClick={() => setMenuOpen(false)}
            >
              TV Shows
            </Link>
            <Link
              to="/watchlist"
              className={`block py-2 hover:text-blue-400 transition-colors flex items-center gap-1 ${
                location.pathname === '/watchlist' ? 'text-blue-400' : ''
              }`}
              onClick={() => setMenuOpen(false)}
            >
              <Bookmark className="w-5 h-5" />
              Watchlist
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}