import React from 'react';

const StatusComponent = ({ time }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
      <div style={{ backgroundColor: '#cce5ff', borderRadius: '50%', width: '100px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}>
        {time}
      </div>
    </div>
  );
};

export default StatusComponent;
