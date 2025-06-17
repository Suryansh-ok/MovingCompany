const User = require('../models/user.model');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendPasswordResetEmail } = require('../services/email.service');

exports.signup = async ( req, res) => {
    const {name, email, password} = req.body;
    
    try{
        const existing = await User.findOne({email});
        if(existing) return res.status(400).json({error : 'Email already in use'});
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create( {name, email, password : hashedPassword} );

        res.status(201).json({message: 'User registered successfully', userId: user._id});
    } catch (error){
        res.status(500).json({error : 'Signup failed', details: error.message});
    }

}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) return res.status(401).json({error : 'Invalid email'});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(401).json({error : 'Invalid password'});

        const token = jwt.sign(
            {userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn : '7d'}
        )
        res.json({ token, user: {id: user._id, name: user.name, email: user.email}});
    } catch(error){
        res.status(500).json({error : 'Login failed', details: error.message});
    }
}

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne( { email });

    if(!user) return res.status(404).json({ error: "Email not found" });

    const token = crypto.randomBytes(32).toString('hex');
    const expiry = Date.now() + 1000 * 60 * 15; // 15 minutes

    user.resetToken = token;
    user.resetTokenExpiry = expiry;
    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
    await sendPasswordResetEmail(email, resetLink);
    console.log(`Reset Password Link: ${resetLink}`);
    res.json({message : 'Password reset link has been sent to your email'});
}

exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
        resetToken: token,
        resetTokenExpiry: { $gt : Date.now() }
    });

    if(!user) return res.status(404).json({ error: 'Invalid or expired token'});

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.json({ message: 'Password has been reset successfully'});
};