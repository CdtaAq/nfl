// routes/auth.js

// Request password reset endpoint
router.post('/reset-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Generate password reset token
        user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
        await user.save();

        // Send password reset email
        const mailOptions = {
            to: user.email,
            subject: 'Password Reset Token',
            html: `Hello,<br> Please click on the following link to reset your password:<br><a href="http://localhost:5000/api/auth/reset-password/${user.resetPasswordToken}">http://localhost:5000/api/auth/reset-password/${user.resetPasswordToken}</a>`,
        };

        nodemailer.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            console.log('Email sent: ' + info.response);
        });

        res.status(200).json({ msg: 'Password reset instructions sent to your email.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Reset password endpoint
router.post('/reset-password/:token', async (req, res) => {
    const { password } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ msg: 'Password reset token is invalid or has expired.' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ msg: 'Password reset successfully. You can now log in with your new password.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
