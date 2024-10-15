import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './CardPayment.css';



const CardPayment = ({onCardDetailsChange}) => {
    const [cardDetails, setCardDetails] = useState({  // input card details store in
        cardNumber: '',
        cardOwner: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: ''
    });

    const [registeredCards, setRegisteredCards] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false); // State to track form validity


    // Function to handle card input changes
    const handleCardInputChange = (e) => {
        const { name, value } = e.target;
        const updateDatails = { ...cardDetails, [name]: value }
        setCardDetails(updateDatails);
        onCardDetailsChange(updateDatails)
    };


    // Function to validate the card details form
    const validateForm = () => {
        const { cardNumber, cardOwner, expiryMonth, expiryYear, cvv } = cardDetails;
        const currentYear = new Date().getFullYear().toString().slice(-2); // Get the last two digits of the current year

        // Basic validation checks
        const isCardNumberValid = /^\d{16}$/.test(cardNumber);
        const isCardOwnerValid = /^[a-zA-Z ]+$/.test(cardOwner) && cardOwner.trim().length >= 2;
        const isExpiryMonthValid = /^(0[1-9]|1[0-2])$/.test(expiryMonth);
        const isExpiryYearValid = /^\d{2}$/.test(expiryYear) && parseInt(expiryYear) >= parseInt(currentYear);
        const isCVVValid = /^\d{3}$/.test(cvv);

        // Return true if all fields are valid
        return isCardNumberValid && isCardOwnerValid && isExpiryMonthValid && isExpiryYearValid && isCVVValid;
    };

    // Use effect to update the form validity state whenever the card details change
    useEffect(() => {
        setIsFormValid(validateForm());
    }, [cardDetails]);


    // Fetch registered cards on component load
    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await axios.get('http://localhost:5002/api_p/api_gcard/card-details');
                setRegisteredCards(response.data);
                // setLoadingCards(false);
            } catch (error) {
                console.error('Error fetching registered cards', error);
                // setLoadingCards(false);
            }
        };
        fetchCards();
    }, []);


    // Function to handle saving the card details
    const handleSaveCardDetails = async () => {

        if (!isFormValid) return;

        try {
            // Send a POST request to the backend API to save the card details
            const response = await axios.post('http://localhost:5002/api_p/api_pcard/card-details', cardDetails);

            console.log('Response:', response);

            if (response.data.success) {
                alert('Card details saved successfully');
                const updatedCards = await axios.get('http://localhost:5002/api_p/api_gcard/card-details');
                setRegisteredCards(updatedCards.data);            
            } else {
                alert('Failed to save card details');
            }
        } catch (error) {
            console.error('Error saving card details', error);
            alert('An error occurred while saving card details');
        }
    };


    const handleSaveButtonClick = () => {
        if (!isFormValid) {
            alert('Please enter valid inputs for all fields.'); 
        } else {
            handleSaveCardDetails(); // Call the original save function if valid
        }
    };

  
    // Function to handle card removal
    const handleRemoveCard = async (cardNumber) => {
        try {
            const response = await axios.delete(`http://localhost:5002/api_p/api_pcard/card-details/${cardNumber}`);
            if (response.data.success) {
                alert('Card removed successfully');
                // Refresh the registered cards list
                const updatedCards = await axios.get('http://localhost:5002/api_p/api_gcard/card-details');
                setRegisteredCards(updatedCards.data);
            } else {
                alert('Failed to remove card');
            }
        } catch (error) {
            console.error('Error removing card', error);
            alert('An error occurred while removing the card');
        }
    };


    return (
        <div className="payment-page">
            <h2>Provide further information</h2>
            <p>Your payment information is safe with us</p>

            <div className="card-payment-container">
                <div className="card-details-section">
                <h3>Add new card</h3>
                    <div className="card-inputs">
                        <div className="input-group">
                            <label>Card number</label>
                            <input
                                type="text"
                                name="cardNumber"
                                placeholder="Enter card number"
                                className="card-input"
                                value={cardDetails.cardNumber}
                                onChange={handleCardInputChange}
                                maxLength={16} // Limit card number to 16 characters
                            />
                        </div>

                        <div className="input-group">
                            <label>Card owner</label>
                            <input
                                type="text"
                                name="cardOwner"
                                placeholder="Enter card owner name"
                                className="card-input"
                                value={cardDetails.cardOwner}
                                onChange={handleCardInputChange}
                                maxLength={50} // Limit card owner to 50 characters
                            />
                        </div>

                        <div className="expiry-cvv">
                            <div className="expiry-input">
                                <label>Expiry date</label>
                                <div className="expiry-fields">
                                    <input
                                        type="text"
                                        name="expiryMonth"
                                        placeholder="MM"
                                        // className="card-input"
                                        value={cardDetails.expiryMonth}
                                        onChange={handleCardInputChange}
                                        maxLength={2}
                                    />
                                    <span>/</span>
                                    <input
                                        type="text"
                                        name="expiryYear"
                                        placeholder="YY"
                                        // className="card-input"
                                        value={cardDetails.expiryYear}
                                        onChange={handleCardInputChange}
                                        maxLength={2}
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
                                    maxLength={4}
                                />
                            </div>
                        </div>

                        <button className="save-btn" onClick={handleSaveButtonClick}  >
                            Save
                        </button>

                    </div>
                </div>
            </div>

            <div className="registered-cards-container">
                <div className="card-details-section">
                    {/* <h3>Registered Cards</h3> */}

                    <div className="card-inputs">

                        <table className="payment-table">
                            <thead>
                                <tr>
                                    <th className="card-header">Registered Cards</th>
                                    <th className="remove-header">Action</th> {/* Add a header for the action column */}
                                </tr>
                            </thead>
                            <tbody>
                                {registeredCards.length > 0 ? (
                                    registeredCards.map((card, index) => (
                                        <tr key={index}>
                                            <td className="card-cell">
                                                {Number(card.cardNumber) ? String(card.cardNumber).replace(/.(?=.{4})/g, '*') : 'Invalid card number'} {' - '} {card.expiryMonth}/{card.expiryYear}
                                            </td>
                                            {/* <td className="card-cell">
                                                {card.expiryMonth}/{card.expiryYear}
                                            </td> */}
                                            <td className="remove-cell"> {/* New cell for the delete button */}
                                                <button className="remove-btn" onClick={() => handleRemoveCard(card.cardNumber)}>
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="card-cell" colSpan="3">No Registered Cards</td>
                                    </tr>
                                )}
                            </tbody>
                            
                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardPayment;
