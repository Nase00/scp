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
      console.log(Memory.rooms[room].actualCreepCount[creepType], _rooms2['default'][room].creepCount[creepType]);
      if (Memory.rooms[room].actualCreepCount[creepType] < _rooms2['default'][room].creepCount[creepType]) {
        var idleSpawns = [];
        for (var spawnId in Memory.rooms[room].spawnIds) {
          var spawn = Game.getObjectById(spawnId);
          if (!spawn.spawning) {
            idleSpawns.push(spawn);
          }
        };

        console.log('Spawning ' + creepType + ' in room ' + _rooms2['default'][room].name);
        idleSpawn[0].spawn(creepType);
      }
    }
  }
};

module.exports = exports['default'];