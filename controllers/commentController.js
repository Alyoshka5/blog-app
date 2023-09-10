const asyncHandler = require('express-async-handler');
const Comment = require('../models/comment');

exports.readList = asyncHandler(async (req, res, next) => {
    res.json();
});

exports.create = asyncHandler(async (req, res, next) => {
    res.json();
});