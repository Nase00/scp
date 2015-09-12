// Primary room

import { currentTime } from '../../config';

const roomName = 'W17N3';

export default {
  name: roomName,
  wallHealth: 46000,
  rampartHealth: 228000,
  roadHealth: 500,
  spawnIds: ['55f38ed95101c33d1555064e'],
  links: {
    transmitterIds: [],
    receiverId: ''
  },
  creepCount: {
    harvester: 7,
    worker: 7,
    // W17N4_forager: 1,
    guard: 10,
    warrior: 0
  },
  creepSchema: {
    harvester: {
      bodyParts: [CARRY, CARRY, WORK, WORK, MOVE, MOVE],
      name: 'Harvester' + currentTime,
      memory: {
        role: 'harvester',
        born: currentTime,
        origin: {
          name: 'W17N4'
        },
        source: currentTime % 2
      }
    },
    // W17N4_forager: {
    //   bodyParts: [CARRY, CARRY, WORK, WORK, MOVE, MOVE, MOVE, MOVE],
    //   name: 'Forager' + currentTime,
    //   memory: {
    //     role: 'forager',
    //     born: currentTime,
    //     source: currentTime % 2,
    //     origin: {
    //       name: 'W17N3',
    //       exit: {
    //         x: 31,
    //         y: 0
    //       }
    //     },
    //     destination: {
    //       name: 'W17N4',
    //       exit: {
    //         x: 31,
    //         y: 49
    //       },
    //       sourceId: '55c34a6b5be41a0a6e80bf88'
    //     },
    //     passThroughRoomIndex: 0
    //   }
    // },
    worker: {
      bodyParts: [CARRY, CARRY, WORK, WORK, MOVE, MOVE],
      name: 'Worker' + currentTime,
      memory: {
        role: 'worker',
        born: currentTime,
        origin: {
          name: 'W17N4'
        },
        source: currentTime % 2,
        willRepair: currentTime % 2
      }
    },
    guard: {
      bodyParts: [ATTACK, ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE],
      name: 'Guard' + currentTime,
      memory: {
        role: 'guard',
        born: currentTime,
        origin: {
          name: 'W17N4'
        },
        source: currentTime % 2,
        idlePos: {
          x: 27,
          y: 30
        }
      }
    },
    warrior: {
      bodyParts: [RANGED_ATTACK, ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE],
      name: 'Warrior' + currentTime,
      memory: {
        role: 'warrior',
        born: currentTime,
        origin: {
          name: 'W17N4'
        },
        source: currentTime % 2,
        idlePos: {
          x: 28,
          y: 29
        }
      }
    }
  }
};
