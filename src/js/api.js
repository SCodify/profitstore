export const api = {
  getProducts: async () => {
      const response = await fetch('src/data/data.json');
      const catalog = await response.json();
      return catalog
  },
  getProduct: async (id) => {
    const product = catalog.find((prod) => prod.id === id)
  }
}