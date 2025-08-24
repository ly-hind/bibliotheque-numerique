const express = require('express');
const router = express.Router();
const PreposeController = require('../Controllers/PreposeControllers');

// Routes principales
//router.get('/:id', patientController.getPatientProfile);
router.post('/register', PreposeController.registerPrepose);
router.post('/login', PreposeController.loginPrepose);
//router.get('/byname/:name', patientController.getPatientByName);
router.get('/:id', PreposeController.getPreposeById);

module.exports = router;
