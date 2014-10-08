module.exports = function () {

function criba(number) {
var primo = new Array();
var primosClean = new Array();

//criba
var sqrtNumber = Math.ceil(Math.sqrt(number));
console.log(Math.sqrt(number));
console.log(sqrtNumber);
for (var i = 0; i < number; i++) {
	primo.push(i);
}

console.log('1 ----> '+primo);
for(i = 2; i < sqrtNumber; i++){
	for(var j=i ;(j*i) < number; j++){
		console.log('saca'+(i*j));
		delete primo[i*j];
	}
}

for (var i = 0; i < primo.length; i++) {
	if(!isNaN(primo[i])){
	primosClean.push(primo[i]);
	}
};

console.log('2---> '+primosClean);
return primosClean;
}

function circularNumbers (list) {
var circ = new Array();
	for(var num in list){
		checkCircular(num,list);
	}
console.log(circ);
}

function checkCircular(number,list) {
	var output = [],
    sNumber = number.toString();

for (var i = 0, len = sNumber.length; i < len; i += 1) {
    output.push(+sNumber.charAt(i));
}
//generateEveryPosition && toNumbers
/*
func everyPos(output){
	async.parallel([
	//at least 1 thread per digit (e.x.: 2 digit -> 1 thread, 3 -> 1 thread, 4 -> 2 thread )
		isPrime(shuffle(output),ifErr(stopAll!));
		
	]);
	function ifErr(output){
	//podar!
	delete list[ every number group];
	}
}

)
	return group;
}
*/


}

};

var gen = {
	
	index: function (req,res,next) {
		res.render('index',{msg: 'wellcome!'});
		next();
	},
	validate: function (req,res,next) {
	var util = require('util');

	if(req.body)
		console.log(req.body.numberPost);

	if(req.params)
		console.log(req.params);
	
	var number = req.param('number') ? req.param('number') : req.body.numberPost;
	//validation
	req.assert('number','Invalid number must be int').isInt();
	req.assert('number','Must enter a number').notEmpty();
	req.assert('number','1 to 7 digits allowed').len(1,7);

	var errors = req.validationErrors();
	
	if(errors){
				res.render('index',{msg: 'There have been validation errors: '+util.inspect(errors)});
				return;
	}
	var list = criba(Number(number));
	var circularList = circularNumbers(list);

	res.render('index',{msg:'number ok', number:number,list:list});
	next();
	},
	logout: function (req,res,next) {
		res.render('index',{msg:'thanks!!'});
		next();
	}
}	
return gen;
}