import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { bookAppointment, getHolidays } from '../api';
import { User, Phone, MapPin, Calendar, Heart, ArrowRight, Loader2, Clock, AlertCircle } from 'lucide-react';

const Appointment = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [holidays, setHolidays] = useState([]);

    useEffect(() => {
        const fetchHolidays = async () => {
            try {
                const result = await getHolidays();
                setHolidays(result.data.map(h => h.date));
            } catch (error) {
                console.error('Error fetching holidays', error);
            }
        };
        fetchHolidays();
    }, []);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        age: '',
        gender: '',
        diseaseType: '',
        appointmentDate: '',
        appointmentTime: ''
    });

    const [errors, setErrors] = useState({});

    const diseases = [
        'General Checkup',
        'Dental',
        'Skin',
        'Orthopedic',
        'Cardiology',
        'Pediatrics',
        'Other'
    ];

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Full name is required';
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = 'Phone number must be 10 digits';
        }
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.age) {
            newErrors.age = 'Age is required';
        } else if (formData.age < 0 || formData.age > 120) {
            newErrors.age = 'Please enter a valid age';
        }
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.diseaseType) newErrors.diseaseType = 'Please select a disease type';
        if (!formData.appointmentDate) newErrors.appointmentDate = 'Appointment date is required';
        if (!formData.appointmentTime) newErrors.appointmentTime = 'Appointment time is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'appointmentDate' && holidays.includes(value)) {
            toast.error('The clinic is closed on this date. Please select another day.', {
                icon: '🏥',
                duration: 4000
            });
            return;
        }

        setFormData({ ...formData, [name]: value });
        // Clear error when user types
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            toast.error('Please fix the errors in the form');
            return;
        }

        setLoading(true);
        try {
            const result = await bookAppointment(formData);
            toast.success(result.message);
            // Navigate to confirmation page with state
            navigate('/confirmation', { state: { appointment: result.data } });
        } catch (error) {
            toast.error(error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-medical-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden border border-medical-100"
                >
                    {/* Header */}
                    <div className="bg-medical-600 px-8 py-10 text-white text-center">
                        <h2 className="text-3xl font-bold mb-2">Book Your Appointment</h2>
                        <p className="text-medical-100 italic">"Your Journey to Better Health Starts Here"</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Full Name */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700 flex items-center">
                                    <User className="h-4 w-4 mr-2 text-medical-600" /> Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none transition-all`}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            {/* Phone Number */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700 flex items-center">
                                    <Phone className="h-4 w-4 mr-2 text-medical-600" /> Phone Number
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="10-digit number"
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none transition-all`}
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>

                            {/* Age */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700 flex items-center">
                                    <Calendar className="h-4 w-4 mr-2 text-medical-600" /> Age
                                </label>
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    placeholder="Enter age"
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.age ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none transition-all`}
                                />
                                {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                            </div>

                            {/* Gender */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700 flex items-center mb-2">
                                    <Heart className="h-4 w-4 mr-2 text-medical-600" /> Gender
                                </label>
                                <div className="flex space-x-6 py-3">
                                    {['Male', 'Female', 'Other'].map((option) => (
                                        <label key={option} className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value={option}
                                                checked={formData.gender === option}
                                                onChange={handleChange}
                                                className="h-4 w-4 text-medical-600 focus:ring-medical-500 border-gray-300"
                                            />
                                            <span className="ml-2 text-gray-700">{option}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
                            </div>
                        </div>

                        {/* Address */}
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700 flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-medical-600" /> Full Address
                            </label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Street address, City, ZIP"
                                rows="3"
                                className={`w-full px-4 py-3 rounded-xl border ${errors.address ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none transition-all`}
                            ></textarea>
                            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                        </div>

                        {/* Disease Type */}
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Type of Consultation</label>
                            <select
                                name="diseaseType"
                                value={formData.diseaseType}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-xl border ${errors.diseaseType ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none transition-all bg-white`}
                            >
                                <option value="">Select a service...</option>
                                {diseases.map((disease) => (
                                    <option key={disease} value={disease}>{disease}</option>
                                ))}
                            </select>
                            {errors.diseaseType && <p className="text-red-500 text-xs mt-1">{errors.diseaseType}</p>}
                        </div>

                        {/* Date and Time Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Appointment Date */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700 flex items-center">
                                    <Calendar className="h-4 w-4 mr-2 text-medical-600" /> Appointment Date
                                </label>
                                <input
                                    type="date"
                                    name="appointmentDate"
                                    min={new Date().toISOString().split('T')[0]}
                                    value={formData.appointmentDate}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.appointmentDate ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none transition-all`}
                                />
                                {holidays.length > 0 && (
                                    <p className="text-[10px] text-orange-600 mt-1 flex items-center">
                                        <AlertCircle className="h-3 w-3 mr-1" />
                                        Clinic remains closed on some dates. Check for availability.
                                    </p>
                                )}
                                {errors.appointmentDate && <p className="text-red-500 text-xs mt-1">{errors.appointmentDate}</p>}
                            </div>

                            {/* Appointment Time */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700 flex items-center">
                                    <Clock className="h-4 w-4 mr-2 text-medical-600" /> Preferred Time
                                </label>
                                <input
                                    type="time"
                                    name="appointmentTime"
                                    value={formData.appointmentTime}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.appointmentTime ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none transition-all`}
                                />
                                {errors.appointmentTime && <p className="text-red-500 text-xs mt-1">{errors.appointmentTime}</p>}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-medical-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-medical-700 transition-all flex items-center justify-center space-x-2 card-shadow disabled:bg-medical-400 group"
                        >
                            {loading ? (
                                <Loader2 className="h-6 w-6 animate-spin" />
                            ) : (
                                <>
                                    <span>Confirm Appointment</span>
                                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div >
    );
};

export default Appointment;
