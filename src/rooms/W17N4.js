// Primary room

import { sustain } from '../tasks';
import { currentTime } from './config';

const room = 'W17N4';

const unitCount = {
  harvesters: 6,
  foragers: 8,
  builders: 11,
  guards: 9,
  warriors: 0
};

export default () => {
  sustain(room, unitCount);
};

export const creepConstants = {
  harvester: {
    bodyParts: [CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
    name: 'harvester',
    memory: {
      role: 'harvester' + currentTime,
      born: currentTime,
      source: currentTime % 2
    }
  },
  worker: {
    bodyParts: [CARRY, CARRY, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE],
    name: 'worker' + currentTime,
    memory: {
      role: 'worker',
      born: currentTime,
      source: currentTime % 2
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
  }
};
