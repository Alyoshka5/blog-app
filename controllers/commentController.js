const asyncHandler = require('express-async-handler');
const Comment = require('../models/comment');

exports.readList = asyncHandler(async (req, res, next) => {
    const comments = await Comment.find({ post: req.params.postId }).sort({ datePosted: -1 }).exec();

    res.json({ comments });
});

exports.create = asyncHandler(async (req, res, next) => {
    res.json();
});