import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

export const api = {
  get: async (page: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}?_page=${page}&_limit=10`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  
  post: async (data: { title: string; body: string }) => {
    try {
      const response = await axios.post(API_BASE_URL, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  put: async (id: number, data: { title: string; body: string }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  delete: async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      return { message: 'Deleted successfully' };
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};



// export const api = async (page: number) => {
//     try {
//       const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`); // Fetch 10 items per page
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return await response.json();
//     } catch (error:any) {
//       throw new Error(error.message);
//     }
//   };
  
  
  