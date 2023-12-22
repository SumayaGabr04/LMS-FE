import React, { useState } from 'react';
import MaterialUploadForm from '../components/MaterialUploadForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const MaterialUploadPage = () => {
  const [successMessage, setSuccessMessage] = useState(null);

  const handleUploadSuccess = (message) => {z
    setSuccessMessage(message);
  };

  return (
    <div className="container mt-4">
      <h2>Material Upload Page</h2>
      <MaterialUploadForm onUploadSuccess={handleUploadSuccess} />
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
    </div>
  );
};

export default MaterialUploadPage;
