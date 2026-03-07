import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Home, Printer } from 'lucide-react';
import { useTokens } from '../TokenContext';
import { STORE_DATA } from '../Types';

export default function TokenSuccess() {
  const { tokenId } = useParams();
  const navigate = useNavigate();
  const { getTokenById } = useTokens();
  const [token, setToken] = useState(() => tokenId ? getTokenById(tokenId) : null);

  useEffect(() => {
    if (tokenId) {
      const foundToken = getTokenById(tokenId);
      setToken(foundToken);
      if (!foundToken) {
        navigate('/customer');
      }
    }
  }, [tokenId, getTokenById, navigate]);

  if (!token) {
    return null;
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-2xl p-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Token Generated!</h1>
          <p className="text-gray-600 mb-8">Your token has been successfully created</p>

          {/* Token Display */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-8 mb-6 text-white">
            <p className="text-sm font-semibold mb-2 opacity-90">Your Token Number</p>
            <p className="text-6xl font-bold mb-4">{token.tokenNumber}</p>
            <div className="w-16 h-1 bg-white/30 mx-auto"></div>
          </div>

          {/* Token Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left space-y-3">
            {token.customerName && (
              <div className="flex justify-between">
                <span className="text-gray-600">Customer:</span>
                <span className="font-semibold text-gray-900">{token.customerName}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span className="font-semibold text-gray-900">{token.storeName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Store Type:</span>
              <span className="font-semibold text-gray-900">{STORE_DATA[token.storeType].name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Service:</span>
              <span className="font-semibold text-gray-900">{token.service}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">City:</span>
              <span className="font-semibold text-gray-900">{token.city}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                Waiting
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span className="font-semibold text-gray-900">
                {new Date(token.createdAt).toLocaleTimeString()}
              </span>
            </div>
          </div>

          {/* Info Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-sm text-blue-800">
            <p>Please wait for your token to be called. You can check the live queue on the display screen.</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <Link to="/" className="flex-1">
              <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                <Home className="w-4 h-4" />
                Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}