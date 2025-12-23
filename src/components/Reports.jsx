import React, { useState } from 'react';
import { 
  TrendingUp, Download, Filter, Calendar, 
  BarChart3, PieChart, FileText, Users,
  DollarSign, Heart, Activity, AlertCircle
} from 'lucide-react';

const Reports = () => {
  const [activeReport, setActiveReport] = useState('health');

  const reports = [
    {
      id: 'health',
      title: 'Rapport Santé',
      icon: <Activity size={24} />,
      color: 'bg-blue-500',
      lastUpdated: 'Aujourd\'hui, 14:30'
    },
    {
      id: 'reproduction',
      title: 'Rapport Reproduction',
      icon: <Heart size={24} />,
      color: 'bg-pink-500',
      lastUpdated: 'Hier, 10:15'
    },
    {
      id: 'financial',
      title: 'Rapport Financier',
      icon: <DollarSign size={24} />,
      color: 'bg-green-500',
      lastUpdated: '15 Jan 2024'
    },
    {
      id: 'vaccination',
      title: 'Vaccinations',
      icon: <AlertCircle size={24} />,
      color: 'bg-purple-500',
      lastUpdated: '12 Jan 2024'
    }
  ];

  const healthData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Taux de santé',
        data: [85, 88, 90, 92, 94, 95],
        color: 'bg-blue-500'
      },
      {
        label: 'Taux de maladie',
        data: [15, 12, 10, 8, 6, 5],
        color: 'bg-red-500'
      }
    ]
  };

  const financialData = [
    { category: 'Nourriture', value: 1200, color: 'bg-blue-500' },
    { category: 'Médicaments', value: 850, color: 'bg-green-500' },
    { category: 'Maintenance', value: 600, color: 'bg-purple-500' },
    { category: 'Personnel', value: 2000, color: 'bg-orange-500' },
    { category: 'Autres', value: 400, color: 'bg-gray-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Rapports & Analyses</h1>
              <p className="text-gray-600 mt-2">Analyses détaillées et statistiques de votre exploitation</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Calendar size={20} />
                Période
              </button>
              <button className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg">
                <Download size={20} />
                Exporter PDF
              </button>
            </div>
          </div>

          {/* Report Types */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {reports.map((report) => (
              <button
                key={report.id}
                className={`bg-white rounded-xl shadow-sm border-2 p-4 sm:p-6 transition-all duration-200 hover:shadow-md ${
                  activeReport === report.id 
                    ? 'border-blue-500' 
                    : 'border-gray-100 hover:border-gray-200'
                }`}
                onClick={() => setActiveReport(report.id)}
              >
                <div className="flex items-start justify-between">
                  <div className={`${report.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <div className="text-white">
                      {report.icon}
                    </div>
                  </div>
                  <div className={`px-2 py-1 text-xs font-medium rounded ${
                    activeReport === report.id ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {report.lastUpdated.split(',')[0]}
                  </div>
                </div>
                <h3 className="font-bold text-gray-800 mt-4 mb-2">{report.title}</h3>
                <p className="text-sm text-gray-500">Dernière mise à jour: {report.lastUpdated}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Main Report Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Health Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Évolution de la santé du cheptel</h2>
                <p className="text-gray-600 mt-1">6 derniers mois</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-600">Santé</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm text-gray-600">Maladie</span>
                </div>
              </div>
            </div>

            {/* Simple Chart */}
            <div className="h-64 flex items-end justify-between gap-2 mt-8">
              {healthData.labels.map((label, index) => (
                <div key={label} className="flex-1 flex flex-col items-center gap-2">
                  <div className="flex flex-col items-center gap-1 w-full">
                    <div className="w-full flex flex-col items-center">
                      <div 
                        className="w-8 bg-blue-500 rounded-t-lg"
                        style={{ height: `${healthData.datasets[0].data[index] * 2}px` }}
                      ></div>
                      <div 
                        className="w-8 bg-red-500 rounded-b-lg"
                        style={{ height: `${healthData.datasets[1].data[index] * 2}px` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-600">{label}</span>
                  <span className="text-xs text-gray-500">
                    {healthData.datasets[0].data[index]}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Répartition des dépenses</h2>
            
            <div className="space-y-4">
              {financialData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-gray-700">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-800">{item.value}€</span>
                    <span className="text-sm text-gray-500">
                      ({Math.round((item.value / 5050) * 100)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-800">Total dépenses</span>
                <span className="text-2xl font-bold text-gray-800">
                  {financialData.reduce((sum, item) => sum + item.value, 0)}€
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Taux de naissance</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">94%</p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <TrendingUp className="text-green-500 w-6 h-6" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Coût moyen/animal</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">42€</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <DollarSign className="text-blue-500 w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 text-sm text-green-600 font-medium">
              ↓ 8% vs mois dernier
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Taux de vaccination</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">88%</p>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <AlertCircle className="text-purple-500 w-6 h-6" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bénéfice net/mois</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">4.5K€</p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <TrendingUp className="text-green-500 w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 text-sm text-green-600 font-medium">
              ↗ +12% vs mois dernier
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Rapports récemment générés</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Voir tous les rapports
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Rapport annuel 2023', date: '15 Dec 2023', size: '4.2 MB' },
              { title: 'Analyse santé Q4', date: '30 Nov 2023', size: '2.8 MB' },
              { title: 'Bilan financier novembre', date: '5 Dec 2023', size: '3.5 MB' }
            ].map((report, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <FileText className="text-blue-500 w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{report.title}</h3>
                      <p className="text-sm text-gray-500">{report.date}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Download size={18} />
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500">{report.size}</span>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Ouvrir →
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

export default Reports;