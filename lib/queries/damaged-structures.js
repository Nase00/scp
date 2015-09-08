'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rooms = require('../rooms');

var _rooms2 = _interopRequireDefault(_rooms);

exports['default'] = function () {
  var _loop = function (room) {
    Memory.rooms[room].structuresNeedingRepair.length = 0;
    var stores = [];
    var roads = [];
    var walls = [];
    var others = [];

    Game.rooms[room].find(FIND_STRUCTURES, {
      filter: function filter(structure) {
        switch (structure.structureType) {
          case 'road':
            if (structure.hits < room.roadHealth) {
              walls.push(structure.id);
            }
            break;
          case 'constructedWall':
            if (structure.hits < room.wallHealth) {
              walls.push(structure.id);
            }
            break;
          case 'extension':
          case 'storage':
          case 'link':
            if (structure.hits < structure.hitsMax) {
              walls.push(structure.id);
            }
            break;
          default:
            others.push(structure.id);
        }
      }
    });

    Memory.rooms[room].structuresNeedingRepair = stores.concat(roads, walls, others);
  };

  for (var room in _rooms2['default']) {
    _loop(room);
  }
};

module.exports = exports['default'];