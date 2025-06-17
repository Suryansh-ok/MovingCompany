const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const serviceRoutes = require('./service.routes')
const jobRoutes = require('./job.routes');
// const paymentsRoutes = require('./payment.routes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/services', serviceRoutes);
router.use('/jobs', jobRoutes);
// router.use('payments', paymentsRoutes);

module.exports = router;