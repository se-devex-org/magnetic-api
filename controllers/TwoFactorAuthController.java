package controllers;

import models.TwoFactorSettings;
import models.TwoFactorSettings.VerificationMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import services.TwoFactorAuthService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@RestController
@RequestMapping("/api/2fa")
public class TwoFactorAuthController {

    private final TwoFactorAuthService twoFactorAuthService;

    @Autowired
    public TwoFactorAuthController(TwoFactorAuthService twoFactorAuthService) {
        this.twoFactorAuthService = twoFactorAuthService;
    }

    @GetMapping("/status")
    public ResponseEntity<TwoFactorSettings> getStatus(@AuthenticationPrincipal UserDetails userDetails) {
        return twoFactorAuthService.getSettings(getUserId(userDetails))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/enable")
    public ResponseEntity<TwoFactorSettings> enable(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam @NotNull VerificationMethod method,
            @RequestParam(required = false) String phoneNumber) {
        TwoFactorSettings settings = twoFactorAuthService.enableTwoFactor(
                getUserId(userDetails),
                method,
                phoneNumber
        );
        return ResponseEntity.ok(settings);
    }

    @PostMapping("/disable")
    public ResponseEntity<Void> disable(@AuthenticationPrincipal UserDetails userDetails) {
        twoFactorAuthService.disableTwoFactor(getUserId(userDetails));
        return ResponseEntity.ok().build();
    }

    @GetMapping("/qr-code")
    public ResponseEntity<String> getQrCode(@AuthenticationPrincipal UserDetails userDetails) {
        String qrCodeUrl = twoFactorAuthService.generateQrCodeUrl(
                getUserId(userDetails),
                userDetails.getUsername()
        );
        return ResponseEntity.ok(qrCodeUrl);
    }

    @PostMapping("/send-sms")
    public ResponseEntity<Void> sendSmsCode(@AuthenticationPrincipal UserDetails userDetails) {
        twoFactorAuthService.sendSmsCode(getUserId(userDetails));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/verify")
    public ResponseEntity<Boolean> verifyCode(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam @NotNull String code) {
        boolean isValid = twoFactorAuthService.verifyCode(getUserId(userDetails), code);
        return ResponseEntity.ok(isValid);
    }

    private Long getUserId(UserDetails userDetails) {
        // This assumes that the UserDetails implementation includes the user ID
        // You might need to adjust this based on your actual UserDetails implementation
        return Long.parseLong(userDetails.getUsername());
    }
}
