'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function () {
  Creep.prototype.deathKnell = function () {
    console.log(undefined.name + ' is about to expire.');
    Memory.rooms[undefined.memory.origin.name].actualCreepCount[creepType]--;
  };
};

module.exports = exports['default'];