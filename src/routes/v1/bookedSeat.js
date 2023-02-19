const  bookedSeatController = require('../../controllers/bookedSeat');

const router = require('express').Router();

router.post('/', bookedSeatController.createBookedSeat);
router.get('/', bookedSeatController.getBookedSeats);
router.get('/:id', bookedSeatController.findBookedSeatById);
router.put('/:id', bookedSeatController.updateBookedSeat);
router.delete('/:id', bookedSeatController.deleteBookedSeat);

module.exports = router; 
  