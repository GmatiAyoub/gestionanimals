import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Heart, Thermometer, Baby,
  ArrowUp, ArrowDown, Plus, Syringe, Activity,
  TrendingUp, TrendingDown, AlertCircle, Calendar,
  DollarSign, BarChart3, Clock, Filter, Search,
  Eye, Edit, Trash2, Download, RefreshCw, Bell,
  UserPlus, FileText, Settings, ChevronRight
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate(); // Ajouter useNavigate
  
  // États pour les données
  const [stats, setStats] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Ajouter pour la recherche

  // Données initiales
  const initialStats = [
    {
      id: 1,
      title: 'Total Animaux',
      value: '247',
      change: '+12',
      trend: 'up',
      icon: <Users className="text-white" size={32} />,
      bg: 'from-blue-500 to-blue-600',
      details: 'Vaches: 120, Moutons: 85, Chèvres: 42',
      type: 'animals'
    },
    {
      id: 2,
      title: 'En Gestation',
      value: '18',
      change: '+3',
      trend: 'up',
      icon: <Heart className="text-white" size={32} />,
      bg: 'from-pink-500 to-pink-600',
      details: 'Vaches: 8, Moutons: 10',
      type: 'pregnancy'
    },
    {
      id: 3,
      title: 'Sous Traitement',
      value: '5',
      change: '-2',
      trend: 'down',
      icon: <Thermometer className="text-white" size={32} />,
      bg: 'from-orange-500 to-orange-600',
      details: '1 critique, 4 légers',
      type: 'treatment'
    },
    {
      id: 4,
      title: 'Naissances (30j)',
      value: '12',
      change: '+4',
      trend: 'up',
      icon: <Baby className="text-white" size={32} />,
      bg: 'from-purple-500 to-purple-600',
      details: 'Veaux: 6, Agneaux: 4, Chevreaux: 2',
      type: 'births'
    }
  ];

  const initialActivities = [
    {
      id: 1,
      type: 'birth',
      title: 'Nouvelle naissance',
      description: 'Vache #123 a donné naissance à un veau mâle',
      time: 'Il y a 2 heures',
      icon: '👶',
      animal: 'Bella',
      status: 'completed'
    },
    {
      id: 2,
      type: 'treatment',
      title: 'Traitement administré',
      description: 'Antibiotiques pour la brebis #78',
      time: 'Il y a 5 heures',
      icon: '💊',
      animal: 'Mouton #78',
      status: 'completed'
    },
    {
      id: 3,
      type: 'vaccination',
      title: 'Vaccination effectuée',
      description: '15 animaux vaccinés contre la fièvre aphteuse',
      time: 'Hier, 14:30',
      icon: '💉',
      animal: 'Troupeau',
      status: 'completed'
    },
    {
      id: 4,
      type: 'alert',
      title: 'Alerte santé',
      description: 'Température élevée détectée sur la vache #45',
      time: 'Aujourd\'hui, 09:15',
      icon: '⚠️',
      animal: 'Rosie',
      status: 'pending'
    }
  ];

  const initialAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Vaccination en retard',
      description: '3 animaux nécessitent une vaccination urgente',
      time: 'Il y a 2 jours',
      icon: <AlertCircle size={20} />,
      priority: 'high'
    },
    {
      id: 2,
      type: 'danger',
      title: 'Santé critique',
      description: 'La vache "Bella" a une température élevée (40.5°C)',
      time: 'Aujourd\'hui, 10:30',
      icon: <Thermometer size={20} />,
      priority: 'critical'
    },
    {
      id: 3,
      type: 'info',
      title: 'Naissance imminente',
      description: 'La brebis #45 devrait mettre bas dans 24h',
      time: 'Demain',
      icon: <Baby size={20} />,
      priority: 'medium'
    }
  ];

  const initialPerformanceData = [
    { month: 'Jan', health: 85, births: 8, treatments: 12 },
    { month: 'Fév', health: 88, births: 10, treatments: 9 },
    { month: 'Mar', health: 90, births: 12, treatments: 7 },
    { month: 'Avr', health: 92, births: 14, treatments: 5 },
    { month: 'Mai', health: 94, births: 16, treatments: 4 },
    { month: 'Juin', health: 95, births: 18, treatments: 3 }
  ];

  // Effet pour charger les données
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    setIsLoading(true);
    // Simuler un chargement API
    setTimeout(() => {
      setStats(initialStats);
      setRecentActivities(initialActivities);
      setAlerts(initialAlerts);
      setPerformanceData(initialPerformanceData);
      setIsLoading(false);
    }, 500);
  };

  // CRUD Operations for Stats
  const updateStat = (id, updates) => {
    setStats(prevStats => 
      prevStats.map(stat => 
        stat.id === id ? { ...stat, ...updates } : stat
      )
    );
  };

  const addActivity = (activity) => {
    const newActivity = {
      id: Date.now(),
      ...activity,
      time: 'Maintenant',
      status: 'completed'
    };
    setRecentActivities(prev => [newActivity, ...prev.slice(0, 4)]);
  };

  const removeAlert = (id) => {
    if (window.confirm('Marquer cette alerte comme traitée ?')) {
      setAlerts(prev => prev.filter(alert => alert.id !== id));
    }
  };

  const addAlert = (alert) => {
    const newAlert = {
      id: Date.now(),
      ...alert,
      time: 'Maintenant'
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  // Actions rapides - CORRIGÉES
  const quickActions = [
    {
      id: 1,
      label: 'Ajouter animal',
      icon: <UserPlus size={20} />,
      color: 'from-blue-500 to-blue-600',
      description: 'Ajouter un nouvel animal au registre',
      action: () => navigate('/animals/new')
    },
    {
      id: 2,
      label: 'Enregistrer naissance',
      icon: <Baby size={20} />,
      color: 'from-pink-500 to-pink-600',
      description: 'Enregistrer une nouvelle naissance',
      action: () => {
        addActivity({
          type: 'birth',
          title: 'Nouvelle naissance enregistrée',
          description: 'Naissance ajoutée via le tableau de bord',
          icon: '👶',
          animal: 'Nouveau-né'
        });
        // Au lieu de alert(), on peut ouvrir un modal
        console.log('Formulaire de naissance ouvert');
      }
    },
    {
      id: 3,
      label: 'Planifier vaccination',
      icon: <Syringe size={20} />,
      color: 'from-purple-500 to-purple-600',
      description: 'Planifier une campagne de vaccination',
      action: () => navigate('/treatments/new')
    },
    {
      id: 4,
      label: 'Nouveau traitement',
      icon: <Activity size={20} />,
      color: 'from-orange-500 to-orange-600',
      description: 'Ajouter un nouveau traitement médical',
      action: () => {
        addActivity({
          type: 'treatment',
          title: 'Traitement planifié',
          description: 'Nouveau traitement ajouté via le dashboard',
          icon: '💊',
          animal: 'Traitement'
        });
        navigate('/treatments');
      }
    },
    {
      id: 5,
      label: 'Générer rapport',
      icon: <FileText size={20} />,
      color: 'from-green-500 to-green-600',
      description: 'Créer un nouveau rapport',
      action: () => navigate('/reports/new')
    },
    {
      id: 6,
      label: 'Alertes santé',
      icon: <Bell size={20} />,
      color: 'from-red-500 to-red-600',
      description: 'Voir toutes les alertes',
      action: () => {
        addAlert({
          type: 'warning',
          title: 'Nouvelle alerte dashboard',
          description: 'Alertes vérifiées depuis le dashboard',
          icon: <AlertCircle size={20} />,
          priority: 'medium'
        });
        // Naviguer vers la page des alertes si elle existe
        // navigate('/alerts');
      }
    }
  ];

  // Calculer les métriques financières
  const financialMetrics = {
    revenue: 8750,
    expenses: 4250,
    profit: 4500,
    revenueChange: '+12%',
    expensesChange: '+8%',
    profitChange: '+15%'
  };

  // Gestion des mises à jour
  const handleRefresh = () => {
    loadDashboardData();
  };

  const handleExport = () => {
    const data = {
      stats,
      activities: recentActivities,
      alerts,
      performance: performanceData,
      financials: financialMetrics,
      generatedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard_export_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Fonctions de navigation corrigées
  const navigateToReport = (type) => {
    navigate(`/reports?type=${type}`);
  };

  const navigateToAnimals = (filter) => {
    navigate(`/animals?filter=${filter}`);
  };

  // Filtrer les activités par recherche
  const filteredActivities = recentActivities.filter(activity =>
    activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.animal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Tableau de bord</h1>
              <p className="text-gray-600 mt-2">Vue d'ensemble de votre exploitation</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RefreshCw size={18} />
                Actualiser
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download size={18} />
                Exporter
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher dans le dashboard..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter size={18} />
                Filtres
              </button>
              <button className="flex items-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <Calendar size={18} />
                Période
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards with CRUD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {stats.map(stat => (
            <div 
              key={stat.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
              onClick={() => navigateToAnimals(stat.type)}
            >
              <div className={`p-6 bg-gradient-to-br ${stat.bg} relative`}>
                <div className="flex justify-between items-center mb-4">
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-white text-sm bg-white/20 px-2 py-1 rounded-full">
                      {stat.trend === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                      {stat.change}
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); // Empêche la navigation
                        updateStat(stat.id, { 
                          value: (parseInt(stat.value) + 1).toString(),
                          change: stat.trend === 'up' ? `+${parseInt(stat.change) + 1}` : stat.change 
                        });
                      }}
                      className="text-white/80 hover:text-white text-sm"
                      title="Incrementer"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                <p className="text-white/80 mt-1">{stat.title}</p>
                
                {/* Quick actions on hover */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToReport(stat.type);
                    }}
                    className="p-1 bg-white/20 rounded-lg hover:bg-white/30"
                    title="Voir rapport"
                  >
                    <Eye size={14} className="text-white" />
                  </button>
                </div>
              </div>
              <div className="p-4 bg-gray-50">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">{stat.details}</p>
                  <div 
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToAnimals(stat.type);
                    }}
                  >
                    Voir <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Actions Rapides</h2>
                <span className="text-sm text-gray-500">{quickActions.length} actions</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                {quickActions.map(action => (
                  <button
                    key={action.id}
                    onClick={action.action}
                    className={`flex items-center gap-3 text-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 bg-gradient-to-r ${action.color} hover:-translate-y-0.5`}
                  >
                    <div className="bg-white/20 p-2 rounded-lg">
                      {action.icon}
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-medium">{action.label}</div>
                      <div className="text-sm opacity-90 truncate">{action.description}</div>
                    </div>
                    <ChevronRight size={18} className="opacity-80" />
                  </button>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Résumé Financier</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Revenus</p>
                    <p className="text-2xl font-bold text-gray-800">{financialMetrics.revenue}€</p>
                  </div>
                  <div className="text-green-600 font-medium">
                    <TrendingUp size={20} className="inline mr-1" />
                    {financialMetrics.revenueChange}
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Dépenses</p>
                    <p className="text-2xl font-bold text-gray-800">{financialMetrics.expenses}€</p>
                  </div>
                  <div className="text-red-600 font-medium">
                    <TrendingUp size={20} className="inline mr-1" />
                    {financialMetrics.expensesChange}
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Bénéfice Net</p>
                    <p className="text-2xl font-bold text-gray-800">{financialMetrics.profit}€</p>
                  </div>
                  <div className="text-green-600 font-medium">
                    <TrendingUp size={20} className="inline mr-1" />
                    {financialMetrics.profitChange}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Performance Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Performance du Cheptel</h2>
                  <p className="text-gray-600 mt-1">6 derniers mois</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Santé</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                    <span className="text-sm">Naissances</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="text-sm">Traitements</span>
                  </div>
                </div>
              </div>

              {/* Performance Chart */}
              <div className="h-64 flex items-end justify-between gap-4 mt-8">
                {performanceData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex items-end justify-center gap-1 h-48">
                      <div 
                        className="w-6 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-500 cursor-pointer"
                        style={{ height: `${data.health * 1.5}px` }}
                        title={`Santé: ${data.health}%`}
                      ></div>
                      <div 
                        className="w-6 bg-gradient-to-t from-pink-600 to-pink-400 rounded-t-lg transition-all duration-300 hover:from-pink-700 hover:to-pink-500 cursor-pointer"
                        style={{ height: `${data.births * 10}px` }}
                        title={`Naissances: ${data.births}`}
                      ></div>
                      <div 
                        className="w-6 bg-gradient-to-t from-orange-600 to-orange-400 rounded-t-lg transition-all duration-300 hover:from-orange-700 hover:to-orange-500 cursor-pointer"
                        style={{ height: `${data.treatments * 15}px` }}
                        title={`Traitements: ${data.treatments}`}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-gray-600">{data.month}</span>
                  </div>
                ))}
              </div>

              {/* Chart Controls */}
              <div className="flex justify-end gap-2 mt-6">
                <button 
                  onClick={() => setPerformanceData(initialPerformanceData.slice(0, 3))}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200"
                >
                  3 mois
                </button>
                <button 
                  onClick={() => setPerformanceData(initialPerformanceData)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-lg hover:bg-blue-200"
                >
                  6 mois
                </button>
                <button 
                  onClick={() => {
                    // Simuler plus de données
                    const yearlyData = [
                      ...initialPerformanceData,
                      { month: 'Juil', health: 96, births: 20, treatments: 2 },
                      { month: 'Août', health: 97, births: 22, treatments: 1 },
                      { month: 'Sep', health: 98, births: 24, treatments: 3 },
                      { month: 'Oct', health: 99, births: 26, treatments: 2 },
                      { month: 'Nov', health: 100, births: 28, treatments: 1 },
                      { month: 'Déc', health: 100, births: 30, treatments: 0 }
                    ];
                    setPerformanceData(yearlyData);
                  }}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200"
                >
                  1 an
                </button>
              </div>
            </div>

            {/* Recent Activities with CRUD */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Activités Récentes</h2>
                  <p className="text-gray-600 mt-1">Dernières actions sur la plateforme</p>
                </div>
                <button 
                  onClick={() => {
                    if (window.confirm('Voulez-vous vraiment effacer toutes les activités ?')) {
                      setRecentActivities([]);
                    }
                  }}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Tout effacer
                </button>
              </div>

              <div className="space-y-4">
                {filteredActivities.length > 0 ? (
                  filteredActivities.map(activity => (
                    <div key={activity.id} className="flex items-start gap-4 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 group">
                      <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full flex-shrink-0">
                        <span className="text-xl">{activity.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-gray-800">{activity.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                                {activity.animal}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded ${
                                activity.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {activity.status === 'completed' ? 'Terminé' : 'En cours'}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => console.log('Edit activity', activity.id)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Edit size={14} className="text-gray-600" />
                            </button>
                            <button 
                              onClick={() => {
                                if (window.confirm('Supprimer cette activité ?')) {
                                  setRecentActivities(prev => prev.filter(a => a.id !== activity.id));
                                }
                              }}
                              className="p-1 hover:bg-red-50 rounded"
                            >
                              <Trash2 size={14} className="text-red-600" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock size={12} className="text-gray-400" />
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">
                      {searchTerm ? 'Aucune activité trouvée' : 'Aucune activité récente'}
                    </p>
                    <button 
                      onClick={() => {
                        setSearchTerm('');
                        loadDashboardData();
                      }}
                      className="mt-3 px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
                    >
                      {searchTerm ? 'Effacer la recherche' : 'Charger des activités'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Alertes en Cours</h2>
              <p className="text-gray-600 mt-1">Actions requises pour votre attention</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => addAlert({
                  type: 'info',
                  title: 'Test alerte',
                  description: 'Alerte ajoutée depuis le dashboard',
                  icon: <Bell size={20} />,
                  priority: 'low'
                })}
                className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-lg hover:bg-blue-200"
              >
                + Ajouter
              </button>
              <span className="text-sm text-gray-500">
                {alerts.filter(a => a.priority === 'critical').length} critiques
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {alerts.length > 0 ? (
              alerts.map(alert => (
                <div 
                  key={alert.id} 
                  className={`border rounded-lg p-4 ${
                    alert.type === 'danger' ? 'border-red-200 bg-red-50' :
                    alert.type === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                    'border-blue-200 bg-blue-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 ${
                        alert.type === 'danger' ? 'text-red-600' :
                        alert.type === 'warning' ? 'text-yellow-600' :
                        'text-blue-600'
                      }`}>
                        {alert.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-800">{alert.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-gray-500">{alert.time}</span>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => console.log('View alert details', alert.id)}
                              className="text-xs text-blue-600 hover:text-blue-700"
                            >
                              Détails
                            </button>
                            <button 
                              onClick={() => removeAlert(alert.id)}
                              className="text-xs text-gray-500 hover:text-red-600"
                            >
                              Marquer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="md:col-span-3 text-center py-8">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Aucune alerte en cours</p>
                <p className="text-sm text-gray-400 mt-1">Tout semble être en ordre !</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;