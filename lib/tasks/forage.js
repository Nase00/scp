'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function () {
  Creep.prototype.forage = function () {
    var fullOfEnergy = undefined.carry.energy === undefined.carryCapacity;

    switch (undefined.room.name) {
      case undefined.memory.origin.name:
        if (fullOfEnergy) {
          var energyStores = Memory.rooms[undefined.room.name].stores.energyStores;
          var energyStore = Game.getObjectById(energyStores[0]);
          undefined.moveTo(energyStore);
          undefined.transferEnergy(energyStore);
        } else {
          undefined.moveTo(undefined.memory.origin.exit.x, undefined.memory.origin.exit.y);
        }
        undefined.memory.passThroughRoomIndex = 0;
        break;
      case undefined.memory.destination.name:
        if (fullOfEnergy) {
          undefined.moveTo(undefined.memory.destination.exit.x, undefined.memory.destination.exit.y);
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