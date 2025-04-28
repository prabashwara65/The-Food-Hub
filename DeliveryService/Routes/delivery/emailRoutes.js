const express = require('express');
const router = express.Router();
const { sendVerificationEmail, verifyCode } = require('../../Controller/delivery/emailController');

router.post('/send-verification-email', sendVerificationEmail);
router.post('/verify-code', verifyCode);

module.exports = router;
