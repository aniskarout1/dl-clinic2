const mongoose = require('mongoose');

const holidaySchema = new mongoose.Schema({
    date: {
        type: String,
        required: [true, 'Date is required'],
        unique: true
    },
    reason: {
        type: String,
        trim: true,
        default: 'Holiday'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Holiday', holidaySchema);
