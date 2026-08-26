import { useEffect, useState } from "react";

import Header from "../components/Header";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import CategoryFilter from "../components/CategoryFilter";
import Footer from "../components/Footer";

import { getProducts } from "../services/productService";

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] =
    useState("Todos");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        console.error(error);

        setError(
          "No fue posible cargar los productos."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categories = [
    "Todos",
    ...new Set(
      products.map((product) => product.category)
    ),
  ];

  const filteredProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter(
          (product) =>
            product.category === selectedCategory
        );

  return (
    <>
      <Header />

      <main>
        <Hero />

        <section
          className="catalog-section"
          id="catalogo"
        >
          <div className="container">

            <div className="section-heading">
              <p>NUESTRA COLECCIÓN</p>

              <h2>
                Encuentra tu próximo favorito
              </h2>

              <span>
                Explora nuestros accesorios disponibles.
              </span>
            </div>

            {loading && (
              <div className="catalog-message">
                Cargando productos...
              </div>
            )}

            {error && (
              <div className="catalog-message error-message">
                {error}
              </div>
            )}

            {!loading && !error && (
              <>
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={
                    setSelectedCategory
                  }
                />

                <ProductGrid
                  products={filteredProducts}
                />
              </>
            )}

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;