const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL;

const getCookie = (name) => {
  const cookies = document.cookie.split("; ");

  const cookie = cookies.find((row) =>
    row.startsWith(`${name}=`)
  );

  if (!cookie) {
    return null;
  }

  return decodeURIComponent(
    cookie.split("=")[1]
  );
};

export const getCsrfCookie = async () => {
  const response = await fetch(
    `${BACKEND_URL}/sanctum/csrf-cookie`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error(
      "No se pudo obtener el token CSRF."
    );
  }
};

export const login = async (
  email,
  password
) => {
  await getCsrfCookie();

  const xsrfToken = getCookie("XSRF-TOKEN");

  const response = await fetch(
    `${BACKEND_URL}/login`,
    {
      method: "POST",

      credentials: "include",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-XSRF-TOKEN": xsrfToken,
      },

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "No se pudo iniciar sesión."
    );
  }

  return data;
};

export const getAdmin = async () => {
  const response = await fetch(
    `${BACKEND_URL}/api/admin/me`,
    {
      method: "GET",
      credentials: "include",

      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  return data.user;
};

export const logout = async () => {
  await getCsrfCookie();

  const xsrfToken = getCookie("XSRF-TOKEN");

  const response = await fetch(
    `${BACKEND_URL}/logout`,
    {
      method: "POST",

      credentials: "include",

      headers: {
        Accept: "application/json",
        "X-XSRF-TOKEN": xsrfToken,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      "No se pudo cerrar la sesión."
    );
  }
};

export const getXsrfToken = () => {
  return getCookie("XSRF-TOKEN");
};