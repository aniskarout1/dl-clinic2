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
    // Allow local fallback only if not on Render
    const MONGO_URI = process.env.MONGO_URI || (process.env.NODE_ENV !== 'production' ? 'mongodb://127.0.0.1:27017/dl_clinic' : null);

    if (!MONGO_URI) {
        console.error('❌ ERROR: MONGO_URI is not defined!');
        console.log('If you are on Render, you MUST add MONGO_URI to the Environment tab.');
        process.exit(1);
    }

    console.log('Attempting to connect to MongoDB...');

    // Set strictQuery to suppress warning in newer Mongoose
    mongoose.set('strictQuery', false);

    mongoose.connect(MONGO_URI, {
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    })
        .then(() => {
            console.log('✅ Successfully connected to MongoDB');
            app.listen(PORT, () => {
                console.log(`🚀 Server is running on port ${PORT}`);
                const domain = MONGO_URI.includes('cluster') ? 'MongoDB Atlas (Cloud)' : 'Local MongoDB';
                console.log(`📡 Database Type: ${domain}`);
            });
        })
        .catch((error) => {
            console.error('❌ MongoDB Connection Error:', error.message);
            console.log('\n--- TROUBLESHOOTING ---');
            console.log('1. Check if your MONGO_URI password is correct.');
            console.log('2. Ensure IP 0.0.0.0/0 is allowed in MongoDB Atlas Network Access.');
            console.log('3. If using Atlas, ensure your connection string is for "Node.js 2.2.12 or later".');
            console.log('-----------------------\n');
            process.exit(1);
        });
} catch (error) {
    const fs = require('fs');
    console.error('CRITICAL SERVER ERROR:', error);
    fs.writeFileSync('crash.log', error.stack || error.message);
    process.exit(1);
}
