import React from 'react';

const StatusComponent = ({ time, totalTime }) => {
  const radius = 50; // Radius of the circle
  const circumference = 2 * Math.PI * radius;
  const timeFraction = time / totalTime;
  const strokeDashoffset = circumference * (1 - timeFraction);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="#4e1c07"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="transparent"
          stroke="#f4eae6"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 60 60)"
        />
        <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="20px" fill="white">
          {time}
        </text>
      </svg>
    </div>
  );
};

export default StatusComponent;

