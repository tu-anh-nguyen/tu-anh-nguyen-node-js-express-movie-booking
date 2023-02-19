const router = require('express').Router();

// import routes
const v1Router = require('./v1');

// define routes
router.use('/v1', v1Router);

module.exports = router;
