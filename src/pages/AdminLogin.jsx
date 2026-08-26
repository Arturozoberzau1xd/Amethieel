import { useState } from "react";

import {
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/useAuth";

function AdminLogin() {
  const navigate = useNavigate();

  const {
    user,
    loading: authLoading,
    login,
  } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  if (authLoading) {
    return (
      <div className="admin-loading">
        Verificando sesión...
      </div>
    );
  }

  if (user) {
    return (
      <Navigate
        to="/admin"
        replace
      />
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      await login(email, password);

      navigate("/admin");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">

      <div className="admin-login-card">

        <div className="admin-brand">
  <span>✦</span>

  <h1>AMETHIEEL</h1>

  <p>Panel administrativo</p>
</div>

        <form
          onSubmit={handleSubmit}
          className="admin-login-form"
        >

          <div className="form-group">
            <label>Correo electrónico</label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="admin@amethieel.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="admin-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="admin-primary-button"
            disabled={loading}
          >
            {loading
              ? "Iniciando..."
              : "Iniciar sesión"}
          </button>

        </form>
        <Link
  to="/"
  className="admin-back-link"
>
  ← Volver al catálogo
</Link>

      </div>

    </main>
  );
}

export default AdminLogin;