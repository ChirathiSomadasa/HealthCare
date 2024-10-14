
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
import PatientList from "./pages/patientList/PatientList";
import HealthCard from "./pages/patientList/HealthCard";
import AddPatient from "./pages/patientList/AddPatient";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();



function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
      <Route path="/patientList" element={<PatientList />} />
          <Route
            path="/patientList/HealthCard/:patientId"
            element={<HealthCard />}
          />
          <Route path="/patientList/AddPatient" element={<AddPatient />} />
        </Routes>
      </BrowserRouter>

      {/* <ReactQueryDevtools initialIsOpen={false} position="bottom" /> */}
    </QueryClientProvider>

  );
}

export default App;
