const showTimeController = require('../../controllers/showTime');
const UserRole = require('../../enums/UserRole');
const { autheticate, permission } = require('../../middlewares');

const router = require('express').Router();

router.post(
  '/',
  [autheticate, permission(UserRole.ADMIN)],
  showTimeController.createShowTime
);
router.get('/', showTimeController.getShowTimes);
router.get('/:id', showTimeController.findShowTimeById);
router.get('/movie/:movieId', showTimeController.findShowTimeByMovieId);
router.put(
  '/:id',
  [autheticate, permission(UserRole.ADMIN)],
  showTimeController.updateShowTime
);
router.delete(
  '/:id',
  [autheticate, permission(UserRole.ADMIN)],
  showTimeController.deleteShowTime
);

module.exports = router;
