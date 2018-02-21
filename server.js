
var https = require('http');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
}));
app.use(bodyParser.urlencoded({
    parameterLimit: 50000,
    limit: '50mb',
    extended: true
}));



app.all('/*', function (req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});


app.use('/', express.static(path.join(__dirname + '/client')));


// app.get('/*', function (req, res) {
//     res.sendFile('index.html', { root: __dirname + "/client" });
// });

app.get('/api/getdata', function (req, res) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    request.get('https://ec2-54-218-59-233.us-west-2.compute.amazonaws.com:3000/api/v1/logger/getAll',(error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        //console.log(JSON.parse(body));
        res.send(JSON.parse(body));
    })
});

app.get('/api/getlastdayLog', function (req, res) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    request.get('https://ec2-54-218-59-233.us-west-2.compute.amazonaws.com:3000/api/v1/logger/getRecent',(error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        //console.log(JSON.parse(body));
        res.send(JSON.parse(body));
    })
});

var port = process.env.PORT || 8080;
var server = https.createServer(app);

server.listen(port, function () {
    console.log('Template server has started on port: ' + server.address().port);
});