// Primary room

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _config = require('../../config');

var _foragerPaths = require('./forager-paths');

var _foragerPaths2 = _interopRequireDefault(_foragerPaths);

var roomName = 'W17N4';

exports['default'] = {
  name: roomName,
  wallHealth: 40000,
  roadHealth: 2000,
  spawnIds: ['55defc603a94852a6ddf657e'],
  links: {
    transmitterIds: ['55e4d627002b197809962d40', '55ebd31b30de2f106e550700'],
    receiverId: '55ea5371ec54fa140a98012e'
  },
  creepCount: {
    harvesters: 6,
    foragers: 8,
    builders: 11,
    guards: 9,
    warriors: 0
  },
  creepSchema: {
    harvester: {
      bodyParts: [CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
      name: 'harvester',
      memory: {
        role: 'harvester' + _config.currentTime,
        born: _config.currentTime,
        source: _config.currentTime % 2
      }
    },
    forager: {
      bodyParts: [CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
      name: 'forager',
      memory: {
        role: 'forager' + _config.currentTime,
        born: _config.currentTime,
        source: _config.currentTime % 2,
        origin: {
          name: 'W17N4',
          exit: '0, 40'
        },
        destination: {
          name: 'W17N4',
          exit: '0, 40',
          source: '43, 44'
        }
      }
    },
    worker: {
      bodyParts: [CARRY, CARRY, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE],
      name: 'worker' + _config.currentTime,
      memory: {
        role: 'worker',
        born: _config.currentTime,
        source: _config.currentTime % 2,
        willRepair: _config.currentTime % 2
      }
    },
    guard: {
      bodyParts: [RANGED_ATTACK, RANGED_ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE],
      name: 'Guard' + _config.currentTime,
      memory: {
        role: 'Guard' + _config.currentTime,
        born: _config.currentTime,
        source: _config.currentTime % 2,
        idlePos: '28, 29'
      }
    },
    warrior: {
      bodyParts: [RANGED_ATTACK, TOUGH, MOVE],
      name: 'Warrior' + _config.currentTime,
      memory: {
        role: 'Warrior' + _config.currentTime,
        born: _config.currentTime,
        source: _config.currentTime % 2,
        idlePos: '28, 29'
      }
    }
  }
};
module.exports = exports['default'];