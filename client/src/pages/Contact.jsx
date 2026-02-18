import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
    return (
        <div className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h4 className="text-medical-600 font-bold uppercase tracking-wider mb-3">Get In Touch</h4>
                    <h2 className="text-4xl font-bold text-gray-900">We're Here to Help You</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-medical-50 p-8 rounded-3xl border border-medical-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-white p-3 rounded-xl shadow-sm text-medical-600">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Our Location</h4>
                                        <p className="text-gray-600">123 Medical Avenue, Juhu, Mumbai - 400049</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-white p-3 rounded-xl shadow-sm text-medical-600">
                                        <Phone className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Phone Number</h4>
                                        <p className="text-gray-600">+91 98765 43210</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-white p-3 rounded-xl shadow-sm text-medical-600">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Email Address</h4>
                                        <p className="text-gray-600">info@dlclinic.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-white p-3 rounded-xl shadow-sm text-medical-600">
                                        <Clock className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Working Hours</h4>
                                        <p className="text-gray-600">Mon - Sat: 09:00 AM - 08:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="bg-gray-200 h-64 rounded-3xl overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-medium">
                                Interactive Map Integration
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-medical-500 outline-none transition-all" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">Email</label>
                                    <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-medical-500 outline-none transition-all" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Subject</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-medical-500 outline-none transition-all" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Message</label>
                                <textarea rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-medical-500 outline-none transition-all"></textarea>
                            </div>
                            <button className="w-full bg-medical-600 text-white py-4 rounded-xl font-bold hover:bg-medical-700 transition-all shadow-md">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
