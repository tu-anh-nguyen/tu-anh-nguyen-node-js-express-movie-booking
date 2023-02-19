const theaterBrandController = require('../../controllers/theaterBrand');
const UserRole = require('../../enums/UserRole');
const { autheticate, permission } = require('../../middlewares');

const router = require('express').Router();

router.post(
  '/',
  [autheticate, permission(UserRole.ADMIN)],
  theaterBrandController.createTheaterBrand
);
router.get('/', theaterBrandController.getTheaterBrands);
router.get('/:id', theaterBrandController.findTheaterBrandById);
router.put(
  '/:id',
  [autheticate, permission(UserRole.ADMIN)],
  theaterBrandController.updateTheaterBrand
);
router.delete(
  '/:id',
  [autheticate, permission(UserRole.ADMIN)],
  theaterBrandController.deleteTheaterBrand
);

module.exports = router;
