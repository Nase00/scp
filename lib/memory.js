'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _config = require('./config');

exports['default'] = function () {
	for (var room in _config.rooms) {
		Memory.rooms[room].structuresNeedingRepair = [];
		Memory.rooms[room].structuresNeedingConstruction = [];
		Memory.rooms[room].sources = [];
		Memory.rooms[room].stores = {
			energyStores: [],
			fullEnergyStores: []
		};
	}
};

module.exports = exports['default'];