const dotenv = require('dotenv');

// Load environment variables from a .env file if available
dotenv.config();

const config = {
  encryptionKey: process.env.ENCRYPTION_KEY || 'default_encryption_key',
};

module.exports = config;
