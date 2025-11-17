# Portfolio & Blog Platform (API + SPA)

Two coordinated deliverables live in this repository:

1. **Backend (`/src` + Node.js root)** – Express + MongoDB Atlas REST API that exposes portfolio projects, blog posts, comments, contact messages, and JWT authentication.
2. **Frontend (`/frontend`)** – React single-page application that consumes every API endpoint, implements protected admin tooling, and fulfils the `project_the_full.doc` specification.

Both halves are production-ready, fully authenticated, and share the same deployment story described in the course brief.

---

## Backend API (Node.js/Express)

- **Tech**: Node.js 22, Express 5, Mongoose 8, JWT + bcryptjs, Helmet, CORS, Morgan.
- **Structure**: MVC-style folders (`models`, `controllers`, `routes`, `middleware`, `utils`). All routes funnel through centralized error handling and JWT-protected middleware.
- **Data Models**: User, Project, BlogPost, Comment, Message – each with validation, references, and timestamps.
- **Key Endpoints**:
  - `POST /api/users/register` & `POST /api/users/login`
  - `GET|POST|PUT|DELETE /api/projects`
  - `GET|POST|PUT|DELETE /api/blog`
  - `GET|POST /api/blog/:postId/comments`
  - `POST /api/contact`
  - `GET /health` probe

### Backend Setup
```bash
npm install
cp .env.example .env   # fill in real values
npm run dev            # or: npm start
```

| Env Var | Description |
| ------- | ----------- |
| `PORT` | HTTP port (defaults to 5000) |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret for signing access tokens |
| `JWT_EXPIRES_IN` | (Optional) expiry e.g. `7d` |
| `ALLOWED_ORIGINS` | Comma separated origins for CORS (`*` to allow all) |

---

## Frontend SPA (`/frontend`)

- **Tech**: React 19 + Vite, React Router, Context API, CSS Modules.
- **Architecture**: Shared layout (Header/Footer), per-page components (Home, Projects, Blog, Blog Detail, Contact, Login, Register, Admin, NotFound), reusable cards + loaders.
- **State Management**: Context API stores auth token/user in `localStorage`, exposes `login/register/logout`, and guards protected routes. Component state handled with `useState` and API fetches with `useEffect`.
- **API Coverage**: Every GET/POST/PUT/DELETE route described in the spec is wired through `fetch` helpers with automatic Bearer headers for protected actions.
- **Admin Dashboard**: `/admin` is guarded by `<ProtectedRoute />`, supports full CRUD for projects and blog posts, plus inline editing + deletion with confirmation prompts.
- **UI Requirements**: Responsive layout, props-driven cards, conditional rendering for loading/error states, comment form on blog detail (POST `/api/blog/:id/comments`), contact form (POST `/api/contact`), auth-aware header links.

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env   # set VITE_API_BASE_URL to your deployed API
npm run dev            # start Vite dev server
```

| Env Var | Description |
| ------- | ----------- |
| `VITE_API_BASE_URL` | Base URL for the backend API (e.g. `http://localhost:5000`) |

Run `npm run build` inside `frontend` to produce the deployable bundle for Vercel/Netlify.

---

## Deployment Checklist

1. **Backend** – Deploy to Render/Heroku/Fly/etc., set environment variables above, and ensure `/health` responds.
2. **Frontend** – Deploy the Vite build (`npm run build`) to Netlify/Vercel with `VITE_API_BASE_URL` pointing at the live API.
3. **Verification** – Confirm the deployed SPA can:
   - Read projects (`/projects`), blog posts (`/blog`, `/blog/:id`), and contact data.
   - Submit contact forms, register/login, and add comments.
   - Access `/admin` after logging in to create/update/delete projects and posts.
4. **Submission** – Provide the production frontend URL, backend URL, and source repository link as required. 

With both halves online, you have a complete full-stack graduation project matching the course briefs contained in the supplied Word documents.
