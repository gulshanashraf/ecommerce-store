import { useState } from "react";
import Modal from "./Modal";
import ProductForm, { useProductForm } from "./ProductForm";
import { useProducts } from "../context/ProductsContext";
import { useToast } from "../context/ToastContext";

export default function AddProductModal({ open, onClose }) {
  const { form, errors, update, validate, setForm } = useProductForm();
  const { addProduct } = useProducts();
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const handleClose = () => {
    setForm({ name: "", price: "", image: "", category: "", description: "", stock: "" });
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await addProduct(form);
      showToast("Product added successfully");
      handleClose();
    } catch (err) {
      showToast("Unable to add product. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} title="Add a New Product">
      <form onSubmit={handleSubmit}>
        <ProductForm form={form} errors={errors} update={update} />
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 rounded-full border border-maroon/20 bg-cream-white px-4 py-2.5 text-sm font-medium text-ink transition hover:bg-pink-soft"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 rounded-full bg-maroon px-4 py-2.5 text-sm font-medium text-cream-white transition hover:bg-maroon-deep disabled:opacity-60"
          >
            {submitting ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
