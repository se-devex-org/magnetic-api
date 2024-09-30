class Authentication {
    constructor() {
        this.knownLocations = new Set();
    }

    login(user, location) {
        if (!this.knownLocations.has(location)) {
            this.requireTwoFactorAuthentication(user);
        } else {
            this.completeLogin(user);
        }
    }

    requireTwoFactorAuthentication(user) {
        // Placeholder for 2FA logic
        console.log(`2FA required for user: ${user}`);
        // Here you would integrate with the 2FA module
        // Example: this.sendSMSCode(user) or this.sendAppNotification(user)
    }

    completeLogin(user) {
        console.log(`Login successful for user: ${user}`);
        // Logic to complete the login process
    }

    sendSMSCode(user) {
        // Placeholder for sending SMS code
        console.log(`Sending SMS code to user: ${user}`);
    }

    sendAppNotification(user) {
        // Placeholder for sending app notification
        console.log(`Sending app notification to user: ${user}`);
    }

    enable2FA(user) {
        // Logic to enable 2FA for the user
        console.log(`2FA enabled for user: ${user}`);
    }

    disable2FA(user) {
        // Logic to disable 2FA for the user
        console.log(`2FA disabled for user: ${user}`);
    }
}

module.exports = Authentication;
