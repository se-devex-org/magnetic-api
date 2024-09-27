class LoginHandler {
    constructor() {
        this.knownLocations = new Set(); // Store known locations
        this.users2FASettings = {}; // Store users' 2FA settings
    }

    login(user, location) {
        if (!this.knownLocations.has(location)) {
            console.log('Unknown location detected. Initiating 2FA...');
            this.require2FA(user);
        } else {
            console.log('Login successful from a known location.');
        }
    }

    require2FA(user) {
        const user2FASetting = this.users2FASettings[user];
        if (user2FASetting === 'SMS') {
            this.sendSMSCode(user);
        } else if (user2FASetting === 'APP') {
            this.sendAppCode(user);
        } else {
            console.log('2FA is not enabled for this user.');
        }
    }

    sendSMSCode(user) {
        console.log(`Sending SMS code to user: ${user}`);
        // Implement SMS sending logic here
    }

    sendAppCode(user) {
        console.log(`Sending app code to user: ${user}`);
        // Implement app code sending logic here
    }

    enable2FA(user, method) {
        if (method === 'SMS' || method === 'APP') {
            this.users2FASettings[user] = method;
            console.log(`2FA enabled for user: ${user} using method: ${method}`);
        } else {
            console.log('Invalid 2FA method. Choose either SMS or APP.');
        }
    }

    disable2FA(user) {
        delete this.users2FASettings[user];
        console.log(`2FA disabled for user: ${user}`);
    }
}

module.exports = LoginHandler;
