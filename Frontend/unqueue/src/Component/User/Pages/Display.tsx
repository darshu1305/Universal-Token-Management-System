import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Filter } from 'lucide-react';
import { useTokens } from '../TokenContext';
import { StoreType, STORE_DATA, CITIES } from '../Types';

export default function Display() {
  const { getTokensByStatus } = useTokens();
  const [currentTime, setCurrentTime] = useState(new Date());

  const [filter, setFilter] = useState<{
    storeType: StoreType | '';
    city: string;
  }>({
    storeType: '',
    city: ''
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const servingTokens = getTokensByStatus('serving', filter.storeType || undefined, filter.city || undefined);
  const waitingTokens = getTokensByStatus('waiting', filter.storeType || undefined, filter.city || undefined);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Home</span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Live Queue Display</h1>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span className="text-2xl font-mono font-semibold">
                {currentTime.toLocaleTimeString()}
              </span>
            </div>
            <p className="text-sm text-gray-500">{currentTime.toLocaleDateString()}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-semibold text-gray-700">Filter:</span>
            </div>
            <select
              value={filter.storeType}
              onChange={(e) => setFilter({ ...filter, storeType: e.target.value as StoreType | '' })}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            >
              <option value="">All Stores</option>
              {Object.entries(STORE_DATA).map(([key, value]) => (
                <option key={key} value={key}>{value.name}</option>
              ))}
            </select>
            <select
              value={filter.city}
              onChange={(e) => setFilter({ ...filter, city: e.target.value })}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            >
              <option value="">All Cities</option>
              {CITIES.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {(filter.storeType || filter.city) && (
              <button
                onClick={() => setFilter({ storeType: '', city: '' })}
                className="px-3 py-1.5 text-sm text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Now Serving */}
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Now Serving</h2>
          
          {servingTokens.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servingTokens.map(token => (
                <div key={token.id} className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-8 text-white text-center animate-pulse">
                  <p className="text-lg opacity-90 mb-2">Token</p>
                  <p className="text-6xl font-bold mb-4">{token.tokenNumber}</p>
                  {token.customerName && (
                    <p className="text-xl mb-2">{token.customerName}</p>
                  )}
                  <div className="mt-4 pt-4 border-t border-white/30">
                    <p className="text-sm opacity-90">{token.storeName}</p>
                    <p className="text-sm opacity-90">
  {STORE_DATA[token.storeType as StoreType]?.name}
</p>
                    <p className="text-sm opacity-90">{token.service}</p>
                    <p className="text-sm opacity-75 mt-1">{token.city}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-2xl text-gray-500">No token being served</p>
              <p className="text-gray-400 mt-2">Please wait for the next call</p>
            </div>
          )}
        </div>

        {/* Waiting Queue */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Waiting Queue</h2>
            <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg">
              <Users className="w-5 h-5" />
              <span className="font-bold">{waitingTokens.length}</span>
              <span className="text-sm">in queue</span>
            </div>
          </div>

          {waitingTokens.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {waitingTokens.map((token, index) => (
                <div 
                  key={token.id} 
                  className={`border-2 rounded-lg p-4 text-center transition-all ${
                    index === 0 
                      ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <span className={`text-2xl font-bold ${index === 0 ? 'text-indigo-600' : 'text-gray-700'}`}>
                      {token.tokenNumber}
                    </span>
                  </div>
                  {token.customerName && (
                    <p className="text-xs font-semibold text-gray-900 truncate mb-1">{token.customerName}</p>
                  )}
                  <p className="text-xs text-gray-600 truncate mb-1">{token.storeName}</p>
                  <p className="text-xs text-gray-600 truncate">{token.service}</p>
                  <p className="text-xs text-gray-500 mt-1">{token.city}</p>
                  {index === 0 && (
                    <div className="mt-2 text-xs font-semibold text-indigo-600">Next</div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No tokens in waiting queue</p>
            </div>
          )}
        </div>

        {/* Info Banner */}
        <div className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white text-center">
          <p className="text-lg font-semibold">
            Please keep your token safe and listen for your number
          </p>
        </div>
      </div>
    </div>
  );
}