// Primary room

import { currentTime } from '../../config';

const roomName = 'W18N4';

export default {
  name: roomName,
  wallHealth: 500,
  roadHealth: 500,
  spawnIds: [],

  links: {
    transmitterIds: [],
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
        role: 'harvester' + currentTime,
        born: currentTime,
        source: currentTime % 2
      }
    },
    worker: {
      bodyParts: [CARRY, WORK, MOVE],
      name: 'worker' + currentTime,
      memory: {
        role: 'worker',
        born: currentTime,
        source: currentTime % 2,
        willRepair: currentTime % 2
      }
    },
    guard: {
      bodyParts: [RANGED_ATTACK, TOUGH, MOVE],
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
