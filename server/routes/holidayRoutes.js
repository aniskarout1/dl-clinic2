const express = require('express');
const router = express.Router();
const Holiday = require('../models/Holiday');

// GET /api/holidays - Get all holidays
router.get('/', async (req, res) => {
    try {
        const holidays = await Holiday.find().sort({ date: 1 });
        res.status(200).json({
            success: true,
            data: holidays
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
});

// POST /api/holidays - Add a new holiday
router.post('/', async (req, res) => {
    try {
        const { date, reason } = req.body;

        // Check if date already exists
        const existing = await Holiday.findOne({ date });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: 'This date is already marked as a holiday'
            });
        }

        const holiday = new Holiday({ date, reason });
        await holiday.save();

        res.status(201).json({
            success: true,
            message: 'Holiday added successfully',
            data: holiday
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// DELETE /api/holidays/:id - Delete a holiday
router.delete('/:id', async (req, res) => {
    try {
        const holiday = await Holiday.findByIdAndDelete(req.params.id);
        if (!holiday) {
            return res.status(404).json({
                success: false,
                message: 'Holiday not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Holiday removed successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
});

module.exports = router;
