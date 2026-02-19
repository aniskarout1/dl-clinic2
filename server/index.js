try {
    require('dotenv').config();
    const express = require('express');
    const mongoose = require('mongoose');
    const cors = require('cors');
    const appointmentRoutes = require('./routes/appointmentRoutes');

    const holidayRoutes = require('./routes/holidayRoutes');

    const app = express();
    console.log('Server process starting...');

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Routes
    app.use('/api/appointments', appointmentRoutes);
    app.use('/api/holidays', holidayRoutes);

    // Database Connection
    const PORT = process.env.PORT || 5000;
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dl_clinic';

    console.log('Attempting to connect to MongoDB...');

    mongoose.connect(MONGO_URI)
        .then(() => {
            console.log('✅ Successfully connected to MongoDB');
            app.listen(PORT, () => {
                console.log(`🚀 Server is running on port ${PORT}`);
            });
        })
        .catch((error) => {
            console.error('❌ Error connecting to MongoDB:', error.message);
            // On Render, we want the process to exit if it can't connect, 
            // so Render knows the service failed to start.
            process.exit(1);
        });
} catch (error) {
    const fs = require('fs');
    fs.writeFileSync('crash.log', error.stack || error.message);
    process.exit(1);
}
