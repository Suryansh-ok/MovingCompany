const User = require('../models/user.model');

exports.getProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user.userId).select('-password');
        if(!user) return res.status(404).json({error: 'User not found'});
        
        res.json(user);
    } catch (err){
        res.status(500).json({error: 'Failed to get profile'});
    }
};

exports.updateProfile = async (req, res) => {
    const { name, email } = req.body;
    const update = {};

    if(name) update.name = name;
    if(email) update.email = email;

    try{
        const user = await User.findByIdAndUpdate(req.user.userId, update, {new: true}).select('-password');
        res.json({message: 'Profile updated', user});
    } catch(err) {
        res.status(500).json({ error: 'Update failed', details: err.message});
    }
};

exports.uploadPhoto = async (req, res) => {
    try {
        const photoPath = `${req.file.filename}`;
        const user = await User.findByIdAndUpdate(req.user.userId, {profilePhoto: photoPath}, {new: true}).select('-password');
        res.json({message: 'Photo uploaded', user})
    } catch (err) {
        res.status(500).json({error: 'Upload failed', details: err.message});
    }
};
