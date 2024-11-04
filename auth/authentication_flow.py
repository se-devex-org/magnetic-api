from auth.location_detection import LocationDetector
from auth.2fa_app import TwoFactorAuthApp
from auth.2fa_sms import SMS2FA
from user.settings import UserSettings

class AuthenticationFlow:
    def __init__(self, user_id, current_ip, user_email, phone_number, sms_gateway):
        self.user_id = user_id
        self.current_ip = current_ip
        self.user_email = user_email
        self.phone_number = phone_number
        self.sms_gateway = sms_gateway
        self.location_detector = LocationDetector(user_id, current_ip)
        self.user_settings = UserSettings()
        self.sms_2fa = SMS2FA(sms_gateway)
        self.app_2fa = TwoFactorAuthApp(user_email)

    def login(self):
        if self.location_detector.is_unknown_location():
            self.require_2fa()
        else:
            self.proceed_with_login()

    def require_2fa(self):
        if self.user_settings.is_2fa_enabled():
            self.trigger_2fa()
        else:
            print("2FA is not enabled for this user.")

    def trigger_2fa(self):
        # Example of triggering both SMS and App-based 2FA
        otp = self.sms_2fa.send_otp(self.phone_number)
        print(f"An OTP has been sent to your phone: {otp}")
        totp_uri = self.app_2fa.get_totp_uri()
        print(f"Set up your app-based 2FA using this URI: {totp_uri}")

    def proceed_with_login(self):
        print("Login successful without 2FA.")

    def verify_2fa(self, token=None, otp=None):
        if token and self.app_2fa.verify_token(token):
            print("App-based 2FA verified successfully.")
            self.proceed_with_login()
        elif otp and self.sms_2fa.verify_otp(otp):
            print("SMS-based 2FA verified successfully.")
            self.proceed_with_login()
        else:
            print("2FA verification failed.")
