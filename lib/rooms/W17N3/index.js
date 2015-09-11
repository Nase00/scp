// Primary room

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _config = require('../../config');

var roomName = 'W17N3';

exports['default'] = {
  name: roomName,
  wallHealth: 40000,
  roadHealth: 500,
  spawnIds: ['55f315175101c33d1554fde2'],
  links: {
    transmitterIds: [],
    receiverId: ''
  },
  creepCount: {
    harvester: 4,
    worker: 3,
    guard: 0,
    warrior: 0
  },
  creepSchema: {
    harvester: {
      bodyParts: [CARRY, WORK, MOVE],
      name: 'Harvester' + _config.currentTime,
      memory: {
        role: 'harvester',
        born: _config.currentTime,
        origin: {
          name: 'W17N4'
        },
        source: _config.currentTime % 2
      }
    },
    // forager: {
    //   bodyParts: [CARRY, CARRY, WORK, WORK, MOVE, MOVE, MOVE, MOVE],
    //   name: 'Forager' + currentTime,
    //   memory: {
    //     role: 'forager',
    //     born: currentTime,
    // origin: {
    //   name: 'W17N4'
    // },
    //     source: currentTime % 2
    //   }
    // },
    worker: {
      bodyParts: [CARRY, WORK, MOVE],
      name: 'Worker' + _config.currentTime,
      memory: {
        role: 'worker',
        born: _config.currentTime,
        origin: {
          name: 'W17N4'
        },
        source: _config.currentTime % 2,
        willRepair: _config.currentTime % 2
      }
    },
    guard: {
      bodyParts: [RANGED_ATTACK, TOUGH, TOUGH, MOVE],
      name: 'Guard' + _config.currentTime,
      memory: {
        role: 'guard',
        born: _config.currentTime,
        origin: {
          name: 'W17N4'
        },
        source: _config.currentTime % 2,
        idlePos: '28, 29'
      }
    },
    warrior: {
      bodyParts: [RANGED_ATTACK, TOUGH, MOVE],
      name: 'Warrior' + _config.currentTime,
      memory: {
        role: 'warrior',
        born: _config.currentTime,
        origin: {
          name: 'W17N4'
        },
        source: _config.currentTime % 2,
        idlePos: '28, 29'
      }
    }
  }
};
module.exports = exports['default'];