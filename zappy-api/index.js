var express    = require('express');
var bodyParser = require('body-parser');
var api        = require('./api');
var mongoose   = require('mongoose');
var config     = require('./config');
var port       = process.env.PORT || config.port;
var router     = express.Router();
var http        = require('http');

var app = express();

//middleware to parse post requests body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// cors middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Credentials", true)

    next()
});

app.use('/api/', api);
const server = http.createServer(app);
var io = require("socket.io").listen(server);

//connect to mongodb
mongoose.connect(config.db.host);

//listen for slack messages and emit tweets
listen = require('./services/twitter');
listen(io);
server.listen(port);
console.log('Listening on port ' + port);

module.exports = {server}
