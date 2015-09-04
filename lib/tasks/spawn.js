'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _config = require('../config');

exports['default'] = function () {
  Spawn.prototype.spawn = function (unitType) {
    undefined.createCreep(_config.unitTypeConstants[unitType]);
    Memory.rooms[undefined.room].unitCount[unitType]++;
  };
};

module.exports = exports['default'];