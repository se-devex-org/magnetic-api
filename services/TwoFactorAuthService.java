package services;

import models.TwoFactorSettings;
import models.TwoFactorSettings.VerificationMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import repositories.TwoFactorSettingsRepository;
import com.google.common.base.Strings;
import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.GoogleAuthenticatorKey;
import com.warrenstrange.googleauth.GoogleAuthenticatorQRGenerator;

import java.time.Instant;
import java.util.Optional;

@Service
public class TwoFactorAuthService {

    private final TwoFactorSettingsRepository twoFactorSettingsRepository;
    private final SmsService smsService;
    private final GoogleAuthenticator googleAuthenticator;

    @Autowired
    public TwoFactorAuthService(
            TwoFactorSettingsRepository twoFactorSettingsRepository,
            SmsService smsService) {
        this.twoFactorSettingsRepository = twoFactorSettingsRepository;
        this.smsService = smsService;
        this.googleAuthenticator = new GoogleAuthenticator();
    }

    @Transactional
    public TwoFactorSettings enableTwoFactor(Long userId, VerificationMethod method, String phoneNumber) {
        TwoFactorSettings settings = twoFactorSettingsRepository
                .findById(userId)
                .orElse(new TwoFactorSettings(userId, method));

        settings.setVerificationMethod(method);
        settings.setEnabled(true);

        if (method == VerificationMethod.SMS) {
            if (Strings.isNullOrEmpty(phoneNumber)) {
                throw new IllegalArgumentException("Phone number is required for SMS verification");
            }
            settings.setPhoneNumber(phoneNumber);
        } else if (method == VerificationMethod.APP) {
            GoogleAuthenticatorKey key = googleAuthenticator.createCredentials();
            settings.setAppSecret(key.getKey());
        }

        return twoFactorSettingsRepository.save(settings);
    }

    @Transactional
    public void disableTwoFactor(Long userId) {
        TwoFactorSettings settings = twoFactorSettingsRepository
                .findById(userId)
                .orElseThrow(() -> new IllegalStateException("2FA is not enabled for this user"));

        settings.setEnabled(false);
        settings.setAppSecret(null);
        settings.setPhoneNumber(null);
        twoFactorSettingsRepository.save(settings);
    }

    public boolean isEnabled(Long userId) {
        return twoFactorSettingsRepository
                .findById(userId)
                .map(TwoFactorSettings::isEnabled)
                .orElse(false);
    }

    public String generateQrCodeUrl(Long userId, String username) {
        TwoFactorSettings settings = twoFactorSettingsRepository
                .findById(userId)
                .orElseThrow(() -> new IllegalStateException("2FA is not enabled for this user"));

        if (settings.getVerificationMethod() != VerificationMethod.APP) {
            throw new IllegalStateException("App-based 2FA is not enabled for this user");
        }

        return GoogleAuthenticatorQRGenerator.getOtpAuthURL(
                "YourAppName",
                username,
                googleAuthenticator.createCredentials()
        );
    }

    @Transactional
    public void sendSmsCode(Long userId) {
        TwoFactorSettings settings = twoFactorSettingsRepository
                .findById(userId)
                .orElseThrow(() -> new IllegalStateException("2FA is not enabled for this user"));

        if (settings.getVerificationMethod() != VerificationMethod.SMS) {
            throw new IllegalStateException("SMS-based 2FA is not enabled for this user");
        }

        if (Strings.isNullOrEmpty(settings.getPhoneNumber())) {
            throw new IllegalStateException("Phone number is not set for this user");
        }

        String code = generateSixDigitCode();
        smsService.sendVerificationCode(settings.getPhoneNumber(), code);
    }

    @Transactional
    public boolean verifyCode(Long userId, String code) {
        if (Strings.isNullOrEmpty(code)) {
            return false;
        }

        TwoFactorSettings settings = twoFactorSettingsRepository
                .findById(userId)
                .orElseThrow(() -> new IllegalStateException("2FA is not enabled for this user"));

        if (!settings.isEnabled()) {
            return false;
        }

        boolean isValid = false;
        if (settings.getVerificationMethod() == VerificationMethod.APP) {
            isValid = verifyAppCode(settings.getAppSecret(), code);
        } else if (settings.getVerificationMethod() == VerificationMethod.SMS) {
            isValid = verifySmsCode(settings.getPhoneNumber(), code);
        }

        if (isValid) {
            settings.setLastVerifiedAt(Instant.now());
            twoFactorSettingsRepository.save(settings);
        }

        return isValid;
    }

    private boolean verifyAppCode(String secret, String code) {
        try {
            int codeInt = Integer.parseInt(code);
            return googleAuthenticator.authorize(secret, codeInt);
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private boolean verifySmsCode(String phoneNumber, String code) {
        // In a real implementation, this would verify against a stored code
        // For now, we'll delegate to the SMS service
        return smsService.verifyCode(phoneNumber, code);
    }

    private String generateSixDigitCode() {
        // Generate a random 6-digit code
        int code = 100000 + (int)(Math.random() * 900000);
        return String.valueOf(code);
    }

    public Optional<TwoFactorSettings> getSettings(Long userId) {
        return twoFactorSettingsRepository.findById(userId);
    }
}
