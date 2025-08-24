const Livre = require('../Models/Livre'); 
const path = require('path');

exports.addLivre = async (req, res) => {
  try {
    const { nom, description, annee, type, prix, reserver, disponible } = req.body;

    // Récupérer les chemins des images du livre et du code-barres
    const imagePath = req.files && req.files['image'] ? req.files['image'][0].path : null;
    const codebarrePath = req.files && req.files['codebarreImage'] ? req.files['codebarreImage'][0].path : null;

    const newLivre = new Livre({
      nom,
      description,
      annee,
      type,
      img: imagePath,  // Chemin de l'image du livre
      codebarre: codebarrePath,  // Chemin de l'image du code-barres
      prix,
      reserver,
      disponible: disponible || true
    });

    await newLivre.save();
    res.status(201).json({ message: 'Livre ajouté avec succès', livre: newLivre });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout du livre. Veuillez réessayer plus tard.' });
  }
};

exports.getLivreById = async (req, res) => {
    try {
      const livre = await Livre.findById(req.params.id);
      if (!livre) return res.status(404).json({ message: 'Livre non trouvé' });
  
      res.status(200).json(livre);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération du livre. Veuillez réessayer plus tard.' });
    }
  };

  exports.toggleReservation = async (req, res) => {
    try {
        const livre = await Livre.findById(req.params.id);
        if (!livre) return res.status(404).json({ message: 'Livre non trouvé' });

        // Bascule les statuts de réservation et de disponibilité
        livre.reserver = true;
        livre.disponible = false;

        await livre.save();

        res.status(200).json({ message: `Le statut du livre a été mis à jour : ${livre.reserver ? 'réservé' : 'non réservé'}, ${livre.disponible ? 'disponible' : 'non disponible'}`, livre });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du statut du livre.' });
    }
};

  
  exports.toggleDisponibilite = async (req, res) => {
    try {
      // Récupérer le livre par ID
      const livre = await Livre.findById(req.params.id);
      if (!livre) return res.status(404).json({ message: 'Livre non trouvé' });
  
      // Basculer le statut de disponibilité
      livre.disponible = !livre.disponible;
  
      // Sauvegarder les changements
      await livre.save();
  
      res.status(200).json({ message: `Le statut de disponibilité a été mis à jour : ${livre.disponible ? 'disponible' : 'non disponible'}`, livre });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la mise à jour du statut de disponibilité. Veuillez réessayer plus tard.' });
    }
  };

  exports.getAllLivres = async (req, res) => {
    try {
      const livres = await Livre.find();
      res.status(200).json(livres);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  exports.getUnavailableLivres = async (req, res) => {
    try {
      console.log('Récupération des livres indisponibles...');
      const livres = await Livre.find({disponible: false });
      console.log('Livres récupérés :', livres);  // Vérifiez ce qui est récupéré
      res.status(200).json(livres);
    } catch (error) {
      console.error('Erreur lors de la récupération des livres indisponibles:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des livres indisponibles.' });
    }
  };
  
// controllers/LivreController.js
exports.getAvailableLivres = async (req, res) => {
  try {
    const livres = await Livre.find({ disponible: true });
    res.status(200).json(livres);
  } catch (err) {
    console.error("Erreur lors de la récupération des livres disponibles :", err);
    res.status(500).json({ message: 'Erreur lors de la récupération des livres disponibles.' });
  }
};

  exports.getReservedLivres = async (req, res) => {
    try {
      const livres = await Livre.find({ reserver: true });
      res.status(200).json(livres);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des livres réservés.' });
    }
  };
  
  exports.getNONReservedLivres = async (req, res) => {
    try {
      const reservedBooks = await Livre.find({ reserver: false });
      res.status(200).json(reservedBooks);
    } catch (error) {
      console.error('Erreur lors de la récupération des livres non réservés :', error);
      res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
  };
  // Confirmer la réservation et mettre la disponibilité à false
exports.confirmerLivre = async (req, res) => {
  try {
    // Récupérer le livre par ID
    const livre = await Livre.findById(req.params.id);
    if (!livre) return res.status(404).json({ message: 'Livre non trouvé' });

    // Mettre la disponibilité à false
    livre.disponible = false;

    // Sauvegarder les changements
    await livre.save();

    res.status(200).json({ message: 'La disponibilité du livre a été mise à jour en non disponible.', livre });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la disponibilité du livre.' });
  }
};
