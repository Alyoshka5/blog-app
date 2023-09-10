const mongoose = require('mongoose');
const { format } = require('timeago.js');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    content: { type: String, required: true, minLength: 1, maxLength: 1000 },
    datePosted: { type: String, required: true, default: Date.now }
});

mongoose.virual('postedAgo').get(function() {
    return format(this.datePosted);
})

module.exports = mognoose.model('Comment', CommentSchema);
