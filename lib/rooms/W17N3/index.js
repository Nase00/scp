// Primary room

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _config = require('../../config');

exports['default'] = {
  name: 'W17N3',
  defense: 4000,
  links: {
    transmitters: [],
    receiverId: ''
  },
  creepCount: {
    harvesters: 4,
    foragers: 0,
    builders: 4,
    guards: 1,
    warriors: 0
  },
  creepSchema: {
    harvester: {
      bodyParts: [CARRY, CARRY, WORK, WORK, MOVE, MOVE],
      name: 'harvester',
      memory: {
        role: 'harvester' + _config.currentTime,
        born: _config.currentTime,
        source: _config.currentTime % 2
      }
    },
    forager: {
      bodyParts: [CARRY, CARRY, WORK, WORK, MOVE, MOVE, MOVE, MOVE],
      name: 'forager',
      memory: {
        role: 'forager' + _config.currentTime,
        born: _config.currentTime,
        source: _config.currentTime % 2
      }
    },
    worker: {
      bodyParts: [CARRY, CARRY, WORK, WORK, MOVE, MOVE],
      name: 'worker' + _config.currentTime,
      memory: {
        role: 'worker',
        born: _config.currentTime,
        source: _config.currentTime % 2,
        willRepair: _config.currentTime % 2
      }
    },
    guard: {
      bodyParts: [RANGED_ATTACK, TOUGH, TOUGH, MOVE],
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