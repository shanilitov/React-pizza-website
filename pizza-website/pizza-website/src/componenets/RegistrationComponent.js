import React, { useState } from 'react';

const RegistrationComponent = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

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
      console.log('תוצאה:', data);

      // כאן תוכלי להוסיף לוגיקה נוספת לאחר הקבלת התוצאה מהשרת



    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };






  return (
    <div>
      <div className="header">
        {/* אייקון חזרה לדף הבית */}
        <button onClick={() => window.history.back()}>🏠</button>
      </div>
      <div className="registration-form">
        {/* שדה להזנת מספר הפלפון */}
        <input
          type="text"
          placeholder="הזן מספר טלפון"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
        {/* כפתור להרשמה */}
        <button onClick={handleRegistration}>הרשם</button>
      </div>
    </div>
  );
};

export default RegistrationComponent;