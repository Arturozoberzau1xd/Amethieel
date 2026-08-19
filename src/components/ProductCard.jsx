import { INSTAGRAM_CHAT_URL } from "../config/contact";

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

  const instagramMessage = `Hola 💜

Me gustaría pedir información sobre este producto de Amethieel:

Producto: ${product.name}
Código: ${product.code}
Precio: $${product.price.toFixed(2)}

¿Sigue disponible?`;

  const handleInstagramClick = async () => {
    try {
      await navigator.clipboard.writeText(instagramMessage);

      alert(
        "💜 Copiamos la información del producto.\n\nAhora pégala en el chat de Instagram para enviárnosla."
      );
    } catch (error) {
      console.error("No se pudo copiar el mensaje:", error);
    }

    window.open(
      INSTAGRAM_CHAT_URL,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <article className="product-card">
      <div className="product-image-container">

        <button
          type="button"
          onClick={handleInstagramClick}
          className="product-image-link"
          title={`Consultar ${product.name} por Instagram`}
        >
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        </button>

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

        <button
          type="button"
          onClick={handleInstagramClick}
          className="whatsapp-button"
        >
          Pedir información por Instagram
        </button>

      </div>
    </article>
  );
}

export default ProductCard;