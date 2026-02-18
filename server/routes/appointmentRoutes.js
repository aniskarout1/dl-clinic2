const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Holiday = require('../models/Holiday');

// POST /api/appointments - Create a new appointment
router.post('/', async (req, res) => {
    try {
        const { name, phone, address, age, gender, diseaseType, appointmentDate, appointmentTime } = req.body;

        // Check if the date is a holiday
        const isHoliday = await Holiday.findOne({ date: appointmentDate });
        if (isHoliday) {
            return res.status(400).json({
                success: false,
                message: `Sorry, the clinic is closed on ${appointmentDate} (${isHoliday.reason || 'Holiday'}). Please choose another date.`
            });
        }

        const newAppointment = new Appointment({
            name,
            phone,
            address,
            age,
            gender,
            diseaseType,
            appointmentDate,
            appointmentTime
        });

        const savedAppointment = await newAppointment.save();

        // OPTIONAL: Send Email Confirmation (Requires SMTP config)
        /*
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        const mailOptions = {
          from: 'DL Clinic <no-reply@dlclinic.com>',
          to: 'patient-email@example.com', // In a real app, you'd collect the patient's email
          subject: 'Appointment Confirmation - DL Clinic',
          text: `Dear ${name}, your appointment for ${diseaseType} has been confirmed.`
        };

        transporter.sendMail(mailOptions);
        */

        res.status(201).json({
            success: true,
            message: 'Appointment booked successfully!',
            data: savedAppointment
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// GET /api/appointments - Get all appointments (Admin view)
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ appointmentDate: 1, appointmentTime: 1 });
        res.status(200).json({
            success: true,
            count: appointments.length,
            data: appointments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
});

// DELETE /api/appointments/:id - Delete an appointment
router.delete('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Appointment deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
});

module.exports = router;
