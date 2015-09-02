export const units = {
  harvesters: 11,
  scouts: 2,
  builders: 11,
  managers: 1,
  guards: 9,
  warriors: 0
};

export const rooms = {
  W17N5: "[W17N5]"
};

export const spawns = [
  Game.spawns.Spawn1,
  Game.spawns.Duna
];

export const wallHealth = 6000;

export let getEnergyStores = (room) => {
  let energyStores = [];
  let fullEnergyStores = [];
  room.find(FIND_STRUCTURES, {
    filter: (structure) => {
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
}

export let energyForRecharging = getEnergyStores.needsEnergy;
export let storageForEnergy = getEnergyStores.fullEnergyStores

export let structuresNeedingRepair = (room) => {
  let structuresNeedingRepair = [];
  creep.room.find(FIND_STRUCTURES, {
    filter: (structure) => {
      if (structure.hitsMax > 1 && structure.hits < wallHealth) {
        structuresNeedingRepair.push(i);
      }
    }
  });
  return structuresNeedingRepair;
}

export let structuresNeedingConstruction = (room) => {
  return room.find(FIND_CONSTRUCTION_SITES);
}
