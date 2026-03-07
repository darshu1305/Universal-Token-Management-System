import { useState } from 'react';
import { MapPin, Building2, Users, TrendingUp } from 'lucide-react';
import { useTokens } from '../TokenContext';
import { CITIES, STORE_DATA, StoreType } from '../Types';

export default function Location() {
  const { tokens } = useTokens();
  const [selectedCity, setSelectedCity] = useState<string>('');

  // Calculate statistics per city
  const cityStats = CITIES.map(city => {
    const cityTokens = tokens.filter(t => t.city === city);
    const waiting = cityTokens.filter(t => t.status === 'waiting').length;
    const serving = cityTokens.filter(t => t.status === 'serving').length;
    const completed = cityTokens.filter(t => t.status === 'completed').length;
    
    return {
      city,
      total: cityTokens.length,
      waiting,
      serving,
      completed
    };
  }).filter(stat => stat.total > 0).sort((a, b) => b.total - a.total);

  // Store type distribution for selected city
  const selectedCityTokens = selectedCity 
    ? tokens.filter(t => t.city === selectedCity)
    : [];

  const storeTypeStats = selectedCity 
    ? Object.keys(STORE_DATA).map(storeType => {
        const storeTokens = selectedCityTokens.filter(t => t.storeType === storeType);
        return {
          storeType: storeType as StoreType,
          name: STORE_DATA[storeType as StoreType].name,
          count: storeTokens.length,
          waiting: storeTokens.filter(t => t.status === 'waiting').length,
          serving: storeTokens.filter(t => t.status === 'serving').length,
          completed: storeTokens.filter(t => t.status === 'completed').length
        };
      }).filter(stat => stat.count > 0)
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Location Overview</h1>
          <p className="text-gray-600">View token statistics by city and location</p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-1">Active Cities</p>
                <p className="text-3xl font-bold text-indigo-600">{cityStats.length}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-1">Total Tokens</p>
                <p className="text-3xl font-bold text-gray-900">{tokens.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-1">Busiest City</p>
                <p className="text-xl font-bold text-gray-900">
                  {cityStats.length > 0 ? cityStats[0].city : 'N/A'}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-1">Store Types</p>
                <p className="text-3xl font-bold text-gray-900">{Object.keys(STORE_DATA).length}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Building2 className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* City List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cities */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Cities with Active Tokens</h2>
            
            {cityStats.length > 0 ? (
              <div className="space-y-3">
                {cityStats.map(stat => (
                  <button
                    key={stat.city}
                    onClick={() => setSelectedCity(stat.city === selectedCity ? '' : stat.city)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      selectedCity === stat.city
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <MapPin className={`w-5 h-5 ${selectedCity === stat.city ? 'text-indigo-600' : 'text-gray-600'}`} />
                        <span className="font-bold text-gray-900">{stat.city}</span>
                      </div>
                      <span className="text-2xl font-bold text-indigo-600">{stat.total}</span>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <span className="text-yellow-600">
                        ⏳ {stat.waiting} waiting
                      </span>
                      <span className="text-green-600">
                        ✓ {stat.serving} serving
                      </span>
                      <span className="text-blue-600">
                        ✓ {stat.completed} done
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">No active tokens in any city</p>
              </div>
            )}
          </div>

          {/* Selected City Details */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {selectedCity ? `${selectedCity} Details` : 'City Details'}
            </h2>
            
            {selectedCity ? (
              <div className="space-y-6">
                {/* Summary */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
                  <h3 className="text-lg font-semibold mb-4">Summary</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-indigo-200 text-sm">Waiting</p>
                      <p className="text-2xl font-bold">
                        {selectedCityTokens.filter(t => t.status === 'waiting').length}
                      </p>
                    </div>
                    <div>
                      <p className="text-indigo-200 text-sm">Serving</p>
                      <p className="text-2xl font-bold">
                        {selectedCityTokens.filter(t => t.status === 'serving').length}
                      </p>
                    </div>
                    <div>
                      <p className="text-indigo-200 text-sm">Completed</p>
                      <p className="text-2xl font-bold">
                        {selectedCityTokens.filter(t => t.status === 'completed').length}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Store Type Breakdown */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Store Type Breakdown</h3>
                  {storeTypeStats.length > 0 ? (
                    <div className="space-y-3">
                      {storeTypeStats.map(stat => (
                        <div key={stat.storeType} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-900">{stat.name}</span>
                            <span className="text-lg font-bold text-indigo-600">{stat.count}</span>
                          </div>
                          <div className="flex gap-3 text-xs">
                            <span className="text-yellow-600">⏳ {stat.waiting}</span>
                            <span className="text-green-600">✓ {stat.serving}</span>
                            <span className="text-blue-600">✓ {stat.completed}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No store data available</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">Select a city to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
