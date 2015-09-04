'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _config = require('../config');

exports['default'] = function () {
	var _loop = function (room) {
		Memory.rooms[room].sources.length = 0;
		Game.rooms[room].find(FIND_SOURCES, {
			filter: function filter(source) {
				Memory.rooms[room].sources.push(source.id);
			}
		});
	};

	for (var room in _config.rooms) {
		_loop(room);
	}
};

module.exports = exports['default'];