# Blog-Postings-REST-API-with-Database-Integration
# Blog Posts REST API

A RESTful API for managing blog posts with Node.js, Express.js, and MySQL.

## Features

- Full CRUD operations for blog posts
- User authentication with JWT
- Rate limiting (100 requests per 2 minutes)
- MySQL database integration

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/posts` | Retrieve all blog posts |
| GET | `/posts/:id` | Retrieve a specific blog post |
| POST | `/posts` | Create a new blog post |
| PUT | `/posts/:id` | Update an existing blog post |
| DELETE | `/posts/:id` | Delete a blog post |
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive JWT token |

## Installation

1. Clone the repository:
```
git clone https://github.com/your-username/blog-posts-api.git
cd blog-posts-api
```

2. Install dependencies:
```
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
PORT=3000
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=blog_api
JWT_SECRET=your_jwt_secret_key
```

4. Set up the database:
```sql
CREATE DATABASE blog_api;
USE blog_api;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(50) NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

5. Start the server:
```
npm run dev
```
