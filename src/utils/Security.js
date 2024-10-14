import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

/**
  * Encrypts the given data using AES-256-CBC encryption.
  * @param {Buffer | string} data - The data to encrypt.
  * @returns {string} - The encrypted data in hexadecimal format.
  */
export function encryptData(data) {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

/**
  * Decrypts the given encrypted data using AES-256-CBC encryption.
  * @param {string} encryptedData - The encrypted data in hexadecimal format.
  * @returns {string} - The decrypted data.
  */
export function decryptData(encryptedData) {
    const textParts = encryptedData.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
