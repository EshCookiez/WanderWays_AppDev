// User.jsx
import React, { useState, useEffect } from 'react';
import styles from './User.module.css';
import Avatar from '@mui/material/Avatar';
import CreateIcon from '@mui/icons-material/Create';
import Header from '../../Components/Header';
import { FlightTicket } from './Flights/FlightTicket';
import axios from 'axios';
import sample from './userAssets/sample.png';

const TABS = [
  { id: 'account', label: 'Account' },
  { id: 'history', label: 'Booked Flights' },
  { id: 'stays', label: 'Booked Stays' }
];

export function User() {
  const [activeTab, setActiveTab] = useState('account');
  const [userData, setUserData] = useState(null);
  const [userIcon, setUserIcon] = useState(null);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [editingField, setEditingField] = useState(null);
  const [fieldValues, setFieldValues] = useState({});

  const handleChangePicture = () => {
    document.getElementById('userIconInput').click();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type (optional)
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, GIF).');
        return;
      }

      // Optional: Validate file size (e.g., max 2MB)
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        alert('File size exceeds 2MB.');
        return;
      }

      setSelectedFile(file);

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchUserData = async () => {
  const token = localStorage.getItem('jwtToken');
  if (!token) {
    setError('No token found. Please log in.');
    return;
  }

  try {
    const response = await axios.get('http://localhost:8080/auth/userProfile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setUserData(response.data);
    fetchUserIcon(token);
  } catch (err) {
    if (err.response) {
      // Server responded with a status other than 2xx
      setError(`Error: ${err.response.data.message || 'Failed to fetch user data.'}`);
    } else if (err.request) {
      // Request was made but no response received
      setError('Error: No response from server.');
    } else {
      // Something else caused the error
      setError(`Error: ${err.message}`);
    }
    console.error(err);
  }
};
  
  const handleUpload = async () => {
    if (!selectedFile) {
      alert('No file selected.');
      return;
    }

    const token = localStorage.getItem('jwtToken');
    if (!token) {
      setError('No token found. Please log in.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:8080/auth/uploadUserIcon', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      alert(response.data); // "User icon uploaded successfully."
      setSelectedFile(null);
      setPreviewUrl('');
      // Refresh user data to display the new picture
      fetchUserData();
    } catch (err) {
      console.error(err);
      alert('Failed to upload user icon.');
    }
  };
  const handleCancel = () => {
    setSelectedFile(null);
    setPreviewUrl('');
  };
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setEditingField(null); 
  };

  const handleFieldChange = (fieldId) => {
    setEditingField(fieldId);
    setFieldValues({
      ...fieldValues,
      [fieldId]: getFieldValue(fieldId)
    });
  };

  const getFieldValue = (fieldId) => {
    switch (fieldId) {
      case 'name':
        return `${userData.firstName} ${userData.lastName}`;
      case 'email':
        return userData.email;
      case 'password':
        return ''; // Password handling might require a separate flow
      case 'phone':
        return userData.phoneNumber;
      case 'address':
        return userData.customerAddress;
      case 'dob':
        return userData.birthdate;
      default:
        return '';
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFieldValues({
      ...fieldValues,
      [name]: value
    });
  };

  const fetchUserIcon = async (token) => {
    try {
      const response = await axios.get('http://localhost:8080/auth/userIcon', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob'
      });
      const iconUrl = URL.createObjectURL(response.data);
      setUserIcon(iconUrl);
    } catch (err) {
      console.error('Failed to fetch user icon:', err);
    }
  };

  const handleSaveField = async (fieldId) => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      setError('No token found. Please log in.');
      return;
    }

    let updateData = {};
    if (fieldId === 'name') {
      const [firstName, ...lastNameArr] = fieldValues.name.split(' ');
      updateData = { firstName, lastName: lastNameArr.join(' ') };
    } else {
      updateData[fieldId] = fieldValues[fieldId];
    }

    try {
      const response = await axios.put('http://localhost:8080/auth/updateUserProfile', updateData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserData(response.data);
      setEditingField(null);
      alert('Profile updated successfully.');
    } catch (err) {
      if (err.response) {
        alert(`Error: ${err.response.data.message || 'Failed to update profile.'}`);
      } else {
        alert('Error: Unable to update profile.');
      }
      console.error(err);
    }
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setFieldValues({});
  };
  
  useEffect(() => {
    fetchUserData();
  }, []);

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (!userData) {
    return <p>Loading...</p>;
  }

  const PROFILE_FIELDS = [
    {
      id: 'name',
      label: 'Name',
      value: `${userData.firstName} ${userData.lastName}`,
      icon: '/icons/edit.svg'
    },
    {
      id: 'email',
      label: 'Email',
      value: userData.email,
      icon: '/icons/mail.svg'
    },
    {
      id: 'password',
      label: 'Password',
      value: '************',
      icon: '/icons/lock.svg'
    },
    {
      id: 'phone',
      label: 'Phone number',
      value: userData.phoneNumber,
      icon: '/icons/phone.svg'
    },
    {
      id: 'address',
      label: 'Address',
      value: userData.customerAddress,
      icon: '/icons/location.svg'
    },
    {
      id: 'dob',
      label: 'Date of birth',
      value: userData.birthdate,
      icon: '/icons/calendar.svg'
    }
  ];


  const renderField = ({ id, label, value, icon }) => (
    <div key={id} className={styles.fieldContainer} role="group" aria-labelledby={`${id}-label`}>
      <span id={`${id}-label`} className={styles.fieldLabel}>{label}</span>
      <div className={styles.fieldDisplay}>
        {editingField === id ? (
          <>
            <input
              type={id === 'password' ? 'password' : 'text'}
              name={id}
              value={fieldValues[id]}
              onChange={handleInputChange}
              className={styles.fieldInput}
            />
            <button
              className={styles.saveButton}
              onClick={() => handleSaveField(id)}
            >
              Save
            </button>
            <button
              className={styles.cancelEditButton}
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <span className={styles.fieldValue}>{value}</span>
            <button
              className={styles.changeButton}
              onClick={() => handleFieldChange(id)}
              aria-label={`Change ${label.toLowerCase()}`}
            >
              <CreateIcon />
              <span>Change</span>
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <main className={styles.profileContainer}>
      <Header />
      <img
        src={userData.backgroundImage || sample}
        className={styles.headerImage}
        alt=""
        role="presentation"
      />

      <div className={styles.profileContent}>
        <section className={styles.userInfoSection}>
          <div className={styles.userHeader}>
            <div className={styles.profileImageWrapper}>
            <Avatar
              alt={`${userData.firstName}`}
              src={previewUrl || userIcon || '/path/to/sampleUser.png'}
              sx={{
                width: '154px',
                height: '154px',
                borderRadius: '50%'
              }}
            />
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
              {/* Hidden File Input */}
              <input
                type="file"
                id="userIconInput"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileSelect}
              />
            </div>

            <div className={styles.userInfo}>
              <h1 className={styles.userName}>{`${userData.firstName} ${userData.lastName}`}</h1>
              <p className={styles.userEmail}>{userData.email}</p>
            </div>
          </div>
            {/* File Upload Preview and Upload Button */}
            {selectedFile && (
                        <div className={styles.uploadSection}>
                          <h3>Preview:</h3>
                          <img src={previewUrl} alt="Preview" className={styles.previewImage} />
                          <div className={styles.buttonGroup}>
                            <button className={styles.uploadButton} onClick={handleUpload}>
                              Upload
                            </button>
                            <button className={styles.cancelButton} onClick={handleCancel}>
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
          <nav className={styles.navigationTabs} role="tablist" aria-label="Profile sections">
            {TABS.map((tab) => (
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

          {TABS.map((tab) => (
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
                  <FlightTicket />
                </section>
              )}

              {tab.id === 'stays' && (
                <section className={styles.staysSection}>
                  <h2 className={styles.sectionTitle}>Booked Stays</h2>
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