import random
import string

class TwoFactorAuth:
    def __init__(self):
        self.sms_codes = {}
        self.app_codes = {}

    def generate_sms_code(self, user_id):
        """Generate a random SMS code for the user."""
        code = ''.join(random.choices(string.digits, k=6))
        self.sms_codes[user_id] = code
        # Here you would integrate with an SMS gateway to send the code
        return code

    def verify_sms_code(self, user_id, code):
        """Verify the SMS code entered by the user."""
        return self.sms_codes.get(user_id) == code

    def generate_app_code(self, user_id):
        """Generate a random app-based code for the user."""
        code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
        self.app_codes[user_id] = code
        # Here you would integrate with an app-based 2FA provider
        return code

    def verify_app_code(self, user_id, code):
        """Verify the app-based code entered by the user."""
        return self.app_codes.get(user_id) == code

    def enable_2fa(self, user_id, method):
        """Enable 2FA for a user with the specified method."""
        if method == 'sms':
            return self.generate_sms_code(user_id)
        elif method == 'app':
            return self.generate_app_code(user_id)
        else:
            raise ValueError("Unsupported 2FA method")

    def disable_2fa(self, user_id):
        """Disable 2FA for a user."""
        if user_id in self.sms_codes:
            del self.sms_codes[user_id]
        if user_id in self.app_codes:
            del self.app_codes[user_id]
