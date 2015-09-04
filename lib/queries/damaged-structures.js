'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _config = require('../config');

exports['default'] = function (room) {
  var structuresNeedingRepair = [];
  room.find(FIND_STRUCTURES, {
    filter: function filter(structure) {
      if (structure.hitsMax > 1 && structure.hits < _config.wallHealth) {
        structuresNeedingRepair.push(i);
      }
    }
  });
  return structuresNeedingRepair;
};

module.exports = exports['default'];