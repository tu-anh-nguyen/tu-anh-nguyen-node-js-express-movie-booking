const movieController = require('../../controllers/movie');
const UserRole = require('../../enums/UserRole');
const { autheticate, permission } = require('../../middlewares');

const router = require('express').Router();

router.post(
  '/',
  [autheticate, permission(UserRole.ADMIN)],
  movieController.createMovie
);
router.get('/', movieController.getMovies);
router.get('/:id', movieController.findMovieById);
router.put(
  '/:id',
  [autheticate, permission(UserRole.ADMIN)],
  movieController.updateMovie
);
router.delete(
  '/:id',
  [autheticate, permission(UserRole.ADMIN)],
  movieController.deleteMovie
);

module.exports = router;
