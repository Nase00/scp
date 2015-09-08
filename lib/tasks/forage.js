'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function () {
  Creep.prototype.forage = function () {
    undefined.say('F+');

    var fullOfEnergy = undefined.carry.energy === undefined.carryCapacity;

    switch (undefined.room.name) {
      case undefined.memory.origin.name:
        if (fullOfEnergy) {
          var energyStores = Memory.rooms[undefined.room.name].stores.energyStores;

          undefined.moveTo(energyStores[0]);
          undefined.transferEnergy(energyStores[0]);
        } else {
          undefined.moveTo(undefined.memory.origin.exit);
        }
        undefined.memory.passThroughRoomIndex = 0;
        break;
      case undefined.memory.destination.name:
        if (fullOfEnergy) {
          undefined.moveTo(undefined.memory.destination.exit);
        } else {
          var source = Game.getObjectById(undefined.memory.destination.sourceId);
          undefined.moveTo(source);
          undefined.harvest(source);
        }
        undefined.memory.passThroughRoomIndex = 0;
        break;
      default:
        var direction = fullOfEnergy ? 'toOrigin' : 'toDestination';
        undefined.moveTo(undefined.memory.passThroughRooms[undefined.memory.passThroughRoomIndex][direction]);
        direct === 'toOrigin' ? undefined.memory.passThroughRoomIndex-- : undefined.memory.passThroughRoomIndex++;
    }
  };
};

module.exports = exports['default'];