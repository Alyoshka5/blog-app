const express = require('express');

const router = express.Router();

// posts

router.get('/posts', postController.readList);

router.get('/posts/:id', postController.readDetail);

// comments

router.get('/posts/:postId/comments', commentController.readList);

router.post('/posts/:postId/comments', commentController.create);


module.exports = router;