class TwoFactorAuth {
    constructor() {
        this.enabled = false;
        this.method = null; // 'sms' or 'app'
    }

    enable2FA(method) {
        if (method !== 'sms' && method !== 'app') {
            throw new Error('Invalid 2FA method. Choose either "sms" or "app".');
        }
        this.enabled = true;
        this.method = method;
        console.log(`2FA enabled using ${method} method.`);
    }

    disable2FA() {
        this.enabled = false;
        this.method = null;
        console.log('2FA disabled.');
    }

    is2FAEnabled() {
        return this.enabled;
    }

    get2FAMethod() {
        return this.method;
    }

    setup2FA() {
        if (!this.enabled) {
            console.log('2FA is not enabled. Please enable it first.');
            return;
        }
        if (this.method === 'sms') {
            this.setupSMS();
        } else if (this.method === 'app') {
            this.setupApp();
        }
    }

    setupSMS() {
        console.log('Setting up SMS-based 2FA...');
        // Implement SMS setup logic here
    }

    setupApp() {
        console.log('Setting up App-based 2FA...');
        // Implement App setup logic here
    }
}

module.exports = TwoFactorAuth;
