'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rooms = require('../rooms');

var _rooms2 = _interopRequireDefault(_rooms);

exports['default'] = function (room) {
  for (var _room in _rooms2['default']) {
    for (var creepType in _rooms2['default'][_room].creepCount) {
      if (creepType < _rooms2['default'][_room].creepCount[creepType]) {
        var idleSpawn = undefined;
        var spawns = Game.getObjectById(Memory.rooms[_room].spawns, {
          filter: function filter(spawn) {
            if (spawn.spawning) {
              idleSpawn = spawn;
              return;
            }
          }
        });
        console.log('Spawning ' + creepType + ' in room ' + _rooms2['default'][_room].name);
        idleSpawn.spawn(creepType);
      }
    }
  }
};

module.exports = exports['default'];