'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function () {
  Creep.prototype.collect = function () {
    undefined.say('C+');

    if (undefined.carry.energy < undefined.carryCapacity) {
      if (Memory.rooms[undefined.room.name].sources.length) {
        var source = Game.getObjectById(Memory.rooms[undefined.room.name].sources[undefined.memory.source || 0]);

        undefined.moveTo(source);
        undefined.harvest(source);
      } else {
        console.log('No available sources for ' + undefined.name + 'to harvest.');
      }
    } else {
      var energyStore = Game.getObjectById(Memory.rooms[undefined.room.name].stores.energyStores[0]);

      undefined.moveTo(energyStore);
      undefined.transferEnergy(energyStore);
    }
  };
};

module.exports = exports['default'];