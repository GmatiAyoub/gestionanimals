import React, { useState } from 'react';
import { 
  Syringe, Filter, Search, Plus, AlertCircle, 
  Calendar, Users, Clock, CheckCircle, XCircle
} from 'lucide-react';

const Treatments = () => {
  const [filter, setFilter] = useState('all');

  const treatments = [
    {
      id: 1,
      animal: 'Bella',
      type: 'Vache',
      treatment: 'Vaccin grippe bovine',
      status: 'completed',
      date: '2024-01-15',
      vet: 'Dr. Martin',
      notes: 'Dose complète administrée'
    },
    {
      id: 2,
      animal: 'Mouton',
      type: 'Mouton',
      treatment: 'Antibiotiques',
      status: 'pending',
      date: '2024-01-18',
      vet: 'Dr. Simon',
      notes: 'À administrer matin et soir'
    },
    {
      id: 3,
      animal: 'Biquette',
      type: 'Chèvre',
      treatment: 'Vitamines',
      status: 'completed',
      date: '2024-01-10',
      vet: 'Dr. Martin',
      notes: 'Cure de 10 jours'
    },
    {
      id: 4,
      animal: 'Rex',
      type: 'Taureau',
      treatment: 'Examen de routine',
      status: 'urgent',
      date: '2024-01-20',
      vet: 'Dr. Simon',
      notes: 'Contrôle poids et température'
    },
    {
      id: 5,
      animal: 'Laine',
      type: 'Brebis',
      treatment: 'Vaccin antiparasitaire',
      status: 'pending',
      date: '2024-01-22',
      vet: 'Dr. Martin',
      notes: 'À renouveler tous les 6 mois'
    }
  ];

  const filteredTreatments = treatments.filter(t => 
    filter === 'all' || t.status === filter
  );

  const getStatusInfo = (status) => {
    switch(status) {
      case 'completed':
        return {
          color: 'bg-green-100 text-green-800',
          icon: <CheckCircle size={16} />,
          text: 'Terminé'
        };
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          icon: <Clock size={16} />,
          text: 'En attente'
        };
      case 'urgent':
        return {
          color: 'bg-red-100 text-red-800',
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

  const stats = [
    { label: 'Total traitements', value: '48', change: '+5', trend: 'up' },
    { label: 'En cours', value: '12', change: '-2', trend: 'down' },
    { label: 'À venir', value: '8', change: '+3', trend: 'up' },
    { label: 'Complétés', value: '40', change: '+7', trend: 'up' }
  ];

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
            <button className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg">
              <Plus size={20} />
              Nouveau traitement
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
                    stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {stat.trend === 'up' ? '↗' : '↘'}
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
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button 
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setFilter('all')}
              >
                Tous
              </button>
              <button 
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'urgent' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setFilter('urgent')}
              >
                Urgents
              </button>
              <button 
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'pending' 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setFilter('pending')}
              >
                En attente
              </button>
              <button 
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'completed' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setFilter('completed')}
              >
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
                    <tr key={treatment.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                            <Users className="text-blue-600 w-5 h-5" />
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
                          <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusInfo.color}`}>
                            {statusInfo.icon}
                            {statusInfo.text}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors">
                            Détails
                          </button>
                          {treatment.status !== 'completed' && (
                            <button className="px-3 py-1 bg-green-50 text-green-600 text-sm font-medium rounded-lg hover:bg-green-100 transition-colors">
                              Terminer
                            </button>
                          )}
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
                <div key={treatment.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
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
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button className="w-full px-4 py-2 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors">
                      Planifier un rappel
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Treatments;