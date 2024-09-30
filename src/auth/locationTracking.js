class LocationTracker {
    constructor() {
        this.knownLocations = new Map(); // Maps userId to a set of known locations
    }

    /**
      * Adds a known location for a user.
      * @param {string} userId - The ID of the user.
      * @param {string} location - The location to be added.
      */
    addKnownLocation(userId, location) {
        if (!this.knownLocations.has(userId)) {
            this.knownLocations.set(userId, new Set());
        }
        this.knownLocations.get(userId).add(location);
    }

    /**
      * Checks if a location is known for a user.
      * @param {string} userId - The ID of the user.
      * @param {string} location - The location to check.
      * @returns {boolean} - Returns true if the location is known, false otherwise.
      */
    isLocationKnown(userId, location) {
        return this.knownLocations.has(userId) && this.knownLocations.get(userId).has(location);
    }

    /**
      * Determines if a login is from an unknown location.
      * @param {string} userId - The ID of the user.
      * @param {string} location - The location of the login attempt.
      * @returns {boolean} - Returns true if the location is unknown, false otherwise.
      */
    isLoginFromUnknownLocation(userId, location) {
        return !this.isLocationKnown(userId, location);
    }
}

module.exports = LocationTracker;
