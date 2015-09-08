// Primary room

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _config = require('../../config');

var roomName = 'W17N3';

exports['default'] = {
  name: roomName,
  wallhealth: 4000,
  roadHealth: 500,
  spawnIds: ['55e5fc58d1239485043987a0'],
  links: {
    transmitterIds: [],
    receiverId: ''
  },
  creepCount: {
    harvesters: 5,
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
        origin: {
          name: 'W17N4'
        },
        source: _config.currentTime % 2
      }
    },
    // forager: {
    //   bodyParts: [CARRY, CARRY, WORK, WORK, MOVE, MOVE, MOVE, MOVE],
    //   name: 'forager',
    //   memory: {
    //     role: 'forager' + currentTime,
    //     born: currentTime,
    // origin: {
    //   name: 'W17N4'
    // },
    //     source: currentTime % 2
    //   }
    // },
    worker: {
      bodyParts: [CARRY, CARRY, WORK, WORK, MOVE, MOVE],
      name: 'worker' + _config.currentTime,
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
        role: 'Guard' + _config.currentTime,
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
        role: 'Warrior' + _config.currentTime,
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