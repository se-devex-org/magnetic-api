const twilio = require('twilio');
const crypto = require('crypto');

const accountSid = 'your_account_sid'; // Replace with your Twilio Account SID
const authToken = 'your_auth_token';   // Replace with your Twilio Auth Token
const client = new twilio(accountSid, authToken);

const verificationCodes = new Map(); // Store verification codes temporarily

function generateVerificationCode() {
    return crypto.randomInt(100000, 999999).toString();
}

function sendVerificationCode(phoneNumber) {
    const code = generateVerificationCode();
    verificationCodes.set(phoneNumber, code);

    return client.messages.create({
        body: `Your verification code is ${code}`,
        from: '+1234567890', // Replace with your Twilio phone number
        to: phoneNumber
    });
}

function verifyCode(phoneNumber, code) {
    const validCode = verificationCodes.get(phoneNumber);
    if (validCode && validCode === code) {
        verificationCodes.delete(phoneNumber); // Remove code after successful verification
        return true;
    }
    return false;
}

module.exports = {
    sendVerificationCode,
    verifyCode
};
