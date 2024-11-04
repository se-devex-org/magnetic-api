import random

class SMS2FA:
    def __init__(self, sms_gateway):
        self.sms_gateway = sms_gateway

    def generate_otp(self):
        """Generate a 6-digit OTP"""
        return random.randint(100000, 999999)

    def send_otp(self, phone_number):
        """Send OTP to the given phone number using the SMS gateway"""
        otp = self.generate_otp()
        message = f"Your verification code is {otp}"
        self.sms_gateway.send_sms(phone_number, message)
        return otp

class MockSMSGateway:
    def send_sms(self, phone_number, message):
        """Mock sending SMS"""
        print(f"Sending SMS to {phone_number}: {message}")
