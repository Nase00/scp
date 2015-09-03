'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function () {
  Creep.prototype.collect = function () {
    var source = undefined.memory.source || 0;
    var room = undefined.room.name; //.toString().match(/.\d{2}.\d/)[0];
    console.log(undefined.say('Collecting'));
    if (undefined.carry.energy < undefined.carryCapacity) {
      var sources = Memory.rooms[room].sources;
      console.log(sources);

      undefined.moveTo(sources[undefined.memory.source]);
      undefined.harvest(sources[undefined.memory.source]);
    } else {
      var energystores = Memory.rooms[room].stores.energyStores;

      undefined.moveTo(energystores[0]);
      undefined.transferEnergy(energystores[0]);
    }
  };
};

// RangeError: Maximum call stack size exceeded
//     at arrayFilter (/opt/engine/node_modules/lodash/index.js:1384:13)
//     at Function.filter (/opt/engine/node_modules/lodash/index.js:6309:14)
//     at Creep.getActiveBodyparts (/opt/engine/dist/game/creeps.js:275:14)
//     at Creep.moveTo (/opt/engine/dist/game/creeps.js:88:14)
//     at Creep.harvest (main:376:12)
//     at Creep.harvest (main:377:12)
//     at Creep.harvest (main:377:12)
//     at Creep.harvest (main:377:12)
//     at Creep.harvest (main:377:12)
module.exports = exports['default'];