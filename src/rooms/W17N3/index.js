// Primary room

import { currentTime } from '../../config';

const roomName = 'W17N3';

export default {
  name: roomName,
  wallhealth: 4000,
  roadHealth: 500,
  spawnIds: ['55e5fc58d1239485043987a0'],
  links: {
    transmitterIds: [],
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
        role: 'harvester' + currentTime,
        born: currentTime,
        source: currentTime % 2
      }
    },
    forager: {
      bodyParts: [CARRY, CARRY, WORK, WORK, MOVE, MOVE, MOVE, MOVE],
      name: 'forager',
      memory: {
        role: 'forager' + currentTime,
        born: currentTime,
        source: currentTime % 2
      }
    },
    worker: {
      bodyParts: [CARRY, CARRY, WORK, WORK, MOVE, MOVE],
      name: 'worker' + currentTime,
      memory: {
        role: 'worker',
        born: currentTime,
        source: currentTime % 2,
        willRepair: currentTime % 2
      }
    },
    guard: {
      bodyParts: [RANGED_ATTACK, TOUGH, TOUGH, MOVE],
      name: 'Guard' + currentTime,
      memory: {
        role: 'Guard' + currentTime,
        born: currentTime,
        source: currentTime % 2,
        idlePos: '28, 29'
      }
    },
    warrior: {
      bodyParts: [RANGED_ATTACK, TOUGH, MOVE],
      name: 'Warrior' + currentTime,
      memory: {
        role: 'Warrior' + currentTime,
        born: currentTime,
        source: currentTime % 2,
        idlePos: '28, 29'
      }
    }
  }
};
