const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PreposeSchema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  age: { type: Number, required: true },
  sexe: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('Prepose', PreposeSchema);