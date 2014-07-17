'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    swig = require('swig');

exports.compose = function(input) {
	switch(input.type) {
		case 'CREATED':
			input.action = 'Create';
			break;
		case 'COMMENT':
			input.action = 'Comment';
			break;
		case 'UPDATED':
			input.action = 'Update';
			switch(input.subtype) {
				case 'DUE':
					input.content = swig.renderFile(__dirname + '/../views/partials/email-update-due.server.view.html', input);
					break;
				case 'NAME':
					input.content = swig.renderFile(__dirname + '/../views/partials/email-update-name.server.view.html', input);
					break;
				case 'STATE':
					input.content = swig.renderFile(__dirname + '/../views/partials/email-update-state.server.view.html', input);
					break;
				case 'DESCRIPTION':
					input.content = swig.renderFile(__dirname + '/../views/partials/email-update-desc.server.view.html', input);
					break;
				default:
					input.content = swig.renderFile(__dirname + '/../views/partials/email-update.server.view.html', input);
			}
			break;
		case 'PRENOTIF':
			input.action = 'Due';
			input.content = swig.renderFile(__dirname + '/../views/partials/email-predue.server.view.html', input);
			break;
		case 'NOTIF':
			input.action = 'Due';
			input.content = swig.renderFile(__dirname + '/../views/partials/email-due.server.view.html', input);
			break;
		default:
			input.content = 'Error, no template found.';
			return false;
	}

	return swig.renderFile(__dirname + '/../views/email.server.view.html', input);
};

exports.read = function(req, res) {
	var template = exports.compose({
		'type': 'UPDATED',
		'subtype': 'DESCRIPTION',
		'author': {
			'uid': 'Hajek',
			'name': 'Miroslav Hajek',
			'link': 'http://google.com.cu'
		},
		'ticket': {
			'name': 'Hahaha',
			'due': Date.now(),
			'link': 'http://google.sk'
		},
		'elements': [
			{
				'name': 'Pracka',
				'link': 'http://google.ru'
			},
			{
				'name': 'Auto',
				'link': 'http://google.cz'
			}
		],
		'content': 'aisdbadoi bsohadio  oi hwaoi hoi awid haio baobfoawh oihowf a<br />  iwda hoiwa hwao iboabfo w'
	});

	res.send(200, template);
};