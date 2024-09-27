class AuthModule {
    constructor() {
        this.knownLocations = new Set();
        this.twoFactorEnabled = false;
    }

    login(username, password, location) {
        if (this.authenticate(username, password)) {
            if (!this.knownLocations.has(location)) {
                this.requireTwoFactorAuth();
            } else {
                this.grantAccess();
            }
        } else {
            throw new Error('Authentication failed');
        }
    }

    authenticate(username, password) {
        // Implement actual authentication logic here
        return true;
    }

    requireTwoFactorAuth() {
        if (this.twoFactorEnabled) {
            console.log('2FA required. Please choose a method: SMS or App');
            // Implement 2FA logic here
        } else {
            this.grantAccess();
        }
    }

    enableTwoFactorAuth() {
        this.twoFactorEnabled = true;
        console.log('Two-factor authentication enabled.');
    }

    disableTwoFactorAuth() {
        this.twoFactorEnabled = false;
        console.log('Two-factor authentication disabled.');
    }

    grantAccess() {
        console.log('Access granted.');
    }

    addKnownLocation(location) {
        this.knownLocations.add(location);
    }
}

// Example usage
const auth = new AuthModule();
auth.enableTwoFactorAuth();
auth.login('user', 'password', 'unknown_location');
