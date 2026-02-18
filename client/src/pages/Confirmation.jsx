import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, Calendar, User, Phone, MapPin, Activity, Home } from 'lucide-react';

const Confirmation = () => {
    const location = useLocation();
    const appointment = location.state?.appointment;

    if (!appointment) {
        return <Navigate to="/appointment" replace />;
    }

    return (
        <div className="min-h-screen bg-medical-50 py-12 px-4 flex items-center justify-center">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-medical-100"
            >
                <div className="bg-medical-500 py-10 text-white text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    >
                        <CheckCircle className="h-20 w-20 mx-auto mb-4" />
                    </motion.div>
                    <h2 className="text-3xl font-bold">Booking Confirmed!</h2>
                    <p className="text-medical-100 mt-2">Thank you for choosing DL Clinic</p>
                </div>

                <div className="p-8">
                    <h3 className="text-lg font-bold text-gray-900 border-b pb-4 mb-6">Appointment Summary</h3>

                    <div className="space-y-4">
                        <div className="flex items-start">
                            <User className="h-5 w-5 text-medical-600 mt-0.5 mr-4 flex-shrink-0" />
                            <div>
                                <p className="text-sm text-gray-500">Patient Name</p>
                                <p className="font-semibold text-gray-900">{appointment.name}</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <Activity className="h-5 w-5 text-medical-600 mt-0.5 mr-4 flex-shrink-0" />
                            <div>
                                <p className="text-sm text-gray-500">Department</p>
                                <p className="font-semibold text-gray-900">{appointment.diseaseType}</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <Phone className="h-5 w-5 text-medical-600 mt-0.5 mr-4 flex-shrink-0" />
                            <div>
                                <p className="text-sm text-gray-500">Contact Number</p>
                                <p className="font-semibold text-gray-900">{appointment.phone}</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <MapPin className="h-5 w-5 text-medical-600 mt-0.5 mr-4 flex-shrink-0" />
                            <div>
                                <p className="text-sm text-gray-500">Address</p>
                                <p className="font-semibold text-gray-900">{appointment.address}</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <Calendar className="h-5 w-5 text-medical-600 mt-0.5 mr-4 flex-shrink-0" />
                            <div>
                                <p className="text-sm text-gray-500">Appointment Date</p>
                                <p className="font-semibold text-gray-900">{appointment.appointmentDate}</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-medical-600 mt-0.5 mr-4 flex-shrink-0" />
                            <div>
                                <p className="text-sm text-gray-500">Preferred Time</p>
                                <p className="font-semibold text-gray-900">{appointment.appointmentTime}</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <Calendar className="h-5 w-5 text-medical-600 mt-0.5 mr-4 flex-shrink-0" />
                            <div>
                                <p className="text-sm text-gray-500">Request Submitted</p>
                                <p className="font-semibold text-gray-900">{new Date(appointment.createdAt).toLocaleDateString()} at {new Date(appointment.createdAt).toLocaleTimeString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col space-y-3">
                        <button
                            onClick={() => window.print()}
                            className="w-full bg-gray-100 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center"
                        >
                            Download Receipt
                        </button>
                        <Link
                            to="/"
                            className="w-full bg-medical-600 text-white py-3 rounded-xl font-semibold hover:bg-medical-700 transition-colors flex items-center justify-center space-x-2"
                        >
                            <Home className="h-4 w-4" />
                            <span>Back to Home</span>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Confirmation;
