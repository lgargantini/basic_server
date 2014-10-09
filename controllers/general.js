'use strict';
module.exports = function () {

	function findPrimes(number) {
		var primes = [0,1,2];
		var primesCirc = [0,1,2];
		var sqrtNumber = Math.ceil(Math.sqrt(number));

			//populate array prime
			for (var i = 3; i < number; i++) {
				if(isPrime(i)){
					primes.push(i);
				}
			}
			//circular
			for(i = 3; i < primes.length; i++) {
				if(isCircularPrime(primes[i])){
					primesCirc.push(primes[i]);
				}
			}
			return primesCirc;
	}

	function isCircularPrime (number) {
		var lengthTopNumber = digits(number);
		var magnification = Math.pow(10, lengthTopNumber - 1 );
	//criba de eratostenes
	for(var i=0; i < lengthTopNumber; i++){
		if(!isPrime(number)){
			return false;
		}
		number = rotatePrime(number,magnification);
	}
	return true;

	}

	function isPrime (val) {
		var sqrtNumber = Math.ceil(Math.sqrt(val));
		
		for(var i = 2; i <= sqrtNumber; i++){
			if(val%i === 0){
				return false;
			}
		}
		return true;
	}

	function digits (num) {
		return num.toString().length;
	}

	function rotatePrime(number,magnification) {
		return Math.floor((number % 10 ) * magnification + (number/10));
	}

var gen = {
	
	index: function (req,res,next) {
		res.render('index',{msg: 'wellcome!'});
		next();
	},
	validate: function (req,res,next) {
		var util = require('util');
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
			res.json({msg: 'There have been validation errors: '+util.inspect(errors)});
		}else{

			var list = findPrimes(Number(number));
			res.json({msg:'number ok', list:util.inspect(list)});

			next();
		}
	},

	logout: function (req,res,next) {
		res.render('index',{msg:'thanks!!'});
		next();
	}
};	
return gen;
};