export const api = {
  getProducts: async () => {
    try {
      const response = await fetch(`https://scodify.alwaysdata.net/api/productos`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const products = await response.json();
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  getProduct: async (pid) => {
    try {
      const response = await fetch(`https://scodify.alwaysdata.net/api/productos/${pid}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const product = await response.json();
      return product;
    } catch (error) {
      console.error(`Error fetching product with id ${pid}:`, error);
      throw error;
    }
  },

  createProduct: async (productData) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('https://scodify.alwaysdata.net/api/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(productData)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
}
}