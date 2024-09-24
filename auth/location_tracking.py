import os
import json
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut

class LocationTracker:
    def __init__(self, user_id):
        self.user_id = user_id
        self.geolocator = Nominatim(user_agent="auth_app")
        self.known_locations_file = f"known_locations_{self.user_id}.json"
        self.known_locations = self.load_known_locations()

    def load_known_locations(self):
        if os.path.exists(self.known_locations_file):
            with open(self.known_locations_file, 'r') as file:
                return json.load(file)
        return []

    def save_known_location(self, location):
        self.known_locations.append(location)
        with open(self.known_locations_file, 'w') as file:
            json.dump(self.known_locations, file)

    def is_known_location(self, latitude, longitude):
        try:
            location = self.geolocator.reverse((latitude, longitude), timeout=10)
            if location:
                address = location.address
                if address in self.known_locations:
                    return True
                else:
                    self.save_known_location(address)
                    return False
        except GeocoderTimedOut:
            return False
        return False

    def detect_unknown_location(self, latitude, longitude):
        return not self.is_known_location(latitude, longitude)
