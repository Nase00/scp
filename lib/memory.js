'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rooms = require('./rooms');

var _rooms2 = _interopRequireDefault(_rooms);

exports['default'] = function () {
  for (var room in _rooms2['default']) {
    // Flush
    Memory.rooms[room].structuresNeedingRepair.length = 0;
    Memory.rooms[room].structuresNeedingConstruction.length = 0;
    Memory.rooms[room].sources.length = 0;
    Memory.rooms[room].stores.energyStores.length = 0;
    Memory.rooms[room].stores.fullEnergyStores.length = 0;

    // Static
    Memory.rooms[room].links = _rooms2['default'][room].links;
    Memory.rooms[room].creepCount = _rooms2['default'][room].creepCount;

    // Persistent
    Memory.rooms[room].actualCreepCount = {};
  }
};

module.exports = exports['default'];