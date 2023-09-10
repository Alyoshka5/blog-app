const asyncHandler = require('express-async-handler');
const Post = require('../models/post');

exports.readList = asyncHandler(async (req, res, next) => {
    const posts = await Post.find({ isPublished: true }).sort({ datePosted: -1 }).exec();

    res.json({ posts });
});

exports.readDetail = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id).exec();

    if (post === null) {
        const err = new Error('Post not found');
        err.status = 404;
        return next(err);
    }

    res.json({ post });
});