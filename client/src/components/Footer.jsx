import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Clinic Info */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center space-x-2 text-white">
                            <img src="/logo.svg" alt="DL Clinic Logo" className="h-8 w-8 object-contain" />
                            <span className="text-xl font-bold">DL <span className="text-medical-400">Clinic</span></span>
                        </Link>
                        <p className="text-sm leading-relaxed">
                            Providing modern healthcare solutions with a touch of compassion. Your health is our top priority.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-medical-400 transition-colors"><Facebook className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-medical-400 transition-colors"><Twitter className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-medical-400 transition-colors"><Instagram className="h-5 w-5" /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-white font-semibold text-lg">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="hover:text-medical-400 transition-colors">Home</Link></li>
                            <li><Link to="/about" className="hover:text-medical-400 transition-colors">About Us</Link></li>
                            <li><Link to="/services" className="hover:text-medical-400 transition-colors">Our Services</Link></li>
                            <li><Link to="/appointment" className="hover:text-medical-400 transition-colors">Book Appointment</Link></li>
                            <li><Link to="/contact" className="hover:text-medical-400 transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-4">
                        <h3 className="text-white font-semibold text-lg">Contact Us</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-medical-400 flex-shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-medical-400 flex-shrink-0" />
                                <span>info@dlclinic.com</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <MapPin className="h-5 w-5 text-medical-400 flex-shrink-0" />
                                <span>123 Medical Avenue, Juhu, Mumbai - 400049</span>
                            </li>
                        </ul>
                    </div>

                    {/* Clinic Timings */}
                    <div className="space-y-4">
                        <h3 className="text-white font-semibold text-lg">Working Hours</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex justify-between">
                                <span>Mon - Fri:</span>
                                <span className="text-medical-400 font-medium">09:00 AM - 08:00 PM</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Saturday:</span>
                                <span className="text-medical-400 font-medium">09:00 AM - 06:00 PM</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Sunday:</span>
                                <span className="text-medical-400 font-medium">Closed</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 mt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} DL Clinic. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
