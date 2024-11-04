import random
import smtplib
from typing import Optional

class AuthenticationService:
    def __init__(self):
        self.known_locations = {}  # This should ideally be stored in a database

    def is_known_location(self, user_id: str, location: str) -> bool:
        return self.known_locations.get(user_id) == location

    def send_sms(self, phone_number: str, message: str):
        # Placeholder for SMS sending logic
        print(f"Sending SMS to {phone_number}: {message}")

    def send_app_notification(self, user_id: str, message: str):
        # Placeholder for app notification logic
        print(f"Sending app notification to {user_id}: {message}")

    def generate_2fa_code(self) -> str:
        return str(random.randint(100000, 999999))

    def require_2fa(self, user_id: str, location: str, phone_number: Optional[str] = None):
        if not self.is_known_location(user_id, location):
            code = self.generate_2fa_code()
            if phone_number:
                self.send_sms(phone_number, f"Your 2FA code is {code}")
            else:
                self.send_app_notification(user_id, f"Your 2FA code is {code}")
            return code
        return None

    def login(self, user_id: str, location: str, phone_number: Optional[str] = None):
        # Placeholder for login logic
        print(f"User {user_id} logged in from {location}")
        code = self.require_2fa(user_id, location, phone_number)
        if code:
            print("2FA required. Code sent.")
        else:
            print("No 2FA required.")
