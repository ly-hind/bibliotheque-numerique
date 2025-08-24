const express = require('express');
const router = express.Router();
const GerantController = require('../Controllers/GerantControllers');

// Routes principales
//router.get('/:id', patientController.getPatientProfile);
router.post('/register', GerantController.registerGerant);
router.post('/login', GerantController.loginGerant);
//router.get('/byname/:name', patientController.getPatientByName);
router.get('/:id', GerantController.getGerantById);

module.exports = router;
