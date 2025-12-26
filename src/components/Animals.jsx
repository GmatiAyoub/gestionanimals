import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Users, Heart, Tag } from 'lucide-react';

const Animals = () => {
  const [animals, setAnimals] = useState([
    { id: 1, name: 'Bella', type: 'Vache', breed: 'Holstein', age: '4 ans', status: 'Santé excellente', pregnant: true, tag: '#VA001' },
    { id: 2, name: 'Mouton', type: 'Mouton', breed: 'Texel', age: '2 ans', status: 'Sous traitement', pregnant: false, tag: '#MO045' },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editAnimal, setEditAnimal] = useState(null);
  const [formData, setFormData] = useState({ name: '', type: '', breed: '', age: '', status: '', pregnant: false, tag: '' });

  // Ajouter ou mettre à jour
  const handleSave = () => {
    if (editAnimal) {
      // Update
      setAnimals(prev => prev.map(a => a.id === editAnimal.id ? { ...formData, id: editAnimal.id } : a));
    } else {
      // Create
      setAnimals(prev => [...prev, { ...formData, id: Date.now() }]);
    }
    setModalOpen(false);
    setFormData({ name: '', type: '', breed: '', age: '', status: '', pregnant: false, tag: '' });
    setEditAnimal(null);
  };

  // Supprimer
  const handleDelete = (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cet animal ?')) {
      setAnimals(prev => prev.filter(a => a.id !== id));
    }
  };

  // Edit
  const handleEdit = (animal) => {
    setEditAnimal(animal);
    setFormData(animal);
    setModalOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des Animaux</h1>
      <button
        onClick={() => setModalOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-red-500  rounded-lg mb-4"
      >
        <Plus size={16} /> Ajouter un animal
      </button>

      {/* Table */}
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left">Nom</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Âge</th>
            <th className="p-3 text-left">Statut</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {animals.map(animal => (
            <tr key={animal.id} className="border-t border-gray-100">
              <td className="p-3">{animal.name}</td>
              <td className="p-3">{animal.type}</td>
              <td className="p-3">{animal.age}</td>
              <td className="p-3">{animal.status}</td>
              <td className="p-3 flex gap-2">
                <button onClick={() => handleEdit(animal)} className="text-green-600"><Edit size={16} /></button>
                <button onClick={() => handleDelete(animal.id)} className="text-red-600"><Trash2 size={16} /></button>
                <button className="text-blue-600"><Eye size={16} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Add/Edit */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">{editAnimal ? 'Éditer Animal' : 'Ajouter Animal'}</h2>
            <div className="flex flex-col gap-2">
              <input type="text" placeholder="Nom" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="border p-2 rounded" />
              <input type="text" placeholder="Type" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} className="border p-2 rounded" />
              <input type="text" placeholder="Race" value={formData.breed} onChange={e => setFormData({ ...formData, breed: e.target.value })} className="border p-2 rounded" />
              <input type="text" placeholder="Âge" value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })} className="border p-2 rounded" />
              <input type="text" placeholder="Statut" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="border p-2 rounded" />
              <input type="text" placeholder="Tag" value={formData.tag} onChange={e => setFormData({ ...formData, tag: e.target.value })} className="border p-2 rounded" />
              <label className="flex items-center gap-2 mt-2">
                <input type="checkbox" checked={formData.pregnant} onChange={e => setFormData({ ...formData, pregnant: e.target.checked })} />
                En gestation
              </label>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded">Annuler</button>
              <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">{editAnimal ? 'Mettre à jour' : 'Ajouter'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Animals;
