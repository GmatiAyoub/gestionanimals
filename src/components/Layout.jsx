import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  Menu, Activity, User, Calendar,
  Syringe, TrendingUp, Settings,
  Bell
} from 'lucide-react';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Tableau de bord', icon: <Activity size={20} /> },
    { path: '/animals', label: 'Animaux', icon: <User size={20} /> },
    { path: '/calendar', label: 'Calendrier', icon: <Calendar size={20} /> },
    { path: '/treatments', label: 'Traitements', icon: <Syringe size={20} /> },
    { path: '/reports', label: 'Rapports', icon: <TrendingUp size={20} /> },
    { path: '/settings', label: 'Paramètres', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside className={`bg-white border-r transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <nav className="p-4 space-y-2">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
                ${location.pathname === item.path
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              {item.icon}
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">
              GestionAnimals
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-gray-600" />
            <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              GA
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default Layout;
