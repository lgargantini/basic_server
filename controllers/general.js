'use strict';
module.exports = function () {
var results = {};
//SHOW ALERTS 
	var showAlert = function (res, render, type, msg) {
		res.render(render,{flash:{ type: type, messages: [{msg: msg}]}});
	};

	//SHOW RESULTS 
	var showResult = function (res, render,results) {
		res.render(render,{results: results});
	};

	function primesValidate (number,res) {
		
		var cp = require('child_process');
		var n = cp.fork(__dirname+'/prime.js');
		//FIND PRIMES
		findPrimes(number,n);
		//child handler
		childHandler(n,res);
		return results;
	}

	function childHandler (n,res) {
		n.on('message', function (m) {
			results = m.resultList;
		})
		.on('err', function (data) {
				console.log('stderr: ' + data);
		})
		.on('exit', function (code) {
				console.log('child process exited with code :' + code);
				showResult(res, 'index', results);
		});
	}

	function findPrimes (number,n) {
		console.log('forked child pid:'+ n.pid);
		n.send({num: number});
	}

var gen = {
	
	index: function (req,res,next) {
		showAlert(res, 'index', 'alert-info','wellcome! ');
		next();
	},
	validate: function (req,res) {
		var number = req.param('number') ? req.param('number') : req.body.numberPost;

		if(req.body.numberPost !== undefined){
			req.assert('numberPost','Invalid number must be int').isInt();
			req.assert('numberPost','Must enter a number').notEmpty();
			req.assert('numberPost','1 to 7 digits allowed').len(1,7);
		}

		if(req.param('number') !== undefined){
			req.assert('number','Invalid number must be int').isInt();
			req.assert('number','Must enter a number').notEmpty();
			req.assert('number','1 to 7 digits allowed').len(1,7);	
		}
		
		//validation
		var errors = req.validationErrors();
		
		if(errors){
			for(var i=0;i<errors.length;i++){
				showAlert(res,'index','alert-danger',errors[i].msg +' your input was '+errors[i].value+' and is wrong!');	
			}
		}else{
			primesValidate(Number(number),res);
		}

	},

	logout: function (req,res,next) {
		showAlert(res, 'index', 'alert-info', 'thanks!!!');
		next();
	}
};	
return gen;
};
