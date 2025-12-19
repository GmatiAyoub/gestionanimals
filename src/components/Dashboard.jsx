import React, { useState } from 'react';
import { 
  Plus, Calendar, Syringe, Baby, AlertCircle, TrendingUp, 
  Activity, Bell, Search, Menu, User, Settings,
  ChevronDown, ArrowUp, ArrowDown, Filter,
  Users, Heart, Thermometer, FileText
} from 'lucide-react';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Données de statistiques
  const stats = [
    { 
      id: 1, 
      title: 'Total Animaux', 
      value: '247', 
      change: '+12', 
      trend: 'up',
      icon: <Users className="text-white" size={32} />,
      hoverIcon: <Users className="text-white" size={36} />,
      bgGradient: 'from-blue-500 to-blue-600',
      details: 'Vaches: 120, Moutons: 85, Chèvres: 42'
    },
    { 
      id: 2, 
      title: 'En Gestation', 
      value: '18', 
      change: '+3',
      trend: 'up',
      icon: <Heart className="text-white" size={32} />,
      hoverIcon: <Heart className="text-white" size={36} />,
      bgGradient: 'from-purple-500 to-purple-600',
      details: 'Vaches: 8, Moutons: 10'
    },
    { 
      id: 3, 
      title: 'Sous Traitement', 
      value: '5', 
      change: '-2',
      trend: 'down',
      icon: <Thermometer className="text-white" size={32} />,
      hoverIcon: <Thermometer className="text-white" size={36} />,
      bgGradient: 'from-orange-500 to-orange-600',
      details: '1 critique, 4 légers'
    },
    { 
      id: 4, 
      title: 'Naissances (30j)', 
      value: '12', 
      change: '+4',
      trend: 'up',
      icon: <Baby className="text-white" size={32} />,
      hoverIcon: <Baby className="text-white" size={36} />,
      bgGradient: 'from-pink-500 to-pink-600',
      details: 'Veaux: 6, Agneaux: 4, Chevreaux: 2'
    }
  ];

  // Données de performance
  const performanceData = [
    { label: 'Lundi', value: 85 },
    { label: 'Mardi', value: 92 },
    { label: 'Mercredi', value: 78 },
    { label: 'Jeudi', value: 95 },
    { label: 'Vendredi', value: 88 },
    { label: 'Samedi', value: 90 },
    { label: 'Dimanche', value: 87 }
  ];

  // Actions rapides
  const quickActions = [
    {
      id: 1,
      title: 'Ajouter animal',
      icon: <Plus size={24} />,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: 'Enregistrer naissance',
      icon: <Baby size={24} />,
      color: 'bg-gradient-to-r from-pink-500 to-pink-600'
    },
    {
      id: 3,
      title: 'Planifier vaccination',
      icon: <Syringe size={24} />,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600'
    },
    {
      id: 4,
      title: 'Nouveau traitement',
      icon: <Activity size={24} />,
      color: 'bg-gradient-to-r from-orange-500 to-orange-600'
    }
  ];

  // Alertes récentes
  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Vaccination en retard',
      description: '3 animaux nécessitent une vaccination urgente',
      time: 'Il y a 2 jours',
      icon: <AlertCircle size={20} />
    },
    {
      id: 2,
      type: 'danger',
      title: 'Santé critique',
      description: 'La vache "Bella" a une température élevée (40.5°C)',
      time: 'Aujourd\'hui, 10:30',
      icon: <Thermometer size={20} />
    },
    {
      id: 3,
      type: 'info',
      title: 'Naissance imminente',
      description: 'La brebis #45 devrait mettre bas dans 24h',
      time: 'Demain',
      icon: <Baby size={20} />
    }
  ];

  // Activités récentes
  const activities = [
    {
      id: 1,
      type: 'birth',
      title: 'Nouvelle naissance',
      description: 'Vache #123 a donné naissance à un veau mâle',
      time: 'Il y a 2 heures',
      icon: '👶'
    },
    {
      id: 2,
      type: 'treatment',
      title: 'Traitement administré',
      description: 'Antibiotiques pour la brebis #78',
      time: 'Il y a 5 heures',
      icon: '💊'
    },
    {
      id: 3,
      type: 'vaccination',
      title: 'Vaccination effectuée',
      description: '15 animaux vaccinés contre la fièvre aphteuse',
      time: 'Hier, 14:30',
      icon: '💉'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className={sidebarOpen ? "bg-white border-r border-gray-200 transition-all duration-300 flex-shrink-0 h-full fixed md:relative z-50 w-64" : "bg-white border-r border-gray-200 transition-all duration-300 flex-shrink-0 h-full fixed md:relative z-50 w-0 overflow-hidden md:w-20"}>
          <nav className="p-4 space-y-2 h-full">
            <NavItem icon={<Activity className="w-5 h-5" />} label="Tableau de bord" active={true} sidebarOpen={sidebarOpen} />
            <NavItem icon={<User className="w-5 h-5" />} label="Animaux" sidebarOpen={sidebarOpen} />
            <NavItem icon={<Calendar className="w-5 h-5" />} label="Calendrier" sidebarOpen={sidebarOpen} />
            <NavItem icon={<Syringe className="w-5 h-5" />} label="Traitements" sidebarOpen={sidebarOpen} />
            <NavItem icon={<TrendingUp className="w-5 h-5" />} label="Rapports" sidebarOpen={sidebarOpen} />
            <NavItem icon={<Settings className="w-5 h-5" />} label="Paramètres" sidebarOpen={sidebarOpen} />
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
                  <p className="text-xs sm:text-sm text-gray-500">Tableau de bord</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                {/* Barre de recherche */}
                <div className="hidden lg:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-64 xl:w-80">
                  <Search className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Rechercher un animal..." 
                    className="bg-transparent outline-none text-sm w-full"
                  />
                </div>

                {/* Notifications */}
                <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Profile */}
                <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-gray-200">
                  <div className="text-right hidden md:block">
                    <p className="text-sm font-medium text-gray-800">Gmaty Ayoub</p>
                    <p className="text-xs text-gray-500">Administrateur</p>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    GA
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area - Correction pour éviter l'espace vide */}
          <main className="flex-1 overflow-y-auto w-full">
            <div className="p-4 sm:p-6 lg:p-8 mx-auto w-full">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-6">
                {stats.map((stat) => {
                  const trendIcon = stat.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />;
                  const bgClass = "p-4 sm:p-6 bg-gradient-to-br " + stat.bgGradient;
                  const trendClass = "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-white/20 text-white";
                  
                  return (
                    <StatCard 
                      key={stat.id}
                      icon={stat.icon}
                      hoverIcon={stat.hoverIcon}
                      value={stat.value}
                      title={stat.title}
                      change={stat.change}
                      trendIcon={trendIcon}
                      details={stat.details}
                      bgClass={bgClass}
                      trendClass={trendClass}
                    />
                  );
                })}
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
                {/* Performance Chart */}
                <div className="xl:col-span-2 bg-white rounded-xl shadow-md p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-gray-800">Performance Hebdomadaire</h2>
                      <p className="text-xs sm:text-sm text-gray-500">Taux de santé du cheptel</p>
                    </div>
                    <button className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors w-fit">
                      <Filter className="w-4 h-4" />
                      Filtrer
                    </button>
                  </div>
                  
                  {/* Simple Bar Chart */}
                  <div className="flex items-end justify-between h-48 sm:h-64 gap-2 sm:gap-4">
                    {performanceData.map((item, index) => {
                      const barHeight = (item.value * 1.8) + 'px';
                      const valueText = item.value + '%';
                      
                      return (
                        <div key={index} className="flex-1 flex flex-col items-center gap-2">
                          <div className="w-full bg-gray-100 rounded-t-lg relative group cursor-pointer">
                            <div 
                              className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-500 hover:from-purple-500 hover:to-purple-400 w-full"
                              style={{ height: barHeight }}
                            >
                              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                {valueText}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs font-medium text-gray-600">{item.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Actions - Section élargie */}
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">Actions Rapides</h2>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Toutes les actions
                    </button>
                  </div>
                  <div className="space-y-3">
                    {quickActions.map((action) => (
                      <QuickActionButton 
                        key={action.id}
                        icon={action.icon}
                        label={action.title}
                        color={action.color}
                      />
                    ))}
                  </div>
                  
                  {/* Section supplémentaire pour remplir l'espace */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <h3 className="font-medium text-gray-700 mb-3">Rapports rapides</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-xs font-medium text-gray-700 transition-colors">
                        Rapport santé
                      </button>
                      <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-xs font-medium text-gray-700 transition-colors">
                        Rapport finances
                      </button>
                      <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-xs font-medium text-gray-700 transition-colors">
                        Rapport reproduction
                      </button>
                      <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-xs font-medium text-gray-700 transition-colors">
                        Vaccinations
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Deuxième ligne de contenu */}
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Alertes Récentes */}
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">Alertes Récentes</h2>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Voir toutes
                    </button>
                  </div>
                  <div className="space-y-3">
                    {alerts.map((alert) => (
                      <AlertItem 
                        key={alert.id}
                        type={alert.type}
                        title={alert.title}
                        description={alert.description}
                        time={alert.time}
                        icon={alert.icon}
                      />
                    ))}
                  </div>
                </div>

                {/* Activités Récentes */}
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">Activités Récentes</h2>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Historique
                    </button>
                  </div>
                  <div className="space-y-3">
                    {activities.map((activity) => (
                      <ActivityItem 
                        key={activity.id}
                        icon={activity.icon}
                        title={activity.title}
                        description={activity.description}
                        time={activity.time}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Résumé financier */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Dépenses ce mois</h3>
                  <div className="text-2xl font-bold text-gray-800 mb-2">
                    4 250 €
                  </div>
                  <p className="text-sm text-gray-600">+350€ vs mois dernier</p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Revenus ce mois</h3>
                  <div className="text-2xl font-bold text-gray-800 mb-2">
                    8 750 €
                  </div>
                  <p className="text-sm text-gray-600">+1 200€ vs mois dernier</p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Bénéfice net</h3>
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    4 500 €
                  </div>
                  <p className="text-sm text-gray-600">Marge: 51,4%</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

// Composant StatCard avec hover effect
const StatCard = ({ icon, hoverIcon, value, title, change, trendIcon, details, bgClass, trendClass }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={bgClass}>
        <div className="flex justify-between items-start mb-3 sm:mb-4">
          <div className="transition-transform duration-300 transform hover:scale-110">
            {isHovered ? hoverIcon : icon}
          </div>
          <div className={trendClass}>
            {trendIcon}
            {change}
          </div>
        </div>
        <div className="text-white">
          <h3 className="text-2xl sm:text-3xl font-bold mb-1">{value}</h3>
          <p className="text-white/80 text-xs sm:text-sm font-medium">{title}</p>
        </div>
      </div>
      <div className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-50">
        <p className="text-xs text-gray-600">{details}</p>
      </div>
    </div>
  );
};

// Composant NavItem
const NavItem = ({ icon, label, active = false, sidebarOpen }) => {
  const baseClass = "flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-200 ";
  const activeClass = active ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-600 hover:bg-gray-50";
  
  return (
    <button 
      className={baseClass + activeClass}
      title={!sidebarOpen ? label : ''}
    >
      <span className="flex-shrink-0">{icon}</span>
      {sidebarOpen && <span className="text-sm truncate">{label}</span>}
    </button>
  );
};

// Composant QuickActionButton
const QuickActionButton = ({ icon, label, color }) => {
  const baseClass = "w-full flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-white font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 ";
  
  return (
    <button className={baseClass + color}>
      <span className="w-6 h-6 flex items-center justify-center">{icon}</span>
      <span className="text-sm">{label}</span>
    </button>
  );
};

// Composant AlertItem
const AlertItem = ({ type, title, description, time, icon }) => {
  const colors = {
    warning: 'border-yellow-200 bg-yellow-50',
    danger: 'border-red-200 bg-red-50',
    info: 'border-blue-200 bg-blue-50'
  };

  const iconColor = type === 'warning' ? 'text-yellow-600' : type === 'danger' ? 'text-red-600' : 'text-blue-600';
  const borderColor = colors[type] || 'border-gray-200 bg-gray-50';

  return (
    <div className={"border rounded-lg p-3 " + borderColor}>
      <div className="flex items-start gap-3">
        <div className={"mt-0.5 flex-shrink-0 " + iconColor}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
          <p className="text-xs text-gray-500 mt-2">{time}</p>
        </div>
      </div>
    </div>
  );
};

// Composant ActivityItem
const ActivityItem = ({ icon, title, description, time }) => {
  return (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full flex-shrink-0">
        <span className="text-lg">{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
        <p className="text-xs text-gray-500 mt-2">{time}</p>
      </div>
    </div>
  );
};

export default Dashboard;