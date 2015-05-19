var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');





var routes = require('./routes');
var users = require('./routes/user');



var main = require('./routes/main');
var forma = require('./routes/forma');
var sorry = require('./routes/sorry');
var gallery = require('./routes/gallery');
var contacts = require('./routes/contacts');



var app = require('express')();
var http = require('http').Server(app);


//insert data

//end

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.session({
	secret: '123abc', key: 'sid' 
}));


app.use(function(req,res,next){
	res.locals = {
		scripts: config.get('scripts'),
		styles: config.get('styles'),
		userid: req.session.user
	};
	next();
});


app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);
app.use(express.bodyParser({
	keepExtensions:true,
	uploadDir: 'public/tmp'
}));

app.get('/', main.index);
app.get('/users', users.list);

app.get('/main', main.index);
app.get('/forma', forma.index);
app.get('/sorry', sorry.index);
app.get('/gallery', gallery.index);
app.get('/contacts', contacts.index);


app.get('/:id', routes.index);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



http.listen(config.get('port'), function(){
  console.log('listening on : '+config.get('port'));
});
//http.listen(config.get('port'));
module.exports = app;