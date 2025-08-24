import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UnavailableLivres() {
  const [livres, setLivres] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchLivres = async () => {
      try {
        const response = await axios.get('http://localhost:3001/livre/indisponible');
        setLivres(response.data);
      } catch (error) {
        setMessage('Une erreur est survenue lors de la récupération des livres.');
      }
    };

    fetchLivres();
  }, []);

  return (
    <div className="livres-container">
      <h2>Livres Indisponibles</h2>
      {message && <p className="error-message">{message}</p>}
      <ul className="livres-list">
        {livres.length > 0 ? (
          livres.map((livre) => (
            <li key={livre._id} className="livre-item">
              <h3>{livre.nom}</h3>
              <p>{livre.description}</p>
              <p><strong>Année :</strong> {livre.annee}</p>
              <p><strong>Type :</strong> {livre.type}</p>
              <p><strong>Prix :</strong> {livre.prix} €</p>
              <p><strong>Réservé :</strong> {livre.reserver ? 'Oui' : 'Non'}</p>
              <p><strong>Disponible :</strong> {livre.disponible ? 'Oui' : 'Non'}</p>
              <img src={`http://localhost:3001/${livre.img}`} alt={livre.nom} className="livre-image" />
            </li>
          ))
        ) : (
          <p>Aucun livre indisponible pour le moment.</p>
        )}
      </ul>
    </div>
  );
}

export default UnavailableLivres;
