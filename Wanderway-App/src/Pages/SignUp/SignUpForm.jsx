import React, { useState } from 'react';
import axios from 'axios';
import TextField from './TextField';
import Button from './Button';
import SocialSignUp from './SocialSignUp';
import styles from './SignUpForm.module.css';
import { useNavigate } from 'react-router-dom'; // Add this for navigation

const SignUpForm = () => {
  const [isAgreed, setIsAgreed] = useState(false); // State to track checkbox value
  const [isFormValid, setIsFormValid] = useState(true); // State to track form validity
  const [errorMessage, setErrorMessage] = useState(""); // State to track error message
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    customerAddress: '',
    birthdate: ''
  });

  const navigate = useNavigate(); // Initialize useNavigate for redirection

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  // Validate email format
  const isEmailValid = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);  // Before sending the request

    // Check if the terms are agreed
    if (!isAgreed) {
      setIsFormValid(false);
      return;
    }

    if (formData.password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      return;
    }
  
    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    if (!isEmailValid(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setIsLoading(true); // Set loading state to true during the request
  
    try {
      const response = await axios.post('http://localhost:8080/auth/signup', {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        customerAddress: formData.customerAddress,
        birthdate: formData.birthdate
      });
  
      console.log('Response:', response);  // Add this to check the full response
  
      if (response.status === 201) { // Assuming the server returns 201 on successful account creation
        // Reset form on success
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
          customerAddress: '',
          birthdate: ''
        });
        setSuccessMessage('Account created successfully! Redirecting to login page.');
        setErrorMessage('');  // Clear any previous error messages
        setTimeout(() => {
          navigate('/login'); // Use navigate to go to the login page after a brief delay
        }, 2000); // Add a 2-second delay before navigation
      } else {
        setErrorMessage('Unexpected response from server');
      }
    } catch (error) {
      // Log error details
      console.error('Error creating account:', error);
  
      // Handle different errors here
      if (error.response && error.response.data) {
        if (error.response.data.message === 'Email already in use') {
          setErrorMessage('The email address is already in use. Please use a different email.');
        } else {
          setErrorMessage('Error creating account. Please try again later.');
        }
      } else {
        setErrorMessage('The email address is already in use. Please use a different email.');
      }
    }
  };
  

  const fields = [
    { label: 'First Name', name: 'firstName', value: formData.firstName },
    { label: 'Last Name', name: 'lastName', value: formData.lastName },
    { label: 'Email', name: 'email', value: formData.email },
    { label: 'Phone Number', name: 'phoneNumber', value: formData.phoneNumber },
    { label: 'Password', name: 'password', type: 'password', value: formData.password },
    { label: 'Confirm Password', name: 'confirmPassword', type: 'password', value: formData.confirmPassword },
    { label: 'Address', name: 'customerAddress', value: formData.customerAddress },  // Update 'address' to 'customerAddress'
    { label: 'Birthdate', name: 'birthdate', type: 'date', value: formData.birthdate }
  ];
  

  return (
    <section className={styles.signUp}>
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/633aaaa339ee7af67a22595035717caa8c4a23d51c73dfdc999464c1de6a97bb?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78"
            alt="Logo"
            className={styles.logo}
          />
          <div className={styles.formContent}>
            <h1 className={styles.title}>Sign up</h1>
            <p className={styles.description}>
              Let's get you all set up so you can access your personal account.
            </p>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.fieldGroup}>
                {fields.map((field, index) => (
                  <TextField
                    key={index}
                    {...field}
                    onChange={handleChange}
                    required
                  />
                ))}
              </div>
              <div className={styles.termsAgreement}>
                <label className={styles.termsLabel}>
                  <input
                    type="checkbox"
                    checked={isAgreed}
                    onChange={() => setIsAgreed(!isAgreed)}
                    required
                  />
                  <span>I agree to all the <span className={styles.highlight}>Terms</span> and <span className={styles.highlight}>Privacy Policies</span></span>
                </label>
              </div>
              {!isFormValid && <p className={styles.errorMessage}>You must agree to the terms and privacy policies to sign up.</p>}
              {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
              {successMessage && <p className={styles.successMessage}>{successMessage}</p>} {/* Show success message */}
              <Button text="Create account" fullWidth />
              <p className={styles.loginLink}>
                Already have an account? <a href="/login" className={styles.loginLink}>Log In</a>
              </p>
            </form>
            <div className={styles.divider}>
              <span className={styles.dividerLine}></span>
              <span className={styles.dividerText}>Or Sign up with</span>
              <span className={styles.dividerLine}></span>
            </div>
            <SocialSignUp />
          </div>
        </div>
        <div className={styles.imageWrapper}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/65aedc7690e0892376156452d8dcd7b4cdefa7c7a8a86b44d402b23527aecb94?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78"
            alt="Sign up illustration"
            className={styles.sideImage}
          />
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;
