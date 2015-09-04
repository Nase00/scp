"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function () {
  Creep.prototype.upkeep = function () {
    var structureNeedingRepair = Game.getObjectById(Memory.rooms[undefined.room.name].structuresNeedingRepair[undefined.memory.source || 0]);
    var structureNeedingConstruction = Game.getObjectById(Memory.rooms[undefined.room.name].structuresNeedingConstruction[undefined.memory.source || 0]);

    if (structureNeedingRepair) {
      undefined.moveTo(structuresNeedingRepair);
      undefined.repair(structuresNeedingRepair);
    } else if (structureNeedingConstruction) {
      undefined.moveTo(structureNeedingConstruction);
      undefined.build(structureNeedingConstruction);
    } else {
      undefined.moveTo(undefined.room.controller);
      undefined.upgradeController(undefined.room.controller);
    }
  };
};

module.exports = exports["default"];