import React, { useState } from 'react';
import axios from 'axios';

const CreateReservation = () => {
  const [nomClient, setNomClient] = useState('');
  const [nomLivres, setNomLivres] = useState('');
  const [dateDeRetour, setDateDeRetour] = useState(''); // Nouveau champ pour la date de retour
  const [idClient, setIdClient] = useState('');
  const [idLivres, setIdLivres] = useState([]);
  const [message, setMessage] = useState(''); // Message d'erreur ou de succès

  // Fonction pour récupérer l'ID du client par nom
  const fetchClientId = async () => {
    try {
      const response = await axios.get(`https://client-dseq.onrender.com/clients/byname/${nomClient}`);
      if (response.data && response.data._id) {
        setIdClient(response.data._id);
      } else {
        throw new Error("Client non trouvé");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'ID du client", error);
      setMessage("Inscrivez-vous d'abord pour pouvoir réserver un livre.");
      return false; // Indiquer qu'il y a une erreur
    }
    return true; // Pas d'erreur
  };

  // Fonction pour récupérer les ID des livres par noms
  const fetchLivresIds = async () => {
    try {
      const livresArray = nomLivres.split(',').map(livre => livre.trim());
      const response = await axios.post('https://employe-oub4.onrender.com/livre/getByNames', { noms: livresArray });

      if (response.data.length === 0) {
        throw new Error("Aucun livre trouvé");
      }

      const livresDejaReserves = response.data.filter(livre => livre.reserver);
      if (livresDejaReserves.length > 0) {
        setMessage(`Les livres suivants sont déjà réservés : ${livresDejaReserves.map(livre => livre.nom).join(', ')}`);
        return false; // Livres déjà réservés
      }

      setIdLivres(response.data.map(livre => livre._id));
    } catch (error) {
      console.error("Erreur lors de la récupération des ID des livres", error);
      setMessage("Erreur lors de la récupération des livres. Veuillez vérifier les noms.");
      return false; // Indiquer une erreur
    }
    return true; // Pas d'erreur
  };

  const handleReservation = async (e) => {
    e.preventDefault();

    // Vérifier que les champs ne sont pas vides
    if (!nomClient || !nomLivres || !dateDeRetour) {
      setMessage('Veuillez remplir tous les champs.');
      return;
    }

    // Récupérer l'ID du client et les ID des livres
    const clientValid = await fetchClientId();
    const livresValides = await fetchLivresIds();

    if (clientValid && livresValides) {
      // Créer la réservation si tout est valide
      const data = {
        idClient,
        idLivres,
        dateDeRetour, // Ajouter date de retour
      };

      axios.post('https://employe-oub4.onrender.com/reservations/create', data)
        .then(response => {
          setMessage('Réservation créée avec succès');
        })
        .catch(error => {
          console.error('Erreur lors de la création de la réservation', error);
          setMessage('Une erreur est survenue lors de la création de la réservation.');
        });
    }
  };

  return (
    <div className="form-container">
      <h2>Créer une Réservation</h2>
      <form onSubmit={handleReservation}>
        <div>
          <label>Nom du Client :</label>
          <input
            type="text"
            value={nomClient}
            onChange={(e) => setNomClient(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Noms des Livres (séparés par des virgules) :</label>
          <input
            type="text"
            value={nomLivres}
            onChange={(e) => setNomLivres(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date de Retour :</label>
          <input
            type="date"
            value={dateDeRetour}
            onChange={(e) => setDateDeRetour(e.target.value)}
            required
          />
        </div>
        <button type="submit">Créer Réservation</button>
      </form>
      {message && <p className="error-message">{message}</p>}
    </div>
  );
};

export default CreateReservation;
