import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RetourLivre() {
  const [reservations, setReservations] = useState([]);
  const [message, setMessage] = useState('');

  // Récupérer toutes les réservations confirmées
  useEffect(() => {
    axios.get('https://employe-oub4.onrender.com/reservations/confirmedReservations')
      .then(response => {
        setReservations(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des réservations confirmées', error);
      });
  }, []);

  // Fonction pour supprimer une réservation et rendre le livre disponible
  const handleDeleteReservation = async (id) => {
    try {
      await axios.delete(`https://employe-oub4.onrender.com/reservations/reservation/${id}`);
      setMessage('Réservation supprimée et livre disponible.');

      // Mettre à jour la liste des réservations après suppression
      setReservations(reservations.filter((reservation) => reservation._id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de la réservation', error);
      setMessage('Erreur lors de la suppression de la réservation.');
    }
  };

  return (
    <div className="reservation-container">
      <h2>Réservations Confirmées</h2>
      {message && <p>{message}</p>}
      {reservations.length > 0 ? (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation._id}>
              <p>Réservation ID: {reservation._id}</p>
              <p>Date de Retour: {new Date(reservation.dateDeRetour).toLocaleDateString()}</p>
              <button onClick={() => handleDeleteReservation(reservation._id)}>
                Supprimer la Réservation
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucune réservation confirmée pour le moment.</p>
      )}
    </div>
  );
}

export default RetourLivre;
