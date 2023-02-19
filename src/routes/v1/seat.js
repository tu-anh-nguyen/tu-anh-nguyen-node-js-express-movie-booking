const seatController = require('../../controllers/seat');
const UserRole = require('../../enums/UserRole');
const { autheticate, permission } = require('../../middlewares');

const router = require('express').Router();

router.post(
  '/',
  [autheticate, permission(UserRole.ADMIN)],
  seatController.createSeat
);
router.get('/', seatController.getSeats);
router.get('/:id', seatController.findSeatById);
router.get('/show-time/:showTimeId', seatController.getSeatsByShowTime);
router.put(
  '/:id',
  [autheticate, permission(UserRole.ADMIN)],
  seatController.updateSeat
);
router.delete(
  '/:id',
  [autheticate, permission(UserRole.ADMIN)],
  seatController.deleteSeat
);

module.exports = router;
