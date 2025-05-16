
import React from 'react';
import Navbar from '../layout/Navbar';
import SidebarNav from './SidebarNav';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <Navbar />
      <div className="flex flex-1 relative">
        <SidebarNav />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;