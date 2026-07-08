import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import config from './config/config.js'
import authRoutes from './routes/auth.js'
import healthRoutes from './routes/health.js'
import adminRoutes from './routes/admin.js'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Database connection
mongoose.connect(config.mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection failed:', err))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/health', healthRoutes)
app.use('/api/admin', adminRoutes)

// Health check endpoint
app.get('/api/health-check', (req, res) => {
  res.json({ status: 'Server is running' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong', error: err.message })
})

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})
