const theaterController = require('../../controllers/theater');
const UserRole = require('../../enums/UserRole');
const { autheticate, permission } = require('../../middlewares');

const router = require('express').Router();

router.post(
  '/',
  [autheticate, permission(UserRole.ADMIN)],
  theaterController.createTheater
);
router.get('/', theaterController.getTheaters);
router.get('/:id', theaterController.findTheaterById);
router.put(
  '/:id',
  [autheticate, permission(UserRole.ADMIN)],
  theaterController.updateTheater
);
router.delete(
  '/:id',
  [autheticate, permission(UserRole.ADMIN)],
  theaterController.deleteTheater
);

module.exports = router;
