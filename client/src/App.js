import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";
import SignOut from "./pages/signout/SignOut";
import Profile from "./pages/profile/Profile";
import PatientList from "./pages/patientList/PatientList";
import HealthCard from "./pages/patientList/HealthCard";
import AddPatient from "./pages/patientList/AddPatient";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/home/Home";
import Medical from "./pages/profile/Medical";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Payment from './pages/payment/Payment';
import Payment1 from './pages/payment/PaymentHistory';
import Payment3 from './pages/payment/PaymentDetails';
import Payment2 from './pages/payment/CardPayment';

//appointments
import AppointmentStart from './pages/Appointments/AppointmentStart';
import DoctorAppointment from './pages/Appointments/DoctorAppointment';
import DoctorEntryForm from './pages/Appointments/DoctorEntryForm';
import AddAppointment from './pages/Appointments/addAppointment';
import Confirmation from './pages/Appointments/Confirmation';
import ViewAppointment from './pages/Appointments/viewAppointments';
import EditAppointment from './pages/Appointments/EditAppointment';


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
          <Route path="/patientList" element={<PatientList />} />
          <Route
            path="/patientList/HealthCard/:patientId"
            element={<HealthCard />}
          />
          <Route path="/patientList/AddPatient" element={<AddPatient />} />


          <Route path="/paymentmethod" element={<Payment />} />
          <Route path="/payment" element={<Payment1 />} />
          <Route path="/payment2" element={<Payment2 />} />
          <Route path="/payment3" element={<Payment3 />} />

          <Route path="/" element={<Home />} />



          <Route path="/appointments" element={<AppointmentStart />} />
          <Route path="/Doctorappointments" element={<DoctorAppointment />} />
          <Route path="/DoctorEntry" element={<DoctorEntryForm />} />
          <Route path="/addAppointment" element={<AddAppointment />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/viewAllAppointments" element={<ViewAppointment />} />
          <Route path="/editAppointment/:id" element={<EditAppointment />} />


        </Routes>
      </BrowserRouter>

      {/* <ReactQueryDevtools initialIsOpen={false} position="bottom" /> */}
    </QueryClientProvider>
  );
}

export default App;
