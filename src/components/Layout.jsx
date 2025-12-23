import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  Activity, User, Calendar, Syringe, TrendingUp, Settings,
  Menu, Bell, Search, ChevronDown
} from 'lucide-react';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { path: '/', icon: <Activity className="w-5 h-5" />, label: 'Tableau de bord' },
    { path: '/animals', icon: <User className="w-5 h-5" />, label: 'Animaux' },
    { path: '/calendar', icon: <Calendar className="w-5 h-5" />, label: 'Calendrier' },
    { path: '/treatments', icon: <Syringe className="w-5 h-5" />, label: 'Traitements' },
    { path: '/reports', icon: <TrendingUp className="w-5 h-5" />, label: 'Rapports' },
    { path: '/settings', icon: <Settings className="w-5 h-5" />, label: 'Paramètres' },
  ];

  const getPageTitle = () => {
    const item = navItems.find(item => item.path === location.pathname);
    return item ? item.label : 'Tableau de bord';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className={sidebarOpen ? "bg-white border-r border-gray-200 transition-all duration-300 flex-shrink-0 h-full fixed md:relative z-50 w-64" : "bg-white border-r border-gray-200 transition-all duration-300 flex-shrink-0 h-full fixed md:relative z-50 w-0 overflow-hidden md:w-20"}>
          <nav className="p-4 space-y-2 h-full">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path 
                    ? 'bg-blue-50 text-blue-600 font-medium' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                title={!sidebarOpen ? item.label : ''}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {sidebarOpen && <span className="text-sm truncate">{item.label}</span>}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Overlay pour mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className={sidebarOpen ? "flex-1 flex flex-col min-h-screen md:ml-0 w-full" : "flex-1 flex flex-col min-h-screen ml-0 w-full"}>
          {/* Header */}
          <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
            <div className="flex items-center justify-between px-4 sm:px-6 py-4">
              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                <button 
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                >
                  <Menu className="w-5 h-5 text-gray-600" />
                </button>
                <div className="min-w-0">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">
                    GestionAnimals
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500">{getPageTitle()}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                {/* Barre de recherche */}
                <div className="hidden lg:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-64 xl:w-80">
                  <Search className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Rechercher..." 
                    className="bg-transparent outline-none text-sm w-full"
                  />
                </div>

                {/* Notifications */}
                <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Profile */}
                <div className="relative flex-shrink-0">
                  <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-600 hidden sm:block" />
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;