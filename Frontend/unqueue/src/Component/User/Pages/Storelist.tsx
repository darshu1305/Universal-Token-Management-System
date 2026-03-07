import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Building2 } from 'lucide-react';
import { STORE_DATA, STORE_BRANCHES, StoreType } from '../Types';

const storeIcons: Record<StoreType, string> = {
  bank: '🏦',
  petrol: '⛽',
  restaurant: '🍽️',
  cafe: '☕',
  clinic: '🏥',
  grocery: '🛒',
  other: '📋'
};

export default function StoreList() {
  const { storeType } = useParams<{ storeType: string }>();
  
  if (!storeType || !(storeType in STORE_DATA)) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Store Type</h1>
          <Link to="/" className="text-indigo-600 hover:text-indigo-700">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const storeData = STORE_DATA[storeType as StoreType];
  const branches = STORE_BRANCHES[storeType as StoreType];
  const icon = storeIcons[storeType as StoreType];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-4">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-6xl">{icon}</div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{storeData.name}</h1>
              <p className="text-gray-600 mt-1">Select a location to generate your token</p>
            </div>
          </div>
        </div>

        {/* Available Services Info */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-600" />
            Available Services
          </h2>
          <div className="flex flex-wrap gap-2">
            {storeData.services.map((service, index) => (
              <span 
                key={index}
                className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Branch List */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Select a Location ({branches.length} available)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {branches.map((branch, index) => (
              <Link 
                key={index}
                to={`/customer?storeType=${storeType}&storeName=${encodeURIComponent(branch)}`}
              >
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-indigo-400 group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">{branch}</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {storeData.services.length} services • Multiple cities
                      </p>
                      <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm">
                        <span>Generate Token</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-lg font-bold mb-2">Quick Tip</h3>
          <p className="text-indigo-100">
            Click on any location above to proceed with token generation. You'll be able to select specific services and your city in the next step.
          </p>
        </div>
      </div>
    </div>
  );
}
