import { WHATSAPP_NUMBER } from "../config/contact";

function ProductCard({ product }) {
  const getStockStatus = () => {
    if (product.stock === 0) {
      return {
        text: "Agotado",
        className: "stock sold-out",
      };
    }

    if (product.stock <= 2) {
      return {
        text: "Últimas piezas",
        className: "stock last-items",
      };
    }

    return {
      text: "Disponible",
      className: "stock available",
    };
  };

  const stockStatus = getStockStatus();

  const whatsappMessage = `
Hola 💜

Me gustaría pedir información sobre este producto de Amethieel:

Producto: ${product.name}
Código: ${product.code}
Precio: $${product.price.toFixed(2)}

¿Sigue disponible?
  `.trim();

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <article className="product-card">

      <div className="product-image-container">

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="product-image-link"
          title={`Consultar ${product.name} por WhatsApp`}
        >
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        </a>

        <span className={stockStatus.className}>
          {stockStatus.text}
        </span>

      </div>

      <div className="product-info">

        <div className="product-top-info">
          <p className="product-category">
            {product.category}
          </p>

          <span className="product-code">
            {product.code}
          </span>
        </div>

        <h3>{product.name}</h3>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-footer">
          <span className="product-price">
            ${product.price.toFixed(2)}
          </span>

          {product.stock > 0 && (
            <span className="product-pieces">
              {product.stock} disponibles
            </span>
          )}
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-button"
        >
          Pedir información
        </a>

      </div>

    </article>
  );
}

export default ProductCard;