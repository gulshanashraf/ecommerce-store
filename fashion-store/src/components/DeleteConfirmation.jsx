import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";
import { useProducts } from "../context/ProductsContext";
import { useToast } from "../context/ToastContext";

export default function DeleteConfirmation({ product, onClose }) {
  const { removeProduct } = useProducts();
  const { showToast } = useToast();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await removeProduct(product.id);
      showToast("Product deleted successfully");
      onClose();
    } catch (err) {
      showToast("Unable to delete product. Please try again.", "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Modal open={!!product} onClose={onClose} title="Are you sure?" maxWidth="max-w-sm">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#7C0000]/10 text-[#7C0000] border-2 border-[#7C0000]/30 shadow-md">
          <AlertTriangle size={26} strokeWidth={2.5} />
        </div>
        <p className="text-sm text-gray-700">
          You are about to delete <span className="font-semibold text-gray-900">{product?.name}</span>.
          This action cannot be undone.
        </p>
        <div className="mt-6 flex w-full gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-full border-2 border-[#7C0000]/30 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:bg-gray-100 shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex-1 rounded-full bg-[#7C0000] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#5A0000] shadow-lg disabled:opacity-60"
          >
            {deleting ? "Deleting..." : "Delete Product"}
          </button>
        </div>
      </div>
    </Modal>
  );
}