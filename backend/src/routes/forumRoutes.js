
const express = require('express');
const {
  getCategories,
  getThreadsByCategory,
  getThreadDetails,
  createThread,
  addPost,
  addComment,
} = require('../controllers/forumController');
const { authMiddleware } = require('../utils/authMiddleware');

const router = express.Router();

router.get('/categories', getCategories); // Fetch all categories
router.get('/threads/:categoryId', getThreadsByCategory); // Fetch threads by category
router.get('/thread/:threadId', getThreadDetails); // Fetch thread details
router.post('/thread', authMiddleware, createThread); // Create new thread
router.post('/post', authMiddleware, addPost); // Add post to a thread
router.post('/comment', authMiddleware, addComment); // Add comment to a post

module.exports = router;
