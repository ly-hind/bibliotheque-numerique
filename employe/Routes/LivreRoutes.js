const express = require('express');
const router = express.Router();
const LivreController = require('../Controllers/LivreController'); 
const Livre = require('../Models/Livre'); 
const multer = require('multer');
const path = require('path');

// Configuration de multer avec condition pour stocker les fichiers dans des dossiers différents
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Vérifier le champ du fichier pour stocker dans le bon dossier
    if (file.fieldname === 'image') {
      cb(null, 'uploads/');  // Dossier pour les images de livres
    } else if (file.fieldname === 'codebarreImage') {
      cb(null, 'uploads/codebarre/');  // Dossier pour les images de code-barres
    }
  },
  filename: function (req, file, cb) {
    if (file.fieldname === 'codebarreImage') {
      const bookName = req.body.nom;  // Utiliser le nom du livre pour le code-barres
      cb(null, `${bookName}${path.extname(file.originalname)}`);  // Nommer le fichier avec le nom du livre
    } else {
      cb(null, Date.now() + '-' + file.originalname);  // Nommer l'image du livre avec un timestamp unique
    }
  }
});

const upload = multer({ storage: storage });

// Route pour ajouter un livre avec upload de l'image et du code-barres
router.post('/ajout', upload.fields([
  { name: 'image', maxCount: 1 },  // Image du livre
  { name: 'codebarreImage', maxCount: 1 }  // Image du code-barres
]), LivreController.addLivre);

// Routes spécifiques
router.get('/indisponible', LivreController.getUnavailableLivres);  // Placer avant /:id
router.get('/reserved', LivreController.getReservedLivres);         // Placer avant /:id
router.get('/disponible', LivreController.getAvailableLivres);
router.get('/nonreserved', LivreController.getNONReservedLivres );

// Routes dynamiques
router.get('/:id', LivreController.getLivreById);

// Route pour confirmer la réservation d'un livre
router.put('/:id/confirmer', LivreController.confirmerLivre);
router.put('/:id/toggleReservation', LivreController.toggleReservation);

// Route pour récupérer les livres par nom
router.post('/getByNames', async (req, res) => {
  try {
    const livres = await Livre.find({ nom: { $in: req.body.noms } });
    if (!livres || livres.length === 0) return res.status(404).json({ message: 'Livres non trouvés' });
    res.status(200).json(livres);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des livres.' });
  }
});

router.get('/api/livres/:name', async (req, res) => {
  try {
    const livre = await Livre.findOne({ nom: req.params.name });
    if (!livre) {
      return res.status(404).json({ message: 'Livre non trouvé' });
    }
    res.status(200).json(livre);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du livre' });
  }
});

// Route générale pour obtenir tous les livres
router.get('/', LivreController.getAllLivres);

module.exports = router;
