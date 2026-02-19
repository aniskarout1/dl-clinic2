import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Lock, User, LogIn, Loader2 } from 'lucide-react';

const Login = () => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simple hardcoded check for demo or use env variable
        // In a real app, this should be a backend call
        const adminPass = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

        setTimeout(() => {
            if (password === adminPass) {
                localStorage.setItem('isAdminAuthenticated', 'true');
                toast.success('Admin access granted');
                navigate('/admin');
            } else {
                toast.error('Invalid admin credentials');
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
            >
                <div className="bg-medical-600 p-8 text-white text-center">
                    <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30 backdrop-blur-sm">
                        <Lock className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold">Admin Login</h2>
                    <p className="text-medical-100 text-sm mt-2">Access restricted to clinic staff only</p>
                </div>

                <form onSubmit={handleLogin} className="p-8 space-y-6">
                    <div className="space-y-4">
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <User className="h-5 w-5" />
                            </span>
                            <input
                                type="text"
                                defaultValue="admin"
                                readOnly
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-gray-500 focus:outline-none cursor-not-allowed"
                            />
                        </div>

                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <Lock className="h-5 w-5" />
                            </span>
                            <input
                                type="password"
                                placeholder="Admin Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-medical-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-medical-700 transition-all flex items-center justify-center space-x-2 disabled:bg-medical-400"
                    >
                        {loading ? (
                            <Loader2 className="h-6 w-6 animate-spin" />
                        ) : (
                            <>
                                <LogIn className="h-5 w-5" />
                                <span>Login securely</span>
                            </>
                        )}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
