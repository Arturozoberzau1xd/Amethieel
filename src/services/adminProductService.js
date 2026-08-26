import { getToken } from "./authService";

const API_URL =
  import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
  const token = getToken();

  return {
    Accept: "application/json",

    Authorization:
      `Bearer ${token}`,
  };
};

export const getAdminProducts = async () => {
  const response = await fetch(
    `${API_URL}/admin/products`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(
      "No se pudieron cargar los productos."
    );
  }

  return response.json();
};

export const createProduct = async (
  product
) => {
  const response = await fetch(
    `${API_URL}/admin/products`,
    {
      method: "POST",

      headers: getAuthHeaders(),

      body: product,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "No se pudo crear el producto."
    );
  }

  return data;
};

export const updateProduct = async (
  id,
  product
) => {
  /*
   * Para actualizar FormData con imagen:
   * Laravel interpreta _method=PUT.
   */
  product.append(
    "_method",
    "PUT"
  );

  const response = await fetch(
    `${API_URL}/admin/products/${id}`,
    {
      method: "POST",

      headers: getAuthHeaders(),

      body: product,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "No se pudo actualizar el producto."
    );
  }

  return data;
};

export const deleteProduct = async (
  id
) => {
  const response = await fetch(
    `${API_URL}/admin/products/${id}`,
    {
      method: "DELETE",

      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "No se pudo eliminar el producto."
    );
  }

  return data;
};