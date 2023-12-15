import createAuthorizedInstance from '../APIs/createAuthorizedInstance'; 

const BASE_URL = 'http://localhost:8080/material';
const materialApiInstance = createAuthorizedInstance();

const MaterialApi = {
  uploadMaterial: async (formData) => {
    try {
      const response = await materialApiInstance.post(`${BASE_URL}/upload`, formData);

      if (!response.data.success) {
        throw new Error(response.data.message || 'Material upload failed');
      }
    } catch (error) {
      throw new Error('Material upload failed');
    }
  },

  downloadMaterial: async (materialId) => {
    try {
      const response = await materialApiInstance.get(`${BASE_URL}/${materialId}`, {
        responseType: 'blob',
      });

      // You can handle the download logic here, similar to the previous example
      return response.data;
    } catch (error) {
      throw new Error('Error downloading material');
    }
  },
};


export default MaterialApi;
