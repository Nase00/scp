'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function () {
  Creep.prototype.forage = function () {
    undefined.say('F+');

    if (undefined.carry.energy < undefined.carryCapacity) {
      if (Memory.rooms[undefined.room.name].sources.length) {
        var source = Game.getObjectById(Memory.rooms[undefined.room.name].sources[undefined.memory.source || 0]);

        undefined.moveTo(source);
        undefined.harvest(source);
      } else {
        console.log('No available sources for ' + undefined.name + 'to harvest.');
      }
    } else {
      var energystores = Memory.rooms[undefined.room.name].stores.energyStores;

      undefined.moveTo(energystores[0]);
      undefined.transferEnergy(energystores[0]);
    }
  };
};

module.exports = exports['default'];