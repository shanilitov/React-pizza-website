import '../CSS/MockPaymentForm.css';
import React, { useState } from 'react';
import { usePaymentInputs } from 'react-payment-inputs';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCreditCard } from 'react-icons/fa';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  .inputWrapper {
    position: relative;
  }
  .inputWrapper .icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    font-size: 1.5em;
  }
  .inputWrapper input {
    padding-right: 40px;
  }
`;

const MockPaymentForm = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps, getCardImageProps } = usePaymentInputs();

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            const { cardNumber, expiryDate, cvc } = meta;
            console.log(cardNumber?.value)
            console.log(expiryDate?.value)
            console.log(cvc?.value)
            if (cardNumber?.value.replace(/\s+/g, '') === '4242424242424242' && expiryDate?.value && cvc?.value) {
                setMessage('Payment Successful!');
            } else {
                setMessage('Payment Failed. Please try again.');
            }
        }, 2000);
        setTimeout(()=>{
            navigate('/finish2')
        }, 1000)
    };

    const getCardIcon = () => {
        const { cardType } = meta;
        switch (cardType) {
            case 'visa':
                return <FaCcVisa />;
            case 'mastercard':
                return <FaCcMastercard />;
            case 'amex':
                return <FaCcAmex />;
            default:
                return <FaCreditCard />;
        }
    };

    return (
        <div className="payment-form-container">
            <h2>Payment</h2>
            <form onSubmit={handleSubmit}>
                <Container>
                    <div className="form-group inputWrapper">
                        {/* {getCardIcon()} */}
                        <label>Card Number</label>
                        <input {...getCardNumberProps({ onChange: () => { } })} placeholder="Enter card number" required />

                    </div>
                    <div className="form-group inputWrapper">
                        <label>Expiry Date</label>
                        <input {...getExpiryDateProps({ onChange: () => { } })} placeholder="MM/YY" required />
                    </div>
                    <div className="form-group inputWrapper">
                        <label>CVC</label>
                        <input {...getCVCProps({ onChange: () => { } })} placeholder="CVC" required />
                    </div>
                </Container>
                <button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : 'Pay'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default MockPaymentForm;
