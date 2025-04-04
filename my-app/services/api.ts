// import axios from 'axios';

// const API_BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

// export const api = {
//   get: async (page: number) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}?_page=${page}&_limit=10`);
//       return response.data;
//     } catch (error: any) {
//       throw new Error(error.message);
//     }
//   },
  
//   post: async (data: { title: string; body: string }) => {
//     try {
//       const response = await axios.post(API_BASE_URL, data);
//       return response.data;
//     } catch (error: any) {
//       throw new Error(error.message);
//     }
//   },

//   put: async (id: number, data: { title: string; body: string }) => {
//     try {
//       const response = await axios.put(`${API_BASE_URL}/${id}`, data);
//       return response.data;
//     } catch (error: any) {
//       throw new Error(error.message);
//     }
//   },

//   delete: async (id: number) => {
//     try {
//       await axios.delete(`${API_BASE_URL}/${id}`);
//       return { message: 'Deleted successfully' };
//     } catch (error: any) {
//       throw new Error(error.message);
//     }
//   },
// };


import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

// export const api = {
//   get: async (page: number) => {  // Changed from string to number
//     try {
//       const response = await axios.get(`${API_BASE_URL}?_page=${page}&_limit=10`);
//       return response.data;
//     } catch (error: any) {
//       throw new Error(error.message);
//     }
//   },
  
//   post: async (data: { title: string; body: string }) => {
//     try {
//       const response = await axios.post(API_BASE_URL, data);
//       return response.data;
//     } catch (error: any) {
//       throw new Error(error.message);
//     }
//   },

//   put: async (id: number, data: { title: string; body: string }) => { // No changes
//     try {
//       const response = await axios.put(`${API_BASE_URL}/${id}`, data);
//       return response.data;
//     } catch (error: any) {
//       throw new Error(error.message);
//     }
//   },

//   delete: async (id: number) => { // No changes
//     try {
//       await axios.delete(`${API_BASE_URL}/${id}`);
//       return { message: 'Deleted successfully' };
//     } catch (error: any) {
//       throw new Error(error.message);
//     }
//   },
// };

export const api = {
  get: async (page: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}?_page=${page}&_limit=10`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  getPostById: async (id: number) => {  // New function for fetching a single post
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
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

  
  
  