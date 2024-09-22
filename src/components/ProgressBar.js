import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div style={{ width: '100%', backgroundColor: '#ddd' }}>
      <div style={{ width: `${progress}%`, backgroundColor: '#4caf50', height: '25px' }}></div>
    </div>
  );
};

export default ProgressBar;
