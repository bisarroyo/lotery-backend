require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  db: {
    database: process.env.DB_NAME || 'tabtracker',
    user: process.env.DB_USER || 'tabtracker',
    password: process.env.DB_PASSWORD || 'tabtracker'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'tabtracker'
  }
}

module.exports = config;