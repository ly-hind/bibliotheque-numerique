const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Membre = require('../Models/Membre');
const Reservation = require('../../employe/Models/Reservation'); // Assure-toi que le modèle Reservation est importé


const JWT_SECRET = 'votre_clé_secrète'; 



exports.ajouterFacture = async (req, res) => {
  try {
    const { idLivre } = req.params;

    // Trouver la réservation correspondante à ce livre
    const reservation = await Reservation.findOne({ idLivres: idLivre }).populate('idClient');

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée pour ce livre." });
    }

    const clientId = reservation.idClient._id;

    const client = await Membre.findById(clientId);

    if (!client) {
      return res.status(404).json({ message: "Client non trouvé." });
    }

    client.solde += 20;
    client.facture += 20;

    await client.save();

    res.status(200).json({ message: 'Facture et solde mis à jour avec succès', client });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la facture et du solde', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la facture et du solde. Veuillez réessayer plus tard.' });
  }
};

exports.registerMembre = async (req, res) => {
  try {
    const { nom, prenom, age, sexe, email, password } = req.body;

    // Hashage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newMembre = new Membre({ nom, prenom, age, sexe, email, password: hashedPassword });
    await newMembre.save();

    res.status(201).json({ message: 'Membre inscrit avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
  }
};

exports.loginMembre = async (req, res) => {
  try {
    const { email, password } = req.body;
    const membre = await Membre.findOne({ email });
    if (!membre) return res.status(404).send('Membre non trouvé');

    const validPassword = await bcrypt.compare(password, membre.password);
    if (!validPassword) return res.status(400).send('Mot de passe incorrect');

    res.status(200).json({ id: membre._id });
  } catch (error) {
    res.status(500).send('Erreur du serveur');
  }
};

exports.getClientById = async (req, res) => {
  try {
    const client = await Membre.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }
    res.status(200).json(client);
  } catch (error) {
    console.error('Erreur lors de la récupération des informations du client :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des informations du client.' });
  }
};