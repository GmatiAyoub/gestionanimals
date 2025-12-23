import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Plus, Calendar, Syringe, Baby, AlertCircle, TrendingUp, 
  Activity, Bell, Search, Menu, User, Settings,
  ChevronDown, ArrowUp, ArrowDown, Filter,
  Users, Heart, Thermometer, FileText,
  Edit, Trash2, Eye, Tag, Clock, CheckCircle
} from 'lucide-react';

const Animals = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  // Items de navigation
  const navItems = [
    { path: '/', icon: <Activity className="w-5 h-5" />, label: 'Tableau de bord' },
    { path: '/animals', icon: <User className="w-5 h-5" />, label: 'Animaux' },
    { path: '/calendar', icon: <Calendar className="w-5 h-5" />, label: 'Calendrier' },
    { path: '/treatments', icon: <Syringe className="w-5 h-5" />, label: 'Traitements' },
    { path: '/reports', icon: <TrendingUp className="w-5 h-5" />, label: 'Rapports' },
    { path: '/settings', icon: <Settings className="w-5 h-5" />, label: 'Paramètres' },
  ];

  // Données des animaux
  const animals = [
    {
      id: 1,
      name: 'Bella',
      type: 'Vache',
      breed: 'Holstein',
      age: '4 ans',
      status: 'Santé excellente',
      lastCheck: 'Hier',
      tag: '#VA001',
      pregnant: true
    },
    {
      id: 2,
      name: 'Mouton',
      type: 'Mouton',
      breed: 'Texel',
      age: '2 ans',
      status: 'Sous traitement',
      lastCheck: 'Aujourd\'hui',
      tag: '#MO045',
      pregnant: false
    },
    {
      id: 3,
      name: 'Biquette',
      type: 'Chèvre',
      breed: 'Alpine',
      age: '3 ans',
      status: 'En gestation',
      lastCheck: 'Il y a 3 jours',
      tag: '#CH023',
      pregnant: true
    },
    {
      id: 4,
      name: 'Rex',
      type: 'Taureau',
      breed: 'Charolais',
      age: '5 ans',
      status: 'Santé excellente',
      lastCheck: 'Il y a 5 jours',
      tag: '#TA012',
      pregnant: false
    },
    {
      id: 5,
      name: 'Laine',
      type: 'Brebis',
      breed: 'Mérinos',
      age: '3 ans',
      status: 'À surveiller',
      lastCheck: 'Hier',
      tag: '#BR067',
      pregnant: true
    }
  ];

  const filteredAnimals = animals.filter(animal =>
    animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'Santé excellente': return 'bg-green-100 text-green-800';
      case 'Sous traitement': return 'bg-red-100 text-red-800';
      case 'En gestation': return 'bg-purple-100 text-purple-800';
      case 'À surveiller': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
                  <p className="text-xs sm:text-sm text-gray-500">Animaux</p>
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto w-full">
            <div className="p-4 sm:p-6 lg:p-8 mx-auto w-full">
              {/* Header Section */}
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Gestion des Animaux</h1>
                    <p className="text-gray-600 mt-2">Gérez l'ensemble de votre cheptel</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg">
                    <Plus size={20} />
                    Ajouter un animal
                  </button>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col lg:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative lg:hidden">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Rechercher par nom, type ou tag..."
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <Filter size={20} />
                      Filtres
                    </button>
                    <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <Users size={20} />
                      Catégories
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Animaux</p>
                      <p className="text-2xl font-bold text-gray-800 mt-1">247</p>
                    </div>
                    <Users className="text-blue-500 w-8 h-8" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">En gestation</p>
                      <p className="text-2xl font-bold text-gray-800 mt-1">18</p>
                    </div>
                    <Heart className="text-pink-500 w-8 h-8" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Sous traitement</p>
                      <p className="text-2xl font-bold text-gray-800 mt-1">5</p>
                    </div>
                    <Activity className="text-orange-500 w-8 h-8" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">À vacciner</p>
                      <p className="text-2xl font-bold text-gray-800 mt-1">12</p>
                    </div>
                    <Calendar className="text-red-500 w-8 h-8" />
                  </div>
                </div>
              </div>

              {/* Animals List */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Animal</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Type</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Âge</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Statut</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Dernier contrôle</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredAnimals.map((animal) => (
                        <tr key={animal.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                                <Users className="text-blue-600 w-5 h-5" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium text-gray-800">{animal.name}</p>
                                  {animal.pregnant && (
                                    <Heart className="w-4 h-4 text-pink-500" />
                                  )}
                                </div>
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                  <Tag className="w-3 h-3" />
                                  {animal.tag}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-800">{animal.type}</span>
                              <span className="text-sm text-gray-500">{animal.breed}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-gray-700">{animal.age}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(animal.status)}`}>
                              {animal.status}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-gray-600">{animal.lastCheck}</span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors" title="Voir">
                                <Eye size={18} />
                              </button>
                              <button className="p-2 hover:bg-green-50 rounded-lg text-green-600 transition-colors" title="Éditer">
                                <Edit size={18} />
                              </button>
                              <button className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors" title="Supprimer">
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {filteredAnimals.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Aucun animal trouvé</p>
                  </div>
                )}

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Affichage de 1 à {filteredAnimals.length} sur {animals.length} animaux
                  </p>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors">
                      Précédent
                    </button>
                    <button className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      1
                    </button>
                    <button className="px-3 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors">
                      2
                    </button>
                    <button className="px-3 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors">
                      Suivant
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Animals;