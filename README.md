# Shop Bakery

Shop Bakery is a React SPA that was upgraded from a semester project into an endterm-ready application. It includes protected admin routes, product CRUD, product detail pages, local persistence, reusable hooks, and a mock API layer with visible loading and error states.

## Demo Credentials

- Admin route: `/admin/login`
- Email: `admin@bakery.com`
- Password: `admin123`

## Core Features

- Public catalog with search, category filtering, sorting, and dynamic product detail routes
- Protected admin area with login, dashboard, and product management
- Product create and delete operations backed by a service layer
- Cart persistence with subtotal and discount calculation
- Theme persistence and authentication persistence with localStorage
- Simulated API failure mode for defense-ready error handling

## Architecture

- `context/AuthContext.jsx`: login state and protected-route auth
- `context/ShopContext.jsx`: shared shop data, cart, filters, CRUD actions, and toast feedback
- `hooks/useLocalStorage.js`: reusable persistence hook
- `hooks/useProducts.js`: product loading logic with cleanup using `AbortController`
- `hooks/useProductFilters.js`: memoized search, filter, and sort logic
- `services/productService.js`: mock API abstraction and localStorage-backed product storage

## Defense Talking Points

- State management uses Context because the app is medium-sized and shares auth, cart, filters, and product CRUD across unrelated routes.
- `useProducts` is the best hook to explain during defense because it handles async data loading, cleanup, and reusable CRUD actions.
- The `useEffect` inside `useProducts` uses an `AbortController` cleanup so stale async work does not update state after unmount.
- Error handling can be demonstrated live from the admin dashboard by enabling the simulated API failure mode.

## Scripts

- `npm start`
- `npm test`
- `npm run build`
