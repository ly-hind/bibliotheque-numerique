import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LivresReserves = () => {
  const [livres, setLivres] = useState([]);

  useEffect(() => {
    // Récupérer la liste des livres réservés au chargement de la page
    axios.get('https://employe-oub4.onrender.com/livre/reserved') // API pour obtenir les livres réservés
      .then(response => {
        setLivres(response.data); // Met à jour l'état avec les livres réservés
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des livres réservés !", error);
      });
  }, []);

  // Fonction pour confirmer la réservation et mettre à jour le statut 'disponible' en false
  const confirmerReservation = (id) => {
    axios.put(`https://employe-oub4.onrender.com/livre/${id}/confirmer`) // API pour confirmer la réservation
      .then(response => {
        // Mise à jour locale de l'état des livres
        setLivres(livres.map(livre => 
          livre._id === id ? { ...livre, disponible: false } : livre
        ));
        alert('La réservation a été confirmée.');
      })
      .catch(error => {
        console.error('Erreur lors de la confirmation de la réservation !', error);
      });
  };

  const ajouterFacture = (idLivre) => {
    axios.post(`https://client-dseq.onrender.com/clients/${idLivre}/ajouterFacture`)
      .then(response => {
        alert('Facture ajoutée avec succès.');
      })
      .catch(error => {
        console.error("Erreur lors de l'ajout de la facture", error);
      });
  };

  const isDateRetourPasse = (dateDeRetour) => {
    const today = new Date();
    const dateRetour = new Date(dateDeRetour);
    return today > dateRetour; // True si la date de retour est passée
  };

  return (
    <div>
      <h1>Livres Réservés</h1> {/* Titre reflétant les livres réservés */}
      <ul>
        {livres.map((livre) => (
          <li key={livre._id}>
            <h2>{livre.nom}</h2>
            <p>{livre.description}</p>
            <p>Année: {livre.annee}</p>
            <p>Type: {livre.type}</p>
            <p>Prix: {livre.prix} €</p>
            <img src={`https://employe-oub4.onrender.com/${livre.img}`} alt={livre.nom} />
            <p>Date de retour : {new Date(livre.dateDeRetour).toLocaleDateString()}</p>
            
            {/* Bouton "Confirmer" qui change la disponibilité du livre */}
            {livre.disponible && (
              <button onClick={() => confirmerReservation(livre._id)}>Confirmer</button>
            )}

            {/* Vérification si la date de retour est dépassée, afficher le bouton "Ajouter Facture" */}
            {isDateRetourPasse(livre.dateDeRetour) && (
              <button onClick={() => ajouterFacture(livre._id)}>Ajouter Facture</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LivresReserves;
