const authController = require('../../controllers/auth');
const router = require('express').Router();
const { autheticate } = require('../../middlewares');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/update-profile', autheticate, authController.updateProfile);
router.get('/get-profile', autheticate, authController.getProfile);

module.exports = router;
