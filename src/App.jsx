import { useEffect, useState } from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import CategoryFilter from "./components/CategoryFilter";
import Footer from "./components/Footer";

import { getProducts } from "./services/productService";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] =
    useState("Todos");

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    loadProducts();
  }, []);

  const categories = [
    "Todos",
    ...new Set(products.map((product) => product.category)),
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

              <h2>Encuentra tu próximo favorito</h2>

              <span>
                Explora nuestros accesorios disponibles.
              </span>
            </div>

            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            <ProductGrid
              products={filteredProducts}
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;