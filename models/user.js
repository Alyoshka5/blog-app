const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, required: true, enum: ['admin', 'editor'], default: 'editor'}
});

module.exports = mognoose.model('User', UserSchema);