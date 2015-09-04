'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _config = require('../config');

exports['default'] = function () {
  var _loop = function (room) {
    Memory.rooms[room].stores.energyStores.length = 0;
    Memory.rooms[room].stores.fullEnergyStores.length = 0;

    Game.rooms[room].find(FIND_STRUCTURES, {
      filter: function filter(structure) {
        var energyStorageTypes = ['extension', 'storage', 'spawn'];
        if (structure.energy < structure.energyCapacity) {
          Memory.rooms[room].stores.energyStores.push(structure.id);
        } else if (energyStorageTypes.indexOf(structure.structureType) != -1) {
          Memory.rooms[room].stores.fullEnergyStores.push(structure.id);
        }
      }
    });
  };

  for (var room in _config.rooms) {
    _loop(room);
  }
};

module.exports = exports['default'];