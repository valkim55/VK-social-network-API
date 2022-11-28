// 'users' prefixed routes will be bundled up here
const router = require('express').Router();
const userRoutes = require('./user-routes');

router.use('/users', userRoutes);


module.exports = router;