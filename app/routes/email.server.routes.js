'use strict';

module.exports = function(app) {
	var email = require('../../app/controllers/email');
	app.route('/email').get(email.read);
};