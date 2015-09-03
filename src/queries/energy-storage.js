export default (room) => {
  let stores = {
    energyStores: [],
    fullEnergyStores: []
  };
  room.find(FIND_STRUCTURES, {
    filter: (structure) => {
      let energyStorageTypes = ['extension', 'storage', 'spawn'];
      if (structure.energy < structure.energyCapacity) {
        stores.energyStores.push(structure);
      } else if (energyStorageTypes.indexOf(structure.structureType) != -1) {
        stores.fullEnergyStores.push(structure);
      }
    }
  });
  return stores;
};
