const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LivreSchema = new Schema({
  nom: { type: String, required: true },
  description: { type: String, required: true },
  annee: { type: Date, required: true },
  type: { type: String, required: true },
  img: { type: String, required: false },
  prix: { type: Number, required: true },
  reserver: { type: Boolean, required: true },
  disponible: { type: Boolean, required: true },
  codebarre: { type: String, required: false }  // Ajout de l'attribut pour stocker l'image du code-barres
});

module.exports = mongoose.model('Livre', LivreSchema);
