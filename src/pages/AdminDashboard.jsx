import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import ProductForm from "../components/admin/ProductForm";
import ProductTable from "../components/admin/ProductTable";

import {
  createProduct,
  deleteProduct,
  getAdminProducts,
  updateProduct,
} from "../services/adminProductService";

import { useAuth } from "../context/useAuth";

function AdminDashboard() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingProduct, setEditingProduct] =
    useState(null);

  const [showForm, setShowForm] =
    useState(false);

  /*
   * Recargar productos después de:
   * crear, editar o eliminar.
   */
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminProducts();

      setProducts(data);
    } catch (error) {
      console.error(error);

      setError(
        error.message ||
          "No se pudieron cargar los productos."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * Carga inicial.
   *
   * Usamos la promesa directamente para evitar
   * el error react-hooks/set-state-in-effect.
   */
  useEffect(() => {
    let cancelled = false;

    getAdminProducts()
      .then((data) => {
        if (!cancelled) {
          setProducts(data);
        }
      })
      .catch((error) => {
        console.error(error);

        if (!cancelled) {
          setError(
            error.message ||
              "No se pudieron cargar los productos."
          );
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  /*
   * Estadísticas del dashboard.
   */
  const stats = useMemo(() => {
    const total = products.length;

    const lowStock = products.filter(
      (product) =>
        Number(product.stock) > 0 &&
        Number(product.stock) <= 2
    ).length;

    const soldOut = products.filter(
      (product) =>
        Number(product.stock) === 0
    ).length;

    const hidden = products.filter(
      (product) => !product.active
    ).length;

    return {
      total,
      lowStock,
      soldOut,
      hidden,
    };
  }, [products]);

  /*
   * Abrir formulario para crear.
   */
  const handleCreate = () => {
    setEditingProduct(null);
    setShowForm(true);
    setError("");
  };

  /*
   * Abrir formulario para editar.
   */
  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
    setError("");
  };

  /*
   * Cerrar formulario.
   */
  const handleCancel = () => {
    setEditingProduct(null);
    setShowForm(false);
    setError("");
  };

  /*
   * Crear o actualizar producto.
   */
  const handleSave = async (formData) => {
    try {
      setError("");

      if (editingProduct) {
        await updateProduct(
          editingProduct.id,
          formData
        );
      } else {
        await createProduct(formData);
      }

      await loadProducts();

      setEditingProduct(null);
      setShowForm(false);
    } catch (error) {
      console.error(error);

      setError(
        error.message ||
          "Ocurrió un error al guardar el producto."
      );
    }
  };

  /*
   * Eliminar producto.
   */
  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `¿Seguro que deseas eliminar "${product.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteProduct(product.id);

      await loadProducts();
    } catch (error) {
      console.error(error);

      setError(
        error.message ||
          "No se pudo eliminar el producto."
      );
    }
  };

  /*
   * Cerrar sesión.
   */
  const handleLogout = async () => {
    try {
      await logout();

      navigate("/admin/login", {
        replace: true,
      });
    } catch (error) {
      console.error(error);

      setError(
        "No se pudo cerrar la sesión."
      );
    }
  };

  return (
    <main className="admin-page">
      {/* HEADER */}
      <header className="admin-header">
        <div>
          <h1>AMETHIEEL</h1>

          <span>
            Panel administrativo
          </span>
        </div>

        <div className="admin-user">
          <div>
            <strong>
              {user?.name ?? "Administrador"}
            </strong>

            <small>
              Super Admin
            </small>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="admin-secondary-button"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* CONTENIDO */}
      <div className="admin-content">
        {/* ESTADÍSTICAS */}

        <section className="admin-stats">
          <div className="admin-stat-card">
            <span>
              Productos
            </span>

            <strong>
              {stats.total}
            </strong>
          </div>

          <div className="admin-stat-card">
            <span>
              Stock bajo
            </span>

            <strong>
              {stats.lowStock}
            </strong>
          </div>

          <div className="admin-stat-card">
            <span>
              Agotados
            </span>

            <strong>
              {stats.soldOut}
            </strong>
          </div>

          <div className="admin-stat-card">
            <span>
              Ocultos
            </span>

            <strong>
              {stats.hidden}
            </strong>
          </div>
        </section>

        {/* ERROR */}

        {error && (
          <div className="admin-error">
            {error}
          </div>
        )}

        {/* FORMULARIO */}

        {showForm ? (
          <section className="admin-panel">
            <div className="admin-section-title">
              <div>
                <span>
                  PRODUCTOS
                </span>

                <h2>
                  {editingProduct
                    ? "Editar producto"
                    : "Nuevo producto"}
                </h2>
              </div>
            </div>

            <ProductForm
              key={
                editingProduct?.id ??
                "new-product"
              }
              product={editingProduct}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </section>
        ) : (
          /* TABLA */

          <section className="admin-panel">
            <div className="admin-section-title">
              <div>
                <span>
                  CATÁLOGO
                </span>

                <h2>
                  Productos
                </h2>
              </div>

              <button
                type="button"
                className="admin-primary-button"
                onClick={handleCreate}
              >
                + Nuevo producto
              </button>
            </div>

            {loading ? (
              <div className="admin-loading">
                Cargando productos...
              </div>
            ) : (
              <ProductTable
                products={products}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </section>
        )}
      </div>
    </main>
  );
}

export default AdminDashboard;