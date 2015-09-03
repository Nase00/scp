'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

exports['default'] = function () {
	var _loop = function (room) {
		Memory.rooms[room].sources = [];

		Game.rooms[room].find(FIND_SOURCES, {
			filter: function filter(source) {
				Memory.rooms[room].sources.push(source);
			}
		});
	};

	for (var room in _config2['default']) {
		_loop(room);
	}
};

module.exports = exports['default'];