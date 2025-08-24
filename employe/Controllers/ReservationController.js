const Reservation = require('../Models/Reservation');
const Livre = require('../Models/Livre');


exports.toggleConfirmation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Réservation non trouvée' });

    reservation.confirmer = !reservation.confirmer;

    await reservation.save();

    res.status(200).json({ message: `Le statut de confirmation a été mis à jour : ${reservation.confirmer ? 'confirmée' : 'non confirmée'}`, reservation });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du statut de confirmation. Veuillez réessayer plus tard.' });
  }
};

exports.createReservation = async (req, res) => {
  try {
    const { idClient, idLivres, dateDeRetour } = req.body; // Ajouter dateDeRetour depuis la requête

    const newReservation = new Reservation({
      idClient,
      idLivres,
      confirmer: false, 
      dateDeReservation: new Date(), 
      dateDeRetour, 
    });

    await newReservation.save();

    await Livre.updateMany(
      { _id: { $in: idLivres } },  
      { $set: { reserver: true } }
    );

    res.status(201).json({ message: 'Réservation créée et livres réservés avec succès', reservation: newReservation });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la réservation. Veuillez réessayer plus tard.' });
  }
};


  exports.getUnconfirmedReservations = async (req, res) => {
    try {
      const reservations = await Reservation.find({ confirmer: false });
      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des réservations non confirmées.' });
    }
  };
  
  exports.getConfirmedReservations = async (req, res) => {
    try {
      // Récupérer uniquement les réservations confirmées
      const confirmedReservations = await Reservation.find({ confirmer: true });
      
      // Retourner uniquement les données des réservations confirmées sans les détails clients et livres
      res.status(200).json(confirmedReservations);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des réservations confirmées.' });
    }
  };
  
 
  
// Supprimer une réservation et rendre les livres disponibles
exports.deleteReservation = async (req, res) => {
  try {
    // Trouver la réservation par ID
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Réservation non trouvée' });

    // Rendre les livres disponibles et non réservés
    await Livre.updateMany(
      { _id: { $in: reservation.idLivres } },
      { $set: { disponible: true, reserver: false } }
    );

    // Supprimer la réservation
    await Reservation.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Réservation supprimée et livres disponibles' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la réservation.' });
  }
};
  