const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

const Comment = require('../models/comment');

exports.readList = asyncHandler(async (req, res, next) => {
    const comments = await Comment.find({ post: req.params.postId }).sort({ datePosted: -1 }).exec();

    res.json({ comments });
});

exports.create = [
    body('content')
        .trim()
        .isLength({ min: 1 }).withMessage('Comment must contain at least one character')
        .isLength({ max: 1000 }).withMessage('Comment cannot contain more than 1000 characters'),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const comment = new Comment({
            post: req.params.postId,
            content: req.body.content
        });

        if (!errors.isEmpty()) {
            res.status(400).json({
                comment,
                errors
            });
            return;
        }

        await comment.save();
        res.status(200).send('success');
    })
]