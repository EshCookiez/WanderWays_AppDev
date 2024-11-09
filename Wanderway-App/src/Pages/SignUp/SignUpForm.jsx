import React from 'react';
import TextField from './TextField';
import Button from './Button';
import SocialSignUp from './SocialSignUp';
import styles from './SignUpForm.module.css';

const SignUpForm = () => {
  const fields = [
    { label: 'First Name', placeholder: 'Vince Kimlo' },
    { label: 'Last Name', placeholder: 'Tan' },
    { label: 'Email', placeholder: 'vincekimlo.tan@cit.edu' },
    { label: 'Phone Number', placeholder: '09665566551' },
    { label: 'Password', placeholder: '•••••••••••••••••••••••••', type: 'password' },
    { label: 'Confirm Password', placeholder: '•••••••••••••••••••••••••', type: 'password' }
  ];

  return (
    <section className={styles.signUp}>
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/633aaaa339ee7af67a22595035717caa8c4a23d51c73dfdc999464c1de6a97bb?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78" alt="Logo" className={styles.logo} />
          <div className={styles.formContent}>
            <h1 className={styles.title}>Sign up</h1>
            <p className={styles.description}>
              Let's get you all set up so you can access your personal account.
            </p>
            <form className={styles.form}>
              <div className={styles.fieldGroup}>
                {fields.map((field, index) => (
                  <TextField key={index} {...field} />
                ))}
              </div>
              <div className={styles.termsAgreement}>
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/1bec477041224fb7fc3922fecf0f0268dca8625a91ef0c7f9a15c09f74890b18?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78" alt="" className={styles.checkIcon} />
                <p>
                  I agree to all the <span className={styles.highlight}>Terms</span> and{' '}
                  <span className={styles.highlight}>Privacy Policies</span>
                </p>
              </div>
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
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/65aedc7690e0892376156452d8dcd7b4cdefa7c7a8a86b44d402b23527aecb94?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78" alt="Sign up illustration" className={styles.sideImage} />
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;