class UserProfile {
    constructor(userId) {
        this.userId = userId;
        this.twoFactorEnabled = false;
        this.twoFactorMethod = null; // 'sms' or 'app'
    }

    enableTwoFactor(method) {
        if (method !== 'sms' && method !== 'app') {
            throw new Error('Invalid 2FA method. Choose either "sms" or "app".');
        }
        this.twoFactorEnabled = true;
        this.twoFactorMethod = method;
        console.log(`2FA enabled using ${method} method.`);
        // Additional logic to integrate with backend services for 2FA setup
    }

    disableTwoFactor() {
        this.twoFactorEnabled = false;
        this.twoFactorMethod = null;
        console.log('2FA disabled.');
        // Additional logic to update backend services
    }

    setupTwoFactor() {
        if (!this.twoFactorEnabled) {
            console.log('2FA is not enabled. Please enable it first.');
            return;
        }
        console.log(`Setting up 2FA using ${this.twoFactorMethod} method.`);
        // Logic to guide the user through the setup process
        // For SMS, send a verification code
        // For app, display a QR code for scanning
    }

    toggleTwoFactor(method) {
        if (this.twoFactorEnabled) {
            this.disableTwoFactor();
        } else {
            this.enableTwoFactor(method);
        }
    }
}

// Example usage:
const userProfile = new UserProfile(12345);
userProfile.enableTwoFactor('sms');
userProfile.setupTwoFactor();
userProfile.disableTwoFactor();
