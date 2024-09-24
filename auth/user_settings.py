class UserSettings:
    def __init__(self, user_id):
        self.user_id = user_id
        self.two_factor_enabled = False

    def enable_2fa(self, method):
        """
        Enable two-factor authentication for the user.

        :param method: The method of 2FA, either 'sms' or 'app'.
        """
        if method not in ['sms', 'app']:
            raise ValueError("Invalid 2FA method. Choose 'sms' or 'app'.")
        self.two_factor_enabled = True
        # Here you would integrate with the actual 2FA service
        print(f"2FA enabled using {method} for user {self.user_id}.")

    def disable_2fa(self):
        """
        Disable two-factor authentication for the user.
        """
        self.two_factor_enabled = False
        # Here you would integrate with the actual 2FA service
        print(f"2FA disabled for user {self.user_id}.")

    def is_2fa_enabled(self):
        """
        Check if two-factor authentication is enabled for the user.

        :return: True if 2FA is enabled, False otherwise.
        """
        return self.two_factor_enabled
