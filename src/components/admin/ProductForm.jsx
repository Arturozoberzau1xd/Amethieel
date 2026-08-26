import { useState } from "react";

const getInitialForm = (product) => {
  if (!product) {
    return {
      code: "",
      name: "",
      category: "Anillos",
      price: "",
      stock: "",
      description: "",
      active: true,
      image: null,
    };
  }

  return {
    code: product.code ?? "",
    name: product.name ?? "",
    category: product.category ?? "Anillos",
    price: product.price ?? "",
    stock: product.stock ?? "",
    description: product.description ?? "",
    active: product.active ?? true,
    image: null,
  };
};

function ProductForm({
  product,
  onSave,
  onCancel,
}) {
  const [form, setForm] = useState(() =>
    getInitialForm(product)
  );

  const [preview, setPreview] = useState(
    product?.image_url ?? null
  );

  const [saving, setSaving] = useState(false);

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setForm((current) => ({
      ...current,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleImage = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setForm((current) => ({
      ...current,
      image: file,
    }));

    setPreview(
      URL.createObjectURL(file)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);

      const data = new FormData();

      data.append("code", form.code);
      data.append("name", form.name);
      data.append(
        "category",
        form.category
      );
      data.append("price", form.price);
      data.append("stock", form.stock);
      data.append(
        "description",
        form.description
      );

      data.append(
        "active",
        form.active ? "1" : "0"
      );

      if (form.image) {
        data.append(
          "image",
          form.image
        );
      }

      await onSave(data);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      className="admin-product-form"
      onSubmit={handleSubmit}
    >
      <div className="admin-form-grid">

        <div className="form-group">
          <label>Código</label>

          <input
            name="code"
            value={form.code}
            onChange={handleChange}
            placeholder="AN-01"
            required
          />
        </div>

        <div className="form-group">
          <label>Nombre</label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Anillo Chunky"
            required
          />
        </div>

        <div className="form-group">
          <label>Categoría</label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="Anillos">
              Anillos
            </option>

            <option value="Collares">
              Collares
            </option>

            <option value="Pulseras">
              Pulseras
            </option>

            <option value="Aretes">
              Aretes
            </option>
          </select>
        </div>

        <div className="form-group">
          <label>Precio</label>

          <input
            type="number"
            step="0.01"
            min="0"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Stock</label>

          <input
            type="number"
            min="0"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Imagen</label>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImage}
          />
        </div>

      </div>

      {preview && (
        <div className="admin-image-preview">
          <img
            src={preview}
            alt="Vista previa"
          />
        </div>
      )}

      <div className="form-group">
        <label>Descripción</label>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="4"
        />
      </div>

      <label className="admin-checkbox">
        <input
          type="checkbox"
          name="active"
          checked={form.active}
          onChange={handleChange}
        />

        Mostrar producto en el catálogo
      </label>

      <div className="admin-form-actions">

        <button
          type="submit"
          className="admin-primary-button"
          disabled={saving}
        >
          {saving
            ? "Guardando..."
            : product
              ? "Guardar cambios"
              : "Crear producto"}
        </button>

        <button
          type="button"
          className="admin-secondary-button"
          onClick={onCancel}
        >
          Cancelar
        </button>

      </div>
    </form>
  );
}

export default ProductForm;