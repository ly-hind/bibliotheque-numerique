import React, { useState } from 'react';
import axios from 'axios';

const DetectBook = () => {
  const [message, setMessage] = useState('');  // Message d'état pour informer l'utilisateur

  const handleLaunchPython = async () => {
    setMessage('Lancement de la détection...');
    try {
      // Envoyer une requête GET à l'API backend pour lancer le script Python
      const response = await axios.get('http://localhost:3001/launch-python');
      setMessage(response.data.message);  // Afficher le message reçu du backend
    } catch (error) {
      setMessage('Erreur lors du lancement de l\'application Python');
    }
  };

  return (
    <div className="detect-book-container">
      <h1>Détection de livre par code-barres</h1>
      <button onClick={handleLaunchPython} className="detect-button">
        Lancer la détection
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DetectBook;
