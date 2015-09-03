'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _queriesEnergyStorage = require('../queries/energy-storage');

var _queriesEnergyStorage2 = _interopRequireDefault(_queriesEnergyStorage);

var _queriesEnergySources = require('../queries/energy-sources');

var _queriesEnergySources2 = _interopRequireDefault(_queriesEnergySources);

exports['default'] = function () {
  Creep.prototype.harvest = function () {
    var source = undefined.memory.source || 0;
    var sources = (0, _queriesEnergySources2['default'])(undefined.room);

    if (undefined.carry.energy < undefined.carryCapacity) {
      creep.moveTo(sources[creep.memory.source]);
      creep.harvest(sources[creep.memory.source]);
    } else {
      creep.moveTo((0, _queriesEnergyStorage2['default'])(undefined.room).storageForEnergy[0]);
      creep.transferEnergy((0, _queriesEnergyStorage2['default'])(undefined.room).storageForEnergy[0]);
    }
  };
};

module.exports = exports['default'];