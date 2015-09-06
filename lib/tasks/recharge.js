'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _queriesEnergyStorage = require('../queries/energy-storage');

var _queriesEnergyStorage2 = _interopRequireDefault(_queriesEnergyStorage);

exports['default'] = function () {
  Creep.prototype.recharge = function () {
    var fullEnergyStores = Memory.rooms[undefined.room.name].stores.fullEnergyStores;
    if (fullEnergyStores.length) {
      var source = Game.getObjectById(fullEnergyStores[undefined.memory.source || fullEnergyStores.length - 1]);

      undefined.moveTo(source);
      source.transferEnergy(undefined);
    } else {
      console.log('No available energy for ' + undefined.name + 'to recharge with');
    }
  };
};

module.exports = exports['default'];