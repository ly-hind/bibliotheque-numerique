const express = require('express');
const router = express.Router();
const ComptableController = require('../Controllers/ComptableControllers');

// Routes principales
//router.get('/:id', patientController.getPatientProfile);
router.post('/register', ComptableController.registerComptable);
router.post('/login', ComptableController.loginComptable);
//router.get('/byname/:name', patientController.getPatientByName);
router.get('/:id', ComptableController.getComptableById);

module.exports = router;
