"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function () {
  Creep.prototype.work = function () {
    var fullEnergyStores = Memory.rooms[undefined.room.name].stores.fullEnergyStores;
    if (undefined.carry.energy === 0 && fullEnergyStores.length) {
      undefined.recharge();
    } else if (undefined.carry.energy === undefined.carryCapacity || undefined.carry.energy > 0 && fullEnergyStores.length) {
      undefined.upkeep();
    } else {
      var source = Game.getObjectById(Memory.rooms[undefined.room.name].sources[undefined.memory.source || 0]);
      undefined.moveTo(source);
      undefined.harvest(source);
    }
  };
};

module.exports = exports["default"];