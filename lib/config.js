'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var rooms = {
  W17N3: {
    name: 'W17N3',
    defense: 4000
  },
  W17N4: {
    name: 'W17N4',
    defense: 14000
  },
  W18N4: {
    name: 'W18N4',
    defense: 9
  }
};

exports.rooms = rooms;
var spawns = [Game.spawns.Spawn1, Game.spawns.Duna];

exports.spawns = spawns;
var wallHealth = 6000;

exports.wallHealth = wallHealth;
var currentTime = Date.now();

exports.currentTime = currentTime;
var unitTypeConstants = {
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
    bodyParts: [RANGED_ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE],
    name: 'Guard' + currentTime,
    memory: {
      role: 'Guard' + currentTime,
      born: currentTime,
      source: currentTime % 2,
      idlePos: "28, 29"
    }
  }
};
exports.unitTypeConstants = unitTypeConstants;