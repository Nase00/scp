'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function () {
  Creep.prototype.collect = function () {
    undefined.say('C+');

    if (undefined.carry.energy < undefined.carryCapacity) {
      if (Memory.rooms[undefined.room.name].sources.length) {
        var source = Game.getObjectById(Memory.rooms[undefined.room.name].sources[0]);
        if (source) {
          undefined.moveTo(source);
          undefined.harvest(source);
        } else {
          console.log('Something is wrong, source ' + source + ' is not defined.');
        }
      } else {
        console.log('No available sources for ' + undefined.name + 'to harvest.');
      }
    } else {
      // if (Memory.rooms[this.room.name].stores.energyStores.length) {
      var energyStore = Game.getObjectById(Memory.rooms[undefined.room.name].stores.energyStores[0]);
      undefined.moveTo(energyStore);
      undefined.transferEnergy(energyStore);
      // } else {
      //   this.upkeep();
      // }
    }
  };
};

module.exports = exports['default'];