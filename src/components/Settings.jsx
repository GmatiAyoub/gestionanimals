import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, User, Bell, Shield, 
  Database, Globe, HelpCircle, LogOut, Eye, EyeOff,
  Save, X, Check, AlertCircle, Lock, Key, Mail,
  Smartphone, Users, Building, Calendar, CreditCard,
  Camera, Upload, Download, RefreshCw, Trash2,
  BellOff, Moon, Sun, Palette, Volume2
} from 'lucide-react';

const Settings = () => {
  // État principal
  const [activeSection, setActiveSection] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Données utilisateur
  const [userData, setUserData] = useState({
    profile: {
      firstName: 'Gmaty',
      lastName: 'Ayoub',
      email: 'gmaty.ayoub@example.com',
      phone: '+33 6 12 34 56 78',
      role: 'Administrateur',
      farmName: 'Ferme des Vallées',
      address: '123 Route de la Ferme, 75000 Paris',
      joinDate: '15/01/2023'
    },
    security: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      twoFactorAuth: true,
      loginHistory: [
        { id: 1, date: '2024-01-20 14:30', device: 'Chrome, Windows', ip: '192.168.1.1' },
        { id: 2, date: '2024-01-19 09:15', device: 'Safari, Mac', ip: '192.168.1.2' },
        { id: 3, date: '2024-01-18 16:45', device: 'Mobile, Android', ip: '192.168.1.3' }
      ]
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      smsAlerts: true,
      healthAlerts: true,
      birthAlerts: true,
      treatmentReminders: true,
      financialReports: false
    },
    preferences: {
      language: 'fr',
      theme: 'light',
      timezone: 'Europe/Paris',
      dateFormat: 'DD/MM/YYYY',
      currency: 'EUR',
      dashboardRefresh: 30,
      defaultView: 'dashboard'
    },
    data: {
      autoBackup: true,
      backupFrequency: 'daily',
      lastBackup: '2024-01-19 23:00',
      storageUsed: '2.4 GB',
      storageLimit: '10 GB',
      exportFormat: 'json',
      keepHistory: 365
    }
  });

  // Types de paramètres
  const settingsSections = [
    {
      id: 'profile',
      title: 'Profil',
      icon: <User size={20} />,
      color: 'blue',
      description: 'Informations personnelles et compte'
    },
    {
      id: 'security',
      title: 'Sécurité',
      icon: <Shield size={20} />,
      color: 'green',
      description: 'Mot de passe et connexion'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <Bell size={20} />,
      color: 'purple',
      description: 'Préférences d\'alertes'
    },
    {
      id: 'preferences',
      title: 'Préférences',
      icon: <SettingsIcon size={20} />,
      color: 'orange',
      description: 'Interface et langage'
    },
    {
      id: 'data',
      title: 'Données',
      icon: <Database size={20} />,
      color: 'indigo',
      description: 'Sauvegarde et export'
    },
    {
      id: 'team',
      title: 'Équipe',
      icon: <Users size={20} />,
      color: 'pink',
      description: 'Gestion des accès'
    }
  ];

  // CREATE - Logique de sauvegarde
  const handleSave = () => {
    setIsEditing(false);
    setSaveSuccess(true);
    
    // Simuler une sauvegarde API
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  // UPDATE - Gestion des changements
  const handleInputChange = (section, field, value) => {
    setUserData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setIsEditing(true);
  };

  // UPDATE - Mot de passe
  const handlePasswordChange = () => {
    if (userData.security.newPassword !== userData.security.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    
    alert('Mot de passe changé avec succès');
    setUserData(prev => ({
      ...prev,
      security: {
        ...prev.security,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }));
  };

  // DELETE - Session
  const handleLogout = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      // Logique de déconnexion
      alert('Déconnexion réussie');
      window.location.href = '/login';
    }
  };

  // CREATE - Backup
  const handleBackup = () => {
    alert('Sauvegarde démarrée...');
    // Simuler une sauvegarde
    setTimeout(() => {
      alert('Sauvegarde terminée avec succès !');
    }, 2000);
  };

  // READ - Export
  const handleExport = () => {
    const dataStr = JSON.stringify(userData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const link = document.createElement('a');
    link.setAttribute('href', dataUri);
    link.setAttribute('download', `parametres_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render section active
  const renderActiveSection = () => {
    switch(activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Photo de profil</h3>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  GA
                </div>
                <div className="space-y-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors">
                    <Camera size={18} />
                    Changer la photo
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                    <Trash2 size={18} />
                    Supprimer
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                <input
                  type="text"
                  value={userData.profile.firstName}
                  onChange={(e) => handleInputChange('profile', 'firstName', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input
                  type="text"
                  value={userData.profile.lastName}
                  onChange={(e) => handleInputChange('profile', 'lastName', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={userData.profile.email}
                  onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <input
                  type="tel"
                  value={userData.profile.phone}
                  onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la ferme</label>
                <input
                  type="text"
                  value={userData.profile.farmName}
                  onChange={(e) => handleInputChange('profile', 'farmName', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                <textarea
                  value={userData.profile.address}
                  onChange={(e) => handleInputChange('profile', 'address', e.target.value)}
                  rows="2"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Changer le mot de passe</h3>
              <div className="space-y-4 max-w-md">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe actuel</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={userData.security.currentPassword}
                    onChange={(e) => handleInputChange('security', 'currentPassword', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-8 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={userData.security.newPassword}
                    onChange={(e) => handleInputChange('security', 'newPassword', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={userData.security.confirmPassword}
                    onChange={(e) => handleInputChange('security', 'confirmPassword', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handlePasswordChange}
                  className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Key size={18} className="inline mr-2" />
                  Changer le mot de passe
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Authentification à deux facteurs</h3>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Lock className="text-blue-500" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">2FA activée</h4>
                    <p className="text-sm text-gray-500">Sécurité renforcée pour votre compte</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userData.security.twoFactorAuth}
                    onChange={(e) => handleInputChange('security', 'twoFactorAuth', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Historique des connexions</h3>
              <div className="space-y-3">
                {userData.security.loginHistory.map((login) => (
                  <div key={login.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-800">{login.date}</div>
                      <div className="text-sm text-gray-500">{login.device}</div>
                    </div>
                    <div className="text-sm text-gray-500">{login.ip}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800">Préférences de notifications</h3>
            
            <div className="space-y-4">
              {Object.entries(userData.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {key === 'emailNotifications' && 'Notifications email'}
                      {key === 'pushNotifications' && 'Notifications push'}
                      {key === 'smsAlerts' && 'Alertes SMS'}
                      {key === 'healthAlerts' && 'Alertes santé'}
                      {key === 'birthAlerts' && 'Alertes naissances'}
                      {key === 'treatmentReminders' && 'Rappels traitement'}
                      {key === 'financialReports' && 'Rapports financiers'}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {key === 'emailNotifications' && 'Recevoir des notifications par email'}
                      {key === 'pushNotifications' && 'Notifications sur votre appareil'}
                      {key === 'smsAlerts' && 'Alertes urgentes par SMS'}
                      {key === 'healthAlerts' && 'Alertes concernant la santé des animaux'}
                      {key === 'birthAlerts' && 'Notifications de mises bas'}
                      {key === 'treatmentReminders' && 'Rappels pour les traitements'}
                      {key === 'financialReports' && 'Rapports financiers mensuels'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => handleInputChange('notifications', key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Langue</label>
                <select
                  value={userData.preferences.language}
                  onChange={(e) => handleInputChange('preferences', 'language', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thème</label>
                <select
                  value={userData.preferences.theme}
                  onChange={(e) => handleInputChange('preferences', 'theme', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="light">Clair</option>
                  <option value="dark">Sombre</option>
                  <option value="auto">Automatique</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fuseau horaire</label>
                <select
                  value={userData.preferences.timezone}
                  onChange={(e) => handleInputChange('preferences', 'timezone', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Europe/Paris">Europe/Paris</option>
                  <option value="Europe/London">Europe/London</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="Asia/Tokyo">Asia/Tokyo</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Format de date</label>
                <select
                  value={userData.preferences.dateFormat}
                  onChange={(e) => handleInputChange('preferences', 'dateFormat', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Devise</label>
                <select
                  value={userData.preferences.currency}
                  onChange={(e) => handleInputChange('preferences', 'currency', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="EUR">€ EUR</option>
                  <option value="USD">$ USD</option>
                  <option value="GBP">£ GBP</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rafraîchissement dashboard (s)</label>
                <input
                  type="number"
                  value={userData.preferences.dashboardRefresh}
                  onChange={(e) => handleInputChange('preferences', 'dashboardRefresh', parseInt(e.target.value))}
                  min="10"
                  max="300"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 'data':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Sauvegarde automatique</h3>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <Database className="text-green-500" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Sauvegarde automatique</h4>
                    <p className="text-sm text-gray-500">Dernière sauvegarde: {userData.data.lastBackup}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userData.data.autoBackup}
                    onChange={(e) => handleInputChange('data', 'autoBackup', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fréquence de sauvegarde</label>
              <select
                value={userData.data.backupFrequency}
                onChange={(e) => handleInputChange('data', 'backupFrequency', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="hourly">Toutes les heures</option>
                <option value="daily">Quotidienne</option>
                <option value="weekly">Hebdomadaire</option>
                <option value="monthly">Mensuelle</option>
              </select>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Stockage</h3>
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Utilisation: {userData.data.storageUsed} / {userData.data.storageLimit}</span>
                  <span className="text-sm font-bold text-blue-600">
                    {Math.round((parseFloat(userData.data.storageUsed) / parseFloat(userData.data.storageLimit)) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(parseFloat(userData.data.storageUsed) / parseFloat(userData.data.storageLimit)) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={handleBackup}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Save size={18} />
                Sauvegarder maintenant
              </button>
              <button
                onClick={handleExport}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
              >
                <Download size={18} />
                Exporter les données
              </button>
            </div>
          </div>
        );

      case 'team':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800">Gestion de l'équipe</h3>
            <p className="text-gray-600">Gérez les accès et permissions des membres de votre équipe.</p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="text-blue-500" size={20} />
                <p className="text-sm text-blue-700">
                  Vous êtes administrateur. Vous pouvez ajouter ou supprimer des membres.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { name: 'Marie Dubois', email: 'marie@ferme.com', role: 'Vétérinaire', status: 'active' },
                { name: 'Pierre Martin', email: 'pierre@ferme.com', role: 'Soigneur', status: 'active' },
                { name: 'Sophie Bernard', email: 'sophie@ferme.com', role: 'Comptable', status: 'pending' }
              ].map((member, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-white font-bold">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{member.name}</div>
                      <div className="text-sm text-gray-500">{member.email}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                          {member.role}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {member.status === 'active' ? 'Actif' : 'En attente'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit size={18} className="text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors">
              <Plus size={18} className="text-gray-400" />
              <span className="text-gray-600 font-medium">Ajouter un membre</span>
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  // Helper pour les couleurs
  const getColorClass = (color) => {
    switch(color) {
      case 'blue': return 'bg-blue-50 text-blue-600';
      case 'green': return 'bg-green-50 text-green-600';
      case 'purple': return 'bg-purple-50 text-purple-600';
      case 'orange': return 'bg-orange-50 text-orange-600';
      case 'indigo': return 'bg-indigo-50 text-indigo-600';
      case 'pink': return 'bg-pink-50 text-pink-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const Plus = ({ size, className }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header avec message de succès */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Paramètres</h1>
              <p className="text-gray-600 mt-2">Gérez vos préférences et paramètres</p>
            </div>
            <div className="flex items-center gap-3">
              {isEditing && (
                <button
                  onClick={() => {
                    setUserData({...userData});
                    setIsEditing(false);
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <X size={18} className="inline mr-2" />
                  Annuler
                </button>
              )}
              <button
                onClick={handleSave}
                disabled={!isEditing}
                className={`px-4 py-2 font-medium rounded-lg transition-colors flex items-center gap-2 ${
                  isEditing 
                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Save size={18} />
                Enregistrer
              </button>
            </div>
          </div>
          
          {saveSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3">
                <Check className="text-green-500" size={20} />
                <p className="text-green-700 font-medium">Paramètres enregistrés avec succès !</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="space-y-1">
                {settingsSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? `${getColorClass(section.color)} font-medium`
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      activeSection === section.id ? getColorClass(section.color).split(' ')[0] : 'bg-gray-100'
                    }`}>
                      <div className={activeSection === section.id ? getColorClass(section.color).split(' ')[1] : 'text-gray-400'}>
                        {section.icon}
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{section.title}</div>
                      <div className="text-xs text-gray-500">{section.description}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Déconnexion dans sidebar */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors"
                >
                  <LogOut size={18} />
                  Se déconnecter
                </button>
              </div>
            </div>

            {/* Support */}
            <div className="mt-4 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <HelpCircle className="text-purple-500" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Aide & Support</h3>
                  <p className="text-sm text-gray-500">Besoin d'aide ?</p>
                </div>
              </div>
              <button className="w-full px-4 py-2 bg-purple-50 text-purple-600 font-medium rounded-lg hover:bg-purple-100 transition-colors">
                Contacter le support
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  getColorClass(settingsSections.find(s => s.id === activeSection)?.color || 'blue').split(' ')[0]
                }`}>
                  <div className={
                    getColorClass(settingsSections.find(s => s.id === activeSection)?.color || 'blue').split(' ')[1]
                  }>
                    {settingsSections.find(s => s.id === activeSection)?.icon}
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {settingsSections.find(s => s.id === activeSection)?.title}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {settingsSections.find(s => s.id === activeSection)?.description}
                  </p>
                </div>
              </div>

              {renderActiveSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;