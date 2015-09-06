'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rooms = require('../rooms');

var _rooms2 = _interopRequireDefault(_rooms);

exports['default'] = function () {
  var _loop = function (room) {
    Memory.rooms[room].stores.energyStores.length = 0;
    Memory.rooms[room].stores.fullEnergyStores.length = 0;

    // Transmitter link needs to be at absolute beginning of the array
    if (_rooms2['default'][room].links.transmitters.length) {
      for (transmitter in _rooms2['default'][room].links.transmitters) {
        Memory.rooms[room].stores.fullEnergyStores.push(transmitter);
      }
    }

    Game.rooms[room].find(FIND_STRUCTURES, {
      filter: function filter(structure) {
        var energyStorageTypes = ['extension', 'spawn'];
        if (structure.energy < structure.energyCapacity) {
          Memory.rooms[room].stores.energyStores.push(structure.id);
        } else if (energyStorageTypes.indexOf(structure.structureType) !== -1) {
          Memory.rooms[room].stores.fullEnergyStores.push(structure.id);
        }
        // Storage needs to be near the end of the array
        if (structure.structureType === 'storage') {
          Memory.rooms[room].stores.fullEnergyStores.push(structure.id);
        }
      }
    });

    // Receiver link needs to be at absolute end of the array
    if (_rooms2['default'][room].links.receiverId.length) {
      Memory.rooms[room].stores.fullEnergyStores.push(_rooms2['default'][room].links.receiverId);
    }
  };

  for (var room in _rooms2['default']) {
    _loop(room);
  }
};

module.exports = exports['default'];