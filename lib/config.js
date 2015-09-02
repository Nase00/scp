'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var units = {
  harvesters: 11,
  scouts: 2,
  builders: 11,
  managers: 1,
  guards: 9,
  warriors: 0
};

exports.units = units;
var rooms = {
  W17N5: "[W17N5]"
};

exports.rooms = rooms;
var spawns = [Game.spawns.Spawn1, Game.spawns.Duna];

exports.spawns = spawns;
var wallHealth = 6000;

exports.wallHealth = wallHealth;
var getEnergyStores = function getEnergyStores(room) {
  var energyStores = [];
  var fullEnergyStores = [];
  room.find(FIND_STRUCTURES, {
    filter: function filter(structure) {
      if (structure.energy < structure.energyCapacity) {
        energyStores.push(i);
      } else if (structure.energy > 0 && structure.structureType == 'extension' || structure.structureType == 'spawn') {
        fullEnergyStores.push(structure);
      }
    }
  });

  return {
    needsEnergy: energystores,
    hasEnergy: fullEnergyStores
  };
};

exports.getEnergyStores = getEnergyStores;
var energyForRecharging = getEnergyStores.needsEnergy;
exports.energyForRecharging = energyForRecharging;
var storageForEnergy = getEnergyStores.fullEnergyStores;

exports.storageForEnergy = storageForEnergy;
var structuresNeedingRepair = function structuresNeedingRepair(room) {
  var structuresNeedingRepair = [];
  creep.room.find(FIND_STRUCTURES, {
    filter: function filter(structure) {
      if (structure.hitsMax > 1 && structure.hits < wallHealth) {
        structuresNeedingRepair.push(i);
      }
    }
  });
  return structuresNeedingRepair;
};

exports.structuresNeedingRepair = structuresNeedingRepair;
var structuresNeedingConstruction = function structuresNeedingConstruction(room) {
  return room.find(FIND_CONSTRUCTION_SITES);
};
exports.structuresNeedingConstruction = structuresNeedingConstruction;