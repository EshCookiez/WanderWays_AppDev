import React, { useState } from 'react';
import styles from './User.module.css';
import sampleBG from './userAssets/sample.png';
import sampleUser from './userAssets/user.png';
import Avatar from '@mui/material/Avatar';
import CreateIcon from '@mui/icons-material/Create';
import Header from '../../Components/Header';
import { FlightTicket } from './Flights/FlightTicket'; 

const TABS = [
  { id: 'account', label: 'Account' },
  { id: 'history', label: 'Booked Flights' },
  { id: 'stays', label: 'Booked Stays' }
];

const PROFILE_FIELDS = [
  {
    id: 'name',
    label: "Name",
    value: "Vince Kimlo Tan",
    icon: "/icons/edit.svg"
  },
  {
    id: 'email',
    label: "Email",
    value: "vincekimlo.tan@cit.edu",
    icon: "/icons/mail.svg"
  },
  {
    id: 'password',
    label: "Password",
    value: "************",
    icon: "/icons/lock.svg"
  },
  {
    id: 'phone',
    label: "Phone number", 
    value: "09665566551",
    icon: "/icons/phone.svg"
  },
  {
    id: 'address',
    label: "Address",
    value: "Blk 4 Lot 17, Chivas Cabancalan I, Bulacao Cebu City",
    icon: "/icons/location.svg"
  },
  {
    id: 'dob',
    label: "Date of birth",
    value: "05-10-2003",
    icon: "/icons/calendar.svg"
  }
];

export function User() {
  const [activeTab, setActiveTab] = useState('account');
  const handleChangePicture = () => {
    // Placeholder for future CRUD functionality
    alert('Change picture functionality to be implemented.');
  };
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleFieldChange = (fieldId) => {
    console.log(`Changing field: ${fieldId}`);
  };

  const renderField = ({ id, label, value, icon }) => (
    <div key={id} className={styles.fieldContainer} role="group" aria-labelledby={`${id}-label`}>
      <span id={`${id}-label`} className={styles.fieldLabel}>{label}</span>
      <div className={styles.fieldDisplay}>
      <span className={styles.fieldValue}>{value}</span>
      <button 
        className={styles.changeButton}
        onClick={() => handleFieldChange(id)}
        aria-label={`Change ${label.toLowerCase()}`}
      >
        <CreateIcon/>
        <span>Change</span>
      </button>
      </div>
    </div>
  );

  return (
    <main className={styles.profileContainer}>
        <Header/>
      <img
        src={sampleBG}
        className={styles.headerImage}
        alt=""
        role="presentation"
      />
      
      <div className={styles.profileContent}>
        <section className={styles.userInfoSection}>
          <div className={styles.userHeader}>
            <div className={styles.profileImageWrapper}>
                <Avatar alt="Vince" src={sampleUser} sx={{
                    width: "154px",
                    height: "154px",
                    borderRadius: "50%",
                }} />
                <div
                className={styles.overlay}
                onClick={handleChangePicture}
                role="button"
                tabIndex={0}
                onKeyPress={handleChangePicture}
                aria-label="Change picture"
                >
                Change Picture
                </div>
            </div>
            
            <div className={styles.userInfo}>
              <h1 className={styles.userName}>Vince Kimlo</h1>
              <p className={styles.userEmail}>vincekimlo.tan@cit.edu</p>
            </div>
          </div>

          <nav 
            className={styles.navigationTabs} 
            role="tablist"
            aria-label="Profile sections"
          >
            {TABS.map(tab => (
              <button
                key={tab.id}
                role="tab"
                className={styles.tabItem}
                aria-selected={activeTab === tab.id}
                aria-controls={`${tab.id}-panel`}
                id={`${tab.id}-tab`}
                onClick={() => handleTabChange(tab.id)}
                tabIndex={activeTab === tab.id ? 0 : -1}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {TABS.map(tab => (
  <div
    key={tab.id}
    role="tabpanel"
    id={`${tab.id}-panel`}
    aria-labelledby={`${tab.id}-tab`}
    hidden={activeTab !== tab.id}
    tabIndex={0}
  >
    {tab.id === 'account' && (
      <section className={styles.accountSection}>
        <h2 className={styles.sectionTitle}>Account</h2>
        <div className={styles.fieldGrid}>
          {PROFILE_FIELDS.map(renderField)}
        </div>
      </section>
    )}

    {tab.id === 'history' && (
      <section className={styles.flightHistorySection}>
        <h2 className={styles.sectionTitle}>Booked Flights</h2>
        {/* Render FlightTicket component */}
        <FlightTicket />
      </section>
    )}

    {tab.id === 'stays' && (
      <section className={styles.staysSection}>
        <h2 className={styles.sectionTitle}>Booked Stays</h2>
        {/* Add content for Booked Stays */}
        <p>No booked stays available.</p>
      </section>
    )}
  </div>
))}
        </section>
      </div>
    </main>
  );
}

export default User;