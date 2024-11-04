from auth.2fa_app import TwoFactorAuthApp
from auth.2fa_sms import SMS2FA, MockSMSGateway

class TwoFactorAuthSetup:
    def __init__(self, user_email, phone_number):
        self.user_email = user_email
        self.phone_number = phone_number
        self.app_2fa = TwoFactorAuthApp(user_email)
        self.sms_2fa = SMS2FA(MockSMSGateway())

    def setup_app_2fa(self):
        """Set up app-based 2FA."""
        secret = self.app_2fa.secret
        totp_uri = self.app_2fa.get_totp_uri()
        print(f"Scan this QR code with your 2FA app: {totp_uri}")
        return secret

    def setup_sms_2fa(self):
        """Set up SMS-based 2FA."""
        otp = self.sms_2fa.send_otp(self.phone_number)
        print(f"An OTP has been sent to your phone: {otp}")
        return otp

    def verify_app_token(self, token):
        """Verify the token for app-based 2FA."""
        return self.app_2fa.verify_token(token)

    def verify_sms_otp(self, otp, expected_otp):
        """Verify the OTP for SMS-based 2FA."""
        return otp == expected_otp

# Example usage:
# setup = TwoFactorAuthSetup("user@example.com", "+1234567890")
# app_secret = setup.setup_app_2fa()
# sms_otp = setup.setup_sms_2fa()
# print("App token verification:", setup.verify_app_token("123456"))
# print("SMS OTP verification:", setup.verify_sms_otp("123456", sms_otp))
