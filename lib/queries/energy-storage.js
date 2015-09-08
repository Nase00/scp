'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rooms = require('../rooms');

var _rooms2 = _interopRequireDefault(_rooms);

exports['default'] = function () {
  var _loop = function (room) {
    // Transmitter link needs to be at absolute beginning of the array
    if (Memory.rooms[room].links.transmitterIds.length) {
      for (var transmitterId in _rooms2['default'][room].links.transmitterIds) {
        var transmitter = Game.getObjectById(_rooms2['default'][room].links.transmitterIds[transmitterId]);
        if (transmitter.energy !== transmitter.energyCapacity) {
          Memory.rooms[room].stores.energyStores.push(_rooms2['default'][room].links.transmitterIds[transmitterId]);
        }
      }
    }

    var spawns = [];
    var extensions = [];
    var links = [];
    var storages = [];

    if (Game.rooms[room]) {
      Game.rooms[room].find(FIND_STRUCTURES, {
        filter: function filter(structure) {
          if (structure.energyCapacity > 0 && structure.energy < structure.energyCapacity) {
            Memory.rooms[room].stores.energyStores.push(structure.id);
          } else {
            switch (structure.structureType) {
              case 'spawn':
                spawns.push(structure.id);
                break;
              case 'extension':
                extensions.push(structure.id);
                break;
              case 'link':
                links.push(structure.id);
                break;
              case 'storage':
                storages.push(structure.id);
                break;
            }
          }
        }
      });
    } else {
      console.log('GAME OBJECT FORGOT ABOUT A ROOM!'); // Bug?
    }

    Memory.rooms[room].stores.fullEnergyStores = spawns.concat(extensions, storages);

    // Receiver link needs to be at absolute end of the array
    if (_rooms2['default'][room].links.receiverId.length && Game.getObjectById(_rooms2['default'][room].links.receiverId).energy > 0) {
      Memory.rooms[room].stores.fullEnergyStores.push(_rooms2['default'][room].links.receiverId);
    }
  };

  for (var room in _rooms2['default']) {
    _loop(room);
  }
};

module.exports = exports['default'];