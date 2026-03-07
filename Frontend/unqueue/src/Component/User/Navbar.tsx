import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, History, MapPin, Ticket } from 'lucide-react';

export function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Ticket className="w-8 h-8 text-indigo-600" />
            <span className="text-2xl font-bold text-gray-900">UniQueue</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                isActive('/')
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>

            <Link
              to="/history"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                isActive('/history')
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <History className="w-5 h-5" />
              <span className="hidden sm:inline">History</span>
            </Link>

            <Link
              to="/location"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                isActive('/location')
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <MapPin className="w-5 h-5" />
              <span className="hidden sm:inline">Location</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
