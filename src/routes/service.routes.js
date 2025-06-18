const express = require('express');
const router = express.Router();
const { getAllServices, createService, deleteService } = require('../controllers/service.controller');
const auth = require('../middlewares/auth.middleware');
const { route } = require('./auth.routes');

router.get('/', getAllServices);
router.post('/create-service', auth, createService);
router.delete('/delete-service/:id', auth, deleteService);
module.exports = router;