import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAppointments, deleteAppointment } from '../api';
import { toast } from 'react-hot-toast';
import { Trash2, User, Activity, Clock, Search, Loader2, Calendar, Coffee, ClipboardList } from 'lucide-react';
import HolidayManager from '../components/HolidayManager';

const Admin = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('appointments'); // 'appointments' or 'holidays'

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const result = await getAppointments();
            setAppointments(result.data);
        } catch (error) {
            toast.error('Failed to load appointments');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this appointment?')) return;

        try {
            await deleteAppointment(id);
            toast.success('Appointment deleted');
            setAppointments(appointments.filter(app => app._id !== id));
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    const filteredAppointments = appointments.filter(app =>
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.diseaseType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
                        <p className="text-gray-600">Manage all booked appointments</p>
                    </div>
                </div>

                {/* Tab Switcher */}
                <div className="flex space-x-2 mb-8 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 w-fit">
                    <button
                        onClick={() => setActiveTab('appointments')}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'appointments' ? 'bg-medical-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <ClipboardList className="h-5 w-5" />
                        <span>Appointments</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('holidays')}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'holidays' ? 'bg-orange-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <Coffee className="h-5 w-5" />
                        <span>Holidays</span>
                    </button>
                </div>

                {activeTab === 'appointments' ? (
                    <>
                        <div className="relative mb-8">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search by name or disease..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-medical-500 outline-none w-full md:w-80 shadow-sm"
                            />
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center h-64">
                                <Loader2 className="h-10 w-10 text-medical-600 animate-spin" />
                            </div>
                        ) : (
                            <div className="space-y-12">
                                {Object.entries(
                                    filteredAppointments.reduce((acc, app) => {
                                        const date = app.appointmentDate;
                                        if (!acc[date]) acc[date] = [];
                                        acc[date].push(app);
                                        return acc;
                                    }, {})
                                ).sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB)).map(([date, apps]) => (
                                    <div key={date}>
                                        <div className="flex items-center space-x-4 mb-6">
                                            <div className="h-px flex-grow bg-gray-200"></div>
                                            <h3 className="text-xl font-bold text-medical-700 bg-medical-50 px-6 py-2 rounded-full border border-medical-100 flex items-center">
                                                <Calendar className="h-5 w-5 mr-2" />
                                                {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                            </h3>
                                            <div className="h-px flex-grow bg-gray-200"></div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {apps.map((app) => (
                                                <motion.div
                                                    key={app._id}
                                                    layout
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative group overflow-hidden hover:shadow-md transition-shadow"
                                                >
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div className="bg-medical-50 p-3 rounded-xl text-medical-600">
                                                            <User className="h-6 w-6" />
                                                        </div>
                                                        <button
                                                            onClick={() => handleDelete(app._id)}
                                                            className="text-gray-400 hover:text-red-500 transition-colors p-2"
                                                        >
                                                            <Trash2 className="h-5 w-5" />
                                                        </button>
                                                    </div>

                                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{app.name}</h3>
                                                    <div className="flex items-center text-medical-600 text-sm font-semibold mb-4">
                                                        <Activity className="h-4 w-4 mr-1" />
                                                        {app.diseaseType}
                                                    </div>

                                                    <div className="space-y-2 text-sm text-gray-600 mb-6">
                                                        <p className="flex items-center"><span className="w-16 font-medium text-gray-400 text-xs uppercase tracking-wider">Age:</span> {app.age} ({app.gender})</p>
                                                        <p className="flex items-center"><span className="w-16 font-medium text-gray-400 text-xs uppercase tracking-wider">Phone:</span> {app.phone}</p>
                                                        <p className="flex items-start"><span className="w-16 font-medium flex-shrink-0 text-gray-400 text-xs uppercase tracking-wider">Address:</span> {app.address}</p>
                                                        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center text-medical-700 bg-medical-50/50 px-3 py-2 rounded-xl">
                                                            <Clock className="h-4 w-4 mr-2" />
                                                            <span className="font-bold text-lg">{app.appointmentTime}</span>
                                                        </div>
                                                    </div>

                                                    <div className="border-t pt-4 flex items-center text-[10px] text-gray-400 uppercase tracking-widest">
                                                        <Calendar className="h-3 w-3 mr-1" />
                                                        Booked: {new Date(app.createdAt).toLocaleDateString()}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                {filteredAppointments.length === 0 && (
                                    <div className="col-span-full bg-white p-12 rounded-3xl text-center text-gray-500 border border-dashed border-gray-300">
                                        No appointments found.
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                ) : (
                    <HolidayManager />
                )}
            </div>
        </div>
    );
};

export default Admin;
