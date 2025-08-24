// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { spawn } = require('child_process'); // Ajout pour gérer l'exécution du script Python (si besoin)
const path = require('path');
const cors = require('cors');

const BibliothequaireRoutes = require('./Routes/BibliothequaireRoutes');
const ComptableRoutes = require('./Routes/ComptableRoutes');
const GerantRoutes = require('./Routes/GerantRoutes');
const PreposeRoutes = require('./Routes/PreposeRoutes');
const LivreRoutes = require('./Routes/LivreRoutes');
const ReservationRoutes = require('./Routes/ReservationRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors()); // Autoriser toutes les origines

// Servir les fichiers statiques pour les images uploadées
app.use('/uploads', express.static('uploads'));

// Variables pour le scanner code-barres
let lastBarcode = '';

// Routes scanner code-barres
app.post('/api/barcode-found', (req, res) => {
  const { name } = req.body;
  lastBarcode = name;
  res.status(200).json({ message: 'Nom reçu avec succès', name });
});

app.get('/api/get-latest-barcode', (req, res) => {
  if (!lastBarcode) return res.status(404).json({ message: 'Aucun code-barres trouvé' });
  res.status(200).json({ name: lastBarcode });
});

// Connexion MongoDB puis démarrage du serveur
mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connecté à MongoDB Atlas');

    // Déclaration des routes après connexion
    app.use('/bibliothequaire', BibliothequaireRoutes);
    app.use('/comptable', ComptableRoutes);
    app.use('/gerant', GerantRoutes);
    app.use('/prepose', PreposeRoutes);
    app.use('/livre', LivreRoutes);
    app.use('/reservations', ReservationRoutes);

    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erreur MongoDB :', err.message);
    process.exit(1);
  });
