const theaterChainController = require('../../controllers/theaterChain');
const UserRole = require('../../enums/UserRole');
const { autheticate, permission } = require('../../middlewares');

const router = require('express').Router();

router.post(
  '/',
  [autheticate, permission(UserRole.ADMIN)],
  theaterChainController.createTheaterChain
);
router.get('/', theaterChainController.getTheaterChains);
router.get('/:id', theaterChainController.findTheaterChainById);
router.put(
  '/:id',
  [autheticate, permission(UserRole.ADMIN)],
  theaterChainController.updateTheaterChain
);
router.delete(
  '/:id',
  [autheticate, permission(UserRole.ADMIN)],
  theaterChainController.deleteTheaterChain
);

module.exports = router;
