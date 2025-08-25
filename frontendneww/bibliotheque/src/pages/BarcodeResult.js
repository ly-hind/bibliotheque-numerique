import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BarcodeResult = () => {
  const [barcodeName, setBarcodeName] = useState('');
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    // Requête à l'API pour récupérer le dernier code-barres trouvé
    axios.get('https://employe-oub4.onrender.com/api/get-latest-barcode')
      .then(response => {
        const foundBarcodeName = response.data.name;
        setBarcodeName(foundBarcodeName);

        // Requête supplémentaire pour obtenir les détails du livre correspondant
        return axios.get(`https://employe-oub4.onrender.com/api/livres/${foundBarcodeName}`);
      })
      .then(bookResponse => {
        setBookDetails(bookResponse.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des détails du livre', error);
      });
  }, []);

  return (
    <div>
      <h1>Résultat de la détection d'objet</h1>
      {barcodeName && <p>Nom du code-barres trouvé : {barcodeName}</p>}
      
      {bookDetails ? (
        <div>
          <h2>Détails du livre</h2>
          <p><strong>Nom :</strong> {bookDetails.nom}</p>
          <p><strong>Description :</strong> {bookDetails.description}</p>
          <p><strong>Année :</strong> {new Date(bookDetails.annee).getFullYear()}</p>
          <p><strong>Prix :</strong> {bookDetails.prix} €</p>
          <p><strong>Type :</strong> {bookDetails.type}</p>
          <img src={`https://employe-oub4.onrender.com/${bookDetails.img}`} alt={bookDetails.nom} />
        </div>
      ) : (
        <p>Aucun livre trouvé pour ce code-barres.</p>
      )}
    </div>
  );
};

export default BarcodeResult;
