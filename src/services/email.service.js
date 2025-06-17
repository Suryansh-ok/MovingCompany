const transporter = require('../config/email');

exports.sendPasswordResetEmail = async (to, resetLink) => {
    console.log(`Reset link sent to: ${to}`);
    const mailOptions = {
        from: `"Moving Company" <${process.env.EMAIL_FROM}>`,
        to: to,
        subject: 'Reset your password',
        html: `
        <p>You requested a password reset. Click the link below:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link expires in 15 minutes</p>
        `
    };
    await transporter.sendMail(mailOptions);
};

// Reset Password Link: http://localhost:3001/reset-password/387f07e0291fe7bce71348a94cae00489ff68cc1d5a0fbfeb6a5e6b511ff15e9