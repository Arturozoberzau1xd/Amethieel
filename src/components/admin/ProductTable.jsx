function ProductTable({
  products,
  onEdit,
  onDelete,
}) {
  if (products.length === 0) {
    return (
      <div className="admin-empty">
        Todavía no hay productos.
      </div>
    );
  }

  return (
    <div className="admin-table-container">

      <table className="admin-table">

        <thead>
          <tr>
            <th>Imagen</th>
            <th>Código</th>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>

          {products.map((product) => (
            <tr key={product.id}>

              <td>
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="admin-product-thumb"
                  />
                ) : (
                  <div className="admin-no-image">
                    Sin foto
                  </div>
                )}
              </td>

              <td>{product.code}</td>

              <td>{product.name}</td>

              <td>{product.category}</td>

              <td>
                $
                {Number(
                  product.price
                ).toFixed(2)}
              </td>

              <td>{product.stock}</td>

              <td>
                <span
                  className={
                    product.active
                      ? "admin-status active"
                      : "admin-status inactive"
                  }
                >
                  {product.active
                    ? "Visible"
                    : "Oculto"}
                </span>
              </td>

              <td>
                <div className="admin-row-actions">

                  <button
                    type="button"
                    onClick={() =>
                      onEdit(product)
                    }
                    className="admin-edit-button"
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onDelete(product)
                    }
                    className="admin-delete-button"
                  >
                    Eliminar
                  </button>

                </div>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ProductTable;