import React, { useState } from 'react';
import axios from 'axios';

function AddLivre() {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [annee, setAnnee] = useState('');
  const [type, setType] = useState('');
  const [imageFile, setImageFile] = useState(null); 
  const [codebarreFile, setCodebarreFile] = useState(null);  // Nouveau champ pour l'image du code-barres
  const [prix, setPrix] = useState('');
  const [reserver, setReserver] = useState(false);
  const [disponible, setDisponible] = useState(true);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('description', description);
    formData.append('annee', annee);
    formData.append('type', type);
    formData.append('image', imageFile);  // Image du livre
    formData.append('codebarreImage', codebarreFile);  // Image du code-barres
    formData.append('prix', prix);
    formData.append('reserver', reserver);
    formData.append('disponible', disponible);

    try {
      const response = await axios.post('http://localhost:3001/livre/ajout', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Livre ajouté avec succès !');
    } catch (error) {
      setMessage("Une erreur est survenue lors de l'ajout du livre.");
    }
  };

  return (
    <div className="form-container">
      <h2>Ajouter un Livre</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Nom:</label>
          <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Année:</label>
          <input type="date" value={annee} onChange={(e) => setAnnee(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="">Sélectionner un type</option>
            <option value="Roman">Roman</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Essai">Essai</option>
            <option value="Biographie">Biographie</option>
            <option value="Fantaisie">Fantaisie</option>
          </select>
        </div>
        <div className="form-group">
          <label>Image du livre :</label>
          <input type="file" onChange={(e) => setImageFile(e.target.files[0])} required />
        </div>
        <div className="form-group">
          <label>Image du code-barres :</label>  {/* Nouveau champ pour le code-barres */}
          <input type="file" onChange={(e) => setCodebarreFile(e.target.files[0])} required />
        </div>
        <div className="form-group">
          <label>Prix:</label>
          <input type="number" value={prix} onChange={(e) => setPrix(e.target.value)} required step="0.01" min="0" />
        </div>
        <div className="form-group">
          <label>Réservé:</label>
          <input type="checkbox" checked={reserver} onChange={(e) => setReserver(e.target.checked)} />
        </div>
        <div className="form-group">
          <label>Disponible:</label>
          <input type="checkbox" checked={disponible} onChange={(e) => setDisponible(e.target.checked)} />
        </div>
        <button type="submit">Ajouter le Livre</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddLivre;
