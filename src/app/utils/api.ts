// Use proxy API for production, direct API for development
const API_BASE_URL = import.meta.env.PROD ? '' : (import.meta.env.VITE_API || 'http://106.51.226.42:9010');

export const apiClient = {
  async get(endpoint: string) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API GET error:', error);
      throw error;
    }
  },

  async post(endpoint: string, data?: any) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API POST error:', error);
      throw error;
    }
  },

  async uploadFile(endpoint: string, file: File) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      // Use proxy API in production, direct API in development
      const url = import.meta.env.PROD ? `/api${endpoint}` : `${API_BASE_URL}${endpoint}`;
      
      console.log('Uploading file to:', url);
      console.log('File details:', { name: file.name, size: file.size, type: file.type });
      
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      console.log('Upload response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Upload error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const result = await response.json();
      console.log('Upload successful');
      return result;
    } catch (error) {
      console.error('API file upload error:', error);
      throw error;
    }
  }
};

// Extract document function
export const extractDocument = async (file: File) => {
  try {
    const response = await apiClient.uploadFile('/extract', file);
    return response;
  } catch (error) {
    console.error('Document extraction failed:', error);
    throw error;
  }
};