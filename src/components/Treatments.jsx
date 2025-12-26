import React, { useState, useEffect } from 'react';
import { 
  Syringe, Filter, Search, Plus, AlertCircle, 
  Calendar, Users, Clock, CheckCircle, XCircle,
  Edit, Trash2, Eye, Save, X, Download,
  TrendingUp, TrendingDown, Bell
} from 'lucide-react';

const Treatments = () => {
  const [treatments, setTreatments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTreatment, setEditingTreatment] = useState(null);
  const [formData, setFormData] = useState({
    animal: '',
    type: 'Vache',
    treatment: '',
    status: 'pending',
    date: new Date().toISOString().split('T')[0],
    vet: 'Dr. Martin',
    notes: '',
    dosage: '',
    frequency: 'unique',
    duration: '',
    cost: ''
  });

  // Données initiales
  const initialTreatments = [
    {
      id: 1,
      animal: 'Bella',
      type: 'Vache',
      treatment: 'Vaccin grippe bovine',
      status: 'completed',
      date: '2024-01-15',
      vet: 'Dr. Martin',
      notes: 'Dose complète administrée',
      dosage: '5ml',
      frequency: 'unique',
      duration: '1 jour',
      cost: '45€'
    },
    {
      id: 2,
      animal: 'Mouton',
      type: 'Mouton',
      treatment: 'Antibiotiques',
      status: 'pending',
      date: '2024-01-18',
      vet: 'Dr. Simon',
      notes: 'À administrer matin et soir',
      dosage: '2 comprimés',
      frequency: 'quotidien',
      duration: '7 jours',
      cost: '28€'
    },
    {
      id: 3,
      animal: 'Biquette',
      type: 'Chèvre',
      treatment: 'Vitamines',
      status: 'completed',
      date: '2024-01-10',
      vet: 'Dr. Martin',
      notes: 'Cure de 10 jours',
      dosage: '10ml',
      frequency: 'quotidien',
      duration: '10 jours',
      cost: '32€'
    },
    {
      id: 4,
      animal: 'Rex',
      type: 'Taureau',
      treatment: 'Examen de routine',
      status: 'urgent',
      date: '2024-01-20',
      vet: 'Dr. Simon',
      notes: 'Contrôle poids et température',
      dosage: '',
      frequency: 'unique',
      duration: '30 minutes',
      cost: '60€'
    },
    {
      id: 5,
      animal: 'Laine',
      type: 'Brebis',
      treatment: 'Vaccin antiparasitaire',
      status: 'pending',
      date: '2024-01-22',
      vet: 'Dr. Martin',
      notes: 'À renouveler tous les 6 mois',
      dosage: '3ml',
      frequency: 'unique',
      duration: '1 jour',
      cost: '38€'
    }
  ];

  useEffect(() => {
    setTreatments(initialTreatments);
  }, []);

  // CREATE
  const handleAddTreatment = () => {
    setEditingTreatment(null);
    setFormData({
      animal: '',
      type: 'Vache',
      treatment: '',
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      vet: 'Dr. Martin',
      notes: '',
      dosage: '',
      frequency: 'unique',
      duration: '',
      cost: ''
    });
    setShowModal(true);
  };

  // CREATE/UPDATE
  const handleSaveTreatment = () => {
    if (editingTreatment) {
      // UPDATE
      setTreatments(prev => prev.map(t => 
        t.id === editingTreatment.id 
          ? { ...formData, id: editingTreatment.id }
          : t
      ));
    } else {
      // CREATE
      const newTreatment = {
        id: Date.now(),
        ...formData
      };
      setTreatments(prev => [...prev, newTreatment]);
    }
    setShowModal(false);
  };

  // READ avec filtrage et recherche
  const filteredTreatments = treatments.filter(treatment => {
    const matchesFilter = filter === 'all' || treatment.status === filter;
    const matchesSearch = searchTerm === '' || 
      treatment.animal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      treatment.treatment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      treatment.vet.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // UPDATE
  const handleEditTreatment = (treatment) => {
    setEditingTreatment(treatment);
    setFormData({
      animal: treatment.animal,
      type: treatment.type,
      treatment: treatment.treatment,
      status: treatment.status,
      date: treatment.date,
      vet: treatment.vet,
      notes: treatment.notes || '',
      dosage: treatment.dosage || '',
      frequency: treatment.frequency || 'unique',
      duration: treatment.duration || '',
      cost: treatment.cost || ''
    });
    setShowModal(true);
  };

  // DELETE
  const handleDeleteTreatment = (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce traitement ?')) {
      setTreatments(prev => prev.filter(t => t.id !== id));
    }
  };

  // UPDATE - Marquer comme terminé
  const handleCompleteTreatment = (id) => {
    setTreatments(prev => prev.map(t => 
      t.id === id 
        ? { ...t, status: 'completed' }
        : t
    ));
  };

  // Calcul des statistiques
  const calculateStats = () => {
    const total = treatments.length;
    const completed = treatments.filter(t => t.status === 'completed').length;
    const pending = treatments.filter(t => t.status === 'pending').length;
    const urgent = treatments.filter(t => t.status === 'urgent').length;
    
    return [
      { 
        label: 'Total traitements', 
        value: total.toString(), 
        change: '+5', 
        trend: 'up' 
      },
      { 
        label: 'En attente', 
        value: pending.toString(), 
        change: pending > 8 ? '+2' : '-1', 
        trend: pending > 8 ? 'up' : 'down' 
      },
      { 
        label: 'À terminer', 
        value: (pending + urgent).toString(), 
        change: '+3', 
        trend: 'up' 
      },
      { 
        label: 'Complétés', 
        value: completed.toString(), 
        change: completed > 35 ? '+7' : '-2', 
        trend: completed > 35 ? 'up' : 'down' 
      }
    ];
  };

  const stats = calculateStats();

  // Helper functions
  const getStatusInfo = (status) => {
    switch(status) {
      case 'completed':
        return {
          color: 'bg-green-100 text-green-800 border border-green-200',
          icon: <CheckCircle size={16} />,
          text: 'Terminé'
        };
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
          icon: <Clock size={16} />,
          text: 'En attente'
        };
      case 'urgent':
        return {
          color: 'bg-red-100 text-red-800 border border-red-200',
          icon: <AlertCircle size={16} />,
          text: 'Urgent'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: null,
          text: status
        };
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'Vache': return 'from-blue-100 to-blue-200';
      case 'Mouton': return 'from-green-100 to-green-200';
      case 'Chèvre': return 'from-orange-100 to-orange-200';
      case 'Brebis': return 'from-purple-100 to-purple-200';
      case 'Taureau': return 'from-red-100 to-red-200';
      default: return 'from-gray-100 to-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Vache': return '🐄';
      case 'Mouton': return '🐑';
      case 'Chèvre': return '🐐';
      case 'Brebis': return '🐑';
      case 'Taureau': return '🐂';
      default: return '🐾';
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(treatments, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `traitements_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Traitements</h1>
              <p className="text-gray-600 mt-2">Suivi médical et gestion des soins</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download size={20} />
                Exporter
              </button>
              <button 
                onClick={handleAddTreatment}
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Plus size={20} />
                Nouveau traitement
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                  </div>
                  <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${
                    stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    {stat.change}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher un traitement..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button 
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  filter === 'all' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setFilter('all')}
              >
                <Filter size={16} />
                Tous
              </button>
              <button 
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  filter === 'urgent' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setFilter('urgent')}
              >
                <AlertCircle size={16} />
                Urgents
              </button>
              <button 
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  filter === 'pending' 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setFilter('pending')}
              >
                <Clock size={16} />
                En attente
              </button>
              <button 
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  filter === 'completed' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setFilter('completed')}
              >
                <CheckCircle size={16} />
                Terminés
              </button>
            </div>
          </div>
        </div>

        {/* Treatments List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Animal</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Traitement</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Vétérinaire</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Statut</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTreatments.map((treatment) => {
                  const statusInfo = getStatusInfo(treatment.status);
                  
                  return (
                    <tr key={treatment.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 bg-gradient-to-br rounded-lg flex items-center justify-center ${getTypeColor(treatment.type)}`}>
                            <span className="text-lg">{getTypeIcon(treatment.type)}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{treatment.animal}</p>
                            <p className="text-sm text-gray-500">{treatment.type}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-gray-800">{treatment.treatment}</p>
                          <p className="text-sm text-gray-500 truncate max-w-xs">{treatment.notes}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">
                            {new Date(treatment.date).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-700">{treatment.vet}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 ${statusInfo.color}`}>
                            {statusInfo.icon}
                            {statusInfo.text}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleEditTreatment(treatment)}
                            className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                          >
                            <Edit size={18} />
                          </button>
                          {treatment.status !== 'completed' && (
                            <button 
                              onClick={() => handleCompleteTreatment(treatment.id)}
                              className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors"
                            >
                              <CheckCircle size={18} />
                            </button>
                          )}
                          <button 
                            onClick={() => handleDeleteTreatment(treatment.id)}
                            className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                          <button className="p-2 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors">
                            <Eye size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredTreatments.length === 0 && (
            <div className="text-center py-12">
              <Syringe className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucun traitement trouvé</p>
              <button 
                onClick={handleAddTreatment}
                className="mt-4 px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
              >
                Ajouter un traitement
              </button>
            </div>
          )}
        </div>

        {/* Upcoming Treatments */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Traitements à venir</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {treatments
              .filter(t => t.status === 'pending' || t.status === 'urgent')
              .slice(0, 3)
              .map(treatment => (
                <div key={treatment.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Syringe className="w-5 h-5 text-blue-500" />
                        <h3 className="font-medium text-gray-800">{treatment.treatment}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{treatment.animal} • {treatment.type}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(treatment.date).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {treatment.vet}
                        </div>
                      </div>
                    </div>
                    {getStatusInfo(treatment.status).icon}
                  </div>
                  {treatment.notes && (
                    <p className="text-sm text-gray-600 mt-3 p-2 bg-gray-50 rounded-lg">{treatment.notes}</p>
                  )}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                    <button 
                      onClick={() => handleEditTreatment(treatment)}
                      className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors text-sm"
                    >
                      Modifier
                    </button>
                    <button className="flex-1 px-3 py-2 bg-gray-50 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors text-sm">
                      <Bell size={14} className="inline mr-1" />
                      Rappel
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Modal pour ajouter/éditer un traitement */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  {editingTreatment ? 'Éditer le traitement' : 'Nouveau traitement'}
                </h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Animal *
                  </label>
                  <input
                    type="text"
                    name="animal"
                    value={formData.animal}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nom de l'animal"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type d'animal *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Vache">Vache</option>
                    <option value="Mouton">Mouton</option>
                    <option value="Chèvre">Chèvre</option>
                    <option value="Brebis">Brebis</option>
                    <option value="Taureau">Taureau</option>
                    <option value="Veau">Veau</option>
                    <option value="Agneau">Agneau</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Traitement *
                  </label>
                  <input
                    type="text"
                    name="treatment"
                    value={formData.treatment}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Type de traitement"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Statut *
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="pending">En attente</option>
                    <option value="urgent">Urgent</option>
                    <option value="completed">Terminé</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vétérinaire *
                  </label>
                  <select
                    name="vet"
                    value={formData.vet}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Dr. Martin">Dr. Martin</option>
                    <option value="Dr. Simon">Dr. Simon</option>
                    <option value="Dr. Dubois">Dr. Dubois</option>
                    <option value="Dr. Lefebvre">Dr. Lefebvre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dosage
                  </label>
                  <input
                    type="text"
                    name="dosage"
                    value={formData.dosage}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: 5ml, 2 comprimés"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fréquence
                  </label>
                  <select
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="unique">Unique</option>
                    <option value="quotidien">Quotidien</option>
                    <option value="hebdomadaire">Hebdomadaire</option>
                    <option value="mensuel">Mensuel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Durée
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: 7 jours, 1 mois"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Coût (€)
                  </label>
                  <input
                    type="text"
                    name="cost"
                    value={formData.cost}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: 45€"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes supplémentaires
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Instructions, observations..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSaveTreatment}
                  className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  <Save size={18} />
                  {editingTreatment ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Treatments;