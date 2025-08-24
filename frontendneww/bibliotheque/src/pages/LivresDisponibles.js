// components/LivresDisponibles.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LivresDisponibles = () => {
  const [livres, setLivres] = useState([]);

  useEffect(() => {
    // Récupérer la liste des livres disponibles au chargement de la page
    axios.get('http://localhost:3001/livre/disponible')
      .then(response => {
        setLivres(response.data);
      })
      .catch(error => {
        console.error("Il y a eu une erreur lors de la récupération des livres disponibles !", error);
      });
  }, []);

  return (
    <div>
      <h1>Livres Disponibles</h1>
      <ul>
        {livres.map((livre) => (
          <li key={livre._id}>
            <h2>{livre.nom}</h2>
            <p>{livre.description}</p>
            <p>Année: {livre.annee}</p>
            <p>Type: {livre.type}</p>
            <p>Prix: {livre.prix} €</p>
            <img src={`http://localhost:3001/${livre.img}`} alt={livre.nom} />  

          </li>
        ))}
      </ul>
    </div>
  );
};

export default LivresDisponibles;
