const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    drinkID: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    }
});

module.exports = model('Comment', commentSchema);