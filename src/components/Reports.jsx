import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Download, Filter, Calendar, 
  BarChart3, PieChart, FileText, Users,
  DollarSign, Heart, Activity, AlertCircle,
  Eye, Edit, Trash2, Plus, X, Save,
  ChevronDown, Printer, Share2, Database,
  Clock, TrendingDown, Zap, Target
} from 'lucide-react';

const Reports = () => {
  const [activeReport, setActiveReport] = useState('health');
  const [timePeriod, setTimePeriod] = useState('last6months');
  const [reports, setReports] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    type: 'health',
    period: 'monthly',
    description: '',
    generatedDate: new Date().toISOString().split('T')[0]
  });
  const [selectedMetrics, setSelectedMetrics] = useState(['health', 'births', 'vaccinations', 'finances']);

  // Types de rapports
  const reportTypes = [
    {
      id: 'health',
      title: 'Rapport Santé',
      icon: <Activity size={24} />,
      color: 'bg-blue-500',
      lastUpdated: 'Aujourd\'hui, 14:30',
      description: 'Statistiques de santé du cheptel'
    },
    {
      id: 'reproduction',
      title: 'Rapport Reproduction',
      icon: <Heart size={24} />,
      color: 'bg-pink-500',
      lastUpdated: 'Hier, 10:15',
      description: 'Suivi des naissances et gestations'
    },
    {
      id: 'financial',
      title: 'Rapport Financier',
      icon: <DollarSign size={24} />,
      color: 'bg-green-500',
      lastUpdated: '15 Jan 2024',
      description: 'Analyse des dépenses et revenus'
    },
    {
      id: 'vaccination',
      title: 'Vaccinations',
      icon: <AlertCircle size={24} />,
      color: 'bg-purple-500',
      lastUpdated: '12 Jan 2024',
      description: 'Suivi des campagnes de vaccination'
    },
    {
      id: 'production',
      title: 'Rapport Production',
      icon: <BarChart3 size={24} />,
      color: 'bg-orange-500',
      lastUpdated: '10 Jan 2024',
      description: 'Analyses de production laitière/viande'
    },
    {
      id: 'alimentation',
      title: 'Alimentation',
      icon: <PieChart size={24} />,
      color: 'bg-yellow-500',
      lastUpdated: '8 Jan 2024',
      description: 'Consommation et coûts alimentaires'
    }
  ];

  // Données de santé
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

  // Données financières
  const financialData = [
    { category: 'Nourriture', value: 1200, color: 'bg-blue-500', trend: 'stable' },
    { category: 'Médicaments', value: 850, color: 'bg-green-500', trend: 'up' },
    { category: 'Maintenance', value: 600, color: 'bg-purple-500', trend: 'down' },
    { category: 'Personnel', value: 2000, color: 'bg-orange-500', trend: 'stable' },
    { category: 'Autres', value: 400, color: 'bg-gray-500', trend: 'up' }
  ];

  // Rapports générés
  const initialReports = [
    {
      id: 1,
      title: 'Rapport annuel 2023',
      type: 'financial',
      date: '15 Dec 2023',
      size: '4.2 MB',
      downloads: 12,
      status: 'published'
    },
    {
      id: 2,
      title: 'Analyse santé Q4',
      type: 'health',
      date: '30 Nov 2023',
      size: '2.8 MB',
      downloads: 8,
      status: 'published'
    },
    {
      id: 3,
      title: 'Bilan financier novembre',
      type: 'financial',
      date: '5 Dec 2023',
      size: '3.5 MB',
      downloads: 15,
      status: 'draft'
    },
    {
      id: 4,
      title: 'Campagne vaccination hiver',
      type: 'vaccination',
      date: '20 Nov 2023',
      size: '1.9 MB',
      downloads: 6,
      status: 'published'
    }
  ];

  useEffect(() => {
    setReports(initialReports);
  }, []);

  // CREATE
  const handleAddReport = () => {
    setEditingReport(null);
    setFormData({
      title: '',
      type: 'health',
      period: 'monthly',
      description: '',
      generatedDate: new Date().toISOString().split('T')[0]
    });
    setShowModal(true);
  };

  // CREATE/UPDATE
  const handleSaveReport = () => {
    if (editingReport) {
      // UPDATE
      setReports(prev => prev.map(report => 
        report.id === editingReport.id 
          ? { ...formData, id: editingReport.id, downloads: report.downloads || 0 }
          : report
      ));
    } else {
      // CREATE
      const newReport = {
        id: Date.now(),
        ...formData,
        size: '1.5 MB',
        downloads: 0,
        status: 'draft',
        date: new Date().toLocaleDateString('fr-FR')
      };
      setReports(prev => [...prev, newReport]);
    }
    setShowModal(false);
  };

  // UPDATE
  const handleEditReport = (report) => {
    setEditingReport(report);
    setFormData({
      title: report.title,
      type: report.type,
      period: 'monthly',
      description: '',
      generatedDate: new Date().toISOString().split('T')[0]
    });
    setShowModal(true);
  };

  // DELETE
  const handleDeleteReport = (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce rapport ?')) {
      setReports(prev => prev.filter(report => report.id !== id));
    }
  };

  // UPDATE - Publier
  const handlePublishReport = (id) => {
    setReports(prev => prev.map(report => 
      report.id === id 
        ? { ...report, status: 'published' }
        : report
    ));
  };

  // Métriques clés
  const keyMetrics = [
    { 
      label: 'Taux de naissance', 
      value: '94%', 
      icon: <TrendingUp className="text-green-500" />,
      trend: 'up',
      change: '+2%',
      color: 'green'
    },
    { 
      label: 'Coût moyen/animal', 
      value: '42€', 
      icon: <DollarSign className="text-blue-500" />,
      trend: 'down',
      change: '↓ 8%',
      color: 'blue'
    },
    { 
      label: 'Taux de vaccination', 
      value: '88%', 
      icon: <AlertCircle className="text-purple-500" />,
      trend: 'up',
      change: '+5%',
      color: 'purple'
    },
    { 
      label: 'Bénéfice net/mois', 
      value: '4.5K€', 
      icon: <TrendingUp className="text-green-500" />,
      trend: 'up',
      change: '↗ +12%',
      color: 'green'
    },
    { 
      label: 'Mortalité', 
      value: '2.3%', 
      icon: <TrendingDown className="text-red-500" />,
      trend: 'down',
      change: '↓ 0.5%',
      color: 'red'
    },
    { 
      label: 'Productivité', 
      value: '87%', 
      icon: <Zap className="text-yellow-500" />,
      trend: 'up',
      change: '+3%',
      color: 'yellow'
    }
  ];

  const filteredMetrics = keyMetrics.filter(metric => 
    selectedMetrics.includes(metric.label.toLowerCase().replace(' ', ''))
  );

  // Gestion des exports
  const handleExportPDF = () => {
    alert('Export PDF en cours...');
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,";
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `rapport_${activeReport}_${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Rapport GestionAnimals',
        text: `Consultez le rapport ${activeReport}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papier !');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getReportColor = (type) => {
    const reportType = reportTypes.find(r => r.id === type);
    return reportType ? reportType.color : 'bg-gray-500';
  };

  const getReportIcon = (type) => {
    const reportType = reportTypes.find(r => r.id === type);
    return reportType ? reportType.icon : <FileText size={20} />;
  };

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
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(e.target.value)}
                  className="pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="lastweek">7 derniers jours</option>
                  <option value="lastmonth">30 derniers jours</option>
                  <option value="last3months">3 derniers mois</option>
                  <option value="last6months">6 derniers mois</option>
                  <option value="lastyear">Année dernière</option>
                  <option value="custom">Personnalisé</option>
                </select>
              </div>
              <button 
                onClick={handleAddReport}
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Plus size={20} />
                Nouveau rapport
              </button>
            </div>
          </div>

          {/* Report Types */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
            {reportTypes.map((report) => (
              <button
                key={report.id}
                className={`bg-white rounded-xl shadow-sm border-2 p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-1 ${
                  activeReport === report.id 
                    ? 'border-blue-500 ring-2 ring-blue-100' 
                    : 'border-gray-100 hover:border-gray-200'
                }`}
                onClick={() => setActiveReport(report.id)}
              >
                <div className="flex items-start justify-between">
                  <div className={`${report.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                    <div className="text-white">
                      {report.icon}
                    </div>
                  </div>
                  <div className={`px-2 py-1 text-xs font-medium rounded ${
                    activeReport === report.id ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Clock size={12} className="inline mr-1" />
                    {report.lastUpdated.split(',')[0]}
                  </div>
                </div>
                <h3 className="font-bold text-gray-800 mt-3 mb-1 text-sm">{report.title}</h3>
                <p className="text-xs text-gray-500 truncate">{report.description}</p>
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
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-600">Santé</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm text-gray-600">Maladie</span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={handleExportCSV}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    CSV
                  </button>
                  <button 
                    onClick={handleExportPDF}
                    className="px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    PDF
                  </button>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="h-64 flex items-end justify-between gap-2 mt-8">
              {healthData.labels.map((label, index) => (
                <div key={label} className="flex-1 flex flex-col items-center gap-2">
                  <div className="flex flex-col items-center gap-1 w-full">
                    <div className="w-full flex flex-col items-center">
                      <div 
                        className="w-8 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-500 cursor-pointer"
                        style={{ height: `${healthData.datasets[0].data[index] * 2}px` }}
                        title={`Santé: ${healthData.datasets[0].data[index]}%`}
                      ></div>
                      <div 
                        className="w-8 bg-gradient-to-t from-red-600 to-red-400 rounded-b-lg transition-all duration-300 hover:from-red-700 hover:to-red-500 cursor-pointer"
                        style={{ height: `${healthData.datasets[1].data[index] * 2}px` }}
                        title={`Maladie: ${healthData.datasets[1].data[index]}%`}
                      ></div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-600">{label}</span>
                  <span className="text-xs text-gray-500 font-bold">
                    {healthData.datasets[0].data[index]}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Répartition des dépenses</h2>
              <button 
                onClick={() => setActiveReport('financial')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Voir détail →
              </button>
            </div>
            
            <div className="space-y-4">
              {financialData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <div>
                      <span className="font-medium text-gray-800">{item.category}</span>
                      <div className="flex items-center gap-1 mt-1">
                        <span className={`text-xs ${
                          item.trend === 'up' ? 'text-green-600' :
                          item.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {item.trend === 'up' ? '↗' : item.trend === 'down' ? '↘' : '→'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {item.trend === 'up' ? '+5%' : item.trend === 'down' ? '-3%' : 'Stable'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-800">{item.value}€</span>
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
              <div className="mt-2 text-sm text-green-600 font-medium">
                ↓ 2.3% vs mois précédent
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Métriques clés</h2>
            <div className="flex gap-2">
              {['health', 'births', 'vaccinations', 'finances', 'mortality', 'productivity'].map(metric => (
                <button
                  key={metric}
                  onClick={() => {
                    if (selectedMetrics.includes(metric)) {
                      setSelectedMetrics(prev => prev.filter(m => m !== metric));
                    } else {
                      setSelectedMetrics(prev => [...prev, metric]);
                    }
                  }}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    selectedMetrics.includes(metric)
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {metric === 'health' && 'Santé'}
                  {metric === 'births' && 'Naissances'}
                  {metric === 'vaccinations' && 'Vaccins'}
                  {metric === 'finances' && 'Finances'}
                  {metric === 'mortality' && 'Mortalité'}
                  {metric === 'productivity' && 'Productivité'}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {filteredMetrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{metric.label}</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{metric.value}</p>
                  </div>
                  <div className={`p-2 rounded-lg ${
                    metric.color === 'green' ? 'bg-green-50' :
                    metric.color === 'blue' ? 'bg-blue-50' :
                    metric.color === 'purple' ? 'bg-purple-50' :
                    metric.color === 'red' ? 'bg-red-50' :
                    'bg-yellow-50'
                  }`}>
                    {metric.icon}
                  </div>
                </div>
                <div className={`mt-4 text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Rapports générés</h2>
              <p className="text-gray-600 mt-1">Historique de vos analyses</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handlePrint}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Printer size={18} />
                Imprimer
              </button>
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <Share2 size={18} />
                Partager
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Rapport</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Type</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Taille</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Téléchargements</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Statut</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getReportColor(report.type)}`}>
                          {getReportIcon(report.type)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{report.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="capitalize">{report.type}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-700">{report.date}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-700">{report.size}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Download size={14} className="text-gray-400" />
                        <span className="font-medium">{report.downloads}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        report.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {report.status === 'published' ? 'Publié' : 'Brouillon'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleEditReport(report)}
                          className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteReport(report.id)}
                          className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                        {report.status === 'draft' && (
                          <button 
                            onClick={() => handlePublishReport(report.id)}
                            className="px-3 py-1 bg-green-50 text-green-600 text-sm font-medium rounded-lg hover:bg-green-100 transition-colors"
                          >
                            Publier
                          </button>
                        )}
                        <button className="p-1.5 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors">
                          <Download size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {reports.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucun rapport généré</p>
              <button 
                onClick={handleAddReport}
                className="mt-4 px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
              >
                Créer un rapport
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal pour ajouter/éditer un rapport */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  {editingReport ? 'Éditer le rapport' : 'Nouveau rapport'}
                </h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titre du rapport *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: Rapport santé trimestriel"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type de rapport *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {reportTypes.map(report => (
                        <option key={report.id} value={report.id}>{report.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Période *
                    </label>
                    <select
                      name="period"
                      value={formData.period}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="daily">Quotidien</option>
                      <option value="weekly">Hebdomadaire</option>
                      <option value="monthly">Mensuel</option>
                      <option value="quarterly">Trimestriel</option>
                      <option value="yearly">Annuel</option>
                      <option value="custom">Personnalisé</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date de génération *
                  </label>
                  <input
                    type="date"
                    name="generatedDate"
                    value={formData.generatedDate}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Objectifs et portée du rapport..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Métriques à inclure
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {keyMetrics.map(metric => (
                      <label key={metric.label} className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedMetrics.includes(metric.label.toLowerCase().replace(' ', ''))}
                          onChange={(e) => {
                            const metricId = metric.label.toLowerCase().replace(' ', '');
                            if (e.target.checked) {
                              setSelectedMetrics(prev => [...prev, metricId]);
                            } else {
                              setSelectedMetrics(prev => prev.filter(m => m !== metricId));
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{metric.label}</span>
                      </label>
                    ))}
                  </div>
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
                  onClick={handleSaveReport}
                  className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  <Save size={18} />
                  {editingReport ? 'Mettre à jour' : 'Créer le rapport'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;