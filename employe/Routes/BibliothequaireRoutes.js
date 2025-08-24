const express = require('express');
const router = express.Router();
const BibliothequaireController = require('../Controllers/BibliothequaireController');

// Routes principales
//router.get('/:id', patientController.getPatientProfile);
router.post('/register', BibliothequaireController.registerBibliothequaire);
router.post('/login', BibliothequaireController.loginBibliothequaire);
//router.get('/byname/:name', patientController.getPatientByName);
router.get('/:id', BibliothequaireController.getBibliothequaireById);

module.exports = router;
