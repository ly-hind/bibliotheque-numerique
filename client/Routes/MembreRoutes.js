const express = require('express');
const router = express.Router();
const MembreController = require('../Controllers/MembreController');
const Membre = require('../Models/Membre');

// Routes principales
//router.get('/:id', patientController.getPatientProfile);
router.post('/register', MembreController.registerMembre);
router.post('/login', MembreController.loginMembre);
router.get('/byname/:name', async (req, res) => {
    try {
      const membre = await Membre.findOne({ nom: req.params.name });
      if (!membre) return res.status(404).json({ message: 'Membre non trouvé' });
      res.status(200).json(membre);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération du membre.' });
    }
  });
  router.get('/:id', MembreController.getClientById);
  router.post('/:idLivre/ajouterFacture', MembreController.ajouterFacture);


module.exports = router;
