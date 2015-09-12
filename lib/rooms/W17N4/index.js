// Primary room

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _config = require('../../config');

var roomName = 'W17N4';

exports['default'] = {
  name: roomName,
  wallHealth: 40000,
  rampartHealth: 228000,
  roadHealth: 2000,
  spawnIds: [''],
  links: {
    transmitterIds: [''],
    receiverId: ''
  },
  creepCount: {
    harvester: 0,
    W18N4_forager: 0,
    W17N3_forager: 0,
    worker: 0,
    guard: 0,
    warrior: 0
  },
  creepSchema: {
    harvester: {
      bodyParts: [CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
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
    W18N4_forager: {
      bodyParts: [CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
      name: 'Forager' + _config.currentTime,
      memory: {
        role: 'forager',
        born: _config.currentTime,
        source: _config.currentTime % 2,
        origin: {
          name: 'W17N4',
          exit: '0, 41'
        },
        destination: {
          name: 'W18N4',
          exit: '49, 40',
          sourceId: '55c34a6b5be41a0a6e80badb'
        },
        passThroughRoomIndex: 0
      }
    },
    W17N3_forager: {
      bodyParts: [CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
      name: 'Forager' + _config.currentTime,
      memory: {
        role: 'forager',
        born: _config.currentTime,
        source: _config.currentTime % 2,
        origin: {
          name: 'W17N4',
          exit: '31, 49'
        },
        destination: {
          name: 'W17N3',
          exit: '31, 0',
          sourceId: '55c34a6b5be41a0a6e80c3cc'
        },
        passThroughRoomIndex: 0
      }
    },
    worker: {
      bodyParts: [CARRY, CARRY, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE],
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
      bodyParts: [RANGED_ATTACK, RANGED_ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE],
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