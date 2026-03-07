import { useState } from 'react';
import { Clock, Search, Filter, Download } from 'lucide-react';
import { useTokens } from '../TokenContext';
import { STORE_DATA, StoreType, TokenStatus } from '../Types';

export default function History() {
  const { tokens } = useTokens();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<TokenStatus | ''>('');
  const [filterStoreType, setFilterStoreType] = useState<StoreType | ''>('');

  // Filter tokens
  const filteredTokens = tokens
    .filter(token => {
      const matchesSearch = 
        token.tokenNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (token.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        token.service.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = !filterStatus || token.status === filterStatus;
      const matchesStoreType = !filterStoreType || token.storeType === filterStoreType;

      return matchesSearch && matchesStatus && matchesStoreType;
    })
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const getStatusBadge = (status: TokenStatus) => {
    const styles = {
      waiting: 'bg-yellow-100 text-yellow-800',
      serving: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleExport = () => {
   const csv = [
  ['Token Number', 'Customer Name', 'Store Type', 'Service', 'City', 'Status', 'Created At', 'Completed At'],
  ...filteredTokens.map(token => [
    token.tokenNumber,
    token.customerName || 'N/A',
    STORE_DATA[token.storeType as StoreType]?.name,
    token.service,
    token.city,
    token.status,
    token.createdAt.toLocaleString(),
    token.completedAt ? token.completedAt.toLocaleString() : 'N/A'
  ])
].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `uniqueue-history-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Token History</h1>
          <p className="text-gray-600">View and manage all token records</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by token number, name, or service..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="w-full md:w-48">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as TokenStatus | '')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              >
                <option value="">All Status</option>
                <option value="waiting">Waiting</option>
                <option value="serving">Serving</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Store Type Filter */}
            <div className="w-full md:w-48">
              <select
                value={filterStoreType}
                onChange={(e) => setFilterStoreType(e.target.value as StoreType | '')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              >
                <option value="">All Stores</option>
                {Object.entries(STORE_DATA).map(([key, value]) => (
                  <option key={key} value={key}>{value.name}</option>
                ))}
              </select>
            </div>

            {/* Export Button */}
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-gray-600 text-sm font-semibold">Total Tokens</p>
            <p className="text-2xl font-bold text-gray-900">{filteredTokens.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-gray-600 text-sm font-semibold">Waiting</p>
            <p className="text-2xl font-bold text-yellow-600">
              {filteredTokens.filter(t => t.status === 'waiting').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-gray-600 text-sm font-semibold">Serving</p>
            <p className="text-2xl font-bold text-green-600">
              {filteredTokens.filter(t => t.status === 'serving').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-gray-600 text-sm font-semibold">Completed</p>
            <p className="text-2xl font-bold text-blue-600">
              {filteredTokens.filter(t => t.status === 'completed').length}
            </p>
          </div>
        </div>

        {/* Token List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {filteredTokens.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Token
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Store
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      City
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredTokens.map(token => (
                    <tr key={token.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-lg font-bold text-indigo-600">{token.tokenNumber}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{token.customerName || 'N/A'}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{token.storeName}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                       <span className="text-sm text-gray-900">
  {STORE_DATA[token.storeType as StoreType]?.name}
</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{token.service}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">{token.city}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(token.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{new Date(token.createdAt).toLocaleString()}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-xl text-gray-500 mb-2">No tokens found</p>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}