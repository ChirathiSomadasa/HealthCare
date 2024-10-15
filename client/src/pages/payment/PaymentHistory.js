import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';

import './PaymentHistory.css';



const PaymentHistory = () => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [paymentHistory, setPaymentHistory] = useState([]);

  const navigate = useNavigate();

  const handlePaymentDetails = () => {
    // alert("Redirecting to payment page...");
    navigate("/payment3"); // Pass the doctorName to Payment page
  };



  useEffect(() => {
    // Fetch payment history from the backend
    const fetchPaymentHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api_p/payment/history');
        setPaymentHistory(response.data);
      } catch (error) {
        console.error('Error fetching payment history', error);
      }
    };

    fetchPaymentHistory();
  }, []);




  const paymentData = [
    { doctorName: 'Dr. Pooja Kariyawasam', date: '05/07/2024', amount: '2500.00' },
    { doctorName: 'Dr. Nihal Silva', date: '28/06/2024', amount: '3000.00' },
    { doctorName: 'Dr. Anjana Gunawardana', date: '15/07/2024', amount: '2700.00' },
    // { doctor: 'Dr. Pooja Kariyawasam', date: '08/07/2024', amount: '2500.00' },
    // { doctor: 'Dr. Anjana Gunawardana', date: '29/06/2024', amount: '2700.00' },
    // { doctor: 'Dr. Deepika Thejani', date: '18/06/2024', amount: '3200.00' },
  ];



  const filteredData = paymentHistory.filter(item =>
    item.doctorName.toLowerCase().includes(search.toLowerCase())
  );

  // Sort the filtered data based on selected sort option
  const sortedData = [...filteredData].sort((a, b) => {
    const dateA = new Date(a.paidDate);
    const dateB = new Date(b.paidDate);
    return sortBy === 'asc' ? dateA - dateB : dateB - dateA;
  });



  return (
    <div className="payment-history">
      <div className="payment-header-container">
        <h2>Payment History</h2>

        <div className="payment-history-header">
          <input
            type="text"
            placeholder="Search by Doctor"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort by date</option>
            <option value="asc">Oldest to Newest</option>
            <option value="desc">Newest to Oldest</option>
          </select>
        </div>
      </div>

      <table className="payment-table">

        <thead>
          <tr className="payment-row">
            <th className="payment-header">Doctor</th>
            <th className="payment-header">Date</th>
            <th className="payment-header">Amount (Rs)</th>
            <th className="payment-header">Details</th>
          </tr>
        </thead>

        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index} className="payment-row" >
              <td className="payment-cell">{item.doctorName}</td>
              <td className="payment-cell">
                {new Date(item.paidDate).toLocaleDateString('en-SL', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                })}
              </td>
              <td className="payment-cell">RS {item.totalAmount}</td>

              <td style={{display: 'flex', alignItems: 'center'}}>
                <button className="save-btn" onClick={handlePaymentDetails} style={{width:'100%' }}>
                  Payment Details
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
};

export default PaymentHistory;
