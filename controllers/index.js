module.exports = function () {

	var endpoints = {
		general: require('./general.js')()
	};
	
	return endpoints;

}