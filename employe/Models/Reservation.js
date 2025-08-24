const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
  idClient: { type: mongoose.Schema.Types.ObjectId, ref: 'Membre', required: true },
  idLivres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Livre', required: true }],
  confirmer: { type: Boolean, required: true, default: false },
  dateDeReservation: { type: Date, required: true, default: Date.now }, // Ajout de la date de réservation
  dateDeRetour: { type: Date, required: true } // Ajout de la date de retour
});

module.exports = mongoose.model('Reservation', ReservationSchema);
