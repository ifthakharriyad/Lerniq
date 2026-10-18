# Lerniq - Video Training Platform

A full-stack application designed to deliver scalable video learning experiences. Built with production-grade architecture focusing on performance, security, and maintainability.

---

## Architecture & Engineering Decisions

### Backend Design
- **RESTful API** with Express.js following MVC pattern for clean separation of concerns
- **Sequelize ORM** for type-safe database operations and automatic migrations
- **JWT Authentication** with bcryptjs hashing for secure token-based sessions
- **Error Handling Middleware** for centralized exception management and consistent error responses
- **Async/Await** patterns throughout for readable and maintainable asynchronous code

### Frontend Architecture
- **Redux Toolkit** for predictable state management across 13 feature domains
- **Component Composition** - 25+ reusable, isolated components with single responsibility
- **React Router** for client-side routing and code splitting
- **Styled Components** for scoped CSS and theme consistency

### Database Schema
5-model relational design with optimized associations:
- **User** ↔ **Video** (1:N) - Creator to content
- **User** ↔ **Course** (M:N via CourseUser) - Enrollment tracking
- **Video** ↔ **Course** (M:N via CourseVideo) - Course content management

This prevents data duplication and scales efficiently as catalog grows.

---

## Key Features

**Content Management**
- Video upload with Cloudinary integration & auto-generated thumbnails
- Course creation and organization
- Structured video discovery (search, trending, recommendations)

**User Engagement**
- Like/dislike system with persistent user preferences
- Subscribe/unsubscribe for channel notifications
- Real-time comment section with nested replies
- Watch history and personalized recommendations

**Creator Tools**
- Customizable user profiles (avatar, cover, channel description)
- Video analytics and view tracking
- Bulk course management
- Admin dashboard for moderation

---

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 16+, Redux Toolkit, React Router v5, Styled Components, Axios |
| **Backend** | Node.js, Express.js, Sequelize, MySQL |
| **Media** | Cloudinary API |
| **Auth** | JWT, bcryptjs |
| **Tools** | Git, Environment-based Configuration |

---

## Getting Started

### Prerequisites
- Node.js v14+
- MySQL 5.7+
- Cloudinary account

### Installation

**Backend**
```bash
cd backend
yarn install
```

Create `.env` files (DO NOT COMMIT)

Backend:
- Copy `backend/.env.example` → `backend/.env` and fill in real values.
- Required variables: `JWT_SECRET`, `JWT_EXPIRE`, `HOST`, `DB_PORT`, `DATABASE`, `USERNAME`, `PASSWORD`
- Optional: `AMPFETCHENDPOINT`, `AMPFETCH_TOKEN`, `CLOUDINARY_*` (if backend uploads)

Frontend:
- Copy `frontend/.env.example` → `frontend/.env.local` (or set `REACT_APP_*` envs in your host).
- Required variables (example): `REACT_APP_BE`, `REACT_APP_CLOUDINARY_ENDPOINT`, `REACT_APP_CLOUDINARY_UPLOAD_PRESET`

For CI / production: store secrets in your platform's secret store (GitHub Actions secrets, Vercel/Netlify/Heroku env) — do NOT commit `.env` files.

Run server:
```bash
yarn run dev
```

**Frontend**
```bash
cd frontend
yarn install
```

Start application:
```bash
yarn start
```

---

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/v1/auth/signup` | User registration |
| POST | `/api/v1/auth/login` | User authentication |
| GET | `/api/v1/users/:userId` | Fetch user profile |
| POST | `/api/v1/video/upload` | Upload video content |
| GET | `/api/v1/video/search` | Search videos |
| POST | `/api/v1/courses/create` | Create course |
| POST | `/api/v1/courses/enroll` | Enroll in course |

---

## Project Structure

```
Lerniq/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Business logic
│   │   ├── models/          # Database schemas
│   │   ├── routes/          # API endpoints
│   │   ├── middlewares/     # Auth & error handling
│   │   ├── sequelize.js     # DB config & associations
│   │   └── server.js        # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page containers
│   │   ├── reducers/        # Redux slices
│   │   ├── styles/          # Global styling
│   │   ├── utils/           # Helper functions
│   │   ├── App.js
│   │   ├── Router.js
│   │   └── store.js
│   └── package.json
```

---

## Performance Considerations

- **Database Indexing**: Sequelize models configured with composite keys for fast lookups
- **Query Optimization**: Eager loading prevents N+1 query problems
- **Cloud Media Hosting**: Cloudinary CDN reduces server bandwidth and enables global distribution
- **Component Memoization**: React optimization for expensive renders
- **State Normalization**: Redux store structured to minimize re-renders

---

## Security Implementation

- **Authentication**: JWT tokens with configurable expiration
- **Password Security**: bcryptjs with salt rounds for resistant hashing
- **Authorization**: Role-based access control (admin/grant flags)
- **Protected Routes**: Middleware validates tokens on sensitive endpoints
- **CORS Configuration**: Restricted cross-origin requests

---

## Future Enhancements

- [ ] Moving from a single media delivery service to multiple services
- [ ] Effortless switching between media services depending on quota or availability for better reliability.
- [ ] Creator dashboard with course and media creation and management.
- [ ] Mulitple roles for creators.
- [ ] Real-time notifications with WebSockets
- [ ] Payment integration.
- [ ] Discussion forum.
- [ ] Tests.
- [ ] Live classes.
- [ ] Mobile app (React Native).

---

---

## License

MIT License - feel free to use this project for educational and commercial purposes.
