import React, { useState, useEffect } from 'react';
import MaterialApi from '../APIs/MaterialApi';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const MaterialUploadForm = ({ onUploadSuccess }) => {
    const { courseId } = useParams(); 
    const [materialFile, setMaterialFile] = useState(null);
    const [title, setTitle] = useState('');
  
    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
  
      // Extract the file name and set it as the title
      if (selectedFile) {
        setTitle(selectedFile.name);
        setMaterialFile(selectedFile);
      }
    };
  
    const handleUpload = async () => {
      const formData = new FormData();
      formData.append('courseId', courseId);
      formData.append('title', title);
      formData.append('materialFile', materialFile);
    
      try {
        const response = await MaterialApi.uploadMaterial(formData);
        if (!response.data.success) {
          throw new Error(response.data.message || 'Material upload failed');
        }
    
        onUploadSuccess('Material uploaded successfully!');
      } catch (error) {
        console.error('Error uploading material:', error.message);
        throw error;
      }
    };
    
  return (
    <div className="container mt-4">
      <div className="form-group">
        <label htmlFor="materialFile">Choose File:</label>
        <input
          type="file"
          className="form-control-file"
          id="materialFile"
          onChange={handleFileChange}
        />
      </div>
      <button className="btn btn-primary" onClick={handleUpload}>
        Upload Material
      </button>
    </div>
  );
};

export default MaterialUploadForm;
