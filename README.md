# DL Clinic - Full Stack Medical Booking System

A modern, responsive healthcare website built with React, Node.js, and MongoDB.

## 🚀 Getting Started

### 1. Prerequisites
* **Node.js**: Ensure you have Node.js installed on your system.
* **MongoDB**: You need a running MongoDB database. By default, it looks for `mongodb://localhost:27017/dl_clinic`.

### 2. Setup
Open two separate terminals in your IDE or system.

#### **Terminal 1: Backend (Server)**
```bash
cd server
npm install  # (If not already done)
npm run dev
```
* The server will run on `http://localhost:5000`.

#### **Terminal 2: Frontend (Client)**
```bash
cd client
npm install  # (If not already done)
npm run dev
```
* The website will be available at `http://localhost:5173`.

## 📂 Project Structure
* `/client`: React application with Tailwind CSS for the frontend.
* `/server`: Node.js/Express API with Mongoose for the backend.

## 🩺 Features
* **Home Page**: Overview of clinic services.
* **Appointment Booking**: Real-time form validation and MongoDB storage.
* **Admin Dashboard**: Access at `/admin` to manage all appointments.
* **Responsive Design**: Works perfectly on mobile, tablet, and desktop.

## 🛠 Troubleshooting
* **MongoDB Connection**: If the server fails to start, ensure your MongoDB service is running.
* **Ports**: If port 5000 or 5173 is in use, you can change them in `.env` (server) or `vite.config.js` (client).
