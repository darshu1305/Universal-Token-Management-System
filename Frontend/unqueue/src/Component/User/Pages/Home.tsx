import { Link } from 'react-router-dom';
import { Users, Monitor, UserCog, Ticket } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Ticket className="w-12 h-12 text-indigo-600" />
            <h1 className="text-5xl font-bold text-gray-900">UniQueue</h1>
          </div>
          <p className="text-xl text-gray-600">Universal Token Management System</p>
          <p className="text-gray-500 mt-2">Manage customer queues efficiently across multiple businesses</p>
        </div>

        {/* Main Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Customer */}
          <Link to="/customer">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer group">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <Users className="w-10 h-10 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Customer</h2>
                <p className="text-gray-600">Generate your token and join the queue</p>
              </div>
            </div>
          </Link>

          {/* Staff */}
          <Link to="/staff">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer group">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <UserCog className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Staff</h2>
                <p className="text-gray-600">Manage queue and call next token</p>
              </div>
            </div>
          </Link>

          {/* Display */}
          <Link to="/display">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer group">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <Monitor className="w-10 h-10 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Display</h2>
                <p className="text-gray-600">View live queue and current tokens</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Features */}
        <div className="mt-16 bg-white rounded-xl shadow-md p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Supported Services</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <div className="text-3xl mb-2">🏦</div>
              <p className="font-semibold text-gray-800">Banks</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">⛽</div>
              <p className="font-semibold text-gray-800">Petrol Pumps</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">🍽️</div>
              <p className="font-semibold text-gray-800">Restaurants</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">🏥</div>
              <p className="font-semibold text-gray-800">Other Services</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
