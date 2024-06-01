import React from 'react';

const AddressComponent = ({ address }) => {
  return (
    <div style={{ marginTop: '20px', padding: '20px', backgroundColor: 'black', borderRadius: '10px', textAlign: 'center', color:'red' }}>
      {address}
    </div>
  );
};

export default AddressComponent;
