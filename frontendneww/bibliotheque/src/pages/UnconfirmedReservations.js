import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UnconfirmedReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Récupérer la liste des réservations non confirmées
    axios.get('http://localhost:3001/reservations/unconfirmed')
      .then(response => {
        setReservations(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des réservations non confirmées !", error);
      });
  }, []);

  // Fonction pour basculer le statut de confirmation d'une réservation
  const toggleConfirmation = (id) => {
    axios.put(`http://localhost:3001/reservations/toggleConfirmation/${id}`)
      .then(response => {
        // Mise à jour locale de l'état des réservations
        setReservations(reservations.map(reservation => 
          reservation._id === id ? { ...reservation, confirmer: !reservation.confirmer } : reservation
        ));
        alert('Le statut de confirmation a été mis à jour.');
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour du statut de confirmation !', error);
      });
  };

  // Fonction pour basculer le statut "reserver" et "disponible" du livre
  const toggleLivreReservation = (livreId) => {
    axios.put(`http://localhost:3001/livre/${livreId}/toggleReservation`)
      .then(response => {
        alert('Le statut du livre a été mis à jour.');
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour du statut du livre !', error);
      });
  };

  return (
    <div className="reservations-container">
      <h1>Réservations Non Confirmées</h1>
      <ul className="reservations-list">
        {reservations.map((reservation) => (
          <li key={reservation._id} className="reservation-item">
            <h2>Réservation {reservation._id}</h2>
            <p>ID Client : {reservation.idClient}</p>
            <p>ID Livres : {reservation.idLivres.join(', ')}</p>
            <p>Statut : {reservation.confirmer ? 'Confirmée' : 'Non Confirmée'}</p>

            {/* Bouton pour basculer le statut de confirmation */}
            {!reservation.confirmer && (
              <button onClick={() => toggleConfirmation(reservation._id)} className="confirm-button">
                Confirmer Réservation
              </button>
            )}

            {/* Bouton pour basculer le statut "reserver" et "disponible" du livre */}
            <button onClick={() => toggleLivreReservation(reservation.idLivres[0])} className="confirm-button">
              Mettre à jour statut du livre
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UnconfirmedReservations;
