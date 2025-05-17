const { pool } = require('../config/db');

class Post {
  // Get all posts
  static async findAll() {
    try {
      const [rows] = await pool.query(`
        SELECT p.id, p.title, p.content, p.author, p.created_at, p.updated_at, p.user_id, u.username
        FROM posts p
        JOIN users u ON p.user_id = u.id
        ORDER BY p.created_at DESC
      `);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get post by ID
  static async findById(id) {
    try {
      const [rows] = await pool.query(`
        SELECT p.id, p.title, p.content, p.author, p.created_at, p.updated_at, p.user_id, u.username
        FROM posts p
        JOIN users u ON p.user_id = u.id
        WHERE p.id = ?
      `, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Create new post
  static async create(postData) {
    try {
      const { title, content, author, userId } = postData;
      const [result] = await pool.query(`
        INSERT INTO posts (title, content, author, user_id)
        VALUES (?, ?, ?, ?)
      `, [title, content, author, userId]);
      
      if (result.affectedRows === 1) {
        const newPost = await this.findById(result.insertId);
        return newPost;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  // Update post
  static async update(id, postData, userId) {
    try {
      // First check if the post belongs to the user
      const [ownership] = await pool.query(
        'SELECT * FROM posts WHERE id = ? AND user_id = ?',
        [id, userId]
      );

      if (ownership.length === 0) {
        return { authorized: false };
      }

      const { title, content, author } = postData;
      const [result] = await pool.query(`
        UPDATE posts
        SET title = ?, content = ?, author = ?
        WHERE id = ? AND user_id = ?
      `, [title, content, author, id, userId]);
      
      if (result.affectedRows === 1) {
        const updatedPost = await this.findById(id);
        return { authorized: true, post: updatedPost };
      }
      return { authorized: true, post: null };
    } catch (error) {
      throw error;
    }
  }

  // Delete post
  static async delete(id, userId) {
    try {
      // First check if the post belongs to the user
      const [ownership] = await pool.query(
        'SELECT * FROM posts WHERE id = ? AND user_id = ?',
        [id, userId]
      );

      if (ownership.length === 0) {
        return { authorized: false };
      }

      const [result] = await pool.query(`
        DELETE FROM posts
        WHERE id = ? AND user_id = ?
      `, [id, userId]);
      
      return { authorized: true, deleted: result.affectedRows === 1 };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Post;