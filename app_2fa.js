const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

class TwoFactorAuth {
    constructor() {
        this.secret = null;
    }

    generateSecret() {
        this.secret = speakeasy.generateSecret({ length: 20 });
        return this.secret;
    }

    generateQRCode(callback) {
        if (!this.secret) {
            throw new Error('Secret not generated');
        }
        qrcode.toDataURL(this.secret.otpauth_url, (err, data_url) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data_url);
            }
        });
    }

    verifyToken(token) {
        if (!this.secret) {
            throw new Error('Secret not generated');
        }
        return speakeasy.totp.verify({
            secret: this.secret.base32,
            encoding: 'base32',
            token: token
        });
    }
}

module.exports = TwoFactorAuth;
