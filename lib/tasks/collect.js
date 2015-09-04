'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function () {
  Creep.prototype.collect = function () {
    undefined.say('C+');

    var room = undefined.room.name; //.toString().match(/.\d{2}.\d/)[0];

    if (undefined.carry.energy < undefined.carryCapacity) {
      var source = Game.getObjectById(Memory.rooms[room].sources[undefined.memory.source || 0]);

      undefined.moveTo(source);
      undefined.harvest(source);
    } else {
      var energystores = Memory.rooms[room].stores.energyStores;

      undefined.moveTo(energystores[0]);
      undefined.transferEnergy(energystores[0]);
    }
  };
};

module.exports = exports['default'];