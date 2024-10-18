class Authentication {
    constructor() {
        this.knownLocations = new Map(); // Store known locations for users
    }

    login(user, location) {
        if (!this.isKnownLocation(user, location)) {
            this.requireTwoFactorAuthentication(user);
        } else {
            this.proceedWithLogin(user);
        }
    }

    isKnownLocation(user, location) {
        const knownLocation = this.knownLocations.get(user.id);
        return knownLocation && knownLocation === location;
    }

    requireTwoFactorAuthentication(user) {
        // Logic to send 2FA code via SMS or app
        console.log(`2FA required for user ${user.id}`);
        // Here you would integrate with an SMS or app-based 2FA service
    }

    proceedWithLogin(user) {
        console.log(`User ${user.id} logged in successfully.`);
        // Proceed with the login process
    }

    enableTwoFactorAuthentication(user, method) {
        // Logic to enable 2FA for the user
        console.log(`2FA enabled for user ${user.id} using ${method}`);
    }

    disableTwoFactorAuthentication(user) {
        // Logic to disable 2FA for the user
        console.log(`2FA disabled for user ${user.id}`);
    }
}

module.exports = Authentication;
