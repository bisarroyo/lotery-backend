require('dotenv').config();

const config = {
  host: process.env.HOST + process.env.PORT,
  port: process.env.PORT || 3000,
  db: {
    database: process.env.DB_NAME || '',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || ''
  },
  jwt: {
    secret: process.env.JWT_SECRET || ''
  },
  paypal: {
    client_id: process.env.PAYPAL_CLIENT_ID || '',
    client_secret: process.env.PAYPAL_CLIENT_SECRET || '',
    client_mail: process.env.PAYPAL_CLIENT_MAIL || '',
    client_sandbox_url: process.env.PAYPAL_CLIENT_SANDBOX_URL || '',
    client_live_url: process.env.PAYPAL_CLIENT_LIVE_URL || '',
  }
}

module.exports = config;