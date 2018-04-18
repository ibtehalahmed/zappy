var Tweet = require('../../models');

let index = (req, res, next) => {
    Tweet.find().limit(3700)
        .then((tweets) => res.status(200).json(tweets))
        .catch(next);
};

let create = (tweet) => {
    Tweet.create(tweet)
        .then((tweet)=> {return tweet})
        .catch()
};

module.exports = {index, create};
