import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getHolidays, addHoliday, deleteHoliday } from '../api';
import { toast } from 'react-hot-toast';
import { Plus, Trash2, Calendar, Coffee, Loader2, AlertCircle } from 'lucide-react';

const HolidayManager = () => {
    const [holidays, setHolidays] = useState([]);
    const [loading, setLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [formData, setFormData] = useState({
        date: '',
        reason: ''
    });

    useEffect(() => {
        fetchHolidays();
    }, []);

    const fetchHolidays = async () => {
        try {
            const result = await getHolidays();
            setHolidays(result.data);
        } catch (error) {
            toast.error('Failed to load holidays');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.date) {
            toast.error('Please select a date');
            return;
        }

        setBtnLoading(true);
        try {
            const result = await addHoliday(formData);
            toast.success(result.message);
            setHolidays([...holidays, result.data].sort((a, b) => new Date(a.date) - new Date(b.date)));
            setFormData({ date: '', reason: '' });
        } catch (error) {
            toast.error(error.message || 'Error adding holiday');
        } finally {
            setBtnLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Remove this holiday?')) return;
        try {
            await deleteHoliday(id);
            toast.success('Holiday removed');
            setHolidays(holidays.filter(h => h._id !== id));
        } catch (error) {
            toast.error('Failed to remove holiday');
        }
    };

    const getDayName = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long' });
    };

    return (
        <div className="space-y-12">
            {/* Add Holiday Form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
            >
                <div className="flex items-center space-x-3 mb-8">
                    <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
                        <Plus className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Mark a New Holiday</h3>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700 block">Select Date</label>
                        <input
                            type="date"
                            value={formData.date}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700 block">Reason (Optional)</label>
                        <input
                            type="text"
                            placeholder="e.g. Conference, Leave"
                            value={formData.reason}
                            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={btnLoading}
                        className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition-all flex items-center justify-center space-x-2 h-[50px] disabled:bg-orange-300"
                    >
                        {btnLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <span>Add to Holiday List</span>}
                    </button>
                </form>
            </motion.div>

            {/* Holiday Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center">
                        <Coffee className="h-5 w-5 mr-3 text-orange-600" />
                        Upcoming Holidays
                    </h3>
                    <span className="bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-sm font-bold">
                        {holidays.length} Dates Marked
                    </span>
                </div>

                {loading ? (
                    <div className="p-12 text-center text-gray-500"><Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" /> Loading records...</div>
                ) : holidays.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-gray-400 text-xs uppercase tracking-wider font-bold">
                                    <th className="px-8 py-4">Date</th>
                                    <th className="px-8 py-4">Day</th>
                                    <th className="px-8 py-4">Reason</th>
                                    <th className="px-8 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {holidays.map((h) => (
                                    <tr key={h._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-8 py-5 font-bold text-gray-900">{h.date}</td>
                                        <td className="px-8 py-5">
                                            <span className="bg-gray-100 px-3 py-1 rounded-lg text-gray-600 text-sm font-medium italic">
                                                {getDayName(h.date)}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-gray-600">{h.reason || 'General Holiday'}</td>
                                        <td className="px-8 py-5 text-right">
                                            <button
                                                onClick={() => handleDelete(h._id)}
                                                className="text-gray-400 hover:text-red-500 p-2 transition-colors rounded-lg hover:bg-red-50"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-12 text-center text-gray-400">
                        <AlertCircle className="h-10 w-10 mx-auto mb-4 opacity-20" />
                        <p className="font-medium italic">No holidays marked yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HolidayManager;
