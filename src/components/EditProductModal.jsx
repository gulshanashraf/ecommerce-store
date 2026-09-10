import { useEffect, useState } from "react";
import Modal from "./Modal";
import ProductForm, { useProductForm } from "./ProductForm";
import { useProducts } from "../context/ProductsContext";
import { useToast } from "../context/ToastContext";

export default function EditProductModal({ product, onClose }) {
  const { form, errors, update, validate, setForm } = useProductForm();
  const { editProduct } = useProducts();
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        price: product.price ?? "",
        image: product.image || "",
        category: product.category || "",
        description: product.description || "",
        stock: product.stock ?? "",
      });
    }
  }, [product, setForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await editProduct(product.id, form);
      showToast("Product updated successfully");
      onClose();
    } catch (err) {
      showToast("Unable to update product. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={!!product} onClose={onClose} title="Edit Product">
      <form onSubmit={handleSubmit}>
        <ProductForm form={form} errors={errors} update={update} />
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full border border-maroon/20 bg-cream-white px-4 py-2.5 text-sm font-medium text-ink transition hover:bg-pink-soft"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 rounded-full bg-maroon px-4 py-2.5 text-sm font-medium text-cream-white transition hover:bg-maroon-deep disabled:opacity-60"
          >
            {submitting ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
