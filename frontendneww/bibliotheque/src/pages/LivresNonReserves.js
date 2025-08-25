import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LivresNonReserves = () => {
  const [livres, setLivres] = useState([]);

  useEffect(() => {
    // Récupérer la liste des livres réservés au chargement de la page
    axios.get('https://employe-oub4.onrender.com/livre/nonreserved') // Modification pour obtenir les livres réservés
      .then(response => {
        setLivres(response.data); // Met à jour l'état avec les livres réservés
      })
      .catch(error => {
        console.error("Il y a eu une erreur lors de la récupération des livres non réservés !", error);
      });
  }, []);

  return (
    <div>
      <h1>Livres Non Réservés</h1> {/* Titre reflétant les livres réservés */}
      <ul>
        {livres.map((livre) => (
          <li key={livre._id}>
            <h2>{livre.nom}</h2>
            <p>{livre.description}</p>
            <p>Année: {livre.annee}</p>
            <p>Type: {livre.type}</p>
            <p>Prix: {livre.prix} €</p>
            <img src={`https://employe-oub4.onrender.com/${livre.img}`} alt={livre.nom} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LivresNonReserves;
