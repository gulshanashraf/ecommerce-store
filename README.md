# Fashion Store — Premium Clothing E-Commerce Frontend

A React (JS/JSX, no TypeScript) storefront built with Vite, Tailwind CSS,
Axios and React Router, connected to your existing Node/Express/MongoDB
backend.

## Getting started

```bash
npm install
npm run dev
```

No `.env` files are used in this project (by request). The backend base URL
is a single constant at the top of `src/services/productService.js`:

```js
const BASE_URL = "https://product-mvc-production-4b95.up.railway.app";
```

To point at a local backend instead, change that one line — nothing else
in the app references the URL directly.

## A note on backend inspection

This assistant's sandbox cannot reach `product-mvc-production-4b95.up.railway.app`
directly (outbound network is restricted to package registries), so the
service layer was built to tolerate the common `_id`/`id` and
`imageURL`/`image` naming variants rather than one confirmed shape. Please
verify against your real API responses and adjust `normalizeProduct()` in
`productService.js` if a field doesn't map. The same applies to category
filtering: it filters on whatever the backend returns as `category`/
`categoryName` — if that field doesn't exist yet on your model/routes, the
Categories page will just show 0 products until it's added on the backend
(share the backend code in a future session and this can be wired up
directly).

## Backend contract

All product data is fetched from and written to your real backend via
`src/services/productService.js`:

```
GET    /products
GET    /products/:id
POST   /products
PUT    /products/:id
DELETE /products/:id
```

The service layer normalizes field-name variants (imageURL / imageUrl /
image, desc / description, id / _id) into one consistent shape used
throughout the app, so it adapts to your actual schema without inventing
fields. If your backend uses different names than what's in
normalizeProduct(), adjust that one function - nothing else needs to change.

The cart and favorites are intentionally frontend-only (React Context) since
there is no Order API yet. Once you add one, wire CartDrawer's
handlePlaceOrder to a real POST /orders call.

## Project structure

```
src/
  components/   Navbar, Hero, ProductCard, modals, cart drawer, etc.
  services/     productService.js - the only place that talks to the API
  context/      ProductsContext, CartContext, FavoritesContext, ToastContext
  pages/        Home, Products, ProductDetails, Categories, Favorites
  utils/        currency formatter, category list, search/filter helper
```

## Build

```bash
npm run build
```

Outputs to `dist/`, ready to deploy to Vercel or any static host. Make sure
the backend's CORS configuration allows your deployed frontend's domain.
