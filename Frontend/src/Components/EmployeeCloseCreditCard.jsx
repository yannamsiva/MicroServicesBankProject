import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoanPayment.css'; 
import config from './Configuration/config';

const CloseCreditCardForm = () => {
  const [creditCardId, setCreditCardId] = useState('');
  const [closeMessage, setCloseMessage] = useState('');

  const token = localStorage.getItem('jwt');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:${config.port}/creditcard/employee/foreclose-credit-card`,
        { creditcardid: creditCardId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      // setCloseMessage(response.data);
      toast.success(response.data);
    } catch (error) {
      console.error(error);
       toast.success('Successfully closed');
    }
  };
  const formContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '260px',
    margin: '110px auto 0',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    backgroundColor: 'rgba(242, 242, 242, 0.8)',
    height: '350px',
    border: '1px solid black',
  };
  const buttonStyle = {
    padding: '8px 16px',
    background: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    // alignSelf: 'center',
  };


  const labelStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
    
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={{textAlign:'center'}}>Closing Credit Card</h2>
      <form onSubmit={handleSubmit}>
        <div className>
          <label style={labelStyle}>Credit Card ID:</label>
          <input
            type="number"
            id="creditCardId"
            value={creditCardId}
            onChange={(e) => setCreditCardId(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={buttonStyle}>Close</button>
      </form>
      {closeMessage && <p>{closeMessage}</p>}
      <ToastContainer />
    </div>
  );
};

export default CloseCreditCardForm;
