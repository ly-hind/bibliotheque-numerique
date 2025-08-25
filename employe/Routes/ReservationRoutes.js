const express = require('express');
const router = express.Router();
const ReservationController = require('../Controllers/ReservationController');


router.get('/by-livre/:idLivre', ReservationController.getReservationByLivre);

router.post('/create', ReservationController.createReservation);
router.put('/toggleConfirmation/:id', ReservationController.toggleConfirmation);
router.get('/unconfirmed', ReservationController.getUnconfirmedReservations);
router.get('/confirmedReservations', ReservationController.getConfirmedReservations);

router.delete('/reservation/:id', ReservationController.deleteReservation);


module.exports = router;
