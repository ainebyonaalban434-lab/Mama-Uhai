# Mama Uhai App

This workspace contains a frontend and backend scaffold for the Mama Uhai app.

## Frontend
- Folder: `frontend`
- React + Vite app
- Run: `npm install` and `npm run dev`

## Backend
- Folder: `backend`
- Express API with MongoDB support
- Run: `npm install` and `npm run dev`

## Notes
- The frontend calls `/api/status` for a backend health check.
- In production, the backend can serve the built frontend from `frontend/dist`.
- Configure MongoDB using `MONGODB_URI` and `MONGODB_DB_NAME`.
- Defaults: `mongodb://localhost:27017` and `mama_uhai`.
