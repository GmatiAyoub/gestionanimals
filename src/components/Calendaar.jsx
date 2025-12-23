import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, ChevronLeft, ChevronRight, 
  Plus, Filter, Users, Syringe, Heart
} from 'lucide-react';

const Calendar = () => {
  const [currentDate] = useState(new Date());

  const events = [
    {
      id: 1,
      title: 'Vaccination vaches',
      type: 'vaccination',
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      animals: 15,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Contrôle gestation brebis',
      type: 'health',
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      animals: 8,
      color: 'bg-purple-500'
    },
    {
      id: 3,
      title: 'Naissance prévue',
      type: 'birth',
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
      animals: 3,
      color: 'bg-pink-500'
    },
    {
      id: 4,
      title: 'Visite vétérinaire',
      type: 'treatment',
      date: new Date(new Date().setDate(new Date().getDate() + 5)),
      animals: 1,
      color: 'bg-orange-500'
    }
  ];

  const getDayEvents = (date) => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const getEventIcon = (type) => {
    switch(type) {
      case 'vaccination': return <Syringe size={16} />;
      case 'health': return <Users size={16} />;
      case 'birth': return <Heart size={16} />;
      default: return <CalendarIcon size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Calendrier</h1>
              <p className="text-gray-600 mt-2">Planifiez et suivez les événements du cheptel</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter size={20} />
                Filtrer
              </button>
              <button className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg">
                <Plus size={20} />
                Nouvel événement
              </button>
            </div>
          </div>

          {/* Calendar Navigation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ChevronLeft size={20} />
                </button>
                <h2 className="text-xl font-bold text-gray-800">
                  {currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                </h2>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-blue-50 text-blue-600 font-medium rounded-lg">
                  Mois
                </button>
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 font-medium rounded-lg">
                  Semaine
                </button>
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 font-medium rounded-lg">
                  Jour
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
              <div key={day} className="bg-gray-50 p-4 text-center">
                <span className="font-semibold text-gray-700">{day}</span>
              </div>
            ))}
            
            {/* Calendar days */}
            {Array.from({ length: 35 }).map((_, index) => {
              const day = new Date(currentDate.getFullYear(), currentDate.getMonth(), index - currentDate.getDay() + 1);
              const dayEvents = getDayEvents(day);
              
              return (
                <div key={index} className="min-h-32 bg-white p-2 border border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`font-medium text-sm ${
                      day.getMonth() === currentDate.getMonth() 
                        ? 'text-gray-800' 
                        : 'text-gray-400'
                    }`}>
                      {day.getDate()}
                    </span>
                    {dayEvents.length > 0 && (
                      <span className="text-xs font-medium text-white bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center">
                        {dayEvents.length}
                      </span>
                    )}
                  </div>
                  
                  {/* Events for this day */}
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map(event => (
                      <div 
                        key={event.id}
                        className={`${event.color} text-white text-xs p-2 rounded-lg truncate`}
                        title={event.title}
                      >
                        <div className="flex items-center gap-1">
                          {getEventIcon(event.type)}
                          <span className="truncate">{event.title}</span>
                        </div>
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-gray-500 text-center">
                        +{dayEvents.length - 2} de plus
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Événements à venir</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {events.map(event => (
              <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${event.color}`}>
                      {getEventIcon(event.type)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{event.title}</h3>
                      <p className="text-sm text-gray-500">
                        {event.date.toLocaleDateString('fr-FR', { 
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Users size={14} />
                    {event.animals} animaux
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Détails →
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

export default Calendar;