import {
  useEffect,
  useState,
} from "react";

import AuthContext from "./AuthContext";

import {
  getAdmin,
  login as loginRequest,
  logout as logoutRequest,
} from "../services/authService";

function AuthProvider({ children }) {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const admin =
          await getAdmin();

        setUser(admin);
      } catch (error) {
        console.error(error);

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (
    email,
    password
  ) => {
    const data =
      await loginRequest(
        email,
        password
      );

    setUser(data.user);

    return data.user;
  };

  const logout = async () => {
    await logoutRequest();

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;