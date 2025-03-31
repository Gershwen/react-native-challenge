


export const api = async (page: number) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`); // Fetch 10 items per page
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error:any) {
      throw new Error(error.message);
    }
  };
  
  
  