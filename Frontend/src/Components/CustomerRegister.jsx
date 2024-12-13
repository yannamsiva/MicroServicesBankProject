import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BannerImage from "../assets/login.png";
import config from './Configuration/config';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    address: '',
    phone: '',
  });

  

  const handleBackClick = () => {
    navigate("/");
  };
  const [errors, setErrors] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault();
   // const token = localStorage.getItem('jwt');
    // Validate the form fields
    if (!validateFields()) {
      return;
    }
    axios
      .post(`http://localhost:${config.port}/login/customer/register`, values, {
        headers: {
          'Content-Type': 'application/json',
         // Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        navigate('/customerlogin');
      })
      .catch((error) => console.log(error));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };
  const validateFields = () => {
    let isValid = true;
    const errors = {};
    // Validate username
    if (values.username.trim() === '') {
      isValid = false;
      errors.username = 'Please enter a username';
    }
    // Validate email
    if (!isValidEmail(values.email)) {
      isValid = false;
      errors.email = 'Please enter a valid email address';
    }
    // Validate password
    if (values.password.length < 8) {
      isValid = false;
      errors.password = 'Password should be at least 8 characters long';
    }
    // Validate address
    if (values.address.trim() === '') {
      isValid = false;
      errors.address = 'Please enter an address';
    }
    // Validate phone
    if (!isValidPhone(values.phone)) {
      isValid = false;
      errors.phone = 'Please enter a valid phone number';
    }
    setErrors(errors);
    return isValid;
  };
  const isValidEmail = (email) => {
    // Email validation logic
    const emailPattern = /\S+@\S+\.\S+/;
    return emailPattern.test(email);
  };
  const isValidPhone = (phone) => {
    // Phone validation logic
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phone);
  };

  const formContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '430px',
    margin: '9px auto 0 720px',
    padding: '10px ',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    backgroundColor: 'rgba(242, 242, 242, 0.8)',
    height: '590px',
    border: '1px solid black',
    overflowY: 'scroll', maxHeight: '1000px',
  }

  const labelStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '5px',
    alignItems: 'center',
  };

  const buttonStyle = {
    padding: '8px 16px',
    background: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    alignSelf: 'center',
  };

  const containerStyle = {
    backgroundImage: `url(${BannerImage})`,
    backgroundRepeat: 'no-repeat',
    // backgroundSize: 'cover',
   margin:'5px'
   
  
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px', // Adjust this value to control the gap between buttons
  };


  return (
    <div style={containerStyle}>
    <div style={formContainerStyle}>
        <form onSubmit={handleSubmit}>
          <h4 style={{ textAlign: 'center' }}>Customer Registration</h4>
          <label style={labelStyle}>
            Username:
            <input
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              className={errors.username ? 'error' : ''}
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </label>
          <label style={labelStyle}>
            Email:
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </label>
          <label style={labelStyle}>
            Password:
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </label>
          <label style={labelStyle}>
            Address:
            <input
              type="text"
              name="address"
              value={values.address}
              onChange={handleChange}
              className={errors.address ? 'error' : ''}
            />
            {errors.address && <span className="error-text">{errors.address}</span>}
          </label>
          <label style={labelStyle}>
            Phone:
            <input
              type="text"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              className={errors.phone ? 'error' : ''}
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </label>
          <div style={buttonContainerStyle}>
          <button type="submit" style={buttonStyle}>Register</button>
          <button style={buttonStyle} onClick={handleBackClick}>
          Back
        </button>
        </div>
        </form>
      </div>
      </div>
    
  );
};
export default RegisterForm;