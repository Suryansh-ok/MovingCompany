const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const upload = require('../middlewares/profilePhoto.middleware')
const { getProfile, updateProfile, uploadPhoto } = require('../controllers/user.controller');

router.get('/me', auth, getProfile);
router.put('/update', auth, updateProfile);
router.post('/photo', auth, upload.single('photo'), uploadPhoto);

module.exports = router;