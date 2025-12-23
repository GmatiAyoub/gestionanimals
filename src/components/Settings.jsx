import React from 'react';
import { 
  Settings as SettingsIcon, User, Bell, Shield, 
  Database, Globe, HelpCircle, LogOut
} from 'lucide-react';

const Settings = () => {
  const settingsSections = [
    {
      title: 'Compte',
      icon: <User size={20} />,
      items: [
        { label: 'Profil', description: 'Informations personnelles' },
        { label: 'Mot de passe', description: 'Changer le mot de passe' },
        { label: 'Notifications', description: 'Préférences de notifications' }
      ]
    },
    {
      title: 'Sécurité',
      icon: <Shield size={20} />,
      items: [
        { label: 'Connexion sécurisée', description: 'Authentification à deux facteurs' },
        { label: 'Permissions', description: 'Gestion des accès' },
        { label: 'Journal d\'activité', description: 'Historique des connexions' }
      ]
    },
    {
      title: 'Application',
      icon: <SettingsIcon size={20} />,
      items: [
        { label: 'Préférences', description: 'Paramètres de l\'application' },
        { label: 'Données', description: 'Gestion des données' },
        { label: 'Langue', description: 'Français' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Paramètres</h1>
          <p className="text-gray-600 mt-2">Gérez vos préférences et paramètres</p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingsSections.map((section) => (
            <div key={section.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <div className="text-blue-500">{section.icon}</div>
                </div>
                <h2 className="text-xl font-bold text-gray-800">{section.title}</h2>
              </div>
              
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div 
                    key={item.label}
                    className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div>
                      <h3 className="font-medium text-gray-800">{item.label}</h3>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    <div className="text-gray-400">
                      →
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Support and Logout */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <HelpCircle className="text-purple-500 w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Aide & Support</h3>
                <p className="text-sm text-gray-500">Documentation et assistance</p>
              </div>
            </div>
            <button className="w-full px-4 py-3 bg-purple-50 text-purple-600 font-medium rounded-lg hover:bg-purple-100 transition-colors">
              Contacter le support
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <LogOut className="text-red-500 w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Déconnexion</h3>
                <p className="text-sm text-gray-500">Quitter votre session</p>
              </div>
            </div>
            <button className="w-full px-4 py-3 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors">
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;