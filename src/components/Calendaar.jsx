import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, ChevronLeft, ChevronRight, 
  Plus, Filter, Users, Syringe, Heart, Edit, Trash2,
  X, Save, AlertCircle, CheckCircle, Clock, Grid, List, Eye
} from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    type: 'vaccination',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    animals: 1,
    description: '',
    color: 'bg-blue-500'
  });
  const [viewMode, setViewMode] = useState('month');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterType, setFilterType] = useState('all');

  // Données initiales pour démonstration
  const initialEvents = [
    {
      id: 1,
      title: 'Vaccination vaches',
      type: 'vaccination',
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      time: '09:00',
      animals: 15,
      description: 'Vaccination contre la fièvre aphteuse',
      color: 'bg-blue-500',
      status: 'planned'
    },
    {
      id: 2,
      title: 'Contrôle gestation brebis',
      type: 'health',
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      time: '14:00',
      animals: 8,
      description: 'Échographie de gestation',
      color: 'bg-purple-500',
      status: 'planned'
    },
    {
      id: 3,
      title: 'Naissance prévue',
      type: 'birth',
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
      time: '10:00',
      animals: 3,
      description: 'Mise bas de vaches',
      color: 'bg-pink-500',
      status: 'planned'
    },
    {
      id: 4,
      title: 'Visite vétérinaire',
      type: 'treatment',
      date: new Date(new Date().setDate(new Date().getDate() + 5)),
      time: '11:00',
      animals: 1,
      description: 'Contrôle général',
      color: 'bg-orange-500',
      status: 'planned'
    },
    {
      id: 5,
      title: 'Pesée des agneaux',
      type: 'health',
      date: new Date(new Date().setDate(new Date().getDate() - 2)),
      time: '08:30',
      animals: 12,
      description: 'Suivi de croissance',
      color: 'bg-green-500',
      status: 'completed'
    }
  ];

  useEffect(() => {
    setEvents(initialEvents);
  }, []);

  // Gestion des vues
  const handleNext = () => {
    if (viewMode === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    } else if (viewMode === 'week') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7));
    } else if (viewMode === 'day') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1));
    }
  };

  const handlePrevious = () => {
    if (viewMode === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    } else if (viewMode === 'week') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7));
    } else if (viewMode === 'day') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1));
    }
  };

  // Gestion des événements
  const handleAddEvent = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      type: 'vaccination',
      date: currentDate.toISOString().split('T')[0],
      time: '09:00',
      animals: 1,
      description: '',
      color: 'bg-blue-500'
    });
    setShowModal(true);
  };

  const handleSaveEvent = () => {
    if (editingEvent) {
      setEvents(prev => prev.map(event => 
        event.id === editingEvent.id 
          ? { 
              ...formData, 
              id: editingEvent.id,
              date: new Date(formData.date + 'T' + formData.time),
              status: formData.status || 'planned'
            }
          : event
      ));
    } else {
      const newEvent = {
        id: Date.now(),
        ...formData,
        date: new Date(formData.date + 'T' + formData.time),
        status: 'planned'
      };
      setEvents(prev => [...prev, newEvent]);
    }
    setShowModal(false);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    const eventDate = new Date(event.date);
    setFormData({
      title: event.title,
      type: event.type,
      date: eventDate.toISOString().split('T')[0],
      time: eventDate.toTimeString().slice(0, 5),
      animals: event.animals,
      description: event.description || '',
      color: event.color,
      status: event.status
    });
    setShowModal(true);
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cet événement ?')) {
      setEvents(prev => prev.filter(event => event.id !== id));
    }
  };

  const handleCompleteEvent = (id) => {
    setEvents(prev => prev.map(event => 
      event.id === id 
        ? { ...event, status: 'completed' }
        : event
    ));
  };

  // Helper functions
  const getEventIcon = (type) => {
    switch(type) {
      case 'vaccination': return <Syringe size={16} />;
      case 'health': return <Users size={16} />;
      case 'birth': return <Heart size={16} />;
      case 'treatment': return <AlertCircle size={16} />;
      default: return <CalendarIcon size={16} />;
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle className="text-green-500" size={16} />;
      case 'cancelled': return <X className="text-red-500" size={16} />;
      case 'urgent': return <AlertCircle className="text-orange-500" size={16} />;
      default: return <Clock className="text-blue-500" size={16} />;
    }
  };

  const getEventColor = (type) => {
    switch(type) {
      case 'vaccination': return 'bg-blue-500';
      case 'health': return 'bg-green-500';
      case 'birth': return 'bg-pink-500';
      case 'treatment': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  // Filtrage des événements
  const filteredEvents = events.filter(event => {
    if (filterType === 'all') return true;
    if (filterType === 'upcoming') return new Date(event.date) >= new Date();
    if (filterType === 'past') return new Date(event.date) < new Date();
    return event.type === filterType;
  });

  // Vue Mois
  const renderMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    for (let i = 0; i < firstDay.getDay(); i++) {
      const day = new Date(year, month, -i);
      days.unshift(day);
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }
    
    return (
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
          <div key={day} className="bg-gray-50 p-4 text-center">
            <span className="font-semibold text-gray-700">{day}</span>
          </div>
        ))}
        
        {days.map((day, index) => {
          const isCurrentMonth = day.getMonth() === month;
          const dayEvents = filteredEvents.filter(event => 
            event.date.getDate() === day.getDate() &&
            event.date.getMonth() === day.getMonth() &&
            event.date.getFullYear() === day.getFullYear()
          );
          
          return (
            <div 
              key={index} 
              className={`min-h-32 p-2 border border-gray-100 hover:bg-gray-50 transition-colors ${!isCurrentMonth ? 'bg-gray-50' : 'bg-white'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`font-medium text-sm ${isCurrentMonth ? 'text-gray-800' : 'text-gray-400'}`}>
                  {day.getDate()}
                </span>
                {dayEvents.length > 0 && (
                  <span className="text-xs font-medium text-white bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center">
                    {dayEvents.length}
                  </span>
                )}
              </div>
              
              <div className="space-y-1">
                {dayEvents.slice(0, 2).map(event => (
                  <div 
                    key={event.id}
                    className={`${event.color} text-white text-xs p-2 rounded-lg truncate cursor-pointer hover:opacity-90 transition-opacity`}
                    title={event.title}
                    onClick={() => handleEditEvent(event)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {getEventIcon(event.type)}
                        <span className="truncate">{event.title}</span>
                      </div>
                      {getStatusIcon(event.status)}
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
    );
  };

  // Vue Semaine
  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);
    
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return day;
    });

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-7 gap-4 mb-4">
          {weekDays.map((day, index) => {
            const isToday = day.toDateString() === new Date().toDateString();
            const dayEvents = filteredEvents.filter(event => 
              event.date.getDate() === day.getDate() &&
              event.date.getMonth() === day.getMonth() &&
              event.date.getFullYear() === day.getFullYear()
            );

            return (
              <div key={index} className="text-center">
                <div className={`font-medium text-sm ${isToday ? 'text-blue-600' : 'text-gray-600'}`}>
                  {day.toLocaleDateString('fr-FR', { weekday: 'short' })}
                </div>
                <div className={`text-lg font-bold mt-1 ${isToday ? 'bg-blue-500 text-white' : 'text-gray-800'} w-8 h-8 rounded-full flex items-center justify-center mx-auto`}>
                  {day.getDate()}
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {dayEvents.length} événement{dayEvents.length !== 1 ? 's' : ''}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="space-y-4">
            {weekDays.map((day, dayIndex) => {
              const dayEvents = filteredEvents.filter(event => 
                event.date.getDate() === day.getDate() &&
                event.date.getMonth() === day.getMonth() &&
                event.date.getFullYear() === day.getFullYear()
              ).sort((a, b) => new Date(a.date) - new Date(b.date));

              if (dayEvents.length === 0) return null;

              return (
                <div key={dayIndex} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <h3 className="font-medium text-gray-800 mb-2">
                    {day.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </h3>
                  <div className="space-y-2">
                    {dayEvents.map(event => (
                      <div 
                        key={event.id}
                        className={`${event.color} text-white rounded-lg p-3 cursor-pointer hover:opacity-90 transition-opacity`}
                        onClick={() => handleEditEvent(event)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getEventIcon(event.type)}
                            <span className="font-medium">{event.title}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm opacity-90">
                              {new Date(event.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {getStatusIcon(event.status)}
                          </div>
                        </div>
                        {event.description && (
                          <p className="text-sm opacity-90 mt-1">{event.description}</p>
                        )}
                        <div className="flex items-center gap-2 mt-2 text-sm opacity-90">
                          <Users size={14} />
                          {event.animals} animaux
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Vue Jour
  const renderDayView = () => {
    const dayEvents = filteredEvents.filter(event => 
      event.date.getDate() === currentDate.getDate() &&
      event.date.getMonth() === currentDate.getMonth() &&
      event.date.getFullYear() === currentDate.getFullYear()
    ).sort((a, b) => new Date(a.date) - new Date(b.date));

    const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8h à 19h

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            {currentDate.toLocaleDateString('fr-FR', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long',
              year: 'numeric' 
            })}
          </h2>
          
          <div className="space-y-4">
            {dayEvents.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <CalendarIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Aucun événement prévu pour aujourd'hui</p>
              </div>
            ) : (
              dayEvents.map(event => (
                <div 
                  key={event.id}
                  className={`${event.color} text-white rounded-lg p-4 cursor-pointer hover:opacity-90 transition-opacity`}
                  onClick={() => handleEditEvent(event)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 p-2 rounded-lg">
                        {getEventIcon(event.type)}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{event.title}</h3>
                        <p className="opacity-90">{event.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {new Date(event.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {getStatusIcon(event.status)}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-sm opacity-90">
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      {event.animals} animaux
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      Durée: 1h
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-bold text-gray-800 mb-4">Emploi du temps</h3>
          <div className="space-y-2">
            {hours.map(hour => {
              const hourEvents = dayEvents.filter(event => 
                new Date(event.date).getHours() === hour
              );

              return (
                <div key={hour} className="flex border-b border-gray-100 pb-2 last:border-0">
                  <div className="w-16 text-gray-500 text-sm pt-2">
                    {hour}:00
                  </div>
                  <div className="flex-1">
                    {hourEvents.map(event => (
                      <div 
                        key={event.id}
                        className={`${event.color} text-white rounded-lg p-3 mb-2 cursor-pointer hover:opacity-90 transition-opacity`}
                        onClick={() => handleEditEvent(event)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{event.title}</span>
                          <span className="text-sm opacity-90">
                            {new Date(event.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderEventsList = () => {
    const allEvents = [...filteredEvents].sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Date & Heure</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Événement</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Type</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Animaux</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Statut</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allEvents.map(event => (
                <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-800">
                        {event.date.toLocaleDateString('fr-FR')}
                      </div>
                      <div className="text-sm text-gray-500">
                        {event.date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${event.color}`}>
                        {getEventIcon(event.type)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{event.title}</div>
                        {event.description && (
                          <div className="text-sm text-gray-500 truncate max-w-xs">{event.description}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="capitalize">{event.type}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <Users size={16} className="text-gray-400" />
                      <span>{event.animals}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      event.status === 'completed' ? 'bg-green-100 text-green-800' :
                      event.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      event.status === 'urgent' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {event.status === 'completed' ? 'Terminé' :
                       event.status === 'cancelled' ? 'Annulé' :
                       event.status === 'urgent' ? 'Urgent' : 'Planifié'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEditEvent(event)}
                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit size={18} className="text-gray-600" />
                      </button>
                      <button 
                        onClick={() => handleDeleteEvent(event.id)}
                        className="p-1 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                      {event.status !== 'completed' && (
                        <button 
                          onClick={() => handleCompleteEvent(event.id)}
                          className="px-3 py-1 bg-green-50 text-green-600 text-sm font-medium rounded-lg hover:bg-green-100 transition-colors"
                        >
                          Terminer
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
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
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="all">Tous les événements</option>
                  <option value="upcoming">À venir</option>
                  <option value="past">Passés</option>
                  <option value="vaccination">Vaccinations</option>
                  <option value="health">Santé</option>
                  <option value="birth">Naissances</option>
                  <option value="treatment">Traitements</option>
                </select>
              </div>
              <button 
                onClick={handleAddEvent}
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Plus size={20} />
                Nouvel événement
              </button>
            </div>
          </div>

          {/* Calendar Navigation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={handlePrevious}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <h2 className="text-xl font-bold text-gray-800">
                  {viewMode === 'month' && currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                  {viewMode === 'week' && `Semaine du ${new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}`}
                  {viewMode === 'day' && currentDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </h2>
                <button 
                  onClick={handleNext}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setViewMode('month')}
                  className={`px-4 py-2 font-medium rounded-lg flex items-center gap-2 ${viewMode === 'month' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid size={18} />
                  Mois
                </button>
                <button 
                  onClick={() => setViewMode('week')}
                  className={`px-4 py-2 font-medium rounded-lg flex items-center gap-2 ${viewMode === 'week' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <List size={18} />
                  Semaine
                </button>
                <button 
                  onClick={() => setViewMode('day')}
                  className={`px-4 py-2 font-medium rounded-lg flex items-center gap-2 ${viewMode === 'day' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <Eye size={18} />
                  Jour
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Content based on view mode */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-4">
          {viewMode === 'month' && renderMonthView()}
          {viewMode === 'week' && renderWeekView()}
          {viewMode === 'day' && renderDayView()}
        </div>

        {/* Events List */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Tous les événements</h2>
            <span className="text-sm text-gray-500">
              {filteredEvents.length} événement{filteredEvents.length !== 1 ? 's' : ''}
            </span>
          </div>
          {renderEventsList()}
        </div>

        {/* Modal pour ajouter/éditer un événement */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    {editingEvent ? 'Éditer l\'événement' : 'Nouvel événement'}
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
                      Titre
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: Vaccination vaches"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="vaccination">Vaccination</option>
                        <option value="health">Contrôle santé</option>
                        <option value="birth">Naissance</option>
                        <option value="treatment">Traitement</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Couleur
                      </label>
                      <select
                        name="color"
                        value={formData.color}
                        onChange={(e) => setFormData({...formData, color: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="bg-blue-500">Bleu</option>
                        <option value="bg-green-500">Vert</option>
                        <option value="bg-purple-500">Violet</option>
                        <option value="bg-pink-500">Rose</option>
                        <option value="bg-orange-500">Orange</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Heure
                      </label>
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre d'animaux
                    </label>
                    <input
                      type="number"
                      name="animals"
                      value={formData.animals}
                      onChange={(e) => setFormData({...formData, animals: parseInt(e.target.value)})}
                      min="1"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows="3"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Notes supplémentaires..."
                    />
                  </div>

                  {editingEvent && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Statut
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="planned">Planifié</option>
                        <option value="completed">Terminé</option>
                        <option value="cancelled">Annulé</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleSaveEvent}
                    className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                  >
                    <Save size={18} />
                    {editingEvent ? 'Mettre à jour' : 'Créer'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;