document.addEventListener('DOMContentLoaded', function() {
    const enable2FAButton = document.getElementById('enable-2fa');
    const disable2FAButton = document.getElementById('disable-2fa');
    const smsOption = document.getElementById('sms-option');
    const appOption = document.getElementById('app-option');
    const statusMessage = document.getElementById('status-message');

    enable2FAButton.addEventListener('click', function() {
        if (smsOption.checked) {
            setup2FA('sms');
        } else if (appOption.checked) {
            setup2FA('app');
        } else {
            statusMessage.textContent = 'Please select a 2FA method.';
        }
    });

    disable2FAButton.addEventListener('click', function() {
        disable2FA();
    });

    function setup2FA(method) {
        // Simulate an API call to enable 2FA
        setTimeout(function() {
            statusMessage.textContent = `2FA enabled using ${method}.`;
        }, 1000);
    }

    function disable2FA() {
        // Simulate an API call to disable 2FA
        setTimeout(function() {
            statusMessage.textContent = '2FA disabled.';
        }, 1000);
    }
});
