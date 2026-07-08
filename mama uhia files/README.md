# Mama Uhai - Maternal Health Platform

## Frontend

A modern React application for mothers and admins to track maternal health.

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:3000`

### Frontend Features
- **Login/Register**: Role-based authentication (Mother, Admin)
- **Mother Dashboard**: Track health records (weight, blood pressure, notes)
- **Admin Dashboard**: View all users and statistics
- **Responsive Design**: Works on desktop and mobile devices

### Frontend Technologies
- React 18
- Vite
- TypeScript
- Tailwind CSS
- React Router
- Zustand (State Management)
- React Hook Form
- Zod (Validation)
- Axios

## Backend

A Node.js/Express API server for handling authentication and data management.

### Backend Setup

```bash
cd Backend
npm install
npm run dev
```

Backend will run on `http://localhost:5000`

### Backend API Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request password reset

#### Health Records (Protected)
- `GET /api/health/records` - Get user's health records
- `POST /api/health/records` - Add new health record
- `PUT /api/health/records/:id` - Update health record
- `DELETE /api/health/records/:id` - Delete health record

#### Admin (Admin Only)
- `GET /api/admin/users` - Get all users
- `GET /api/admin/stats` - Get platform statistics
- `GET /api/admin/users/:id` - Get user details

### Backend Technologies
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcryptjs (Password hashing)

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/mama-uhai
JWT_SECRET=your-super-secret-key-change-this-in-production
JWT_EXPIRE=7d
NODE_ENV=development
```

## Running the Application

1. **Start Backend**
```bash
cd Backend
npm install
npm run dev
```

2. **Start Frontend** (in another terminal)
```bash
cd Frontend
npm install
npm run dev
```

3. **Access Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

## Default Test Users

After running the backend, you can register new users through the registration page.

## Project Structure

```
mama-uhai/
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── index.js
│   ├── package.json
│   └── .env.example
└── README.md
```

## Features

### For Mothers
- Secure login/registration
- Track health metrics (weight, blood pressure)
- Add daily notes
- View health history
- Receive personalized care insights

### For Admins
- View all registered users
- Monitor platform statistics
- Access user health records
- Generate reports

## Future Enhancements

- [ ] Video consultation integration
- [ ] Appointment scheduling
- [ ] Medication reminders
- [ ] Healthcare provider integration
- [ ] Mobile app (React Native)
- [ ] Push notifications
- [ ] Advanced analytics dashboard

## Support

For issues or questions, please contact the development team.

## License

ISC
