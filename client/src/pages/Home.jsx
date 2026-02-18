import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center overflow-hidden bg-medical-50">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-medical-100/80 to-transparent"></div>
                    {/* I'll use a descriptive placeholder for a medical image since I can't generate one easily without tool call, 
              but the user asked for rich aesthetics. I'll use a colored background pattern. */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-medical-200/20 rounded-l-[100px] hidden lg:block"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl"
                    >
                        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                            Your Health is Our <span className="text-medical-600">Top Priority</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            At DL Clinic, we provide world-class medical services with a team of expert doctors and state-of-the-art technology.
                        </p>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <Link
                                to="/appointment"
                                className="bg-medical-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-medical-700 transition-all card-shadow flex items-center justify-center group"
                            >
                                Book Appointment
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/services"
                                className="bg-white text-medical-600 px-8 py-4 rounded-full font-bold text-lg border-2 border-medical-600 hover:bg-medical-50 transition-all flex items-center justify-center"
                            >
                                Our Services
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-12"
                    >
                        <motion.div variants={itemVariants} className="bg-white p-8 rounded-2xl card-shadow border border-medical-50 text-center hover-card">
                            <div className="bg-medical-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShieldCheck className="h-8 w-8 text-medical-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Certified Experts</h3>
                            <p className="text-gray-600">Our doctors are highly qualified and winners of prestigious medical awards.</p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="bg-white p-8 rounded-2xl card-shadow border border-medical-50 text-center hover-card">
                            <div className="bg-medical-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Clock className="h-8 w-8 text-medical-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">24/7 Support</h3>
                            <p className="text-gray-600">We are always available for emergencies and routine consultations.</p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="bg-white p-8 rounded-2xl card-shadow border border-medical-50 text-center hover-card">
                            <div className="bg-medical-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Users className="h-8 w-8 text-medical-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Patient Centric</h3>
                            <p className="text-gray-600">Individual attention and personalized treatment plans for every patient.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-medical-600 text-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold mb-2">15k+</div>
                            <div className="text-medical-100">Happy Patients</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">25+</div>
                            <div className="text-medical-100">Specialist Doctors</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">10+</div>
                            <div className="text-medical-100">Years Experience</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">100%</div>
                            <div className="text-medical-100">Care & Support</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
