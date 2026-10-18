# Training platform

Training platform offering free/paid courses using MERN stack (Mysql, Express, React, Node). 


## Core packages

1. sequelize - ORM for sql dialects
2. jsonwebtoken - authentication
3. bcryptjs - password hashing

## Features

1. Login/Signup
2. Upload video
3. Search video by channel name
4. Search video by title, description
5. Like/Dislike video
6. Subscribe/Unsubscribe from channels
7. Add comment
8. Edit profile (avatar, cover)
9. Liked videos
10. History

## Running locally

Create `backend/.env` (DO NOT COMMIT)

Copy `backend/.env.example` → `backend/.env` and fill in real values for:
- `JWT_SECRET` (e.g. a long random string)
- `JWT_EXPIRE` (e.g. `30d`)
- `HOST`, `DB_PORT`, `DATABASE`, `USERNAME`, `PASSWORD` (MySQL connection)
- `AMPFETCHENDPOINT` and `AMPFETCH_TOKEN` (optional)
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` (optional)

The backend already loads environment variables. Use CI/host secret stores in production.

Then run <code>yarn install</code> and <code>yarn run dev</code> to start the development server

