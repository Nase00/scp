'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (room) {
  var stores = {
    energyStores: [],
    fullEnergyStores: []
  };
  room.find(FIND_STRUCTURES, {
    filter: function filter(structure) {
      var energyStorageTypes = ['extension', 'storage', 'spawn'];
      if (structure.energy < structure.energyCapacity) {
        stores.energyStores.push(structure);
      } else if (energyStorageTypes.indexOf(structure.structureType) != -1) {
        stores.fullEnergyStores.push(structure);
      }
    }
  });
  return stores;
};

module.exports = exports['default'];