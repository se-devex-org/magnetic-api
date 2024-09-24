class AuthLogic {
    constructor() {
        this.knownLocations = new Set(); // Store known locations
    }

    isUnknownLocation(currentLocation) {
        // Check if the current location is known
        return !this.knownLocations.has(currentLocation);
    }

    initiate2FA(user, method) {
        if (method === 'SMS') {
            this.sendSMSCode(user);
        } else if (method === 'APP') {
            this.sendAppCode(user);
        } else {
            throw new Error('Unsupported 2FA method');
        }
    }

    sendSMSCode(user) {
        // Logic to send SMS code
        console.log(`Sending SMS code to ${user.phoneNumber}`);
    }

    sendAppCode(user) {
        // Logic to send app-based code
        console.log(`Sending app code to ${user.appId}`);
    }

    enable2FA(user, method) {
        user.twoFactorEnabled = true;
        user.twoFactorMethod = method;
        console.log(`2FA enabled for ${user.username} using ${method}`);
    }

    disable2FA(user) {
        user.twoFactorEnabled = false;
        console.log(`2FA disabled for ${user.username}`);
    }

    login(user, currentLocation) {
        if (this.isUnknownLocation(currentLocation)) {
            console.log('Unknown location detected. Initiating 2FA...');
            this.initiate2FA(user, user.twoFactorMethod);
        } else {
            console.log('Login successful from known location.');
        }
    }
}

module.exports = AuthLogic;
