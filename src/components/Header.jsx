import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          AMETHIEEL
        </Link>

        <nav className="nav">
          <a href="#inicio">
            Inicio
          </a>

          <a href="#catalogo">
            Catálogo
          </a>

          <a href="#contacto">
            Contacto
          </a>

          <Link
            to="/admin/login"
            className="admin-nav-button"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;