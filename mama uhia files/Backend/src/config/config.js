import dotenv from 'dotenv'

dotenv.config()

export default {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/mama-uhai',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-here',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  nodeEnv: process.env.NODE_ENV || 'development',
}
