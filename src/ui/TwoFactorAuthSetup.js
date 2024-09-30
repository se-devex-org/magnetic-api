import React, { useState } from 'react';

const TwoFactorAuthSetup = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [method, setMethod] = useState('sms'); // default method

  const handleEnable2FA = () => {
    // Logic to enable 2FA
    setIs2FAEnabled(true);
  };

  const handleDisable2FA = () => {
    // Logic to disable 2FA
    setIs2FAEnabled(false);
  };

  const handleMethodChange = (event) => {
    setMethod(event.target.value);
  };

  return (
    <div>
      <h2>Two-Factor Authentication Setup</h2>
      <div>
        <label>
          <input
            type="radio"
            value="sms"
            checked={method === 'sms'}
            onChange={handleMethodChange}
          />
          SMS-based
        </label>
        <label>
          <input
            type="radio"
            value="app"
            checked={method === 'app'}
            onChange={handleMethodChange}
          />
          App-based
        </label>
      </div>
      <div>
        {is2FAEnabled ? (
          <button onClick={handleDisable2FA}>Disable 2FA</button>
        ) : (
          <button onClick={handleEnable2FA}>Enable 2FA</button>
        )}
      </div>
    </div>
  );
};

export default TwoFactorAuthSetup;
