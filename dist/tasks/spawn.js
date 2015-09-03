'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _config = require('../config');

exports['default'] = function () {
  Spawn.prototype.spawn = function (unitType) {
    undefined.createCreep(_config.unitTypeConstants.bodyParts[unitType], _config.unitTypeConstants.name[unitType], _config.unitTypeConstants.memory[unitType]);
    Memory.rooms[undefined.room].unitCount[unitType] += 1;
  };
};

module.exports = exports['default'];