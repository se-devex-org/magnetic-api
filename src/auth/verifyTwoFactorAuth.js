const crypto = require('crypto');
const twilio = require('twilio');
const speakeasy = require('speakeasy');

// Twilio configuration
const accountSid = 'your_account_sid';
const authToken = 'your_auth_token';
const twilioClient = twilio(accountSid, authToken);

// Function to send SMS for 2FA
function sendSmsVerification(phoneNumber, code) {
    return twilioClient.messages.create({
        body: `Your verification code is ${code}`,
        from: '+1234567890', // Your Twilio number
        to: phoneNumber
    });
}

// Function to verify 2FA code
function verifyTwoFactorAuth(user, code, method) {
    if (method === 'sms') {
        // Verify SMS code
        return user.smsCode === code;
    } else if (method === 'app') {
        // Verify app-based code using speakeasy
        return speakeasy.totp.verify({
            secret: user.appSecret,
            encoding: 'base32',
            token: code
        });
    }
    return false;
}

// Function to generate a new 2FA code
function generateTwoFactorCode() {
    return crypto.randomInt(100000, 999999).toString();
}

module.exports = {
    sendSmsVerification,
    verifyTwoFactorAuth,
    generateTwoFactorCode
};
