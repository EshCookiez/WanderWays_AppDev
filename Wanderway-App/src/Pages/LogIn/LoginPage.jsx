import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import styles from './LoginPage.module.css';
import TextField from './TextField';
import Button from './Button';
import SocialLoginButton from './SocialLoginButton';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const socialLoginOptions = [
    { icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7801fbea496dc51ca3b70e3dfb946fc34d027948fccb7a8ef44f4de0f1384fff?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78', alt: 'Facebook login' },
    { icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/2b3e976746d37f22c98a198729208f812b1b5e3ea2563e924cd36e882006f164?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78', alt: 'Google login' },
    { icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/05cfacf3e63557364865a890553d52383d1fd6f384db5ac442bfd3560424c5cd?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78', alt: 'Apple login' }
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
  
    // Check if the fields are not empty
    if (!email || !password) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }
  
    setLoading(true);
  
    try {
      // Send login request to the backend
      const response = await axios.post("http://localhost:8080/auth/login", {
        email: email,
        password: password,
      },
    {
      headers: {
        // Ensure no unnecessary headers are added here unless required
        'Content-Type': 'application/json',
      }
    });
  
      // Log the response data for debugging purposes
      console.log("Response from backend:", response);
  
      // Assuming the response contains the JWT token as a JSON object
      const token = response.data.token; // Corrected to access the token
  
      if (!token) {
        throw new Error("Token not received");
      }
  
      // Store the token in localStorage
      localStorage.setItem('jwtToken', token);
  
      console.log("Login Successful, Token saved:", token);
  
      // Redirect to the next page after login
      navigate('/user'); // Update with the correct path
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <main className={styles.loginPage}>
      <div className={styles.contentWrapper}>
        <section className={styles.loginSection}>
          <Link to='/'>
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/633aaaa339ee7af67a22595035717caa8c4a23d51c73dfdc999464c1de6a97bb?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78" alt="WanderWays logo" className={styles.logo} />
          </Link>
          <div className={styles.loginForm}>
            <h1 className={styles.title}>Login</h1>
            <p className={styles.subtitle}>Login to access your WanderWays account</p>
            <form onSubmit={handleLogin} className={styles.formLogin}>
              <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} sx={{display: 'flex'}} />
              <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} showPasswordToggle />
              {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
              <div className={styles.formOptions}>
                <label className={styles.rememberMe}>
                  <input type="checkbox" />
                  Remember me
                </label>
                <a href="" className={styles.forgotPassword}>Forgot Password</a>
                
              </div>
              
              <Button sx={{width: '100%'}}type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</Button>
            </form>
            <p className={styles.signUpPrompt}>
              Don't have an account? <a href="/signup" className={styles.signUpLink}>Sign up</a>
            </p>
            <div className={styles.divider}>
              <span className={styles.dividerLine}></span>
              <span className={styles.dividerText}>Or login with</span>
              <span className={styles.dividerLine}></span>
            </div>
            <div className={styles.socialLogin}>
              {socialLoginOptions.map((option, index) => (
                <SocialLoginButton key={index} icon={option.icon} alt={option.alt} />
              ))}
            </div>
          </div>
        </section>
      </div>
      <aside className={styles.imageSection}>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/336d983031d5f7a115585cb9dae46767d939582e27fe2ce995e01c1447e2a91d?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78" alt="Scenic travel destination" className={styles.scenicImage} />
      </aside>
    </main>
  );
};

export default LoginPage;
