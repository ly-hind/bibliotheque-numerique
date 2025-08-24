
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const clientRoutes = require('./Routes/MembreRoutes');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(cors());

// Connexion MongoDB puis démarrage serveur
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connecté à MongoDB Atlas');
    app.use('/clients', clientRoutes);
    app.listen(PORT, () => {
      console.log(`🚀 Service client sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erreur MongoDB:', err.message);
    process.exit(1);
  });
