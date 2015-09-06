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
      console.log('creepType', creepType);
      if (creepType < _rooms2['default'][room].creepCount[creepType]) {
        var idleSpawn = undefined;
        var spawns = [];
        for (var spawnId in Memory.rooms[room].spawnIds) {
          spawns.push(Game.getObjectById());
        };
        console.log(spawns);
        console.log('Spawning ' + creepType + ' in room ' + _rooms2['default'][room].name);
        idleSpawn.spawn(creepType);
      }
    }
  }
};

module.exports = exports['default'];