import React from 'react';
import { motion } from 'framer-motion';
import { Award, Heart, CheckCircle2 } from 'lucide-react';

const About = () => {
    return (
        <div className="py-20">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Image Placeholder/Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2 relative"
                    >
                        <div className="bg-medical-100 rounded-3xl h-[400px] w-full flex items-center justify-center relative overflow-hidden">
                            <div className="absolute top-10 right-10 w-24 h-24 bg-medical-500/20 blur-xl animate-pulse"></div>
                            <div className="absolute bottom-10 left-10 w-32 h-32 bg-medical-300/30 blur-2xl"></div>
                            <div className="z-10 text-center">
                                <div className="mx-auto w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-4">
                                    <Heart className="h-10 w-10 text-medical-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-medical-800">Care with Heart</h3>
                            </div>
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-medical-50 hidden md:block">
                            <div className="flex items-center space-x-4">
                                <div className="bg-green-100 p-3 rounded-full">
                                    <Award className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Founded In</p>
                                    <p className="font-bold text-gray-900">2014</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2"
                    >
                        <h4 className="text-medical-600 font-bold tracking-wider uppercase mb-3">About DL Clinic</h4>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                            We Are Committed To Your <span className="text-medical-600">Better Health</span>
                        </h2>
                        <p className="text-gray-600 mb-8 text-lg">
                            DL Clinic has been at the forefront of medical excellence for over a decade. We combine advanced healthcare technology with a compassionate approach, ensuring every patient receives the best possible treatment.
                        </p>

                        <div className="space-y-4">
                            {[
                                'Top-tier medical specialists',
                                'Advanced diagnostic laboratory',
                                'Patient-first philosophy',
                                'Modern medical equipment'
                            ].map((item, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <CheckCircle2 className="h-5 w-5 text-medical-500" />
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <button className="mt-10 bg-medical-600 text-white px-8 py-3 rounded-full font-bold hover:bg-medical-700 transition-all card-shadow">
                            Learn More About Our Team
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default About;
