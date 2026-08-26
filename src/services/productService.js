const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("No se pudieron cargar los productos.");
  }

  return await response.json();
};