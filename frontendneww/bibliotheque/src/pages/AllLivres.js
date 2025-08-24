import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LivreList = () => {
  const [livres, setLivres] = useState([]);

  useEffect(() => {
    // Récupérer la liste des livres au chargement de la page
    axios.get('http://localhost:3001/livre/')
      .then(response => {
        setLivres(response.data);
      })
      .catch(error => {
        console.error("Il y a eu une erreur lors de la récupération des livres !", error);
      });
  }, []);

  return (
    <div className="livre-list-container">
      <h2 className="livre-list-title">Liste des Livres</h2>
      <ul className="livre-list">
        {livres.map((livre) => (
          <li key={livre._id} className="livre-item">
            <div className="livre-details">
              <h2 className="livre-nom">{livre.nom}</h2>
              <p className="livre-description">{livre.description}</p>
              <p className="livre-annee"><strong>Année:</strong> {livre.annee}</p>
              <p className="livre-type"><strong>Type:</strong> {livre.type}</p>
              <p className="livre-prix"><strong>Prix:</strong> {livre.prix} €</p>
            </div>
            <div className="livre-image">
              <img 
                src={`http://localhost:3001/${livre.img}`} 
                alt={livre.nom} 
                className="livre-img"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LivreList;
