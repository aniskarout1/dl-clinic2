import axios from 'axios';

const API_URL = 'https://dl-clinic2.onrender.com/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const bookAppointment = async (appointmentData) => {
    try {
        const response = await api.post('/appointments', appointmentData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Network Error' };
    }
};

export const getAppointments = async () => {
    try {
        const response = await api.get('/appointments');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Network Error' };
    }
};

export const deleteAppointment = async (id) => {
    try {
        const response = await api.delete(`/appointments/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Network Error' };
    }
};

// --- Holiday APIs ---
export const getHolidays = async () => {
    try {
        const response = await api.get('/holidays');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Network Error' };
    }
};

export const addHoliday = async (holidayData) => {
    try {
        const response = await api.post('/holidays', holidayData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Network Error' };
    }
};

export const deleteHoliday = async (id) => {
    try {
        const response = await api.delete(`/holidays/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Network Error' };
    }
};

export default api;
