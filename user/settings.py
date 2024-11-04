class UserSettings:
    def __init__(self):
        self.two_factor_auth_enabled = False

    def enable_2fa(self):
        """Enable two-factor authentication."""
        self.two_factor_auth_enabled = True
        print("Two-factor authentication has been enabled.")

    def disable_2fa(self):
        """Disable two-factor authentication."""
        self.two_factor_auth_enabled = False
        print("Two-factor authentication has been disabled.")

    def is_2fa_enabled(self):
        """Check if two-factor authentication is enabled."""
        return self.two_factor_auth_enabled

    def toggle_2fa(self):
        """Toggle the state of two-factor authentication."""
        if self.two_factor_auth_enabled:
            self.disable_2fa()
        else:
            self.enable_2fa()
