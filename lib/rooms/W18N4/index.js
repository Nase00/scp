// Primary room

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _config = require('../../config');

exports['default'] = {
  name: 'W18N4',
  defense: 500,
  links: {
    transmitter: [],
    receiverId: ''
  },
  creepCount: {
    harvesters: 2,
    foragers: 0,
    builders: 1,
    guards: 0,
    warriors: 0
  },
  creepSchema: {
    harvester: {
      bodyParts: [CARRY, WORK, MOVE],
      name: 'harvester',
      memory: {
        role: 'harvester' + _config.currentTime,
        born: _config.currentTime,
        source: _config.currentTime % 2
      }
    },
    worker: {
      bodyParts: [CARRY, WORK, MOVE],
      name: 'worker' + _config.currentTime,
      memory: {
        role: 'worker',
        born: _config.currentTime,
        source: _config.currentTime % 2,
        willRepair: _config.currentTime % 2
      }
    },
    guard: {
      bodyParts: [RANGED_ATTACK, TOUGH, MOVE],
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