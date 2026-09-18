import { useState } from "react";
import ProductImage from "./ProductImage";
import { CATEGORIES } from "../utils/categories";

const emptyForm = {
  name: "",
  price: "",
  image: "",
  category: "",
  description: "",
  stock: "",
};

export function useProductForm(initial) {
  const [form, setForm] = useState(initial ? { ...emptyForm, ...initial } : emptyForm);
  const [errors, setErrors] = useState({});

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Product name is required.";
    if (form.price === "" || Number.isNaN(Number(form.price)) || Number(form.price) < 0)
      next.price = "Enter a valid price.";
    if (!form.category) next.category = "Please select a category.";
    if (form.stock !== "" && (Number.isNaN(Number(form.stock)) || Number(form.stock) < 0))
      next.stock = "Stock must be a valid number.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  return { form, errors, update, validate, setForm };
}

export default function ProductForm({ form, errors, update }) {
  return (
    <div className="grid gap-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Product Name</label>
        <input
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="e.g. Silk Wrap Dress"
          className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none focus:border-maroon ${
            errors.name ? "border-red-400" : "border-maroon/20"
          }`}
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Price (PKR)</label>
          <input
            type="number"
            min="0"
            value={form.price}
            onChange={(e) => update("price", e.target.value)}
            placeholder="2499"
            className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none focus:border-maroon ${
              errors.price ? "border-red-400" : "border-maroon/20"
            }`}
          />
          {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Stock</label>
          <input
            type="number"
            min="0"
            value={form.stock}
            onChange={(e) => update("stock", e.target.value)}
            placeholder="20"
            className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none focus:border-maroon ${
              errors.stock ? "border-red-400" : "border-maroon/20"
            }`}
          />
          {errors.stock && <p className="mt-1 text-xs text-red-500">{errors.stock}</p>}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Category</label>
        <select
          value={form.category}
          onChange={(e) => update("category", e.target.value)}
          className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none focus:border-maroon ${
            errors.category ? "border-red-400" : "border-maroon/20"
          }`}
        >
          <option value="">Select a category</option>
          {CATEGORIES.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Image URL</label>
        <input
          value={form.image}
          onChange={(e) => update("image", e.target.value)}
          placeholder="https://..."
          className="w-full rounded-xl border border-maroon/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-maroon"
        />
        <ProductImage src={form.image} alt="Preview" className="mt-3 h-36 w-full rounded-xl" />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          rows={3}
          placeholder="Tell customers about this piece..."
          className="w-full resize-none rounded-xl border border-maroon/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-maroon"
        />
      </div>
    </div>
  );
}
