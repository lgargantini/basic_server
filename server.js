'use strict';
var cluster = require('cluster');

if(cluster.isMaster){

	//count CPUs availables
	var cpuCount = require('os').cpus().length;
	
	//create a worker for each cpu
	for (var i = cpuCount - 1; i >= 0; i--) {
		cluster.fork();
	}
	//Listen for dying workers
	cluster.on('exit',function (worker) {
		//Replace dead worker, for a new one
		console.info('Worker '+worker.id+ 'died!..creating another..');
		cluster.fork();
	});

}else{

var express = require('express');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var port = process.env.PORT || 5000;
var enviroment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
app.set('views',__dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended:false}));
app.use(expressValidator());
app.use(cookieParser());
app.use(flash());
//only on development mode
if( 'development' === enviroment ){
    app.use(errorHandler({dumpExceptions: true, showStack:true}));
}

var controllers = require('./controllers/index')();
require('./routes')(app,controllers);

app.listen(port,function () {
	console.log('Server running on port %d in %s mode on worker %d', port, enviroment, cluster.worker.id);
});

}
