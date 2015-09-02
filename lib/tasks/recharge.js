'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _config = require('../config');

exports['default'] = function () {
  Creep.prototype.recharge = function () {
    var source = _config.energyForRecharging[undefined.memory.source || _config.energyForRecharging.length - 1];

    creep.moveTo(source);
    source.transferEnergy(creep);
  };
};

module.exports = exports['default'];