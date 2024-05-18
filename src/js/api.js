export const api = {
  getProducts: async () => {
      const response = await fetch('src/data/data.json');
      const catalog = await response.json();
      return catalog
    },
    getProduct: async (pid) => {
      const products = await api.getProducts()
      const product = products.find((prod) => prod.id == pid)
    return product
  }
}