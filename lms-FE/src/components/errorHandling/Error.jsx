import React from 'react';

const Error = ({ error }) => {
  return (
    <div className="error">
      <p>{error}</p>
    </div>
  );
};

export default Error;
