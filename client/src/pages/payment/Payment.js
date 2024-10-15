import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Payment.css';
import CardPayment from './CardPayment';
import InsurancePayment from './InsurancePayment';

const Payment = ({ appointmentId }) => {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [doctorInfo, setDoctorInfo] = useState({ doctorName: '', fees: 0 });
    const [totalAmount, setTotalAmount] = useState(0);

    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        cardOwner: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: ''
    });
    const [insuranceDetails, setInsuranceDetails] = useState({
        InsuranceCompany: '',
        PolicyNumber: '',
        PolicyholderName: '',
    });


    useEffect(() => {
        // Fetch doctor and fees
        const fetchDoctorInfo = async () => {
            try {
                const response = await axios.get(`/api/appointment/${appointmentId}`);
                setDoctorInfo(response.data);
                setTotalAmount(response.data.fees);
            } catch (error) {
                console.error('Error fetching doctor info', error);
            }
        };

        fetchDoctorInfo();

    }, [appointmentId]);
    



    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };
    const handleCardDetailsChange = (updatedDetails) => {
        setCardDetails(updatedDetails);
    };
    const handleInsuranceDetailsChange = (updatedDetails) => {
        setInsuranceDetails(updatedDetails);
    };


    const handleSubmitPayment = async () => {
        try {
            let paymentData = {
                // appointmentId,
                paymentMethod,
                totalAmount,
            };

            // Add card, insurance, or cash details based on payment method
            if (paymentMethod === 'card') {
                
                paymentData = {
                    ...paymentData,
                    cardDetails,
                };
            } else if (paymentMethod === 'insurance') {
                
                paymentData = {
                    ...paymentData,
                    insuranceDetails,
                };
            } else if (paymentMethod === 'cash') {
                const cashDetails = {
                    depositorName: document.getElementById('depositorName').value,
                    telephone: document.getElementById('telephone').value,
                    email: document.getElementById('email').value,
                    // Here, we assume the bank slip file has already been uploaded via form data to the server
                    bankSlip: document.getElementById('bankSlip').files[0].name, // This assumes the file upload has been handled
                };
                paymentData = {
                    ...paymentData,
                    cashDetails,
                };
            }

            // Send payment data to backend
            await axios.post('http://localhost:5002/api/payment', paymentData);
            alert('Payment successful');
            
        } catch (error) {
            console.error('Payment failed', error);
            alert('Payment failed, please try again');
        }
    };

  
    return (
        <div className="payment-container">
            <h2>Choose Your Payment Method</h2>

            <div className="payment-methods">
                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={handlePaymentMethodChange}
                    />
                    Card
                </label>

                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="insurance"
                        checked={paymentMethod === 'insurance'}
                        onChange={handlePaymentMethodChange}
                    />
                    Insurance
                </label>

                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={paymentMethod === 'cash'}
                        onChange={handlePaymentMethodChange}
                    />
                    Cash
                </label>
            </div>
            <hr/>

            <div className="payment-methods-flyinout">
                
                {paymentMethod === 'card' && (
                    <CardPayment onCardDetailsChange={handleCardDetailsChange} />
                )}
                {paymentMethod === 'insurance' && (
                    <InsurancePayment onInsuranceDetailsChange={handleInsuranceDetailsChange } />
                )}
                {paymentMethod === 'cash' && (
                    
                    <div className="cash-details">
                        <h2>Cash Payment Instructions</h2>
                        <p>Please pay cash at the hospital reception on the day of your appointment.</p>
                        <h3>Bank Details for Cash Transfer:</h3>
                        <ul className="bank-details">
                            <li><strong>Account No:</strong> 8891593099</li>
                            <li><strong>Name:</strong> HealthCare</li>
                            <li><strong>Bank:</strong> People's Bank</li>
                            <li><strong>Branch:</strong> Colombo 10</li>
                        </ul>

                        <div className="card-inputs">
                            <div className="input-group">
                                <label>Depositor's Name</label>
                                <input id="depositorName" type="text" placeholder="Depositor's Name" />
                            </div>

                            <div className="input-group">
                                <label>Telephone</label>
                                <input id="telephone" type="text" placeholder="Telephone" />
                            </div>   
                            <div className="input-group">
                                <label>Email</label>
                                <input id="email" type="text" placeholder="Email" />
                            </div>
                            <div className="input-group">
                                <label>Upload Bank Slip</label>
                                <input id="bankSlip" type="file" />
                            </div>
                        </div>
                    </div>
                    
                )}

                
                <div className="total-payment-container1" >
                    <div className="total-payment-container">
                    <table className="total-payment-table">

                        <thead className="total-payment-thead">
                            <tr>
                                <th className="total-payment-header">Appointment</th>
                                <th className="total-payment-header">Amount (Rs)</th>
                            </tr>
                        </thead>

                        <tbody className="total-payment-tbody">
                            <tr>
                                <td className="total-payment-cell">Dname: {doctorInfo.doctorName}</td>
                                <td className="total-payment-cell">Dfees: {doctorInfo.fees}</td>
                            </tr> 

                            <tr>
                                <td className="total-payment-total">Total Amount</td>
                                <td className="total-payment-total">Total-fees:{totalAmount}</td>
                            </tr>  
                        </tbody>

                    </table>
                    
                    </div>

                    <button className="Make-Payment-btn" onClick={handleSubmitPayment}>
                        Make Payment
                    </button>

                </div>

            </div>

            
        </div>
    );

};

export default Payment;
