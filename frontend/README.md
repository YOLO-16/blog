# Portfolio & Blog SPA (React + Vite)

This frontend satisfies the requirements in `project_the_full.doc`. It consumes the companion Express API, handles authentication, and provides both public-facing pages and an authenticated admin dashboard.

## Features
- React Router pages for `/`, `/projects`, `/blog`, `/blog/:id`, `/contact`, `/login`, `/register`, and protected `/admin`.
- Global auth state stored via Context API with `localStorage` persistence, login/registration forms, and logout handling.
- API integration for every required endpoint: fetch portfolio data, submit contact forms, post comments, and manage projects/blog posts with JWT-secured requests.
- Modern, responsive UI using CSS Modules, card components, and conditional loading/error states.

## Local Development
```bash
cd frontend
npm install
cp .env.example .env   # set VITE_API_BASE_URL=http://localhost:5000 (or your deployed API)
npm run dev            # start Vite dev server
```

To mimic production:
```bash
npm run build
npm run preview
```

## Key Directories
- `src/context/AuthContext.jsx` – auth state + helpers.
- `src/services/apiClient.js` – fetch wrapper that injects the API base URL and JWT header.
- `src/pages/` – public pages, auth forms, and admin dashboard.
- `src/components/` – layout, navigation, cards, loader/error components, and protected-route wrapper.
- `src/styles/` – CSS Modules shared across the app.

Deploy the contents of `frontend/dist` (generated via `npm run build`) to Vercel/Netlify and set `VITE_API_BASE_URL` to your live backend URL.
