const nodemailer = require('nodemailer');
const VerificationCode = require('../../Model/delivery/VerificationCode');

// Setup transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send Verification Email
exports.sendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000); // 6-digit code

  try {
    // Save to DB
    await VerificationCode.create({ email, code });

    // Send Email
    await transporter.sendMail({
      from: `"Your App Name" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your Verification Code',
      text: `Your verification code is: ${code}`
    });

    res.status(200).json({ message: 'Verification email sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send verification email.' });
  }
};

// Verify Code
exports.verifyCode = async (req, res) => {
  const { email, verificationCode } = req.body;

  try {
    const record = await VerificationCode.findOne({ email, code: verificationCode });

    if (!record) {
      return res.status(400).json({ message: 'Invalid or expired verification code.' });
    }

    // Optionally delete the code after verification
    await VerificationCode.deleteOne({ _id: record._id });

    res.status(200).json({ message: 'Email verified successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Verification failed.' });
  }
};
