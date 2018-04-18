var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var TweetSchema = new Schema({
    id:{
        type: String,
        unique: true
    },
    text:{
        type: String
    },
    created_at: {
        type: Date
    }
});

module.exports = mongoose.model('Tweet', TweetSchema);
