const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = `user-${Date.now()}${ext}`;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image/')) cb(null, true);
    else cb( new Error('Only image files allowed'), false);
};

module.exports = multer({ storage, fileFilter});