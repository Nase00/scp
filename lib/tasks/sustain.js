'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rooms = require('../rooms');

var _rooms2 = _interopRequireDefault(_rooms);

exports['default'] = function () {
  for (var room in _rooms2['default']) {
    for (var creepType in _rooms2['default'][room].creepCount) {
      // console.log(creepType, Memory.rooms[room].actualCreepCount[creepType], rooms[room].creepCount[creepType])
      if (Memory.rooms[room].actualCreepCount[creepType] < _rooms2['default'][room].creepCount[creepType]) {
        var idleSpawns = [];
        for (var spawnId in Memory.rooms[room].spawnIds) {
          var spawn = Game.getObjectById(Memory.rooms[room].spawnIds[spawnId]);
          if (spawn && !spawn.spawning) {
            idleSpawns.push(spawn);
          }
        };

        if (idleSpawns.length) {
          console.log('Spawning ' + creepType + ' in room ' + _rooms2['default'][room].name);
          idleSpawns[0].spawn(creepType);
          return;
        }
        // } else {
        //   console.log('Waiting for available spawner in ' + rooms[room].name + ' to spawn ' + creepType);
        // }
      }
    }
  }
};

module.exports = exports['default'];