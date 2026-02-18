import React from 'react';
import { motion } from 'framer-motion';
import {
    Stethoscope,
    Smile,
    Dna,
    Activity,
    HeartPulse,
    Baby,
    Bone,
    Microscope
} from 'lucide-react';

const Services = () => {
    const services = [
        {
            title: 'General Checkup',
            desc: 'Comprehensive physical exams and health monitoring for all ages.',
            icon: Stethoscope,
            color: 'bg-blue-100 text-blue-600'
        },
        {
            title: 'Dental Care',
            desc: 'Advanced oral hygiene, fillings, whitening, and surgery.',
            icon: Smile,
            color: 'bg-teal-100 text-teal-600'
        },
        {
            title: 'Dermatology',
            desc: 'Expert skin treatments for acne, aging, and skin diseases.',
            icon: Dna,
            color: 'bg-purple-100 text-purple-600'
        },
        {
            title: 'Orthopedic',
            desc: 'Joint recovery, bone health, and physical therapy services.',
            icon: Bone,
            color: 'bg-orange-100 text-orange-600'
        },
        {
            title: 'Cardiology',
            desc: 'Specialized heart care and diagnostic cardiovascular tests.',
            icon: HeartPulse,
            color: 'bg-red-100 text-red-600'
        },
        {
            title: 'Pediatrics',
            desc: 'Specialized medical care for infants, children, and adolescents.',
            icon: Baby,
            color: 'bg-pink-100 text-pink-600'
        },
        {
            title: 'Laboratory',
            desc: 'Accurate and fast diagnostic testing for various conditions.',
            icon: Microscope,
            color: 'bg-indigo-100 text-indigo-600'
        },
        {
            title: 'Emergency',
            desc: '24/7 immediate medical attention for critical health issues.',
            icon: Activity,
            color: 'bg-rose-100 text-rose-600'
        }
    ];

    return (
        <div className="py-20 bg-gray-50">
            <div className="container mx-auto px-6 text-center">
                <h4 className="text-medical-600 font-bold uppercase tracking-wider mb-3">Our Expertise</h4>
                <h2 className="text-4xl font-bold text-gray-900 mb-12">High-Quality Medical Services</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover-card"
                        >
                            <div className={`${service.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                                <service.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
