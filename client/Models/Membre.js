const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MembreSchema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  age: { type: Number, required: true },
  sexe: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  solde: { type: Number, required: true, default: 0 }, // Solde par défaut à 0
  facture: { type: Number, required: true, default: 0 } // Facture par défaut à 0
});

module.exports = mongoose.model('Membre', MembreSchema);
