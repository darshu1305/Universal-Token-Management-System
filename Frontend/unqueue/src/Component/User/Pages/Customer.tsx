import { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Building2, MapPin, ClipboardList, User, Store } from 'lucide-react';
import { useTokens } from '../TokenContext';
import { StoreType, STORE_DATA, CITIES } from '../Types';

export default function Customer() {
  const navigate = useNavigate();
  const { addToken } = useTokens();
  const [searchParams] = useSearchParams();
  
  const preselectedStoreType = searchParams.get('storeType') as StoreType | null;
  const preselectedStoreName = searchParams.get('storeName');
  
  const [formData, setFormData] = useState({
    customerName: '',
    storeType: preselectedStoreType || ('' as StoreType | ''),
    storeName: preselectedStoreName || '',
    service: '',
    city: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.storeType || !formData.storeName || !formData.service || !formData.city) {
      alert('Please fill in all required fields');
      return;
    }

    const token = addToken({
      storeType: formData.storeType as StoreType,
      storeName: formData.storeName,
      service: formData.service,
      city: formData.city,
      customerName: formData.customerName || undefined
    });

    navigate(`/token-success/${token.id}`);
  };

  const availableServices = formData.storeType 
    ? STORE_DATA[formData.storeType as StoreType].services 
    : [];

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-4">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">Generate Your Token</h1>
          <p className="text-gray-600 mt-2">Fill in the details to get your queue token</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            {/* Customer Name (Optional) */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4" />
                Customer Name (Optional)
              </label>
              <input
                type="text"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Store Name */}
            {formData.storeName && (
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Store className="w-4 h-4" />
                  Selected Location
                </label>
                <div className="w-full px-4 py-3 bg-indigo-50 border-2 border-indigo-200 rounded-lg font-semibold text-indigo-700">
                  {formData.storeName}
                </div>
              </div>
            )}

            {/* Store Type */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Building2 className="w-4 h-4" />
                Store Type <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.storeType ? STORE_DATA[formData.storeType].name : ''}
                readOnly
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg font-semibold text-gray-700"
              />
            </div>

            {/* Service */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <ClipboardList className="w-4 h-4" />
                Service <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100"
                disabled={!formData.storeType}
                required
              >
                <option value="">Select a service</option>
                {availableServices.map(service => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4" />
                City <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                required
              >
                <option value="">Select a city</option>
                {CITIES.map(city => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-8 bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
          >
            Generate Token
          </button>
        </form>
      </div>
    </div>
  );
}