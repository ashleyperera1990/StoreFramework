var express = require('express');
var app = express();
var bodyParser = require('body-parser'); //bodyparser + json + urlencoder
var morgan  = require('morgan'); // logger
var mongoose = require('mongoose');
var config = require('./configs/database');
var passport = require('passport');
var jwt = require('jwt-simple');
var cookieParser = require('cookie-parser');


require('./configs/passport')(passport);

//Configuration
app.set('port', 4001);
app.listen(app.get('port'));
app.use(bodyParser());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(cookieParser())


app.all('*', function(req, res, next) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:8888');
    res.set('Access-Control-Allow-Credentials', true);
    res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.set('Access-Control-Allow-Headers', 'Authorization, X-Requested-With, Content-Type');
    if ('OPTIONS' == req.method) return res.send(200);
    next();
});

mongoose.connect(config.database);

//Routes
var routes = {};
routes.example = require('./routes/example');
routes.user = require('./routes/user.route');
routes.order = require('./routes/order.route.js');


//Routing URLs
app.get('/products/getAll', routes.example.getAll);

app.post('/submitOrder', routes.order.create);
app.get('/getPreviousOrders/:id', routes.order.getAllByUserId);
app.get('/getOrder/:id', routes.order.getById);

app.post('/authenticate', routes.user.authenticate);
app.get('/getUserInfo',  passport.authenticate('jwt', { session: false}), routes.user.getUserInfo);
app.post('/signUp', routes.user.create);

app.get('/read/:id', routes.example.read);
app.post('/create', routes.example.create);
