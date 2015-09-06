// Primary room

import { currentTime } from '../../config';
import foragerPaths from './forager-paths';

const roomName = 'W17N4';

export default {
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
        role: 'harvester' + currentTime,
        born: currentTime,
        source: currentTime % 2
      }
    },
    forager: {
      bodyParts: [CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
      name: 'forager',
      memory: {
        role: 'forager' + currentTime,
        born: currentTime,
        source: currentTime % 2,
        origin: {
          name: 'W17N4',
          exit: '0, 40'
        },
        destination: {
          name: 'W18N4',
          exit: '0, 40',
          source: '43, 44'
        }
      }
    },
    worker: {
      bodyParts: [CARRY, CARRY, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE],
      name: 'worker' + currentTime,
      memory: {
        role: 'worker',
        born: currentTime,
        source: currentTime % 2,
        willRepair: currentTime % 2
      }
    },
    guard: {
      bodyParts: [RANGED_ATTACK, RANGED_ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE],
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
