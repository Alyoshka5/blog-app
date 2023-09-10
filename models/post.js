const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, requred: true },
    content: { type: String, required: true },
    datePosted: { type: Date, default: Date.now },
    isPublished: { type: Boolean, require: true, default: false }
});

PostSchema.virtual('url').get(function() {
    return `/posts/${this._id}`;
})

PostSchema.virtual('datePostedFormatted').get(function() {
    return DateTime.fromJSDate(this.datePosted).toLocaleString(DateTime.DATE_MED);
});

PostSchema.virtual('timePosted').get(function() {
    return DateTime.fromJSDate(this.datePosted).toLocaleString(DateTime.TIME_SIMPLE);
});

module.exports = mongoose.model('Post', PostSchema);