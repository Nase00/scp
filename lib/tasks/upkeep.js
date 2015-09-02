'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _config = require('../config');

exports['default'] = function () {
  Creep.prototype.upkeep = function () {
    var source = undefined.memory.source || 0;

    if (_config.structuresNeedingRepair.length) {
      undefined.moveTo(_config.structuresNeedingRepair[source]);
      undefined.repair(_config.structuresNeedingRepair[source]);
    } else if (_config.structuresNeedingConstruction.length) {
      undefined.moveTo(_config.structuresNeedingConstruction[source]);
      undefined.build(_config.structuresNeedingConstruction[source]);
    } else {
      undefined.moveTo(undefined.source.controller);
      undefined.upgradeController(undefined.source.controller);
    }
  };
};

module.exports = exports['default'];