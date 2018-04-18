let config      = require('./../config.json');
let {RTMClient} = require('@slack/client');
let Twitter     = require('twitter');
let {create}    = require('../api/tweet/controller');


//init slack Real Time Messaging
const rtm = new RTMClient(config.slack.zappybotApiToken);

//init twitter
const client = new Twitter({
    consumer_key: config.twitter.consumerKey,
    consumer_secret: config.twitter.consumerSecret,
    access_token_key: config.twitter.accessTokenKey,
    access_token_secret: config.twitter.accessTokenSecret
});


let listen = (io) => {
    io.on('connection', function(socket){
        console.log('---------------------------------------------------------------->a user connected');

        socket.on('load', function(data){
            io.sockets.emit('load', data);
            console.log('data: ' + JSON.stringify(data));
            //app.io.emit('load', data);
        });
        /*socket.on('load', function(tweets){
            io.emit('broadcast', tweets);
        });*/
    });
    rtm.start();
    rtm.on('message', (event) => {

        let message = event.text ? event.text.replace(/[^a-zA-Z ]/g, "") : '';
        message = message ? ` ${message} ` : '';
        if (config.slack.channel == event.channel && message && /\sgo\s/i.test(message)) {
            //get tweets
            client.get('statuses/user_timeline', {count: 1000}, async (error, tweets, response) => {
                for (let i = 0; i < tweets.length; i++) {
                    let tweet = tweets[i];
                    //todo: try{} && catch(error)
                    await create({
                        id: tweet.id_str,
                        text: tweet.text,
                        created_at: tweet.created_at
                    });
                    //todo:possible to emit only newly created ones rather than all
                    console.log("=======>", tweets)
                    io.sockets.emit('load', tweets);
                }
            });
        }
    });
}
module.exports = listen;
