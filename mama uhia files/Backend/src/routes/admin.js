import express from 'express'
import User from '../models/User.js'
import HealthRecord from '../models/HealthRecord.js'
import { verifyAdmin } from '../middleware/auth.js'

const router = express.Router()

// Get all users
router.get('/users', verifyAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password')

    const usersWithRecordCount = await Promise.all(
      users.map(async (user) => {
        const recordCount = await HealthRecord.countDocuments({ userId: user._id })
        return {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          lastLogin: user.lastLogin,
          recordCount,
        }
      })
    )

    res.json(usersWithRecordCount)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message })
  }
})

// Get user stats
router.get('/stats', verifyAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()
    const totalRecords = await HealthRecord.countDocuments()

    res.json({
      totalUsers,
      totalRecords,
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stats', error: error.message })
  }
})

// Get user details
router.get('/users/:id', verifyAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const records = await HealthRecord.find({ userId: req.params.id })

    res.json({
      user,
      records,
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user details', error: error.message })
  }
})

export default router
