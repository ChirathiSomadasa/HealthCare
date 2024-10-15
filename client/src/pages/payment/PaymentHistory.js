import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './PaymentHistory.css';

const PaymentHistory = () => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [paymentHistory, setPaymentHistory] = useState([]);


  useEffect(() => {
    // Fetch payment history from the backend
    const fetchPaymentHistory = async () => {
      try {
        const response = await axios.get('/api/payment/history');
        setPaymentHistory(response.data);
      } catch (error) {
        console.error('Error fetching payment history', error);
      }
    };

    fetchPaymentHistory();
  }, []);




  const paymentData = [
    { doctor: 'Dr. Pooja Kariyawasam', date: '05/07/2024', amount: '2500.00' },
    { doctor: 'Dr. Nihal Silva', date: '28/06/2024', amount: '3000.00' },
    { doctor: 'Dr. Anjana Gunawardana', date: '15/07/2024', amount: '2700.00' },
    { doctor: 'Dr. Pooja Kariyawasam', date: '08/07/2024', amount: '2500.00' },
    { doctor: 'Dr. Anjana Gunawardana', date: '29/06/2024', amount: '2700.00' },
    { doctor: 'Dr. Deepika Thejani', date: '18/06/2024', amount: '3200.00' },
  ];

  const filteredData = paymentData.filter(item =>
    item.doctor.toLowerCase().includes(search.toLowerCase())
  );

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
          <tr>
            <th className="payment-header">Doctor</th>
            <th className="payment-header">Date</th>
            <th className="payment-header">Amount (Rs)</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index} className="payment-row">
              <td className="payment-cell">{item.doctor}</td>
              <td className="payment-cell">{item.date}</td>
              <td className="payment-cell">{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default PaymentHistory;
