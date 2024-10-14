import React, { useState } from 'react';
import './CardPayment.css';



const InsurancePayment = ({onInsuranceDetailsChange}) => {
    const [InsuranceDetails, setInsuranceDetails] = useState({
        InsuranceCompany: '',
        PolicyNumber: '',
        PolicyholderName: '',
        // expiryYear: '',
        // cvv: ''
    });

    const handleInsuranceInputChange = (e) => {
        const { name, value } = e.target;
        const updateDatails = { ...InsuranceDetails, [name]: value }
        setInsuranceDetails(updateDatails);
        onInsuranceDetailsChange(updateDatails)
    };

    return (
        <div className="payment-page">
            <h2>Provide further information</h2>
            <p>Your payment information is safe with us</p>

            <div className="card-payment-container">
                <div className="card-details-section">
                {/* <h3>Add Insurance Details</h3> */}
                    <div className="card-inputs">
                        <div className="input-group">
                            <label>Insurance Company</label>
                            <input
                                type="text"
                                name="cardNumber"
                                placeholder="Enter card number"
                                className="card-input"
                                value={InsuranceDetails.InsuranceCompany}
                                onChange={handleInsuranceInputChange}
                            />
                        </div>

                        <div className="input-group">
                            <label>Policy Number</label>
                            <input
                                type="text"
                                name="cardOwner"
                                placeholder="Enter Policy Number"
                                className="card-input"
                                value={InsuranceDetails.PolicyNumber}
                                onChange={handleInsuranceInputChange}
                            />
                        </div>

                        <div className="input-group" style={{margin:'0 0 0 0'}}>
                            <label>Policyholder Name</label>
                            <input
                                type="text"
                                name="cardOwner"
                                placeholder="Enter Policyholder Name"
                                className="card-input"
                                value={InsuranceDetails.PolicyholderName}
                                onChange={handleInsuranceInputChange}
                            />
                        </div>

                        {/* <div className="expiry-cvv">
                            <div className="expiry-input">
                                <label>Expiry date</label>
                                <div className="expiry-fields">
                                    <input
                                        type="text"
                                        name="expiryMonth"
                                        placeholder="MM"
                                        // className="card-input"
                                        value={cardDetails.expiryMonth}
                                        onChange={handleInsuranceInputChange}
                                    />
                                    <span>/</span>
                                    <input
                                        type="text"
                                        name="expiryYear"
                                        placeholder="YY"
                                        // className="card-input"
                                        value={cardDetails.expiryYear}
                                        onChange={handleCardInputChange}
                                    />
                                </div>
                            </div>

                            <div className="cvv-input">
                                <label>CVV</label>
                                <input
                                type="text"
                                name="cvv"
                                placeholder="CVV"
                                className="card-input-cvv"
                                value={cardDetails.cvv}
                                onChange={handleCardInputChange}
                                />
                            </div>
                        </div> */}

                        {/* <button className="save-btn">Save</button> */}

                    </div>
                </div>
            </div>
            

            {/* <h3>Registered Cards</h3> */}
            {/* <div className="registered-cards-container">
                <div className="card-details-section">
                    <div className="card-inputs">
                        <table className="payment-table">
                            <thead>
                                <tr>
                                    <th className="card-header">Registered Cards</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="card-cell">No Registered Cards</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> */}

        </div>
    );
};

export default InsurancePayment;
