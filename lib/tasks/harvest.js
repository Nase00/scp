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
      undefined.moveTo(sources[undefined.memory.source]);
      undefined.harvest(sources[undefined.memory.source]);
    } else {
      var energystores = (0, _queriesEnergyStorage2['default'])(undefined.room).energyStores;
      undefined.moveTo(energystores[0]);
      undefined.transferEnergy(energystores[0]);
    }
  };
};

module.exports = exports['default'];