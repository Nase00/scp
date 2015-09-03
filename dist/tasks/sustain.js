"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports["default"] = function (room, unitCount) {
	for (var creepType in Memory.rooms[room].unitCount) {
		if (creepType < unitCount[creepType]) {
			Game.rooms[room].spawn(creepType);
		}
	}
};

module.exports = exports["default"];