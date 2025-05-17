const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth');

// @route   GET /posts
// @desc    Get all posts
// @access  Public
router.get('/', postController.getAllPosts);

// @route   GET /posts/:id
// @desc    Get post by ID
// @access  Public
router.get('/:id', postController.getPostById);

// @route   POST /posts
// @desc    Create a new post
// @access  Private
router.post('/', auth, postController.createPost);

// @route   PUT /posts/:id
// @desc    Update a post
// @access  Private
router.put('/:id', auth, postController.updatePost);

// @route   DELETE /posts/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', auth, postController.deletePost);

module.exports = router;