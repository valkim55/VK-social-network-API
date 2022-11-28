// api prefixed routes will come from here
const router = require('express').Router();

// import api endpoints from api directory
const apiRoutes = require('./api');

// add 'api' prefix to all api endpoints
router.use('/api', apiRoutes);

module.exports = router;