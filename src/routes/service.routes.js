const express = require('express');
const router = express.Router();
const { getAllServices, createService, deleteService } = require('../controllers/service.controller');
const { route } = require('./auth.routes');

router.get('/', getAllServices);
router.post('/create-service', createService);
router.delete('/delete-service/:id', deleteService);
module.exports = router;