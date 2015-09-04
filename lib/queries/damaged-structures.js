'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _config = require('../config');

exports['default'] = function () {
	var _loop = function (room) {
		Memory.rooms[room].structuresNeedingRepair.length = 0;
		Game.rooms[room].find(FIND_STRUCTURES, {
			filter: function filter(structure) {
				if (structure.hitsMax >= 1 && structure.hits < _config.wallHealth) {
					Memory.rooms[room].structuresNeedingRepair.push(structure.id);
				}
			}
		});
	};

	for (var room in _config.rooms) {
		_loop(room);
	}
};

module.exports = exports['default'];