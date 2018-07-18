var express = require('express'),
    app = express(),
    port = process.env.PORT || 8000,
    mongoose = require('mongoose'),
    User = require('./models/userListModel'), //created model loading here
    bodyParser = require('body-parser');
var moment = require('moment');
var cors = require('cors');

//mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://root:abc123@ds247430.mlab.com:47430/test2mongo');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser());

app.use(function(req, res, next){
    console.log("BEGIN ["+req.method+"] ("+moment().format("YYYY-MM-DD, HH:mm:ss")+") Requested URL: "+req.originalUrl);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Methods","POST, GET, OPTIONS, PUT, DELETE");
    next();
});

var routes = require('./routes/userListRoutes'); //importing route
routes(app); //register the route

app.listen(port);


console.log('RESTful API server started on: ' + port);