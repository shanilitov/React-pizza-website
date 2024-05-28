import React, { useState } from 'react';
import '../CSS/RegistrationComponent.css' // כותבים את שם קובץ ה-CSS החדש שיצרנו
import { useNavigate } from 'react-router-dom';


const RegistrationComponent = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate()

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleRegistration = async () => {
    console.log('מספר טלפון:', phoneNumber);
    // כאן תוכל להוסיף לוגיקה להרשמה
    try {
      // בני את הגוף של הבקשה לפי הפורמט של הAPI
      const requestBody = {
        phone: phoneNumber,
      };

      // שלחי בקשת POST לשרת
      const response = await fetch('http://localhost:3600/orders/getOrderByPhone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      // בדוקי את סטטוס התגובה
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // אם הכל בסדר, הדפסי את התוצאה
      const data = await response.json();
      console.log('תוצאה:', JSON.parse(data));
      navigate('/TrackOrder', { state: { orders: JSON.parse(data) } });

      // כאן תוכלי להוסיף לוגיקה נוספת לאחר הקבלת התוצאה מהשרת
      if (data[0] != undefined) {
        // כלום כרגע, אפשר להוסיף פעולות נוספות
      }

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div className="container" >
      <div className="header">
        {/* אייקון חזרה לדף הבית */}
        <button onClick={() => window.history.back()}>🏠</button>
      </div>
      <div className="registration-form">
        {/* שדה להזנת מספר הפלפון */}
        <input
          type="text"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
        {/* כפתור להרשמה */}
        <button onClick={handleRegistration}>Find your orders</button>
      </div>
    </div>
  );
};

export default RegistrationComponent;
