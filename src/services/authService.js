const API_URL =
  import.meta.env.VITE_API_URL;

const TOKEN_KEY = "amethieel_admin_token";

export const getToken = () => {
  return sessionStorage.getItem(TOKEN_KEY);
};

export const login = async (
  email,
  password
) => {
  const response = await fetch(
    `${API_URL}/admin/login`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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

  sessionStorage.setItem(
    TOKEN_KEY,
    data.token
  );

  return data;
};

export const getAdmin = async () => {
  const token = getToken();

  if (!token) {
    return null;
  }

  const response = await fetch(
    `${API_URL}/admin/me`,
    {
      headers: {
        Accept: "application/json",

        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    sessionStorage.removeItem(
      TOKEN_KEY
    );

    return null;
  }

  const data = await response.json();

  return data.user;
};

export const logout = async () => {
  const token = getToken();

  try {
    if (token) {
      await fetch(
        `${API_URL}/admin/logout`,
        {
          method: "POST",

          headers: {
            Accept: "application/json",

            Authorization:
              `Bearer ${token}`,
          },
        }
      );
    }
  } finally {
    sessionStorage.removeItem(
      TOKEN_KEY
    );
  }
};