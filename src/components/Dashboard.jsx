import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Plus, Calendar, Syringe, Baby, AlertCircle, TrendingUp,
  Activity, Bell, Search, Menu, User, Settings,
  ArrowUp, ArrowDown, Filter,
  Users, Heart, Thermometer
} from 'lucide-react';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  // Navigation
  const navItems = [
    { path: '/', label: 'Tableau de bord', icon: <Activity className="w-5 h-5" /> },
    { path: '/animals', label: 'Animaux', icon: <User className="w-5 h-5" /> },
    { path: '/calendar', label: 'Calendrier', icon: <Calendar className="w-5 h-5" /> },
    { path: '/treatments', label: 'Traitements', icon: <Syringe className="w-5 h-5" /> },
    { path: '/reports', label: 'Rapports', icon: <TrendingUp className="w-5 h-5" /> },
    { path: '/settings', label: 'Paramètres', icon: <Settings className="w-5 h-5" /> },
  ];

  // Stats
  const stats = [
    {
      id: 1,
      title: 'Total Animaux',
      value: '247',
      change: '+12',
      trend: 'up',
      icon: <Users className="text-white" size={32} />,
      bg: 'from-blue-500 to-blue-600',
      details: 'Vaches: 120, Moutons: 85, Chèvres: 42'
    },
    {
      id: 2,
      title: 'En Gestation',
      value: '18',
      change: '+3',
      trend: 'up',
      icon: <Heart className="text-white" size={32} />,
      bg: 'from-pink-500 to-pink-600',
      details: 'Vaches: 8, Moutons: 10'
    },
    {
      id: 3,
      title: 'Sous Traitement',
      value: '5',
      change: '-2',
      trend: 'down',
      icon: <Thermometer className="text-white" size={32} />,
      bg: 'from-orange-500 to-orange-600',
      details: '1 critique, 4 légers'
    },
    {
      id: 4,
      title: 'Naissances (30j)',
      value: '12',
      change: '+4',
      trend: 'up',
      icon: <Baby className="text-white" size={32} />,
      bg: 'from-purple-500 to-purple-600',
      details: 'Veaux: 6, Agneaux: 4, Chevreaux: 2'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      
      {/* SIDEBAR */}
      <aside className={`bg-white border-r transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} hidden md:block`}>
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
            <div>
              <h1 className="text-2xl font-bold">GestionAnimals</h1>
              <p className="text-sm text-gray-500">Tableau de bord</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex bg-gray-100 px-4 py-2 rounded-lg">
              <Search className="w-5 h-5 text-gray-400 mr-2" />
              <input className="bg-transparent outline-none" placeholder="Rechercher..." />
            </div>
            <Bell className="w-6 h-6 text-gray-600" />
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              GA
            </div>
          </div>
        </header>

        {/* MAIN */}
        <main className="p-6 flex-1 overflow-y-auto">

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {stats.map(stat => (
              <div key={stat.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className={`p-6 bg-gradient-to-br ${stat.bg}`}>
                  <div className="flex justify-between items-center mb-4">
                    {stat.icon}
                    <span className="flex items-center gap-1 text-white text-sm bg-white/20 px-2 py-1 rounded-full">
                      {stat.trend === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                  <p className="text-white/80">{stat.title}</p>
                </div>
                <div className="p-4 bg-gray-50 text-sm text-gray-600">
                  {stat.details}
                </div>
              </div>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <QuickAction label="Ajouter animal" icon={<Plus />} />
            <QuickAction label="Naissance" icon={<Baby />} />
            <QuickAction label="Vaccination" icon={<Syringe />} />
            <QuickAction label="Traitement" icon={<Activity />} />
          </div>

        </main>
      </div>
    </div>
  );
}

// Quick Action Component
function QuickAction({ icon, label }) {
  return (
    <button className="flex items-center gap-3 bg-blue-500 text-white p-4 rounded-xl shadow hover:bg-blue-600 transition">
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}

export default Dashboard;
