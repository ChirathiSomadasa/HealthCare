import React from 'react';
import './PaymentDetails.css';

const PaymentDetails = () => {
  const paymentDetail = {
    appointmentDate: '07/09/2024',
    receiptNumber: '#NW-20240907-001',
    doctor: 'Dr. Anjana Gunawardana',
    paymentMethod: 'Credit Card',
    typeOfVisit: 'Depression Follow-Up Consultation',
    patientName: 'Kavin Madhusankha N.V.',
    contactNo: '0715678906',
    amount: '2700.00'
  };



//   const downloadReceipt = () => {
//     const doc = new jsPDF();
    
//     // Add a title
//     doc.text('Payment Receipt', 14, 20);

//     // Add some basic info
//     doc.autoTable({
//       startY: 30,
//       body: [
//         ['Appointment Date', paymentDetail.appointmentDate],
//         ['Receipt Number', paymentDetail.receiptNumber],
//         ['Doctor', paymentDetail.doctor],
//         ['Payment Method', paymentDetail.paymentMethod],
//         ['Type of Visit', paymentDetail.typeOfVisit],
//         ['Patient Name', paymentDetail.patientName],
//         ['Contact No', paymentDetail.contactNo],
//         ['Amount', `Rs ${paymentDetail.amount}`]
//       ]
//     });

//     // Save the PDF
//     doc.save(`Receipt-${paymentDetail.receiptNumber}.pdf`);
//   };


  const printReceipt = () => {
    window.print();
  };

  return (
    <div className="payment-details">
      <h2>Payment Details</h2>
      <div className="details-card">
        <p><strong>Appointment Date :</strong> {paymentDetail.appointmentDate}</p>
        <p><strong>Receipt Number :</strong> {paymentDetail.receiptNumber}</p>
        <p><strong>Doctor :</strong> {paymentDetail.doctor}</p>
        <p><strong>Payment Method :</strong> {paymentDetail.paymentMethod}</p>
        <p><strong>Type of Visit :</strong> {paymentDetail.typeOfVisit}</p>
        <p><strong>Patient Name :</strong> {paymentDetail.patientName}</p>
        <p><strong>Contact No :</strong> {paymentDetail.contactNo}</p>
        <p><strong>Amount :</strong> Rs {paymentDetail.amount}</p>
      </div>

      <div className="payment-details-actions">
        <button className="download-btn">Download Receipt</button>
        {/* <button className="download-btn" onClick={downloadReceipt}>Download Receipt</button> */}
        <button className="print-btn" onClick={printReceipt}>Print Receipt</button>
      </div>

    </div>
  );
};

export default PaymentDetails;
