import {
  getCsrfCookie,
  getXsrfToken,
} from "./authService";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL;

export const getAdminProducts = async () => {
  const response = await fetch(
    `${BACKEND_URL}/api/admin/products`,
    {
      method: "GET",

      credentials: "include",

      headers: {
        Accept: "application/json",
      },
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
  await getCsrfCookie();

  const xsrfToken = getXsrfToken();

  const response = await fetch(
    `${BACKEND_URL}/api/admin/products`,
    {
      method: "POST",

      credentials: "include",

      headers: {
        Accept: "application/json",
        "X-XSRF-TOKEN": xsrfToken,
      },

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
  await getCsrfCookie();

  const xsrfToken = getXsrfToken();

  /*
   * Laravel + archivos funciona mejor
   * usando POST + _method=PUT.
   */
  product.append("_method", "PUT");

  const response = await fetch(
    `${BACKEND_URL}/api/admin/products/${id}`,
    {
      method: "POST",

      credentials: "include",

      headers: {
        Accept: "application/json",
        "X-XSRF-TOKEN": xsrfToken,
      },

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

export const deleteProduct = async (id) => {
  await getCsrfCookie();

  const xsrfToken = getXsrfToken();

  const response = await fetch(
    `${BACKEND_URL}/api/admin/products/${id}`,
    {
      method: "DELETE",

      credentials: "include",

      headers: {
        Accept: "application/json",
        "X-XSRF-TOKEN": xsrfToken,
      },
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