const router = require('express').Router();

// import routes
const authRouter = require('./auth');
const uploadRouter = require('./upload');
// const bookedSeatRouter = require('./bookedSeat');
const ticketRouter = require('./ticket');
const showTimeRouter = require('./showTime');
const movieRouter = require('./movie');
const userRouter = require('./user');
const seatRouter = require('./seat');
const theaterRouter = require('./theater');
const theaterChainRouter = require('./theaterChain');
const theaterBrandRouter = require('./theaterBrand');
const { autheticate, permission } = require('../../middlewares');
const UserRole = require('../../enums/UserRole');

// define routes
router.use('/auth', authRouter);
router.use('/upload', uploadRouter);
// router.use('/booked-seats', autheticate, bookedSeatRouter);
router.use('/tickets', autheticate, ticketRouter);
router.use('/show-times', showTimeRouter);
router.use('/movies', movieRouter);
router.use('/users', autheticate, permission(UserRole.ADMIN), userRouter);
router.use('/seats', seatRouter);
router.use('/theaters', theaterRouter);
router.use('/theater-chains', theaterChainRouter);
router.use('/theater-brands', theaterBrandRouter);

module.exports = router;
