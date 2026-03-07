import { Link } from 'react-router-dom';
import { Building2, Fuel, UtensilsCrossed, Coffee, Stethoscope, ShoppingBasket, MoreHorizontal, ArrowRight } from 'lucide-react';
import { STORE_DATA, StoreType } from '../Types';

const storeIcons: Record<StoreType, any> = {
  bank: Building2,
  petrol: Fuel,
  restaurant: UtensilsCrossed,
  cafe: Coffee,
  clinic: Stethoscope,
  grocery: ShoppingBasket,
  other: MoreHorizontal
};

const storeColors: Record<StoreType, { bg: string; icon: string; hover: string; gradient: string }> = {
  bank: { 
    bg: 'bg-blue-100', 
    icon: 'text-blue-600', 
    hover: 'hover:shadow-xl hover:scale-105',
    gradient: 'from-blue-500 to-blue-600'
  },
  petrol: { 
    bg: 'bg-orange-100', 
    icon: 'text-orange-600', 
    hover: 'hover:shadow-xl hover:scale-105',
    gradient: 'from-orange-500 to-orange-600'
  },
  restaurant: { 
    bg: 'bg-red-100', 
    icon: 'text-red-600', 
    hover: 'hover:shadow-xl hover:scale-105',
    gradient: 'from-red-500 to-red-600'
  },
  cafe: { 
    bg: 'bg-amber-100', 
    icon: 'text-amber-600', 
    hover: 'hover:shadow-xl hover:scale-105',
    gradient: 'from-amber-500 to-amber-600'
  },
  clinic: { 
    bg: 'bg-green-100', 
    icon: 'text-green-600', 
    hover: 'hover:shadow-xl hover:scale-105',
    gradient: 'from-green-500 to-green-600'
  },
  grocery: { 
    bg: 'bg-purple-100', 
    icon: 'text-purple-600', 
    hover: 'hover:shadow-xl hover:scale-105',
    gradient: 'from-purple-500 to-purple-600'
  },
  other: { 
    bg: 'bg-gray-100', 
    icon: 'text-gray-600', 
    hover: 'hover:shadow-xl hover:scale-105',
    gradient: 'from-gray-500 to-gray-600'
  }
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">Welcome to UniQueue</h1>
          <p className="text-xl text-gray-600 mb-2">Universal Token Management System</p>
          <p className="text-gray-500">Select a service to get started and generate your token</p>
        </div>

        {/* Supported Services */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Choose Your Service</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(STORE_DATA).map(([key, store]) => {
              const Icon = storeIcons[key as StoreType];
              const colors = storeColors[key as StoreType];
              
              return (
                <Link key={key} to={`/stores/${key}`}>
                  <div className={`bg-white rounded-xl shadow-lg p-8 cursor-pointer transition-all ${colors.hover} border-2 border-transparent hover:border-indigo-300`}>
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-20 h-20 bg-gradient-to-br ${colors.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-md`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{store.name}</h3>
                      <p className="text-gray-600 mb-4">
                        {store.services.length} services available
                      </p>
                      <div className="flex items-center gap-2 text-indigo-600 font-semibold">
                        <span>View Locations</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-2xl text-indigo-600">
                1
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Choose Service</h4>
              <p className="text-sm text-gray-600">Select your desired service type from the options above</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-2xl text-indigo-600">
                2
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Select Branch</h4>
              <p className="text-sm text-gray-600">Choose a specific branch or location near you</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-2xl text-indigo-600">
                3
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Generate Token</h4>
              <p className="text-sm text-gray-600">Fill in details and get your unique token number</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-2xl text-indigo-600">
                4
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Wait & Get Served</h4>
              <p className="text-sm text-gray-600">Monitor the queue and wait for your turn</p>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Need Help?</h3>
          <p className="text-indigo-100">Simply click on any service above to see available locations and generate your token</p>
        </div>
      </div>
    </div>
  );
}
