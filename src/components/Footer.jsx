function Footer() {
  return (
    <footer className="footer" id="contacto">
      <div className="container">
        <h2>AMETHIEEL</h2>

        <p>Accesorios de acero inoxidable.</p>

        <p className="copyright">
          © {new Date().getFullYear()} Amethieel
        </p>
      </div>
    </footer>
  );
}

export default Footer;