import express from 'express'
import HealthRecord from '../models/HealthRecord.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

// Get all health records for the current user
router.get('/records', verifyToken, async (req, res) => {
  try {
    const records = await HealthRecord.find({ userId: req.user.id })
      .sort({ date: -1 })

    res.json(records)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch records', error: error.message })
  }
})

// Add a new health record
router.post('/records', verifyToken, async (req, res) => {
  try {
    const { date, weight, bloodPressure, notes } = req.body

    if (!date || !weight || !bloodPressure) {
      return res.status(400).json({ message: 'Required fields missing' })
    }

    const record = new HealthRecord({
      userId: req.user.id,
      date,
      weight,
      bloodPressure,
      notes,
    })

    await record.save()

    res.status(201).json({
      message: 'Health record added successfully',
      record,
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to add record', error: error.message })
  }
})

// Update a health record
router.put('/records/:id', verifyToken, async (req, res) => {
  try {
    const { weight, bloodPressure, notes } = req.body

    const record = await HealthRecord.findById(req.params.id)
    if (!record) {
      return res.status(404).json({ message: 'Record not found' })
    }

    if (record.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    record.weight = weight || record.weight
    record.bloodPressure = bloodPressure || record.bloodPressure
    record.notes = notes || record.notes

    await record.save()

    res.json({
      message: 'Health record updated successfully',
      record,
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to update record', error: error.message })
  }
})

// Delete a health record
router.delete('/records/:id', verifyToken, async (req, res) => {
  try {
    const record = await HealthRecord.findById(req.params.id)
    if (!record) {
      return res.status(404).json({ message: 'Record not found' })
    }

    if (record.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    await HealthRecord.findByIdAndDelete(req.params.id)

    res.json({ message: 'Health record deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete record', error: error.message })
  }
})

export default router
