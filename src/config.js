export const rooms = {
  W17N3: 'W17N3',
  W17N4: 'W17N4',
  W18N4: 'W18N4'
};

export const spawns = [
  Game.spawns.Spawn1,
  Game.spawns.Duna
];

export const wallHealth = 6000;

export const currentTime =  Date.now();

export const unitTypeConstants = {
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
      role: '',
      born: currentTime,
      source: currentTime % 2
    }
  },
  guard: {
    bodyParts: [RANGED_ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE],
    name: '',
    memory: {
      role: '',
      born: currentTime,
      source: currentTime % 2,
      idlePos: "28, 29"
    }
  }
};
