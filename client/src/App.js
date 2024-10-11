import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import SignUp from './pages/signup/SignUp';
import Login from './pages/login/Login';
import SignOut from './pages/signout/SignOut';
import Profile from './pages/profile/Profile';
import AppointmentStart from './pages/Appointments/AppointmentStart';
import DoctorAppointment from './pages/Appointments/DoctorAppointment';
import DoctorEntryForm from './pages/Appointments/DoctorEntryForm';

function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
    <Route path="/signup" element={<SignUp />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signout" element={<SignOut />} />
    <Route path="/profile" element={<Profile />} />
    <Route path = "/appointments" element={<AppointmentStart/>}/>
    <Route path = "/Doctorappointments" element={<DoctorAppointment/>}/>
      <Route path = "/DoctorEntry" element={<DoctorEntryForm/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
