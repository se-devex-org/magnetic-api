import pyotp

class TwoFactorAuthApp:
    def __init__(self, user_email):
        self.user_email = user_email
        self.secret = self.generate_secret()

    def generate_secret(self):
        """Generate a new secret key for the user."""
        return pyotp.random_base32()

    def get_totp_uri(self):
        """Generate a TOTP URI for the user to set up 2FA in an app."""
        totp = pyotp.TOTP(self.secret)
        return totp.provisioning_uri(self.user_email, issuer_name="YourAppName")

    def verify_token(self, token):
        """Verify the provided token."""
        totp = pyotp.TOTP(self.secret)
        return totp.verify(token)

# Example usage:
# user_2fa = TwoFactorAuthApp("user@example.com")
# print("Secret:", user_2fa.secret)
# print("TOTP URI:", user_2fa.get_totp_uri())
# print("Verification:", user_2fa.verify_token("123456"))
