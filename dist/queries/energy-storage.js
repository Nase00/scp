'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (room) {
  var energyStores = [];
  var fullEnergyStores = [];
  room.find(FIND_STRUCTURES, {
    filter: function filter(structure) {
      if (structure.energy < structure.energyCapacity) {
        energyStores.push(i);
        return;
      }
      var energyStorageTypes = ['extension', 'storage', 'spawn'];
      if (energyStorageTypes.indexOf(structure.structureType) != -1) {
        fullEnergyStores.push(structure);
      }
    }
  });

  return {
    energystores: energystores,
    fullEnergyStores: fullEnergyStores
  };
};

module.exports = exports['default'];