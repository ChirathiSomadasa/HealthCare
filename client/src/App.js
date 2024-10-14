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
import AddAppointment from './pages/Appointments/addAppointment';
import Confirmation from './pages/Appointments/Confirmation';
import ViewAppointment from './pages/Appointments/viewAppointments';
import EditAppointment from './pages/Appointments/EditAppointment';
import Information from './pages/Information/information';



function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
    <Route path="/signup" element={<SignUp />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signout" element={<SignOut />} />
    <Route path="/profile" element={<Profile />} />
    <Route path = "/appointmentstrt" element={<AppointmentStart/>}/>
    <Route path = "/Doctorappointments" element={<DoctorAppointment/>}/>
      <Route path = "/DoctorEntry" element={<DoctorEntryForm/>}/>
      <Route path = "/addAppointment" element={<AddAppointment/>}/>
      <Route path = "/confirmation" element={<Confirmation/>}/>
      <Route path = "/viewAllAppointments" element={<ViewAppointment/>}/>
      <Route path = "/editAppointment" element={<EditAppointment/>}/>
      <Route path = "/Information" element={<Information/>}/>
     
      
     
    </Routes>
  </BrowserRouter>
  );
}

export default App;
