import { Outlet } from 'react-router-dom';
import { TokenProvider } from '../TokenContext';
import { Navbar } from '../Navbar';

export default function Root() {
  return (
    <TokenProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar />
        <Outlet />
      </div>
    </TokenProvider>
  );
}