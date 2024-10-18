import React, { useState } from 'react';

const TwoFactorAuthSetup = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [method, setMethod] = useState(''); // 'sms' or 'app'

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
      <button onClick={handleEnable2FA} disabled={is2FAEnabled}>
        Enable 2FA
      </button>
      <button onClick={handleDisable2FA} disabled={!is2FAEnabled}>
        Disable 2FA
      </button>
      {is2FAEnabled && <p>2FA is enabled using {method} method.</p>}
    </div>
  );
};

export default TwoFactorAuthSetup;
