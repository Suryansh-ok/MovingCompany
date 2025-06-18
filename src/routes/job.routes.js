const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const { createJob } = require('../controllers/job.controller');

router.post('/create-job', auth, createJob);
module.exports = router;