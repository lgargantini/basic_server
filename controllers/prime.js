'use strict';
process.on('message', function (m) {
	console.log('Child got down:',m);
	var list = findPrimes(m.num);
	process.send({range:m,resultList: list});
	process.exit();
	
});

function findPrimes(number) {
		var primes = [0,1,2];
		var primesCirc =[0,1,2];
		var iterate = 3;
			//populate array prime
			for (var i = iterate; i <= number; i++) {
				if(isPrime(i)){
					primes.push(i);
				}
			}
			//circular
			for(i = iterate; i < primes.length; i++) {
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