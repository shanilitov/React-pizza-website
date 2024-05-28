import React from 'react';

const AddressComponent = ({ address }) => {
  return (
    <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#fff', borderRadius: '10px', textAlign: 'center' }}>
      {address}
    </div>
  );
};

export default AddressComponent;
