# Two-Factor Authentication (2FA) API Documentation

## Overview
The system supports two-factor authentication (2FA) to enhance the security of user accounts. Users can enable 2FA using either SMS-based or app-based methods.

## Enabling 2FA
Users can enable 2FA from their mobile devices through a user-friendly setup process. The following endpoints are available for managing 2FA:

### POST /users/{userId}/2fa/enable
Enable 2FA for a user account.

#### Request
- `userId` (path parameter): The ID of the user enabling 2FA.
- `method` (body parameter): The 2FA method to enable, either `sms` or `app`.

#### Response
- `200 OK`: 2FA enabled successfully.
- `400 Bad Request`: Invalid request parameters.

### POST /users/{userId}/2fa/disable
Disable 2FA for a user account.

#### Request
- `userId` (path parameter): The ID of the user disabling 2FA.

#### Response
- `200 OK`: 2FA disabled successfully.
- `400 Bad Request`: Invalid request parameters.

## 2FA Methods
### SMS-based 2FA
Users receive a verification code via SMS to their registered mobile number.

### App-based 2FA
Users can use an authenticator app to generate a verification code.

## Security Considerations
Ensure that the user's mobile number or authenticator app is correctly configured to avoid lockouts.
