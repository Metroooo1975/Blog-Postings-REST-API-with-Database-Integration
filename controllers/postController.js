const Post = require('../models/Post');

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    console.error('Get all posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('Get post by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Create new post
exports.createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    
    // Validate input
    if (!title || !content || !author) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, content and author'
      });
    }
    
    // Create post
    const newPost = await Post.create({
      title,
      content,
      author,
      userId: req.user.id
    });
    
    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: newPost
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Update post
exports.updatePost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    
    // Validate input
    if (!title || !content || !author) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, content and author'
      });
    }
    
    // Update post
    const result = await Post.update(req.params.id, {
      title,
      content,
      author
    }, req.user.id);

    if (!result.authorized) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this post'
      });
    }
    
    if (!result.post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: result.post
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    const result = await Post.delete(req.params.id, req.user.id);

    if (!result.authorized) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this post'
      });
    }
    
    if (!result.deleted) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};