
Blog Postings REST API with Database Integration
A RESTful API built with Node.js and Express.js, designed to manage blog posts with full CRUD (Create, Read, Update, Delete) functionality. The application integrates with a MongoDB database using Mongoose for data modeling and interaction.

Features
Create new blog posts

Read all blog posts or a specific post by ID

Update existing blog posts

Delete blog posts

Middleware for request handling and error management

Modular structure with separate folders for controllers, routes, models, middleware, and utilities

Prerequisites
Node.js installed on your machine

MongoDB instance (local or cloud-based)

Git for cloning the repository

Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/Metroooo1975/Blog-Postings-REST-API-with-Database-Integration.git
Navigate to the project directory:

bash
Copy
Edit
cd Blog-Postings-REST-API-with-Database-Integration
Install dependencies:

bash
Copy
Edit
npm install
Set up environment variables:

Create a .env file in the root directory and add the following:

env
Copy
Edit
PORT=3000
MONGODB_URI=your_mongodb_connection_string
Replace your_mongodb_connection_string with your actual MongoDB connection string.

Running the Application
Start the server with the following command:

bash
Copy
Edit
npm start
The server will run on the port specified in your .env file (default is 3000). You should see output indicating that the server is running and connected to MongoDB.

API Endpoints
Create a New Blog Post
URL: /api/posts

Method: POST

Headers: Content-Type: application/json

Body:

json
Copy
Edit
{
  "title": "Sample Post",
  "content": "This is a sample blog post.",
  "author": "Author Name"
}
Success Response:

Code: 201 Created

Content:

json
Copy
Edit
{
  "message": "Post created successfully",
  "post": {
    "_id": "post_id",
    "title": "Sample Post",
    "content": "This is a sample blog post.",
    "author": "Author Name",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
Retrieve All Blog Posts
URL: /api/posts

Method: GET

Success Response:

Code: 200 OK

Content: Array of blog post objects

Retrieve a Single Blog Post by ID
URL: /api/posts/:id

Method: GET

Success Response:

Code: 200 OK

Content: Blog post object

Update a Blog Post
URL: /api/posts/:id

Method: PUT

Headers: Content-Type: application/json

Body: Fields to update (e.g., title, content)

Success Response:

Code: 200 OK

Content:

json
Copy
Edit
{
  "message": "Post updated successfully",
  "post": {
    "_id": "post_id",
    "title": "Updated Title",
    "content": "Updated content.",
    "author": "Author Name",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
Delete a Blog Post
URL: /api/posts/:id

Method: DELETE

Success Response:

Code: 200 OK

Content:

json
Copy
Edit
{
  "message": "Post deleted successfully"
}
