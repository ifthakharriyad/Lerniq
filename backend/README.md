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

At the root of your project create an .env file with the following contents:

```javascript
JWT_SECRET=<YOUR_SECRET>
JWT_EXPIRE=30d // or any reasonable value that you prefer
HOST=<DATABASE_HOST>
DB_PORT=<DATABASE_PORT>
DATABASE=<DATABASE_NAME>
USERNAME=<DATABASE_USERNAME>
PASSWORD=<DATABASE_PASSWORD>
```

Then run <code>yarn install</code> and <code>yarn run dev</code> to start the development server

