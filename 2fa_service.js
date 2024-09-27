const crypto = require('crypto');
const twilio = require('twilio');
const speakeasy = require('speakeasy');

// Twilio configuration
const accountSid = 'your_account_sid';
const authToken = 'your_auth_token';
const twilioClient = twilio(accountSid, authToken);
const twilioPhoneNumber = 'your_twilio_phone_number';

// Function to send SMS-based 2FA code
function sendSms2faCode(phoneNumber) {
    const code = generateRandomCode();
    return twilioClient.messages.create({
        body: `Your verification code is ${code}`,
        from: twilioPhoneNumber,
        to: phoneNumber
    }).then(message => {
        console.log(`SMS sent: ${message.sid}`);
        return code; // Return the code for verification purposes
    }).catch(error => {
        console.error('Error sending SMS:', error);
        throw error;
    });
}

// Function to generate app-based 2FA code
function generateApp2faCode(secret) {
    return speakeasy.totp({
        secret: secret,
        encoding: 'base32'
    });
}

// Helper function to generate a random 6-digit code
function generateRandomCode() {
    return crypto.randomInt(100000, 999999).toString();
}

module.exports = {
    sendSms2faCode,
    generateApp2faCode
};
