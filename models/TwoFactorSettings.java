package models;

import java.time.Instant;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Entity
@Table(name = "two_factor_settings")
public class TwoFactorSettings {

    public enum VerificationMethod {
        SMS,
        APP
    }

    @Id
    private Long userId;

    @Column(nullable = false)
    private boolean enabled;

    @Enumerated(EnumType.STRING)
    @Column(name = "verification_method")
    private VerificationMethod verificationMethod;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "app_secret")
    private String appSecret;

    @Column(name = "last_verified_at")
    private Instant lastVerifiedAt;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    // Default constructor for JPA
    public TwoFactorSettings() {
    }

    // Constructor with required fields
    public TwoFactorSettings(Long userId, VerificationMethod verificationMethod) {
        this.userId = userId;
        this.verificationMethod = verificationMethod;
        this.enabled = false;
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    // Getters and setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
        this.updatedAt = Instant.now();
    }

    public VerificationMethod getVerificationMethod() {
        return verificationMethod;
    }

    public void setVerificationMethod(VerificationMethod verificationMethod) {
        this.verificationMethod = verificationMethod;
        this.updatedAt = Instant.now();
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        this.updatedAt = Instant.now();
    }

    public String getAppSecret() {
        return appSecret;
    }

    public void setAppSecret(String appSecret) {
        this.appSecret = appSecret;
        this.updatedAt = Instant.now();
    }

    public Instant getLastVerifiedAt() {
        return lastVerifiedAt;
    }

    public void setLastVerifiedAt(Instant lastVerifiedAt) {
        this.lastVerifiedAt = lastVerifiedAt;
        this.updatedAt = Instant.now();
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }
}
