import React from 'react';
import styles from './LoginPage.module.css';
import TextField from './TextField';
import Button from './Button';
import SocialLoginButton from './SocialLoginButton';

const LoginPage = () => {
  const socialLoginOptions = [
    { icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7801fbea496dc51ca3b70e3dfb946fc34d027948fccb7a8ef44f4de0f1384fff?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78', alt: 'Facebook login' },
    { icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/2b3e976746d37f22c98a198729208f812b1b5e3ea2563e924cd36e882006f164?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78', alt: 'Google login' },
    { icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/05cfacf3e63557364865a890553d52383d1fd6f384db5ac442bfd3560424c5cd?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78', alt: 'Apple login' }
  ];

  return (
    <main className={styles.loginPage}>
      <div className={styles.contentWrapper}>
        <section className={styles.loginSection}>
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/633aaaa339ee7af67a22595035717caa8c4a23d51c73dfdc999464c1de6a97bb?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78" alt="WanderWays logo" className={styles.logo} />
          <div className={styles.loginForm}>
            <h1 className={styles.title}>Login</h1>
            <p className={styles.subtitle}>Login to access your WanderWays account</p>
            <form>
              <TextField label="Email" type="email" defaultValue="ethan.autistic@gmail.com" />
              <TextField label="Password" type="password" defaultValue="•••••••••••••••••••••••••" showPasswordToggle />
              <div className={styles.formOptions}>
                <label className={styles.rememberMe}>
                  <input type="checkbox" />
                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/1bec477041224fb7fc3922fecf0f0268dca8625a91ef0c7f9a15c09f74890b18?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78" alt="" className={styles.checkIcon} />
                  Remember me
                </label>
                <a href="#" className={styles.forgotPassword}>Forgot Password</a>
              </div>
              <Button type="submit">Login</Button>
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