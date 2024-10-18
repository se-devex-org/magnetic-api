const twoFactorAuthConfig = {
  methods: {
    sms: {
      enabled: true,
      provider: 'YourSMSProvider',
      apiKey: 'YourSMSApiKey'
    },
    app: {
      enabled: true,
      appName: 'Your2FAAppName'
    }
  },
  userSettings: {
    allowEnableDisable: true,
    setupInstructions: 'Follow the instructions in the app to enable 2FA.'
  }
};

module.exports = twoFactorAuthConfig;
