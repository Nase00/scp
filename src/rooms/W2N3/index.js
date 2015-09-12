// Primary room

import { currentTime } from '../../config';

const roomName = 'W2N3';

export default {
  name: roomName,
  wallHealth: 10000,
  rampartHealth: 100000,
  roadHealth: 500,
  spawnIds: ['55f3a6fa5101c33d15550799'],
  links: {
    transmitterIds: [],
    receiverId: ''
  },
  creepCount: {
    harvester: 3,
    worker: 2,
    // W2N3_forager: 1,
    guard: 0,
    warrior: 0
  },
  creepSchema: {
    harvester: {
      bodyParts: [CARRY, WORK, MOVE, CARRY, WORK, MOVE],
      name: 'Harvester' + currentTime,
      memory: {
        role: 'harvester',
        born: currentTime,
        origin: {
          name: 'W2N3'
        },
        source: 0
      }
    },
    // W2N3_forager: {
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
    //       name: 'W2N3',
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
      bodyParts: [CARRY, WORK, MOVE, CARRY, WORK, MOVE],
      name: 'Worker' + currentTime,
      memory: {
        role: 'worker',
        born: currentTime,
        origin: {
          name: 'W2N3'
        },
        source: 0,
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
          name: 'W2N3'
        },
        source: 2,
        idlePos: {
          x: 27,
          y: 30
        }
      }
    },
    warrior: {
      bodyParts: [ATTACK, TOUGH, TOUGH, MOVE, MOVE],
      name: 'Warrior' + currentTime,
      memory: {
        role: 'warrior',
        born: currentTime,
        origin: {
          name: 'W2N3'
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
