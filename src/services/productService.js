import axios from "axios";

const BASE_URL = "https://product-mvc-production-4b95.up.railway.app";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

function normalizeProduct(raw) {
  if (!raw || typeof raw !== "object") return null;

  // MongoDB _id is used for Edit/Delete
  const mongoId = raw._id ?? raw.id ?? raw.productId ?? raw.uuid;

  // Your backend custom id
  const customId = raw.id ?? "";

  const image =
    raw.imageURL ??
    raw.imageUrl ??
    raw.image ??
    raw.img ??
    raw.thumbnail ??
    "";

  const description = raw.desc ?? raw.description ?? "";

  const stock =
    raw.stock ??
    raw.quantity ??
    raw.qty ??
    undefined;

  const oldPrice =
    raw.oldPrice ??
    raw.previousPrice ??
    raw.originalPrice ??
    undefined;

  const discountPercent =
    raw.discountPercent ??
    raw.discount ??
    (oldPrice && raw.price
      ? Math.round((1 - raw.price / oldPrice) * 100)
      : undefined);

  return {
    // IMPORTANT: MongoDB _id
    id: mongoId != null ? String(mongoId) : undefined,

    // Keep backend's custom id separately
    customId: customId ? String(customId) : undefined,

    name: raw.name ?? raw.title ?? "Untitled product",

    price:
      typeof raw.price === "number"
        ? raw.price
        : Number(raw.price) || 0,

    oldPrice:
      typeof oldPrice === "number"
        ? oldPrice
        : undefined,

    discountPercent:
      typeof discountPercent === "number" &&
      discountPercent > 0
        ? discountPercent
        : undefined,

    image,

    category:
      raw.category ??
      raw.categoryName ??
      "Uncategorized",

    description,

    stock:
      typeof stock === "number"
        ? stock
        : undefined,

    createdAt:
      raw.createdAt ??
      raw.dateAdded ??
      raw.created_at ??
      undefined,

    _raw: raw,
  };
}

function unwrapList(data) {
  if (Array.isArray(data)) return data;

  if (Array.isArray(data?.products)) {
    return data.products;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  return [];
}

function unwrapSingle(data) {
  return data?.product ?? data?.data ?? data;
}


// =========================
// GET ALL PRODUCTS
// =========================

export async function getProducts() {
  const { data } = await api.get("/products");

  return unwrapList(data)
    .map(normalizeProduct)
    .filter(Boolean);
}


// =========================
// GET SINGLE PRODUCT
// =========================
// NOTE:
// Your current backend does NOT have GET /products/:id.
// Keep this function only if you add that route later.

export async function getProductById(id) {
  const { data } = await api.get(`/products/${id}`);

  return normalizeProduct(
    unwrapSingle(data)
  );
}


// =========================
// CREATE PRODUCT
// =========================

export async function createProduct(product) {
  const payload = {
    // Backend requires this field
    id:
      product.customId ??
      product.id ??
      String(Date.now()),

    name: product.name,

    price: Number(product.price),

    imageURL: product.image,

    category: product.category,

    // IMPORTANT:
    // Backend field is "desc", NOT "description"
    desc: product.description,

    stock:
      product.stock !== undefined &&
      product.stock !== ""
        ? Number(product.stock)
        : 0,
  };

  const { data } = await api.post(
    "/products",
    payload
  );

  return normalizeProduct(
    unwrapSingle(data)
  );
}


// =========================
// UPDATE PRODUCT
// =========================

export async function updateProduct(id, product) {
  const payload = {
    name: product.name,

    price: Number(product.price),

    imageURL: product.image,

    category: product.category,

    // IMPORTANT:
    // Backend field is "desc"
    desc: product.description,

    stock:
      product.stock !== undefined &&
      product.stock !== ""
        ? Number(product.stock)
        : 0,
  };

  const { data } = await api.put(
    `/products/${id}`,
    payload
  );

  return (
    normalizeProduct(
      unwrapSingle(data)
    ) ?? {
      id,
      ...product,
    }
  );
}


// =========================
// DELETE PRODUCT
// =========================

export async function deleteProduct(id) {
  await api.delete(`/products/${id}`);

  return true;
}